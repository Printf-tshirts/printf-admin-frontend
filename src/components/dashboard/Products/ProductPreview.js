import React, { useEffect, useState } from "react";
import { Base } from "../../../common/Base";
import { getProductAPI } from "../../../api/products/getProduct.api";
import { Carousel, Image, Select, Table, Tag } from "antd";
import { useLocation } from "react-router-dom";

export const ProductView = () => {
  const { state } = useLocation();
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [currentVariant, setCurrentVariant] = useState({});
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);

  const fetchProduct = async () => {
    try {
      const response = await getProductAPI({ productId });
      if (response.status === 200) {
        setProduct(response.data.product);
        console.log(response.data.product);
        setCurrentVariant(response.data.product.variants[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("currentVariantIndex", currentVariantIndex);
    if (product && product.variants)
      setCurrentVariant({ ...product.variants[currentVariantIndex] });
  }, [currentVariantIndex, product]);
  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);
  useEffect(() => {
    if (state && state?.productId) {
      setProductId(state.productId);
    }
  }, [state]);
  const sizeColumns = [
    {
      title: "Size",
      dataIndex: "sizeOption",
      key: "size",
    },
    {
      title: "Quantity",
      dataIndex: "inventory",

      key: "quantity",
    },
  ];
  const createVariantSizes = (sizes) => {
    return <Table dataSource={sizes} columns={sizeColumns} />;
  };
  return (
    <>
      <Base container={false}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="m-5">
              <div>
                <Carousel>
                  {currentVariant.images?.map((image) => {
                    return (
                      <>
                        <div className="d-flex align-items-center justify-content-center">
                          <Image
                            style={{
                              maxWidth: "700px",
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
              <div className="m-5 d-flex justify-content-around">
                <div>
                  <h5>{product.title}</h5>
                  <p
                    dangerouslySetInnerHTML={{ __html: product.body_html }}></p>
                  <p>Category: {product.category}</p>
                  <p>Product Code: {product.product_code}</p>
                  <p>
                    Tags:{" "}
                    {product.tags?.map((tag) => (
                      <Tag>{tag}</Tag>
                    ))}
                  </p>
                </div>
                <div>
                  <h5>Select Color Option: </h5>
                  <Select
                    placeholder="Black"
                    onChange={(value) => {
                      setCurrentVariantIndex(value);
                    }}>
                    {product.variants?.map((variant, index) => (
                      <Select.Option value={index}>
                        {variant.color}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <h5>Specifications: </h5>
                  <p>Title: {currentVariant.title}</p>
                  <p>Color: {currentVariant.color}</p>
                  <p>Display Price: {currentVariant.price}</p>
                  <p>MRP: {currentVariant.compare_at_price}</p>
                </div>
                <div className="mb-4">
                  <h5>Size & Inventory Details:</h5>
                  {createVariantSizes(currentVariant.sizes)}
                </div>
              </div>
            </div>
          </>
        )}
      </Base>
    </>
  );
};
