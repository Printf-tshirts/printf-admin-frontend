import React, { useEffect, useState } from "react";
import { Base } from "../../../../common/Base";
import { Button, Table } from "antd";
import { getAllColorsAPI } from "../../../../api/colors/getAllColors";
import { useNavigate } from "react-router-dom";

export const ViewColors = () => {
  const navigate = useNavigate();
  const [colors, setColors] = useState([]);
  useEffect(() => {
    getAllColorsAPI().then((res) => {
      setColors(res.data.colors);
    });
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "HexCode",
      dataIndex: "hexCode",
      key: "hexCode",
    },
  ];
  return (
    <Base>
      <h3>View Colors</h3>
      <hr />
      <Button
        className="my-3"
        onClick={() => {
          navigate("/color/add-color");
        }}>
        Add Color
      </Button>

      <Table columns={columns} dataSource={colors} />
    </Base>
  );
};
