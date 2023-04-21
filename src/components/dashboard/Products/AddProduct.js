import React, { useEffect, useState } from "react";
import { Base } from "../../../common/Base";
import { Button, Form, Input, Select, message } from "antd";
import { addProductAPI } from "../../../api/products/addProduct.api";
import { useNavigate } from "react-router-dom";
import { getCategoriesAPI } from "../../../api/categories/getCategory.api";

export const AddProduct = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const titleValue = Form.useWatch("title", { form, preserve: true });

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
  useEffect(() => {
    form.setFieldValue(
      "handle",
      titleValue?.replace(/\s+/g, "-").toLowerCase(),
    );
  }, [titleValue]);
  const handleProductSubmit = (values) => {
    values.tags = values.tags.split(",").map((tag) => tag.trim());
    addProductAPI(values)
      .then((res) => {
        message.success("Product added successfully");
        navigate("/add-variants", {
          state: {
            product: res.data.product,
          },
        });
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  return (
    <>
      <Base container={false}>
        <div className="container">
          <Form form={form} onFinish={handleProductSubmit}>
            <div className="m-3">
              <h5>Basic Product Details: </h5>
              <hr />
              <Form.Item required={true} label="Title" name={"title"}>
                <Input />
              </Form.Item>
              <Form.Item required={true} label="Handle" name={"handle"}>
                <Input />
              </Form.Item>
              <Form.Item required={true} label="Description" name={"body_html"}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item required={true} label="Category" name={"category"}>
                <Select>
                  {categories.map((category) => (
                    <Select.Option value={category._id}>
                      {category.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                required={true}
                label="Product Code"
                name={"product_code"}>
                <Input />
              </Form.Item>
              <Form.Item required={true} label="Keywords" name={"tags"}>
                <Input.TextArea placeholder="write keywords with , to separate" />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </div>
          </Form>
        </div>
      </Base>
    </>
  );
};
