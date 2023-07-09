import React, { useEffect, useState } from "react";
import { Base } from "../../../../common/Base";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllDesignTypesAPI } from "../../../../api/designTypes/getAllDesignTypes.api";

export const ViewDesignTypes = () => {
  const navigate = useNavigate();
  const [designTypes, setDesignTypes] = useState([]);
  useEffect(() => {
    getAllDesignTypesAPI().then((res) => {
      setDesignTypes(res.data.designTypes);
    });
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];
  return (
    <Base>
      <h3>View designTypes</h3>
      <hr />
      <Button
        className="my-3"
        onClick={() => {
          navigate("/design-type/add-design-type");
        }}>
        Add Design Type
      </Button>

      <Table columns={columns} dataSource={designTypes} />
    </Base>
  );
};
