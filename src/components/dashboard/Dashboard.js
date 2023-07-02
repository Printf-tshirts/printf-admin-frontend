import React from "react";
import { Base } from "../../common/Base";
import { Card } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  let navigate = useNavigate();
  return (
    <>
      <Base>
        <h3>Dashboard Jai</h3>
        <hr />
        <div className="d-flex justify-content-evenly">
          <Card
            title="Products Page"
            onClick={() => {
              navigate("/products");
            }}
            style={{
              width: 300,
              cursor: "pointer",
            }}>
            <p>Manage Products</p>
            <p>Update Status of Products</p>
          </Card>
          <Card
            title="Orders Page"
            onClick={() => {
              navigate("/orders");
            }}
            style={{
              width: 300,
              cursor: "pointer",
            }}>
            <p>Manage Orders</p>
          </Card>
        </div>
      </Base>
    </>
  );
};
