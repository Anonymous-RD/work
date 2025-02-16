import * as React from "react";
import { DateInput } from "@/components/admin/DateInput";
import { FormInput } from "@/components/admin/FormInput";
import { SelectInput } from "@/components/admin/SelectInput";
import { usePageMetadata } from "@/context/PageMetadataContext";
import { useEffect } from "react";
import { useState } from "react";

export function AddTeacher() {
  const { setMetadata } = usePageMetadata();
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [file, setFile] = useState(null);

  useEffect(() => {
    setMetadata({
      title: "Add Teacher",
      backPath: "/teachers",
    });
  }, [setMetadata]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    // alert("Teacher Added Successfully");
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

      const usersWithFirebaseUIDs = [];

      try {
        for (const user of users) {
          const { email, name, role } = user;

          if (!email || !name || !role) {
            console.error("Invalid user data:", user);
            continue;
          }

          // Create user in Firebase
          const tempPassword = "Temp@12345"; // Temporary password
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            tempPassword
          );

          // Get Firebase UID
          const firebaseUID = userCredential.user.uid;

          // Send password reset email
          await sendPasswordResetEmail(auth, email);

          // Add Firebase UID to user data
          usersWithFirebaseUIDs.push({ ...user, firebaseUID });

          console.log("Bulk user created in Firebase:", user);
        }

        // Send bulk user data with Firebase UIDs to backend API
        await axios.post(
          "https://us-central1-firecmsdemo.cloudfunctions.net/userinvitation/bulkinvite",
          usersWithFirebaseUIDs
        );

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

  const svgs = {
    upload: (
      <svg
        width="50"
        height="41"
        viewBox="0 0 50 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.0675 18.0675C5.515 19.5975 4.75 21.4425 4.75 23.625C4.75 25.8075 5.515 27.6525 7.0675 29.25C8.5975 30.735 10.4425 31.5 12.625 31.5H27.4525C27.34 32.2425 27.25 32.985 27.25 33.75C27.25 34.515 27.34 35.2575 27.4525 36H12.625C9.25 36 6.3025 34.875 3.8725 32.4675C1.465 30.105 0.25 27.2025 0.25 23.805C0.25 20.88 1.1275 18.27 2.8825 15.975C4.6375 13.68 7 12.2175 9.8125 11.5875C10.7575 8.145 12.625 5.355 15.4375 3.2175C18.25 1.08 21.445 0 25 0C29.3875 0 33.1 1.53 36.16 4.59C39.22 7.65 40.75 11.3625 40.75 15.75C43.3375 16.0425 45.475 17.1675 47.185 19.125C48.3325 20.4075 49.075 21.8475 49.435 23.445C47.095 21.465 44.125 20.25 40.75 20.25C40.5025 20.25 40.2775 20.25 40.03 20.25C39.895 20.25 39.76 20.25 39.625 20.25H36.25V15.75C36.25 12.645 35.125 9.99 32.965 7.785C30.76 5.625 28.105 4.5 25 4.5C21.895 4.5 19.24 5.625 17.035 7.785C14.875 9.99 13.75 12.645 13.75 15.75H12.625C10.4425 15.75 8.5975 16.515 7.0675 18.0675ZM34 31.5H38.5V40.5H43V31.5H47.5L40.75 24.75L34 31.5Z"
          fill="black"
        />
      </svg>
    ),
  };

  return (
    <div>
      <div className="flex flex-col border-t-2 mt-6 ml-4 border-solid border-neutral-100 w-full min-h-[409px] max-lg:max-w-full">
        <div className="flex flex-col justify-center items-start w-full max-lg:max-w-full">
          <div className="flex gap-2.5 mt-9 items-center">
            <div className="self-stretch my-auto text-xl font-medium text-black">
              Bulk Add
            </div>

            <div
              className={`flex items-center justify-center w-16 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
                toggle ? "bg-[#C8EE48]" : "bg-[#EFEFEF]"
              }`}
              onClick={() => setToggle(!toggle)}
            >
              <div
                className={`w-6 h-6  rounded-full shadow-md transform transition-transform duration-300 ${
                  toggle
                    ? "translate-x-4 bg-white "
                    : "-translate-x-4 bg-[#DBDBDB]"
                }`}
              />
            </div>
          </div>
        </div>

        {!toggle ? (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex gap-8  items-start text-sm font-medium">
              <div className="flex flex-col w-[196px] ">
                <label
                  htmlFor="profilePhoto"
                  className="gap-2.5 py-2.5 pr-2.5 mt-3 max-w-full text-gray-800 w-[196px]"
                >
                  Profile Photo
                </label>

                <div className="flex flex-col px-5 pt-3 pb-4 w-full text-black rounded-xl border border-dashed border-neutral-100 max-w-[195px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5e5f42a1c31b86264edf580a7885ccfdfc1a5340dbeb5172df93580f12f1445?placeholderIfAbsent=true&apiKey=02f8bda3ced146de8099a5d68f47efac"
                    alt=""
                    className="object-contain self-center aspect-square w-[54px]"
                  />
                  <div className="self-center text-center">
                    Drag and drop your file
                  </div>
                  <div className="mt-3 text-center">Or</div>
                  <button
                    className="gap-2.5 py-3.5 mt-3 ml-5 w-28 whitespace-nowrap bg-lime-300 rounded-xl min-h-[42px] max-md:px-5"
                    onClick={() =>
                      document.getElementById("profilePhoto").click()
                    }
                  >
                    Browse File
                  </button>
                  <input
                    type="file"
                    id="profilePhoto"
                    className="sr-only"
                    accept="image/*"
                    aria-label="Upload profile photo"
                    //  onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="mt-5 ml-4 bg-white">
                <div className="grid grid-cols-5 gap-10">
                  <div className="col-span-2">
                    <label className="gap-2.5 pr-2.5 w-full text-black font-medium whitespace-nowrap tracking-widess">
                      Teacher Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Teacher Name"
                      // value={formData.name}
                      // onChange={handleChange}
                      className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                      aria-label="Enter Sectio
                 n Name"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="gap-2.5 pr-2.5 w-full  text-black font-medium whitespace-nowrap tracking-widess">
                      Email
                    </label>
                    <input
                      type="email"
                      name="name"
                      placeholder="Enter Email"
                      // value={formData.name}
                      // onChange={handleChange}
                      className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                      aria-label="Select Class"
                    />
                  </div>

                  <div className="col-span-2 row-start-2">
                    <label className="gap-2.5 pr-2.5 w-full  text-black font-medium whitespace-nowrap tracking-widess">
                      Subject
                    </label>
                    <select
                      type="text"
                      name="name"
                      placeholder="Select Class"
                      // value={formData.name}
                      // onChange={handleChange}
                      className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                      aria-label="Select Class"
                    >
                      <option value="Select Subject">Select Subject</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="gap-2.5  pr-2.5 w-full text-black font-medium whitespace-nowrap ">
                      Date Of Joining
                    </label>
                    <input
                      type="date"
                      name="name"
                      placeholder="Enter Phone No."
                      // value={formData.name}
                      // onChange={handleChange}
                      className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                      aria-label="Enter Section Code"
                    />
                  </div>

                  <div className="col-span-2 row-start-3">
                    <label className="gap-2.5  pr-2.5 w-full text-black font-medium whitespace-nowrap ">
                      Phone No.
                    </label>
                    <input
                      type="tel"
                      name="name"
                      placeholder="Enter Phone No."
                      // value={formData.name}
                      // onChange={handleChange}
                      className="gap-6 self-stretch mt-2 px-6 py-3.5 w-full text-gray-500 rounded-xl border border-solid border-neutral-100 max-md:px-5"
                      aria-label="Enter Section Code"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" w-full mt-10 border border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
            <button
              type="submit"
              className="gap-2.5 self-stretch p-3.5 w-60 mt-8 max-w-full font-[600] leading-loose text-black whitespace-nowrap bg-[#C8EE44] rounded-xl hover:bg-lime-500"
              disabled={loading}
            >
              {loading ? "Sending..." : "Add"}
            </button>
          </form>
        ) : (
          <main className="flex flex-col rounded-none ">
            <header className="w-full min-h-0 mt-8 border border-solid bg-neutral-100 border-neutral-100 max-md:max-w-full" />
            <section className="flex overflow-hidden flex-col mt-5 w-full min-h-[159px] max-md:max-w-full">
              <div className="flex flex-col items-center gap-2 text-sm">
                {svgs.upload}
                <h3 className="text-center font-semibold">
                  Please upload csv file to
                  <br />
                  import data in bulk
                </h3>

                <div className="flex flex-col items-center space-x-4">
                  <label className="relative cursor-pointer bg-[#C8EE44] text-black rounded-xl px-12 text-sm py-3 font-semibold hover:bg-lime-500 ">
                    Browse File
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  <span className="text-gray-500 text-sm mt-1 pr-3">
                    No file selected
                  </span>
                </div>
                <button className="underline font-semibold mt-10">
                  Click here to download sample csv file
                </button>
              </div>
              <div className="mt-8 w-full border border-solid bg-neutral-100 border-neutral-100 min-h-[1px] max-md:max-w-full" />
              <button
                type="button"
                onClick={handleBulkInvite}
                className="gap-2.5 self-stretch p-3.5 w-60 mt-8 max-w-full text-base font-semibold leading-loose text-black whitespace-nowrap bg-[#C8EE44] rounded-xl hover:bg-lime-500"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </section>
          </main>
        )}
      </div>
    </div>
  );
}
