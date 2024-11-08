import { FaBars, FaMagnifyingGlass } from "react-icons/fa6";
import logo from "../assets/logo.svg";
import logoDark from "../assets/logo-dark.svg";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { IoSunnySharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

const StyledHeader = styled.header`
  position: fixed;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 60px;
  z-index: 1;

  .header-start {
    display: flex;

    svg {
      font-size: 20px;
      margin: 20px;
    }
    a {
      padding: 20px 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .header-center {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    input {
      display: none;
    }
    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
    }
  }
  .header-end {
    display: flex;
    margin-right: 20px;
    button {
      background: none;
      border: none;
      font-size: 20px;
      margin: 10px;
    }
  }
  /* 반응형 */
  @media screen and (min-width: 665px) {
    .header-center {
      justify-content: center;
      input {
        display: block;
        padding: 10px 20px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border: 1px solid #bbb;
        width: 30%;
        max-width: 500px;
      }
      button {
        border: 1px solid #bbb;
        border-left: none;
        padding: 10px 12px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
    }
  }
  @media screen and (min-width: 880px) {
    main aside {
      display: block;
    }
    main .main-content {
      padding-left: 55px;
    }
  }
  @media screen and (min-width: 1000px) {
    .header-center input {
      width: 90%;
    }
  }
`;

const Header = ({ onUpload, onSearch }) => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  // 처음 불러우는 시점 - 로그인 여부 체크
  const { theme, toggleTheme } = useTheme();
  const [keyword, setKeyword] = useState("");

  const login = () => {
    navigate("/login");
  };
  const search = (e) => {
    if (e.key === "Enter") {
      onSearch(keyword);
    }
  };
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return (
    <>
      <StyledHeader>
        <div className="header-start">
          <FaBars />
          <Link to={"/"}>
            <img src={theme === "light" ? logo : logoDark} />
          </Link>
        </div>
        <div className="header-center">
          <input
            type="text"
            placeholder="검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyUp={search}
          />
          <button
            type="button"
            onClick={() => {
              onSearch(keyword);
            }}
          >
            <FaMagnifyingGlass />
          </button>
        </div>
        <div className="header-end">
          {token === null ? (
            <button type="button" onClick={login}>
              로그인
            </button>
          ) : (
            <button type="button" onClick={logout}>
              로그아웃
            </button>
          )}
          <button type="button" onClick={open}>
            업로드
          </button>
          <button type="button" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <IoSunnySharp />}
          </button>
        </div>
      </StyledHeader>
      <Modal isOpen={isOpen} onClose={close} onUpload={onUpload} />
    </>
  );
};
export default Header;
