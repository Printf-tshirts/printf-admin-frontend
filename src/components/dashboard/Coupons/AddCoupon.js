import React, { useEffect, useState } from "react";
import { Base } from "../../../common/Base";
import { Button, Form, Input, Select, message, DatePicker } from "antd";
import { Option } from "antd/es/mentions";
import { getCategoriesAPI } from "../../../api/categories/getCategory.api";
import { addCouponAPI } from "../../../api/coupons/addCoupon.api";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
const { RangePicker } = DatePicker;

export const AddCoupon = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const handleAddCoupon = (values) => {
    const startDate = new Date(
      values.rangeDate[0].format("YYYY-MM-DD"),
    ).getTime();
    const endDate = new Date(
      values.rangeDate[1].format("YYYY-MM-DD"),
    ).getTime();
    values.startDate = startDate;
    values.endDate = endDate;
    addCouponAPI(values)
      .then((res) => {
        message.success("Coupon added successfully");
        navigate("/coupons");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  const fetchCategories = () => {
    getCategoriesAPI()
      .then((res) => {
        if (res.status === 200) {
          setCategories(res.data.categories);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.message);
      });
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Base>
      <Container>
        <h3>Add Coupon</h3>
        <hr />
        <div className="my-5">
          <Form
            size="large"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 10,
            }}
            layout="horizontal"
            form={form}
            onFinish={handleAddCoupon}>
            <Form.Item label="Discount Code" name={"discountCode"}>
              <Input placeholder="NEW100" />
            </Form.Item>
            <Form.Item label="Discount Type" name={"type"}>
              <Select>
                <Option value="percentage">Percentage</Option>
                <Option value="fixed">Fixed</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Discount Value"
              rules={[
                {
                  type: "number",
                  validator: (_, value) => {
                    if (
                      value &&
                      form?.getFieldValue("type") === "percentage" &&
                      value >= 90
                    ) {
                      return Promise.reject(
                        "Percentage discount should be less than 90",
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              name={"value"}>
              <Input placeholder="100" />
            </Form.Item>
            <Form.Item label="Minimum Order Value" name={"minimumOrderAmount"}>
              <Input placeholder="1000" />
            </Form.Item>
            <Form.Item
              label="Maximum Discount Value"
              name={"maximumDiscountAmount"}>
              <Input placeholder="1000" />
            </Form.Item>
            <Form.Item label="Categories" name={"categories"}>
              <Select mode="multiple">
                {categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Start & End Date" name={"rangeDate"}>
              <RangePicker />
            </Form.Item>
            <Form.Item label="Status" name={"isActive"}>
              <Select>
                <Option value={true}>True</Option>
                <Option value={false}>False</Option>
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
              <Button htmlType="submit">Add</Button>
            </Form.Item>
          </Form>
        </div>
      </Container>
    </Base>
  );
};
