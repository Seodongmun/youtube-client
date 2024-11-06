import axios from "axios";

const authorize = axios.create({
  baseURL: "http://localhost:8080/api/private/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const viewComments = async (videoCode) => {
  return await instance.get(`video/${videoCode}/comment`);
};

// "http://localhost:8080/api/private/comment"
export const addComment = async (data) => {
  return await authorize.post("comment", data);
};

export const updateComment = async (data) => {
  return await authorize.put("comment", data);
};

export const deleteComment = async (commentCode) => {
  return await authorize.delete(`comment/${commentCode}`);
};
