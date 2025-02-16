import React, { useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase"; // Make sure Firebase is configured correctly
import toast from "react-hot-toast";

function InviteForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [toggle, setToggle] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSingleInvite = async () => {
    if (!formData.name || !formData.email || !formData.role) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
      // Call API to send invitation
      await axios.post(
        "https://us-central1-firecmsdemo.cloudfunctions.net/userinvitation/invite",
        {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        }
      );

      // Create user in Firebase
      const tempPassword = "Temp@12345"; // Temporary password
      await createUserWithEmailAndPassword(auth, formData.email, tempPassword);
      await sendPasswordResetEmail(auth, formData.email);

      console.log("Single user created:", formData);
      // alert(`Invitation sent successfully to ${formData.email}!`);
      toast.success(`Invitation sent successfully to ${formData.email}!`);
    } catch (error) {
      // console.error("Error inviting user:", error.message);
      // alert(`Failed to invite user: ${error.message}`);
      // const cleanErrorMessage = `${formData.email} already exists`;
      toast.error(` Email already exists`);
      
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleBulkInvite = async () => {
    if (!file) {
      alert("Please upload a CSV file.");
      return;
    }

    setLoading(true); // Start loading

    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      const rows = text
        .split("\n")
        .map((row) => row.trim())
        .filter((row) => row !== "");
      const headers = rows[0]
        .split(",")
        .map((header) => header.trim().toLowerCase());

      const requiredFields = ["name", "email", "role"];
      const missingFields = requiredFields.filter(
        (field) => !headers.includes(field)
      );

      if (missingFields.length > 0) {
        alert(
          `The following required fields are missing: ${missingFields.join(
            ", "
          )}`
        );
        setLoading(false); // End loading
        return;
      }

      const dataRows = rows
        .slice(1)
        .map((row) => {
          const columns = row
            .split(",")
            .map((col) => col.trim())
            .filter((col) => col !== "");
          if (columns.length !== headers.length) {
            console.error(
              `Row length mismatch. Expected ${headers.length} columns but got ${columns.length}`
            );
            return null;
          }

          return columns;
        })
        .filter((row) => row !== null);

      const users = dataRows.map((row) => {
        const user = {};
        row.forEach((col, index) => {
          user[headers[index]] = col;
        });
        return user;
      });

      console.log("Users to be invited:", users);

      try {
        await axios.post(
          "https://us-central1-firecmsdemo.cloudfunctions.net/userinvitation/bulkinvite",
          users
        );

        for (const user of users) {
          const { email, name, role } = user;

          if (!email || !name || !role) {
            console.error("Invalid user data:", user);
            continue;
          }

          // Create user in Firebase
          const tempPassword = "Temp@12345"; // Temporary password
          await createUserWithEmailAndPassword(auth, email, tempPassword);
          await sendPasswordResetEmail(auth, email);

          console.log("Bulk user created:", user);
        }

        alert("All invitations sent successfully!");
      } catch (error) {
        console.error("Error inviting bulk users:", error.message);
        alert(`Failed to invite bulk users: ${error.message}`);
      } finally {
        setLoading(false); // End loading
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      alert("There was an error reading the file.");
      setLoading(false); // End loading
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-4">
        <h1 className="text-sm font-medium text-gray-800">Bulk Invite</h1>
        <div
          className={`flex items-center justify-center w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
            toggle ? "bg-green-400" : "bg-gray-300"
          }`}
          onClick={() => setToggle(!toggle)}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              toggle ? "translate-x-3" : "-translate-x-3"
            }`}
          />
        </div>
      </div>

      {!toggle ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSingleInvite();
          }}
          className="flex flex-col"
        >
          <header className="w-full min-h-0 border border-solid bg-neutral-100 border-neutral-100 max-md:max-w-full mt-[25px]" />
          <section className="flex overflow-hidden flex-col min-h-[252px] max-md:max-w-full mt-5">
            <header className="flex flex-col justify-center items-start w-full max-md:max-w-full">
              <div className="flex gap-2.5 items-center">
                <h1 className="self-stretch my-auto text-xl font-medium text-black">
                  Single
                </h1>
              </div>
            </header>
            <div className="flex flex-wrap gap-5 items-start mt-2.5 w-full text-sm font-medium max-md:max-w-full">
              <div className="flex flex-col grow shrink justify-center min-w-[240px] w-[318px]">
                <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Invitee Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                  aria-label="Enter Invitee Name"
                />
              </div>
              <div className="flex flex-col grow shrink justify-center min-w-[240px] w-[318px]">
                <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Invitee Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                  aria-label="Enter Invitee Email"
                />
              </div>
              <br />
              <div className="flex flex-col grow shrink justify-center min-w-[240px] w-[318px]">
                <label className="gap-2.5 py-2.5 pr-2.5 w-full text-gray-800 whitespace-nowrap">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  placeholder="Select Invitee Role"
                  value={formData.role}
                  onChange={handleChange}
                  className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                  aria-label="Select Invitee Role"
                />
              </div>
            </div>
          </section>
          <div className="mt-8 w-full border border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
          <button
            type="submit"
            className="gap-2.5 self-stretch p-1 mt-8 max-w-full text-base font-semibold leading-loose text-black whitespace-nowrap bg-lime-400 rounded-xl w-[126px] hover:bg-lime-500"
            disabled={loading}
          >
            {loading ? "Sending..." : "Invite"}
          </button>
        </form>
      ) : (
        <main className="flex flex-col rounded-none mt-10">
          <header className="w-full min-h-0 border border-solid bg-neutral-100 border-neutral-100 max-md:max-w-full" />
          <section className="flex overflow-hidden flex-col mt-5 w-full min-h-[159px] max-md:max-w-full">
            <div className="flex flex-col justify-center items-start w-full max-md:max-w-full">
              <div className="flex gap-2.5 items-center">
                <h1 className="self-stretch my-auto text-xl font-medium text-black">
                  Bulk Add
                </h1>
              </div>
            </div>
            <form className="flex overflow-hidden flex-wrap gap-8 items-start mt-2.5 w-full text-sm font-medium max-md:max-w-full">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="gap-6 self-stretch px-6 pt-4 pb-4 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
              />
            </form>
          </section>
          <div className="mt-8 w-full border border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
          <button
            type="button"
            onClick={handleBulkInvite}
            className="gap-2.5 self-stretch p-1 mt-8 max-w-full text-base font-semibold leading-loose text-black whitespace-nowrap bg-lime-400 rounded-xl w-[126px] hover:bg-lime-500"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </main>
      )}
    </div>
  );
}

export default InviteForm;
