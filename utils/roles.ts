import { USER_ROLES } from "./constants";

export function isStudent(role: string): boolean {
  return role === USER_ROLES.STUDENT;
}

export function isAdmin(role: string): boolean {
  return role === USER_ROLES.ADMIN;
}

export function isSuperAdmin(role: string): boolean {
  return role === USER_ROLES.SUPERADMIN;
}

export function hasAdminAccess(role: string): boolean {
  return role === USER_ROLES.ADMIN || role === USER_ROLES.SUPERADMIN;
}

export function hasSuperAdminAccess(role: string): boolean {
  return role === USER_ROLES.SUPERADMIN;
}
