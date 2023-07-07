import React, { useEffect, useState } from "react";
import { Base } from "../../../common/Base";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { addVariantAPI } from "../../../api/variants/addVariant.api";
import { LOCAL_BACKEND_URL } from "../../../constants";
import { Container } from "react-bootstrap";
import { getAllColorsAPI } from "../../../api/colors/getAllColors";
import updateVariantAPI from "../../../api/variants/updateVariant.api";
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
  const [colors, setColors] = useState([]);
  const getColorName = (colorId) => {
    let color = colors.find((color) => color._id === colorId);
    return color?.name;
  };
  useEffect(() => {
    if (state) {
      setProduct(state.product);
    } else {
      navigate("/add-products");
    }
  }, [state, navigate]);
  useEffect(() => {
    if (state.variant) {
      form.setFieldsValue({
        color: state.variant.color._id,
        price: state.variant.price,
        compare_at_price: state.variant.compare_at_price,
      });
      setImageList(state.variant.images);
      setFileList(
        state.variant.images.map((image) => ({
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
  }, [state.variant, form]);
  useEffect(() => {
    getAllColorsAPI()
      .then((res) => {
        setColors(res.data.colors);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, []);
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
    variant.product = product._id;
    variant.title = product.title + " " + getColorName(variant.color);
    variant.handle =
      product.handle + "-" + getColorName(variant.color).toLowerCase();
    variant.images = imageList;
    variant.categories = product.categories;
    variant.product_code =
      product.product_code +
      "-" +
      getColorName(variant.color)?.replace(/\s+/g, "-").toLowerCase();
    return variant;
  };
  const handleVariantSubmit = (values, path) => {
    let variant = getVariantPayload(values);
    if (state.variant) {
      updateVariantAPI(state.variant._id, variant)
        .then((res) => {
          message.success("Variant updated successfully");
          navigate(path, { state: { product: product } });
          form.resetFields();
          setFileList([]);
          setImageList([]);
        })
        .catch((err) => {
          message.error(err.message);
        });
    } else {
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
    }
  };
  const createSizeField = (size) => {
    return (
      <Form.Item
        label={size.label}
        className="my-2 col-4"
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
        if (!imageList.includes(file?.response?.file)) {
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
        <h3>Add Variant</h3>
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
            onFinish={(values) => handleVariantSubmit(values, "/variants")}>
            <div className="m-3">
              <h5>Product Title: {product.title}</h5>
              <h5>Color Options:</h5>
              <hr />
              <Form.Item
                label={"Color"}
                name={"color"}
                rules={[
                  {
                    required: true,
                    message: "Please select color",
                  },
                ]}>
                <Select mode="single">
                  {colors.map((color) => (
                    <Select.Option value={color._id}>
                      {color.name}
                    </Select.Option>
                  ))}
                </Select>
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
              <Form.Item label="Inventory">
                <div className="row">
                  {sizeOptions.map((sizeOption) => createSizeField(sizeOption))}
                </div>
              </Form.Item>
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
                  onRemove={(file) => {
                    console.log("file", file);
                    setImageList(
                      imageList.filter((image) => image !== file.response.file),
                    );
                  }}
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
