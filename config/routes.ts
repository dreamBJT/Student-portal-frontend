export const routes = {
  home: "/",
  login: "/auth/login",
  elections: {
    list: "/elections",
    detail: (id: string) => `/elections/${id}`,
    results: (id: string) => `/elections/${id}/results`,
  },
  news: {
    list: "/news",
    detail: (id: string) => `/news/${id}`,
  },
  leaders: {
    list: "/leaders",
    detail: (id: string) => `/leaders/${id}`,
  },
  student: {
    dashboard: "/student/dashboard",
  },
  admin: {
    dashboard: "/admin",
  },
  superadmin: {
    dashboard: "/superadmin",
  },
};
