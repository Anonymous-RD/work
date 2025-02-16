export const Roles={
Public:"Public",
Role_Management:"Role_Management",
User_Management:"User_Management",
Question_Bank:"Question_Bank",
Workflow:"Workflow"
}

const httpStatus = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    CONFLICT:409
  };

  const sendResponse = (res,statusCode, message,data) => {
    return res.status(statusCode).json({
      status: statusCode,
      msg: message,
      data: data
    });
  };
export {httpStatus,sendResponse};