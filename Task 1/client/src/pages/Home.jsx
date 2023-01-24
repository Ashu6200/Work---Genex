import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { logout } from "../store/userReducer";

const Home = () => {
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
      <div>
        <h1>You have successfullu logged In {user?.other?.firstname}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Wrapper>
  );
};

export default Home;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    background-color: red;
  }
`;
