/*
    Context: 문맥이라는 뜻. 리액트에서 같은 문맥 아래에 있는 컴포넌트 그룹에 데이터를 공급하는 기능. Context를 이용하면 props를 전달하지 않고도 컴포넌트 전역에 데이터를 공급할 수 있다.

    ContextAPI : Context를 만들고 다루는 리액트 기능
*/
import { createContext, useState, useContext } from "react";

// 1. 새로운 Context 생성
const AuthContext = createContext();

// 2. Context.Provider 기능을 사용해야 한다.
// Provider를 통해 로그인 상태와 로그인/로그아웃 기능 제공
export const AuthProvider = ({ children }) => {
  // 로그인 상태 - token 유무 확인
  const [token, setToken] = useState(localStorage.getItem("token")); // useState(초기값에서 토큰찾음)
  const [id, setId] = useState(localStorage.getItem("id"));

  // 로그인 기능
  const login = (data) => {
    // 파라미터로 토큰 받음
    console.log("로그인 토큰" + localStorage.getItem("token"));
    console.log("받은 데이터" + data);
    console.log("데이터 뭐임?" + data.id);
    console.log("토큰 뭐노 = " + data.token);
    // 문제점 - 구글로그인으로 id랑 token 두개 받아오는 과정에서 id 받는 부분이 누락
    // token은 data형태로 들어오는중

    localStorage.setItem("token", data);
    localStorage.setItem("id", data.id);
    setToken(data.token);
    setId(data.id);
    // 새로고침하면 set날라가서 locatStorage에 담아놔야함
  };
  // 로그아웃 기능
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setToken(null);
    setId(null);
  };

  return (
    <AuthContext.Provider value={{ id, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Context의 상태와 기능을 쉽게 사용할 수 있도록 커스텀 훅 만들기
export const useAuth = () => useContext(AuthContext);
