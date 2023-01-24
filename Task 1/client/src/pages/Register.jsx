import React, { useState } from "react";
import styled from "styled-components";
import { MdEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../store/ApiCalls";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [country, setCountry] = useState();

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      toast.error("Password does not match");
      return;
    }
    try {
      signup(dispatch, {
        firstname,
        lastname,
        email,
        password,
        gender,
        country,
      });
      toast.success("Successfully registered");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed, please try again");
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <div className="box">
          <p>
            Responsive Registration
            <br />
            Form
          </p>
          <form onSubmit={registerHandler}>
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
            <div className="first">
              <div className="icons">
                <AiFillLock />
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Re-type Password"
                  required
                  onChange={(e) => setRetypePassword(e.target.value)}
                />
              </div>
            </div>
            <div className="second">
              <div className="firstinside">
                <div className="icons">
                  <FaUser />
                </div>
                <div className="input">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
              </div>
              <div className="firstinside">
                <div className="icons">
                  <FaUser />
                </div>
                <div className="input">
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="third">
              <div className="thirdinside">
                <input
                  type="radio"
                  label="Male"
                  onChange={() => setGender("Male")}
                  checked={gender === "Male"}
                />
                <span>Male</span>
              </div>
              <div className="thirdinside">
                <input
                  type="radio"
                  label="Female"
                  onChange={() => setGender("Female")}
                  checked={gender === "Female"}
                />
                <span>Female</span>
              </div>
            </div>
            <div className="fourth">
              <select onChange={(e) => setCountry(e.target.value)}>
                <option>Select a country</option>
                {countries.map((country, index) => (
                  <option key={index} style={{ color: "black" }}>
                    {country.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="five">
              <div className="fiveinside">
                <input type="checkbox" />
                <span>I agree with terms and conditions</span>
              </div>
              <div className="fiveinside">
                <input type="checkbox" />
                <span>I want to receive the newsletter</span>
              </div>
            </div>
            <div className="six">
              <button> Register</button>
            </div>
          </form>
          <Link
            to="/login"
            style={{
              paddingTop: "15px",
              textDecoration: "none",
              color: "black",
            }}
          >
            "Already have an account? Login"
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;

const countries = [
  {
    country: "United States",
  },
  {
    country: "India",
  },
  {
    country: "England",
  },
  {
    country: "Canada",
  },
  {
    country: "China",
  },
  {
    country: "Japan",
  },
];
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
        .second {
          display: flex;
          justify-content: space-between;
          .firstinside {
            width: 45%;
            display: flex;
            gap: 5px;
            height: 30px;
            border: 1px solid gray;
            .icons {
              padding: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-right: 1px solid gray;
            }
            .input {
              width: 80%;
              input {
                width: 100%;
                border: none;
                outline: none;
              }
            }
          }
        }
        .third {
          display: flex;
          gap: 20px;
          font-size: 14px;
          .thirdinside {
          }
        }
        .fourth {
          select {
            width: 100%;
            padding: 6px;
            outline: none;
          }
        }
        .five {
          .fiveinside {
            span {
              font-size: 14px;
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
