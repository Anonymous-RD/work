import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "../../redux/slices/fetchUserDetailsSlice";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.userDetails);

  // Fetch user details on component mount
  useEffect(() => {
    const token = "your-token-here"; // Replace with actual token
    dispatch(fetchUserDetails(token));
  }, [dispatch]);

  return (
    <div>
      <h1>User Details</h1>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Success State */}
      {data && (
        <div>
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Role:</strong> {data.role}
          </p>
          {/* Add more fields as per your response structure */}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
