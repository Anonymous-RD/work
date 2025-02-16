import React from "react";

const NotAuthorized = () => {
  return (
    <div>
      <h1>403 - Not Authorized</h1>
      <p>
        You do not have permission to access this page.
        <a href="https://auth-fln.apie.in/login">
          <button>Back to login</button>
        </a>
      </p>
    </div>
  );
};

export default NotAuthorized;
