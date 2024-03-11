"use client";
import { useEffect, useState } from "react";
import { UseTasks } from "../../../utils/ProviderContext";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

const ButtonRecharge = ({ tooltip }) => {
  const { doResetGame, ScoreGameSets } = UseTasks();

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
    }, 1000);
  };

  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={() => {
          doResetGame();
          enterLoading(2);
        }}
        loading={loadings[2]}
        icon={<ReloadOutlined />}
      ></Button>
    </Tooltip>
  );
};

export default ButtonRecharge;
