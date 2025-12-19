// src/pages/LandingPage/hooks/useUserAuth.ts
import useUserStore from "@/store/userStore/userStore";

export const useUserAuth = () => {
  const { authUser, clearAuth } = useUserStore();
  const isLoggedIn = !!authUser;
  const displayName =
    authUser?.first_name || authUser?.email?.split("@")[0] || "کاربر";

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userData");
  };

  return {
    authUser,
    isLoggedIn,
    displayName,
    handleLogout,
  };
};