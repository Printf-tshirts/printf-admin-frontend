import React from "react";
import { Base } from "../../common/Base";
import { Card } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  return (
    <>
      <Base container={false}>
        <div className="m-5">
          <p>Hello {currentUser.name}!</p>
          <Card
            title="Products Page"
            onClick={() => {
              history.push("/products");
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
