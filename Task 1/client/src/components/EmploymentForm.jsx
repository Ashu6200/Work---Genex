import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { styled as s } from "@mui/material/styles";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillFileAdd } from "react-icons/ai";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firbase";
import { toast } from "react-toastify";
import axios from "axios";

const EmploymentForm = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [joiningDate, setJoiningDate] = useState(new Date());
  const [lastDate, setLastDate] = useState(new Date());
  const [company, setCompany] = useState("");
  const [file, setFile] = useState(null);
  const [imagePre, setImagePre] = useState(null);
  const contentHandler = () => {
    if (imagePre !== null) {
      setImagePre(null);
    }
  };

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
            .post("http://localhost:5000/api/employs/addemployment", {
              company,
              joiningDate,
              lastDate,
              file: downloadURL,
            })
            .then((response) => {
              setFile(null);
              setCompany("");
              toast.success("Successfully Add");
            });
        });
      }
    );
  };
  return (
    <div>
      <button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          outline: "none",
          borderRadius: "20px",
          height: "40px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          fontWeight: "bold",
        }}
      >
        Add Employment Document
      </button>
      <BootstrapDialog onClose={handleClose} open={open}>
        <Wrapper>
          <div className="container">
            <div className="box">
              <h2>Employment</h2>
            </div>
            <form className="form">
              <div className="upper">
                <div className="fields">
                  <label>Company Name</label>
                  <input
                    type="text"
                    onChange={(e) => setCompany(e.target.value)}
                  ></input>
                </div>
                <div className="fields">
                  <label>Joining Date</label>
                  <DatePicker
                    selected={joiningDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setJoiningDate(date)}
                  />
                </div>
                <div className="fields">
                  <label>Last Working Date</label>
                  <DatePicker
                    selected={lastDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setLastDate(date)}
                  />
                </div>
              </div>
              <div className="middel">
                {imagePre !== null ? (
                  <>
                    <img
                      src={imagePre}
                      style={{
                        width: "60%",
                        height: "150px",
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
                      <AiFillFileAdd /> Upload File
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
              </div>
              <div className="bottom">
                <button onClick={formHanlder}>Submit </button>
              </div>
            </form>
          </div>
        </Wrapper>
      </BootstrapDialog>
    </div>
  );
};

export default EmploymentForm;
const BootstrapDialog = s(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "100%",
    maxWidth: "auto",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "900px",
    height: "400px",
    maxWidth: "100%",
    borderRadius: "30px",
    overFlowX: "hidden",
  },
}));

const Wrapper = styled.div`
  .container {
    padding: 30px;
    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .upper {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .fields {
          display: flex;
          flex-direction: column;
        }
      }
      .middel {
        display: flex;
        justify-content: center;
        align-items: center;
        .first {
          width: 100%;
          justify-content: space-around;
          display: flex;
          gap: 5px;
          height: 30px;
          .icons {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .input {
            input {
              width: 99%;
              border: none;
              outline: none;
            }
          }
        }
      }
      .bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        button {
          width: 80px;
          height: 40px;
          border-radius: 20px;
          outline: none;
          border: none;
          background-color: red;
          font-weight: 600;
          color: white;
        }
      }
    }
  }
`;
