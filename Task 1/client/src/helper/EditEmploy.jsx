import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillFileAdd } from "react-icons/ai";
import { Dialog } from "@mui/material";
import { styled as s } from "@mui/material/styles";
import styled from "styled-components";

const EditEmploy = ({ item }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [joiningDate, setJoiningDate] = useState(new Date(item.joiningDate));
  const [lastDate, setLastDate] = useState(new Date(item.lastDate));
  const [company, setCompany] = useState(item.company);
  const [file, setFile] = useState(item.file);
  const [imagePre, setImagePre] = useState(null);
  const editHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("/api/blogs/update", {
        _id: item._id,
        company,
        joiningDate,
        lastDate,
        file,
      });

      console.log(data);
      toast.success("You have successfully updated the blog!");
    } catch (err) {
      toast.error("Updated failed, please try again!");
    }
  };
  const contentHandler = () => {
    if (imagePre !== null) {
      setImagePre(null);
    }
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
        Edit Employment Document
      </button>
      <BootstrapDialog onClose={handleClose} open={open}>
        <Wrapper>
          <div className="container">
            <div className="box">
              <h2> Edit Employment</h2>
            </div>
            <form className="form">
              <div className="upper">
                <div className="fields">
                  <label>Company Name</label>
                  <input
                    type="text"
                    onChange={(e) => setCompany(e.target.value)}
                    value={company}
                  />
                </div>
                <div className="fields">
                  <label>Joining Date</label>
                  <DatePicker
                    selected={joiningDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setJoiningDate(date)}
                    value={joiningDate}
                  />
                </div>
                <div className="fields">
                  <label>Last Working Date</label>
                  <DatePicker
                    selected={lastDate}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setLastDate(date)}
                    value={lastDate}
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
                <button onClick={editHandler}>Update </button>
              </div>
            </form>
          </div>
        </Wrapper>
      </BootstrapDialog>
    </div>
  );
};

export default EditEmploy;

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
