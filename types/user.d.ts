export interface User {
  username : string;
  password : string;
  name: string;
  studentId?: string;
  role: "students" | "admin" | "superAdmin";
  createdAt: string;
  updatedAt: string;
}
