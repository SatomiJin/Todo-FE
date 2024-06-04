import axios from "axios";

export const createTodo = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_URL}/todo/create-todo`, data, {
    headers: {
      token: `Bearer ${data.token}`,
      email: data.email,
    },
  });
  return res.data;
};

export const getTodoByUser = async (data) => {
  let res = await axios.get(`${process.env.REACT_APP_API_URL}/todo/get-all-todo-user`, {
    headers: {
      token: `Bearer ${data.token}`,
      email: data.email,
    },
  });
  return res.data;
};

export const deleteTodoById = async (data) => {
  let res = await axios.delete(`${process.env.REACT_APP_API_URL}/todo/delete-todo-by-id`, {
    headers: {
      token: `Bearer ${data.token}`,
      email: data.email,
      id: data.id,
    },
  });

  return res.data;
};

export const updateTodo = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_URL}/todo/update-todo`, data, {
    headers: {
      token: `Bearer ${data.token}`,
      email: data.email,
    },
  });
  return res.data;
};

export const getTodoById = async (data) => {
  let res = await axios.get(`${process.env.REACT_APP_API_URL}/todo/get-todo-by-id`, {
    headers: {
      token: `Bearer ${data.token}`,
      email: data.email,
      id: data.id,
    },
  });
  return res.data;
};

export const confirmTodo = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_URL}/todo/confirm-todo-user`, data, {
    headers: {
      token: `Bearer ${data.token}`,
      email: data.email,
      id: data.id,
    },
  });
  return res.data;
};

export const getCountTodo = async (data) => {
  let res = await axios.get(`${process.env.REACT_APP_API_URL}/todo/count-todo`, {
    headers: {
      email: data.email,
      token: `Bearer ${data.token}`,
    },
  });
  return res.data;
};
