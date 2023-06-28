import React, { useEffect, useState } from "react";
import { Base } from "../../../common/Base";
import { getAllCouponsAPI } from "../../../api/coupons/getAllCoupons.api";
import { Button, Modal, Table, Tag, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Button as BootstrapBtn } from "react-bootstrap";
import updateStatusAPI from "../../../api/coupons/updateCouponStatus.api";

export const ViewCoupons = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [openConfirmStatusModal, setOpenConfirmStatusModal] = useState(false);
  const [currentCoupon, setcurrentCoupon] = useState({});

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await getAllCouponsAPI();
      setCoupons(response.data?.coupons);
      console.log(response.data?.coupons);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const couponColumns = [
    {
      title: "Coupon Code",
      dataIndex: "discountCode",
      key: "discountCode",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Min. Order Value",
      dataIndex: "minimumOrderAmount",
      key: "minimumOrderAmount",
    },
    {
      title: "Max. Discount",
      dataIndex: "maximumDiscountAmount",
      key: "maximumDiscountAmount",
    },
    {
      title: "Start Date",

      key: "startDate",
      render: (text, record) => (
        <span>{new Date(record.startDate).toDateString()}</span>
      ),
    },
    {
      title: "End Date",
      key: "endDate",
      render: (text, record) => (
        <span>{new Date(record.endDate).toDateString()}</span>
      ),
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      render: (text, record) => (
        <>
          {record.categories.map((category) => {
            return <Tag>{category.title}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => (
        <span>
          <BootstrapBtn
            size="md"
            onClick={() => {
              confirmStatusModal(record);
            }}
            variant={record.isActive ? "success" : "danger"}>
            {record.isActive ? "active" : "in-active"}
          </BootstrapBtn>
        </span>
      ),
    },
  ];
  const updateCouponStatus = (coupon) => {
    updateStatusAPI({ id: coupon._id, status: !coupon.isActive })
      .then((res) => {
        if (res.status === 200) {
          message.success("Coupon status updated successfully");
          fetchCoupons();
          setOpenConfirmStatusModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.message);
        setOpenConfirmStatusModal(false);
      });
  };
  const cancelConfirmStatusModal = () => {
    setOpenConfirmStatusModal(false);
  };
  const confirmStatusModal = (product) => {
    setOpenConfirmStatusModal(true);
    setcurrentCoupon(product);
  };

  return (
    <Base>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <h3>Coupons</h3>
          <hr />
          <div>
            <Button
              className="my-3"
              onClick={() => {
                navigate("/add-coupons");
              }}>
              Add Coupon
            </Button>
            <Table dataSource={coupons} columns={couponColumns} />
          </div>
          <Modal
            title="Confirm"
            okText="Confirm"
            open={openConfirmStatusModal}
            onCancel={cancelConfirmStatusModal}
            onOk={() => updateCouponStatus(currentCoupon)}>
            Are you sure you want to make {currentCoupon.discountCode} as{" "}
            <b>{currentCoupon.isActive ? "in-active" : "active"}</b>
          </Modal>
        </>
      )}
    </Base>
  );
};
