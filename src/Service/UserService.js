import axios from "axios";

export const axiosJWT = axios.create();

export const signUp = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data);
  return res.data;
};

export const signIn = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);

  return res.data;
};

export const getDetailUser = async (data) => {
  let res = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-detail-user`, {
    headers: {
      token: `Bearer ${data.access_token}`,
      email: data.email,
    },
  });
  return res.data;
};

export const refreshToken = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
    headers: {
      email: data.email,
      token: data.refresh_token,
    },
  });
  return res.data;
};

export const updateUserInfo = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_URL}/user/update-info-user`, data, {
    headers: {
      email: data.email1,
      token: `Bearer ${data.token}`,
    },
  });

  return res.data;
};

export const getCountUser = async (data) => {
  let res = await axios(`${process.env.REACT_APP_API_URL}/user/count-user`, {
    headers: {
      token: `Bearer ${data.token}`,
      email: data.email,
    },
  });
  return res.data;
};

export const getAllUser = async (data) => {
  let res = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-all-user`, {
    headers: {
      token: `Bearer ${data.token}`,
    },
  });
  return res.data;
};

export const deleteUserById = async (data) => {
  let res = await axios.delete(`${process.env.REACT_APP_API_URL}/user/delete-user-by-id`, {
    headers: {
      token: `Bearer ${data.token}`,
      email1: data.email1,
      email: data.email,
      id: data.id,
    },
  });
  return res.data;
};
