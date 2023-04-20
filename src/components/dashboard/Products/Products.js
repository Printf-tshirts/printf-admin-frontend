import React, { useEffect, useState } from "react";
import { Base } from "../../../common/Base";
import { Button, Modal, Table, Tag, message } from "antd";
import { useHistory } from "react-router-dom";
import { getProductsAPI } from "../../../api/products/getProducts.api";
import { Button as BootstrapBtn } from "react-bootstrap";
import updateStatusAPI from "../../../api/products/updateStatus.api";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [openConfirmStatusModal, setOpenConfirmStatusModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const history = useHistory();
  const fetchProducts = () => {
    getProductsAPI({ skip, limit })
      .then((res) => {
        if (res.status === 200) {
          console.log("products", res.data.products);
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.message);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

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

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      key: "category",
      render: (text, record) => <span>{record.category.title}</span>,
    },
    {
      title: "Product Code",
      dataIndex: "product_code",
      key: "product_code",
    },
    {
      title: "Tags",
      key: "tags",
      render: (text, record) => (
        <span>
          {record.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
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
              history.push("/variants", {
                product: record,
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
            onClick={() => {}}>
            Edit
          </BootstrapBtn>
          <BootstrapBtn
            className="mx-1"
            variant="outline-danger"
            onClick={() => {}}>
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

  return (
    <>
      <Base container={false}>
        <div className="m-5">
          <h3>Products Page</h3>
          <hr />
          <div>
            <Button
              className="my-3"
              onClick={() => {
                history.push("/add-product");
              }}>
              Add Product
            </Button>
            <Table columns={columns} dataSource={products} />
          </div>
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
      </Base>
    </>
  );
};
