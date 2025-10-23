export const APP_NAME = "OPVS";
export const APP_DESCRIPTION = "Online Presidential Voting System";

export const ELECTION_STATUS = {
  DRAFT: "draft",
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const USER_ROLES = {
  STUDENT: "student",
  ADMIN: "admin",
  SUPERADMIN: "superadmin",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  ELECTIONS: "/elections",
  NEWS: "/news",
  LEADERS: "/leaders",
  STUDENT_DASHBOARD: "/student/dashboard",
  ADMIN_DASHBOARD: "/admin",
  SUPERADMIN_DASHBOARD: "/superadmin",
} as const;
