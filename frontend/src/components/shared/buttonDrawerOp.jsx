/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import { useTasks } from "../../../utils/ProviderContext";
import { AppstoreOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

const buttonDrawerOp = ({ showDrawer, tooltip }) => {
  const { doChangeEnd } = useTasks();
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 100);
  };
  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={() => {
          showDrawer();
        }}
        loading={loadings[2]}
        icon={<AppstoreOutlined />}
      ></Button>
    </Tooltip>
  );
};

export default buttonDrawerOp;
