import axios from "axios";

export const getAccessToken = async () => {
  let token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!token && refreshToken) {
    // gọi API refresh
    try {
      const res = await axios.post("/api/auth/refresh", { refreshToken });
      token = res.data.accessToken;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
    } catch (error) {
      console.error("Refresh token hết hạn", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    }
  }
  return token;
};
