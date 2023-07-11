import React, { useEffect, useState } from "react";
import { Base } from "../../../common/Base";
import { Button, Modal, Table, Tag, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getProductsAPI } from "../../../api/products/getProducts.api";
import { Button as BootstrapBtn } from "react-bootstrap";
import updateStatusAPI from "../../../api/products/updateStatus.api";
import deleteProductAPI from "../../../api/products/deleteProduct.api";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [productsCount, setProductsCount] = useState(0);
  const [openConfirmStatusModal, setOpenConfirmStatusModal] = useState(false);
  const [openDeleteStatusModal, setOpenDeleteStatusModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const navigate = useNavigate();
  const fetchProducts = () => {
    getProductsAPI({ skip, limit })
      .then((res) => {
        if (res.status === 200) {
          console.log("products", res.data.products);
          setProducts(res.data.products);
          setProductsCount(res.data.productsCount);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.message);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, [skip, limit]);
  const createCategories = (categories) => {
    return categories.map((category) => {
      return <Tag key={category._id}>{category.title}</Tag>;
    });
  };
  const updateProductStatus = (product) => {
    updateStatusAPI({ id: product._id, status: !product.isActive })
      .then((res) => {
        if (res.status === 200) {
          message.success("Product status updated successfully");
          fetchProducts();
          setOpenConfirmStatusModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.message);
        setOpenConfirmStatusModal(false);
      });
  };
  const deleteProduct = (product) => {
    deleteProductAPI({ id: product._id })
      .then((res) => {
        if (res.status === 200) {
          message.success("Product deleted successfully");
          fetchProducts();
          setOpenDeleteStatusModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.message);
        setOpenDeleteStatusModal(false);
      });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      key: "category",
      render: (text, record) => createCategories(record.categories),
    },
    {
      title: "Product Code",
      dataIndex: "product_code",
      key: "product_code",
    },
    {
      title: "Design Types",
      key: "design_types",
      render: (text, record) => (
        <span>
          {record.design_types.map((design) => (
            <Tag key={design._id}>{design.name}</Tag>
          ))}
        </span>
      ),
    },
    {
      title: "Variants",
      key: "variants",
      render: (text, record) => (
        <span>
          <Button
            type="dashed"
            onClick={() => {
              navigate("/variants", {
                state: {
                  product: record,
                },
              });
            }}>
            Variants ({record.variants?.length || 0})
          </Button>
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
              navigate("/add-products", { state: { product: record } });
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
  const cancelConfirmStatusModal = () => {
    setOpenConfirmStatusModal(false);
  };
  const confirmStatusModal = (product) => {
    setOpenConfirmStatusModal(true);
    setCurrentProduct(product);
  };
  const cancelDeleteStatusModal = () => {
    setOpenDeleteStatusModal(false);
  };
  const confirmDeleteModal = (product) => {
    setOpenDeleteStatusModal(true);
    setCurrentProduct(product);
  };

  return (
    <>
      <Base>
        <h3>Products</h3>
        <hr />
        <div>
          <Button
            className="my-3"
            onClick={() => {
              navigate("/add-products");
            }}>
            Add Product
          </Button>
          <Table
            columns={columns}
            dataSource={products}
            pagination={{
              total: productsCount,
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
          onOk={() => updateProductStatus(currentProduct)}>
          Are you sure you want to make {currentProduct.title} as{" "}
          <b>{currentProduct.isActive ? "in-active" : "active"}</b>
        </Modal>
        <Modal
          title="Delete Product"
          okText="Confirm"
          open={openDeleteStatusModal}
          onCancel={cancelDeleteStatusModal}
          onOk={() => deleteProduct(currentProduct)}>
          Are you sure you want to delete <b>{currentProduct.title}</b> and all
          its variants? <br />
          <b>This action cannot be undone.</b>
        </Modal>
      </Base>
    </>
  );
};
