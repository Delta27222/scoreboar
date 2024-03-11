"use client";
import { useEffect, useState } from "react";
import { useTasks } from "../../../utils/ProviderContext";
import {
  ClockCircleOutlined,
  RightCircleOutlined,
  HistoryOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import {
  ConfigProvider,
  FloatButton,
  Tooltip,
} from "antd";

const ButtonTimeGame = () => {
  const { doResetGame, UpdateScoreboard } = useTasks();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    >
        <FloatButton.Group
          trigger="click"
          type="primary"
          style={{
            right: 24,
          }}
          icon={<ClockCircleOutlined />}
          onClick={() => setTooltipVisible(!tooltipVisible)}
        >
          {/* Start */}
          <Tooltip title="Empezar" placement="left">
            <FloatButton
              onClick={() => {
                localStorage.setItem("IsActive", true);
                localStorage.setItem("IsPaused", false);
                localStorage.setItem("IsTime", 2);
                UpdateScoreboard();
              }}
              icon={
                <RightCircleOutlined
                  style={{ fontSize: "16px", color: "#00b96b" }}
                />
              }
            />
          </Tooltip>
          {/* Paused */}
          <Tooltip title="Pausar" placement="left">
            <FloatButton
              onClick={() => {
                localStorage.setItem("IsActive", false);
                localStorage.setItem("IsPaused", true);
                localStorage.setItem("IsTime", 2);
                UpdateScoreboard();
              }}
              icon={
                <PauseCircleOutlined
                  style={{ fontSize: "16px", color: "#00b96b" }}
                />
              }
            />
          </Tooltip>
          {/* Reset */}
          <Tooltip title="Reiniciar" placement="left">
            <FloatButton
              onClick={() => {
                localStorage.setItem("IsActive", false);
                localStorage.setItem("IsPaused", true);
                localStorage.setItem("IsTime", 1);
                UpdateScoreboard();
              }}
              icon={
                <HistoryOutlined
                  style={{ fontSize: "16px", color: "#00b96b" }}
                />
              }
            />
          </Tooltip>
        </FloatButton.Group>
    </ConfigProvider>
  );
};

export default ButtonTimeGame;
