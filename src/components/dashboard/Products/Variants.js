import React, { useEffect, useState } from "react";
import { Base } from "../../../common/Base";
import { Button, Carousel, Image, Modal, Table, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { Button as BootstrapBtn } from "react-bootstrap";
import { getVariantsAPI } from "../../../api/variants/getVariants.api";
import updateStatusAPI from "../../../api/variants/updateStatus.api";
import deleteVariantAPI from "../../../api/variants/deleteVariant.api";

export const Variants = () => {
  const { state } = useLocation();
  let navigate = useNavigate();
  const [variants, setVariants] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [variantsCount, setVariantsCount] = useState(0);
  const [product, setProduct] = useState({});
  const [openConfirmStatusModal, setOpenConfirmStatusModal] = useState(false);
  const [currentVariant, setCurrentVariant] = useState({});
  const [currentImages, setCurrentImages] = useState([]);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openDeleteStatusModal, setOpenDeleteStatusModal] = useState(false);
  const columns = [
    {
      title: "Image",
      key: "image",
      render: (text, record) => (
        <span
          onClick={() => {
            handleImageModal(record.images);
          }}>
          <img
            src={record.images[0]?.src}
            style={{ width: 100, height: 100 }}
          />
        </span>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Color",
      key: "color",
      render: (text, record) => <span>{record.color.name}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "MRP",
      dataIndex: "compare_at_price",
      key: "comare_at_price",
    },
    {
      title: "Product Code",
      dataIndex: "product_code",
      key: "product_code",
    },
    {
      title: "Sizes",
      key: "sizes",
      render: (text, record) => (
        <span>
          {record.sizes.map((size) => (
            <>
              {size.inventory > 0 ? (
                <div className="d-flex">
                  <div>
                    <b>{size.sizeOption}</b>
                  </div>
                  <div className="mx-3">
                    Quantity: <b>{size.inventory}</b>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          ))}
        </span>
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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <BootstrapBtn
            variant="outline-warning"
            className="mx-1"
            onClick={() => {
              navigate("/add-variants", {
                state: {
                  variant: record,
                  product,
                },
              });
            }}>
            Edit
          </BootstrapBtn>
          <BootstrapBtn
            className="mx-1"
            variant="outline-danger"
            onClick={() => {
              confirmDeleteModal(record);
            }}>
            Delete
          </BootstrapBtn>
        </span>
      ),
    },
  ];
  useEffect(() => {
    console.log("state", state);
    if (state) {
      setProduct(state.product);
    } else {
      navigate("/add-products");
    }
  }, [state, navigate]);
  const fetchVariants = () => {
    getVariantsAPI({ skip, limit, productId: product._id })
      .then((res) => {
        if (res.status === 200) {
          setVariants(res.data.variants);
          setVariantsCount(res.data.variantsCount);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.message);
      });
  };
  useEffect(() => {
    if (product._id) {
      fetchVariants();
    }
  }, [product, skip, limit]);

  const cancelConfirmStatusModal = () => {
    setOpenConfirmStatusModal(false);
  };
  const confirmStatusModal = (variant) => {
    setOpenConfirmStatusModal(true);
    setCurrentVariant(variant);
  };
  const handleImageModal = (images) => {
    console.log("images", images);
    setCurrentImages([...images]);
    setOpenImageModal(true);
  };
  const cancelImageModel = () => {
    setOpenImageModal(false);
  };
  const cancelDeleteStatusModal = () => {
    setOpenDeleteStatusModal(false);
  };
  const confirmDeleteModal = (variant) => {
    setOpenDeleteStatusModal(true);
    setCurrentVariant(variant);
  };

  const updateVariantStatus = (variant) => {
    console.log("variant", variant);
    updateStatusAPI({ id: variant._id, status: !variant.isActive })
      .then((res) => {
        if (res.status === 200) {
          message.success("Variant status updated successfully");
          fetchVariants();
          setOpenConfirmStatusModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.message);
        setOpenConfirmStatusModal(false);
      });
  };
  const deleteVariant = (variant) => {
    deleteVariantAPI({ id: variant._id })
      .then((res) => {
        if (res.status === 200) {
          message.success("Variant deleted successfully");
          fetchVariants();
          setOpenDeleteStatusModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Base>
        <h3>Variants of {product.title}</h3>
        <hr />
        <div>
          <Button
            className="my-3"
            onClick={() => {
              navigate("/add-variants", {
                state: {
                  product: product,
                },
              });
            }}>
            Add Variants
          </Button>
          <Table
            columns={columns}
            dataSource={variants}
            pagination={{
              total: variantsCount,
              pageSize: limit,
              onChange: (page, pageSize) => {
                setSkip((page - 1) * pageSize);
                setLimit(pageSize);
              },
            }}
          />
        </div>
        <Modal
          title="Confirm"
          okText="Confirm"
          open={openConfirmStatusModal}
          onCancel={cancelConfirmStatusModal}
          onOk={() => updateVariantStatus(currentVariant)}>
          Are you sure you want to make {currentVariant.title} as{" "}
          <b>{currentVariant.isActive ? "in-active" : "active"}</b>
        </Modal>
        <Modal title="Images" open={openImageModal} onCancel={cancelImageModel}>
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <Carousel>
                  {currentImages?.map((image) => {
                    return (
                      <>
                        <div className="d-flex align-items-center justify-content-center">
                          <Image
                            style={{
                              maxWidth: "500px",
                              height: "500px",
                              objectFit: "contain",
                            }}
                            src={image?.src}
                            fluid
                          />
                        </div>
                      </>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          title="Delete Variant"
          okText="Confirm"
          open={openDeleteStatusModal}
          onCancel={cancelDeleteStatusModal}
          onOk={() => deleteVariant(currentVariant)}>
          Are you sure you want to delete <b>{currentVariant.title}</b>?
          <br />
          <b>This action cannot be undone.</b>
        </Modal>
      </Base>
    </>
  );
};
