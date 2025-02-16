import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LuSearch } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { fetchBlogs, deleteBlog, updateBlog } from "../../api/api";
import Loader from "../../components/common/Loader";
import BlogRow from "../../components/common/BlogRow";
import { useHeader } from "../../components/context/HeaderContext";

const Blogs = () => {
  const { setTitle } = useHeader();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch blogs data on component mount
  useEffect(() => {
    setTitle("Blogs");
    const fetchData = async () => {
      try {
        const response = await fetchBlogs();
        const transformedData = response.data.map((blog) => ({
          id: blog._id,
          title: blog.title,
          status: blog.status === "Published",
          author: blog.authorId?.name || "Unknown",
          theme: blog.themes.map((theme) => theme.name).join(", "),
          publishDate: new Date(blog.createdAt).toLocaleDateString(),
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [data.length]);

  // Debounce search input
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [data, debouncedSearchTerm]);

  // Handlers
  const handleView = useCallback((blog) => {
    Swal.fire({
      title: "Blog Details",
      html: `
        <p><strong>Title:</strong> ${blog.title}</p>
        <p><strong>Status:</strong> ${blog.status ? "Published" : "Draft"}</p>
        <p><strong>Author:</strong> ${blog.author}</p>
        <p><strong>Theme:</strong> ${blog.theme}</p>
        <p><strong>Publish Date:</strong> ${blog.publishDate}</p>
      `,
      confirmButtonColor: "#003765",
    });
  }, []);

  const handleEdit = useCallback((blog) => {
    navigate("/editblogs", { state: { blogId: blog.id } });
  }, [navigate]);

  const handleDelete = useCallback((blogId) => {
    Swal.fire({
      title: "Are you sure you want to delete this blog?",
      showCancelButton: true,
      confirmButtonColor: "#FF0000",
      cancelButtonColor: "#003765",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteBlog(blogId);
          if (response.message== "Blog deleted successfully") {
            setData((prevData) => prevData.filter((blog) => blog.id !== blogId));
            Swal.fire("Deleted!", "The blog has been deleted.", "success");
          } else {
            Swal.fire(
              "Error",
              response.message || "Failed to delete the blog. Please try again.",
              "error"
            );
          }
        } catch (error) {
          console.error("Error deleting blog:", error);
          Swal.fire("Error", "Failed to delete the blog. Please try again.", "error");
        }
      }
    });
  }, []);

  // const toggleStatus = useCallback((id) => {
  //   setData((prevData) =>
  //     prevData.map((item) =>
  //       item.id === id ? { ...item, status: !item.status } : item
  //     )
  //   );
  // }, []);

  const toggleStatus = useCallback(
    async (id) => {
      // Optimistically update the UI
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: !item.status } : item
        )
      );
  
      try {
        // Find the item to be updated
        const updatedItem = data.find((item) => item.id === id);
        console.log(updatedItem);
        
        if (!updatedItem) return;
  
        // Map boolean status to string values
        const updatedStatus = !updatedItem.status ?"Published" : "Draft";
        console.log(updatedStatus);
        
        const formData = { ...updatedItem, status: updatedStatus };
  
        // Make the API call
        await updateBlog(id, formData);
  
        // Optionally log or handle success response
        console.log("Status updated successfully!");
      } catch (error) {
        console.error("Error updating blog status:", error);
  
        // Revert the change if the API call fails
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, status: !item.status } : item
          )
        );
  
        Swal.fire("Error", "Failed to update the status. Please try again.", "error");
      }
    },
    [data]
  );

  return (
    <div className="p-4 pt-20 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search for Blogs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pl-10 border border-gray-300 w-full rounded-xl bg-[#F8F8F8]"
          />
          <LuSearch className="absolute h-[16px] w-[16px] left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>
        <button onClick={()=> {navigate('/addblogs')}} className="text-white bg-[#003765] px-4 py-2 rounded-xl flex items-center gap-2.5">
          <FaPlus /> Add
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="relative overflow-x-auto overflow-y-auto rounded-lg">
          <table className="table-auto w-full border-spacing-0">
            <thead className="text-[#929EAE] sticky top-0 z-0">
              <tr className="uppercase text-sm leading-normal font-medium">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-left">Author</th>
                <th className="px-4 py-2 text-left">Theme</th>
                <th className="px-4 py-2 text-left">Publish Date</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <BlogRow
                  key={item.id}
                  item={item}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleStatus={toggleStatus}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Blogs;