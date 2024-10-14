import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// 페이징처리값도 받는중
export const getVideos = async (page, keyword = "") => {
  return await instance.get("video", {
    params: {
      page,
      keyword,
    },
  });
};

export const addVideo = async (data) => {
  return await instance.post("video", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getVideo = async (videoCode) => {
  return await instance.get(`video/${videoCode}`);
};
