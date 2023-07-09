import React from "react";
import { Base } from "../../../../common/Base";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { addDesignTypeAPI } from "../../../../api/designTypes/addDesignType.api";

export const AddDesignType = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleDesignType = (values) => {
    addDesignTypeAPI(values).then((res) => {
      message.success("Design Type added successfully");
      navigate("/design-type/view-design-types");
    });
  };
  return (
    <Base>
      <h3>Add Design Type</h3>
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
        onFinish={handleDesignType}>
        <Form.Item required={true} label="Name" name={"name"}>
          <Input placeholder="Red" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button htmlType="submit">Add Design Type</Button>
        </Form.Item>
      </Form>
    </Base>
  );
};
