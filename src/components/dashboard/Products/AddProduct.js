import React, { useEffect, useState } from "react";
import { Base } from "../../../common/Base";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { addProductAPI } from "../../../api/products/addProduct.api";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategoriesAPI } from "../../../api/categories/getCategory.api";
import { Container } from "react-bootstrap";
import { LOCAL_BACKEND_URL } from "../../../constants";
import { PlusOutlined } from "@ant-design/icons";
import updateProductAPI from "../../../api/products/updateProduct.api";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export const AddProduct = () => {
  const { state } = useLocation();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [imageList, setImageList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const titleValue = Form.useWatch("title", { form, preserve: true });
  useEffect(() => {
    if (state?.product) {
      form.setFieldsValue({
        title: state.product.title,
        body_html: state.product.body_html,
        categories: state.product.categories.map((category) => category._id),
        price: state.product.price,
        compare_at_price: state.product.compare_at_price,
        product_code: state.product.product_code,
        tags: state.product.tags.join(","),
      });
      setCategories(state.product.categories);
      setImageList(state.product.images);
      setFileList(
        state.product.images.map((image) => ({
          uid: image._id,
          name: image.src,
          status: "done",
          response: {
            file: {
              url: image.src,
            },
          },
          url: image.src,
        })),
      );
    }
  }, [state, form]);
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
  }, [titleValue, form]);
  const handleProductSubmit = (values) => {
    values.tags = values.tags.split(",").map((tag) => tag.trim());
    values.images = imageList;
    if (state?.product) {
      updateProductAPI(state.product._id, values)
        .then((res) => {
          message.success("Product updated successfully");
          navigate("/products");
        })
        .catch((err) => {
          message.error(err.message);
        });
    } else {
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
    }
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    newFileList?.forEach((file) => {
      if (file.status === "done") {
        if (!imageList.includes(file.response.file)) {
          setImageList((imageList) => [...imageList, file.response.file]);
        }
      }
    });
    setFileList(newFileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Base>
        <h3>Add Product</h3>
        <hr />
        <Container>
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
            onFinish={handleProductSubmit}>
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
              <Form.Item required={true} label="Category" name={"categories"}>
                <Select mode="multiple">
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
                <Input placeholder="write keywords with , to separate" />
              </Form.Item>
              <Form.Item required={true} label="Print Size" name={"printSize"}>
                <Select mode="single" disabled={true} defaultValue={"a4"}>
                  <Select.Option value={"a3"}>A3</Select.Option>
                  <Select.Option value={"a4"}>A4</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label={"Design Image"} required={true} name={"images"}>
                <Upload
                  action={`${LOCAL_BACKEND_URL}/files/upload-single`}
                  headers={{
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                  }}
                  listType="picture-card"
                  accept="image/png"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onRemove={(file) => {
                    setImageList(
                      imageList.filter((image) => image !== file.response.file),
                    );
                  }}
                  onChange={handleChange}>
                  {uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}>
                <Button htmlType="submit">Next</Button>
              </Form.Item>
            </div>
          </Form>
        </Container>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}>
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </Base>
    </>
  );
};
