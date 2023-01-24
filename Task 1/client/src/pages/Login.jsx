import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/ApiCalls";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.user);
  const user = userdetails.user;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <Wrapper>
      <div className="container">
        <div className="box">
          <p>
            Responsive Login
            <br />
            Form
          </p>
          <form onSubmit={loginHandler}>
            <div className="first">
              <div className="icons">
                <MdEmail />
              </div>
              <div className="input">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="first">
              <div className="icons">
                <AiFillLock />
              </div>
              <div className="input">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="six">
              <button>Login</button>
            </div>
          </form>
          <Link
            to="/register"
            style={{
              paddingTop: "15px",
              textDecoration: "none",
              color: "black",
            }}
          >
            "If you don't have a account? Register"
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
const Wrapper = styled.div`
  background-color: #eeeeee;
  .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
      font-weight: 600;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-top: 4px solid #ffc93c;
      padding: 30px;
      p {
        margin: 0;
        font-weight: 700;
        font-size: 30px;
        justify-content: center;
        display: flex;
        text-align: center;
      }
      form {
        margin-top: 20px;
        width: 400px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        .first {
          display: flex;
          gap: 5px;
          height: 30px;
          border: 1px solid gray;
          .icons {
            width: 7%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid gray;
          }
          .input {
            width: 92%;
            input {
              width: 99%;
              border: none;
              outline: none;
            }
          }
        }
        .six {
          button {
            font-weight: 600;
            background-color: #ffc93c;
            color: white;
            padding: 7px;
            width: 100%;
            border: none;
            outline: none;
          }
        }
      }
    }
  }
`;
