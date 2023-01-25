import React, { useState } from "react";
import styled from "styled-components";
import { AiFillIdcard, AiFillFileAdd } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firbase";

const Form = () => {
  const [aadharcard, setaadharcard] = useState("");
  const [file, setFile] = useState(null);
  const [imagePre, setImagePre] = useState(null);
  const formHanlder = async (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage, `intership/${fileName}`);
    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios
            .post("http://localhost:5000/api/form/add", {
              aadharcard,
              aadharcardfile: downloadURL,
            })
            .then((response) => {
              setFile(null);
              setaadharcard('');
              toast.success("Successfully Add");
            });
        });
      }
    );
  };
  const contentHandler = () => {
    if (imagePre !== null) {
      setImagePre(null);
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <div className="box">
          <p>Responsive Add Documents</p>
          <form onSubmit={formHanlder}>
            <div className="first">
              <div className="icons">
                <AiFillIdcard />
              </div>
              <div className="input">
                <input
                  type='text'
                  placeholder="Aadhar Card Number"
                  required
                  onChange={(e) => setaadharcard(e.target.value)}
                />
              </div>
            </div>

            {imagePre !== null ? (
              <>
                <img
                  src={imagePre}
                  style={{
                    width: "90%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                  alt=""
                />
                <button onClick={contentHandler}>Remove</button>
              </>
            ) : (
              <div className="first">
                <div className="icons">
                  <AiFillFileAdd />
                </div>
                <div className="input">
                  <input
                    type="file"
                    placeholder="File"
                    required
                    onChange={(e) => [
                      setFile(e.target.files[0]),
                      setImagePre(URL.createObjectURL(e.target.files[0])),
                    ]}
                  />
                </div>
              </div>
            )}

            <div className="six">
              <button>Add</button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Form;

const Wrapper = styled.div`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
      font-weight: 600;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
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
