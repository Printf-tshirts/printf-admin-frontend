import React from "react";
import { Base } from "../../../../common/Base";
import { addColorAPI } from "../../../../api/colors/addColor.api";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

export const AddColor = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleColor = (values) => {
    console.log(values);
    addColorAPI(values).then((res) => {
      message.success("Color added successfully");
      navigate("/color/view-colors");
    });
  };
  return (
    <Base>
      <h3>Add Color</h3>
      <hr />
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
        onFinish={handleColor}>
        <Form.Item required={true} label="Name" name={"name"}>
          <Input placeholder="Red" />
        </Form.Item>
        <Form.Item required={true} label="HexCode" name={"hexCode"}>
          <Input placeholder="#ff0000" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button htmlType="submit">Add Color</Button>
        </Form.Item>
      </Form>
    </Base>
  );
};
