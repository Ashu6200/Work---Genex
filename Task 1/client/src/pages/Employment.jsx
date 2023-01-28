import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EmploymentForm from "../components/EmploymentForm";
import EditEmploy from "../helper/EditEmploy";

const Employment = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/employs/all`);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);

  return (
    <Conatiner>
      <div className="wrapper">
        <div className="left">
          <EmploymentForm />
        </div>
        <div className="right">
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Joining Date</th>
                <th>Last Working Data</th>
                <th>File</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.company}</td>
                    <td>{Date(item.joiningDate)}</td>
                    <td>{Date(item.lastDate)}</td>
                    <td>
                      <img src={item.file} alt="product" />
                    </td>
                    <td>
                      <EditEmploy item={item} />
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </table>
        </div>
      </div>
    </Conatiner>
  );
};

export default Employment;

const Conatiner = styled.div`
  .wrapper {
    display: flex;
    .left {
      width: 30%;
    }
    .right {
      width: 70%;
      table {
        width: 100%;
        border-bottom: 1px solid #e5e5e5;
        border-top: 1px solid #e5e5e5;
        thead {
          tr {
            th {
              border-right: 1px solid #e5e5e5;
              justify-content: flex-start;
              text-align: start;
              width: 300px;
            }
          }
        }
        tbody {
          tr {
            td {
              border-right: 1px solid #e5e5e5;
              img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
              }
            }
          }
        }
      }
    }
  }
`;
