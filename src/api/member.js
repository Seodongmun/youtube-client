import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/member/",
});

export const signup = async (data) => {
  // 인스턴스는 타입따라 작성 ( json 방식의 body방식으로 보낼시 , data)
  return await instance.post("signup", data);
};

export const login = async (data) => {
  try {
    return await instance.post("login", data);
  } catch {
    new Error("LOGIN FAIL");
  }
};
