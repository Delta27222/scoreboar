"use client";
import { useEffect, useState } from "react";
import { UseTasks } from "../../../utils/ProviderContext";
import { DribbbleOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

const ButtonServeStart = ({tooltip}) => {
  const { doResetGame, setServeStart, ServeStart, UpdateScoreboard } =
    UseTasks();

  const [loadings, setLoadings] = UseState([]);
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

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("ServeStart", ServeStart);
      //UpdateScoreboard();
    }
  }, [ServeStart]);

  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={() => {
          setServeStart(!ServeStart);
        }}
        loading={loadings[2]}
        icon={<DribbbleOutlined />}
      />
    </Tooltip>
  );
};

export default ButtonServeStart;
