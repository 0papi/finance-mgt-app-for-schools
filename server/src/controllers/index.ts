// auth route exports
export { default as Login } from "./auth.controller.login";
export { default as Register } from "./auth.controller.signup";
export { default as Logout } from "./auth.controller.logout";
export { default as LogoutAll } from "./auth.controller.logoutAll";
export { default as AccessToken } from "./auth.controller.accessToken";
export { default as RefreshToken } from "./auth.controller.refreshToken";

// student route exports
export { default as CreateStudent } from "./students/auth.controller.create";
export { default as GetAllStudents } from "./students/auth.controller.getAll";
export { default as GetSingleStudent } from "./students/auth.controller.getOne";
export { default as StudentWithPayments } from "./students/auth.controller.studentWithPayments";
export { default as UpdateSingleStudent } from "./students/auth.controller.updateSingleStudent";
export { default as DeleteSingleStudent } from "./students/auth.controller.deleteSingleStudent";

// student fee payment routes
export { default as PayStudentFee } from "./fees/auth.controller.studentFee";
