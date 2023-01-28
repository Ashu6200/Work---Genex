import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewForm from "../components/NewForm";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/form/all`);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  });

  return (
    <Wrapper>
      <div className="container">
        <NewForm />
        <table>
          <thead>
            <tr>
              <th>Aadhar Card</th>
              <th>Aadhar Card Picture</th>
            </tr>
          </thead>
          <tbody>
            <>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.aadharcard}</td>
                  <td>
                    <img src={item.aadharcardfile} alt="product" />
                  </td>
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Home;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    display: flex;
    justify-content: space-between;
    table {
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;
      thead {
        tr {
          th {
            justify-content: flex-start;
            text-align: start;
            width: 300px;
          }
        }
      }
      tbody {
        tr {
          td {
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
`;
