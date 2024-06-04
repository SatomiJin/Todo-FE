import { persistor } from "./redux/store";

export const isJsonString = (data) => {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    return false;
  }
};

export const getBase64 = (file) => {
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  persistor.pause();
  persistor.flush().then(() => {
    return persistor.purge();
  });
};

export const formatGender = (gender) => {
  let genderUser = "";
  if (gender === "male") genderUser = "Nam";
  if (gender === "female") genderUser = "Nữ";
  if (gender === "other") genderUser = "Khác";
  return genderUser;
};

export const formatRole = (role) => {
  let roleUser = "";
  if (role === "R1") roleUser = "ADMIN";
  if (role === "R2") roleUser = "USER";
  return roleUser;
};
