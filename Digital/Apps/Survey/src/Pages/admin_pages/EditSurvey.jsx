import { useEffect, useState } from "react";
// import FormBuilderComponent from "./FormBuilderComponent";
import { useNavigate, useParams } from "react-router-dom";
// import { fetchSurveyById, updateSurveyById } from "@/api/api";

export const EditSurvey = () => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   name: "Survey 1",
  //   status: "Draft",
  //   submissions: 20,
  //   formBuilderData: {
  //     components: [
  //       {
  //         type: "textfield",
  //         key: "firstName",
  //         label: "First Name",
  //         input: true,
  //         validate: { required: true },
  //       },
  //       {
  //         type: "textfield",
  //         key: "lastName",
  //         label: "Last Name",
  //         input: true,
  //       },
  //       {
  //         type: "email",
  //         key: "email",
  //         label: "Email Address",
  //         input: true,
  //         validate: { required: true },
  //       },
  //     ],
  //   },
  // });
  // useEffect(() => {
  //    const fetchSurvey = async () => {
  //     try {
  //       const response = await fetchSurveyById(id);
  //       setFormData(response);
  //     } catch (error) {
  //       console.error("Error fetching survey:", error);
  //     }
  //   };
  //   fetchSurvey();
  // }, [id]);
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  // const handleFormBuilderChange = (data) => {
  //   setFormData({ ...formData, formBuilderData: data });
  // };
  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await updateSurveyById(id, formData);
  //     console.log("Update response:", response);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error creating survey:", error);
  //   }
  // };
  // return (
  //   <div className="container mx-auto p-4">
  //     <h1 className="text-xl font-bold mb-4">Edit Survey</h1>
  //     <form onSubmit={handleSubmit} className="space-y-4">
  //       <div>
  //         <label className="block mb-2">Survey Name</label>
  //         <input
  //           type="text"
  //           name="name"
  //           value={formData.name}
  //           onChange={handleChange}
  //           className="border p-2 w-full"
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label className="block mb-2">Status</label>
  //         <select
  //           name="status"
  //           value={formData.status}
  //           onChange={handleChange}
  //           className="border p-2 w-full"
  //         >
  //           <option value="Draft">Draft</option>
  //           <option value="Published">Published</option>
  //           <option value="Closed">Closed</option>
  //         </select>
  //       </div>
  //       <div>
  //         <FormBuilderComponent
  //           data={formData.formBuilderData}
  //           onChange={handleFormBuilderChange}
  //         readOnly={false}
  //         />
  //       </div>
  //       <button
  //         type="submit"
  //         className="bg-blue-500 text-white px-4 py-2 rounded"
  //       >
  //         Update Survey
  //       </button>
  //     </form>
  //   </div>
  // );
};
