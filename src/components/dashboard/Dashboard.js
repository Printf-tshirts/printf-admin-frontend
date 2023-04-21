import React from "react";
import { Base } from "../../common/Base";
import { Card } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { currentUser } = useAuth();
  let navigate = useNavigate();
  return (
    <>
      <Base container={false}>
        <div className="m-5">
          <p>Hello {currentUser.name}!</p>
          <Card
            title="Products Page"
            onClick={() => {
              navigate("/products");
            }}
            style={{
              width: 300,
              cursor: "pointer",
            }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </Base>
    </>
  );
};
