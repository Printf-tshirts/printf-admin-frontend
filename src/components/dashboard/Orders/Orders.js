import React, { useEffect, useState } from "react";
import { Base } from "../../../common/Base";
import { getAllOrdersAPI } from "../../../api/orders/getAllOrders.api";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getAllOrdersAPI({ skip: 0, limit: 10 });
      setOrders(response.data?.orders);
      console.log(response.data?.orders);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const orderColumns = [
    {
      title: "Order Id",
      dataIndex: "handle",
      key: "handle",
    },
    {
      title: "Customer Email",
      key: "customerEmail",
      render: (text, record) => <span>{record.user.email}</span>,
    },
    {
      title: "Order Date",
      key: "orderDate",
      render: (text, record) => (
        <span>{new Date(record.createdAt).toDateString()}</span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => <span>{record.status}</span>,
    },
    {
      title: "Total",
      key: "total",
      render: (text, record) => <span>{record.cart.finalPrice}</span>,
    },
    {
      title: "Address",
      key: "address",
      render: (text, record) => <span>{record.address.name}</span>,
    },
  ];
  return (
    <>
      <Base>
        <h3>Orders</h3>
        <hr />
        <Table
          onRow={(record) => {
            return {
              style: { cursor: "pointer" },
              onClick: () => {
                navigate(`/orders/${record.handle}`);
              },
            };
          }}
          loading={loading}
          dataSource={orders}
          columns={orderColumns}
        />
      </Base>
    </>
  );
};
