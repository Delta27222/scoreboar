"use client";
import { Space, Card, Row, Col } from "antd";
import { SettingsPlayers } from "../shared/Settings/SettingsPlayers";
import ButtonCreateGame from "../shared/Settings/buttonCreateGame";
import { FormItemStatus } from "../shared/FormItemStatus";
import { ButtonRecharge } from "../shared/Settings/ButtonRecharge";

export function SettingsDrawer() {
  return (
    <div className="flex flex-wrap justify-center items-start gap-10 sm:px-4 md:px-7 py-5">
      <Space>
        <Card title="Crear una Nueva Partida">
          <Space direction="vertical" size="middle">
            <FormItemStatus />
            <SettingsPlayers />
            <ButtonCreateGame />
          </Space>
        </Card>
      </Space>
      <Card title="Limpiar Tablero">
        <div className="flex justify-center">
          <ButtonRecharge />
        </div>
      </Card>
    </div>
  );
}
