import React, { useEffect, useState } from "react";
import { Base } from "../../../common/Base";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { addVariantAPI } from "../../../api/variants/addVariant.api";
import { LOCAL_BACKEND_URL } from "../../../constants";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export const AddVariant = () => {
  const { state } = useLocation();
  const [form] = Form.useForm();
  const [product, setProduct] = useState({});
  let navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [imageList, setImageList] = useState([]);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (state) {
      setProduct(state.product);
    } else {
      navigate("/add-product");
    }
  }, [state]);
  const sizeOptions = [
    { label: "XS", value: "XS" },
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "2XL", value: "2XL" },
  ];
  const getVariantPayload = (variant) => {
    variant.sizes = [];
    sizeOptions.forEach((size) => {
      if (variant[size.label]) {
        variant.sizes.push({
          sizeOption: size.label,
          inventory: parseInt(variant[size.label].quantity),
        });
      }
    });
    variant.productId = product._id;
    variant.title = product.title + " " + variant.color;
    variant.handle = product.handle + "-" + variant.color;
    variant.images = imageList;
    variant.productId = product._id;
    variant.category = product.category;
    variant.product_code =
      product.product_code +
      "-" +
      variant.color?.replace(/\s+/g, "-").toLowerCase();
    return variant;
  };
  const handleVariantSubmit = (values, path) => {
    let variant = getVariantPayload(values);
    addVariantAPI({ variant })
      .then((res) => {
        message.success("Variants added successfully");
        navigate(path, { state: { product: product } });
        form.resetFields();
        setFileList([]);
        setImageList([]);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  const createSizeField = (size) => {
    return (
      <Form.Item
        label={size.label}
        className="m-2"
        name={[size.label, "quantity"]}>
        <Input type="number" placeholder="Quantity" />
      </Form.Item>
    );
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
      <Base container={false}>
        <div className="container">
          <Form
            form={form}
            onFinish={(values) => handleVariantSubmit(values, "/variants")}>
            <div className="m-3">
              <h5>Product Title: {product.title}</h5>
              <h5>Color Options:</h5>
              <hr />
              <Form.Item label={"Color"} name={"color"}>
                <Input />
              </Form.Item>
              <Form.Item
                label={"Display Price"}
                rules={[
                  {
                    required: true,

                    message: "Please input display price",
                  },
                  {
                    type: "number",
                    validator: (_, value) => {
                      if (value && value < 499) {
                        return Promise.reject(
                          "Should be more than or equal to 499",
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                name={"price"}>
                <Input type="number" />
              </Form.Item>
              <Form.Item label={"MRP"} name={"compare_at_price"}>
                <Input type="number" />
              </Form.Item>
              <h5>Enter Inventory: </h5>
              <div className="d-flex">
                {sizeOptions.map((sizeOption) => createSizeField(sizeOption))}
              </div>
              <Form.Item label={"Images"} name={"images"}>
                <Upload
                  action={`${LOCAL_BACKEND_URL}/files/upload-single`}
                  headers={{
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                  }}
                  listType="picture-card"
                  multiple={true}
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}>
                  {uploadButton}
                </Upload>
              </Form.Item>
              <Button
                className="mx-4"
                type="dashed"
                onClick={() =>
                  handleVariantSubmit(form.getFieldsValue(), "/add-variants")
                }>
                Add More Options
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
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
