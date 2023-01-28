import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../store/userReducer";

const Header = () => {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("You have logged out");
  };
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [navigate, user]);
  return (
    <Wrapper>
      <div className="header-left">
        <div className="header-left-bar">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <span className="header-text">Adhard Card</span>
          </Link>
          <Link to="/employment" style={{ textDecoration: "none", color: "black" }}>
            <span className="header-text">Employment</span>
          </Link>
        </div>
      </div>
      <div className="header-right">
        <h4>You have successfullu logged In {user?.other?.firstname}</h4>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  height: 80px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  gap: 15px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
  .header-left {
    display: flex;
    gap: 3px;
    font-size: 15px;
    font-weight: 700;
    font-family: Arial, Helvetica, sans-serif;
    padding-left: 20px;
    gap: 10px;
    img {
      width: 50px;
      justify-content: center;
      align-items: center;
      padding-right: 10px;
    }
    .header-left-bar {
      display: flex;
      gap: 15px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .header-text {
        & :hover {
          background-color: black;
          color: white;
        }
      }
    }
    span {
    }
  }
  .header-center {
    display: flex;
    align-items: center;
    width: 60%;
    input {
      background-color: #cfd2cf;
      border-radius: 0 40px 40px 0;
      display: flex;
      width: 100%;
      height: 50px;
      border: none;
      outline: none;
    }
    .searchBar {
      display: flex;
      background-color: #cfd2cf;
      height: 52px;
      align-items: center;
      justify-content: center;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 40px 0 0 40px;
      font-size: 25px;
      font-weight: 800;
    }
  }
  .header-right {
    font-size: 30px;
    font-weight: bolder;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;
