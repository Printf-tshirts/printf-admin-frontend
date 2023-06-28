import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderByHandleAPI } from "../../../api/orders/getOrderByHandle.api";
import { Base } from "../../../common/Base";
import { Card, Table } from "antd";

export const SingleOrder = () => {
  let { orderHandle } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSingleOrder();
  }, [orderHandle]);
  const fetchSingleOrder = async () => {
    setLoading(true);
    const response = await getOrderByHandleAPI({ handle: orderHandle });
    console.log(response.data);
    setOrder(response.data?.order);
    setLoading(false);
  };
  const columns = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
      render: (title, record) => (
        <span>
          <img
            alt={title}
            src={record.product.images[0].src}
            style={{ height: "80px", objectFit: "contain" }}
          />
          {title}
        </span>
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹ ${price}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `₹ ${total}`,
    },
  ];

  const dataSource = order?.cart?.items?.map((item) => ({
    key: item.cartItemId,
    product: item.variant,
    color: item.variant.color,
    size: item.size,
    price: item.variant.price,
    quantity: item.quantity,
    total: item.variant.price * item.quantity,
  }));
  return (
    <>
      <Base>
        {loading && <h1>Loading...</h1>}
        {!loading && (
          <>
            <div className="invoice my-3">
              <div className="invoice-header">
                <h2>Order Invoice</h2>
                <div className="invoice-info">
                  <div>
                    <strong>Order ID:</strong> {order.handle}
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <hr />

              <div className="invoice-basic-details">
                {/* <h3>Basic Details</h3> */}
                <div>
                  <strong>Name:</strong> {order.user.name}
                </div>
                <div>
                  <strong>Email:</strong> {order.user.email}
                </div>
              </div>

              <div className="invoice-items">
                <h3>Items</h3>
                <Table
                  scroll={{
                    x: 500,
                  }}
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                />
              </div>
              <div className="d-flex flex-md-row flex-column align-items-center">
                <div className="invoice-address w-50 mx-2">
                  <Card
                    title="Shipping Details"
                    className="invoice-address-card">
                    <div className="summary-item">
                      <div className="summary-item-label">Address:</div>
                      <div className="summary-item-value d-flex flex-column align-items-end">
                        <div>{order.address.name}, </div>
                        <div>
                          {order.address.address1}, {order.address.address2},
                        </div>
                        <div>
                          {order.address.city}, {order.address.state},{" "}
                          {order.address.postcode}
                        </div>
                      </div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-item-label">Phone:</div>
                      <div className="summary-item-value">
                        {order.address.phone}
                      </div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-item-label">Email:</div>
                      <div className="summary-item-value">
                        {order.address.email}
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="invoice-summary w-50 mx-3">
                  <Card className="invoice-summary-card" title="Order Summary">
                    <div className="summary-item">
                      <div className="summary-item-label">Subtotal:</div>
                      <div className="summary-item-value">
                        ₹{order.cart.totalPrice}
                      </div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-item-label">Shipping:</div>
                      <div className="summary-item-value">
                        ₹{order.cart.shipping.price}
                      </div>
                    </div>
                    <div className="summary-item">
                      <div className="summary-item-label">Discount:</div>
                      <div className="summary-item-value">
                        - ₹{order.cart?.discountPrice || 0}
                      </div>
                    </div>
                    <div className="summary-item total">
                      <div className="summary-item-label">Total:</div>
                      <div className="summary-item-value">
                        ₹{order.cart.finalPrice}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}
      </Base>
    </>
  );
};
