'use client'
import { useState } from "react";
import { UseTasks } from "../../../utils/ProviderContext";
import {Drawer, Flex, Space, Row, Col, Divider } from 'antd';

import ButtonDrawerOp from '../shared/buttonDrawerOp'
import ButtonRecharge from "../shared/buttonRecharge";
import ButtonServeStart from "../shared/buttonServeStart";
import ButtonTime from "../shared/buttonTime";
import ButtonTimeGame from "../shared/ButtonTimeGame";


import {SettingsDrawer} from '../shared/SettingsDrawer'


export function CardScoreboard() {
  const {SetsGame, handleSave, open, setOpen, onClose } = UseTasks();
  const baseStyle = {
    width: '25%',
    height: 40,
  };
  const [value, setValue] = useState('horizontal');
  const [placement, setPlacement] = useState('bottom');
  const showDrawer = () => {
    setOpen(true);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <section className="px-10 py-10 w-full">
      <Row gutter={16} justify="center">
        <Space>
          <Col span={4} className="gutter-row">
            <ButtonDrawerOp showDrawer={showDrawer} tooltip={"Opciones"} />
          </Col>
          <Col span={2} className="gutter-row">
            <ButtonRecharge tooltip={"Reiniciar"} />
          </Col>
          <Col span={2} className="gutter-row">
            <ButtonServeStart tooltip={"Cambiar Servicio"} />
          </Col>
        </Space>
      </Row>
      <Divider />
      <Row gutter={16} justify="center">
        <Space wrap className="justify-center">
          <Col span={2} className="gutter-row">
            <ButtonTime label={"Servicio 20s"} TimerSeconds={20} />
          </Col>
          <Col span={2} className="gutter-row">
            <ButtonTime label={"Cambio de Cancha 90s"} TimerSeconds={90} />
          </Col>
          <Col span={2} className="gutter-row">
            <ButtonTime label={"Final del Set 2m"} TimerSeconds={120} />
          </Col>
        </Space>
      </Row>
      {/* Boton Flotador */}
      <ButtonTimeGame />
      {/* Boton Flotador */}
      <Divider />
      <Row gutter={16} justify="start">
        <Col span={24} className="gutter-row">
          <Flex gap="middle" vertical>
            <Flex vertical={value === "vertical"} justify={"left"}>
              {Array.from({ length: SetsGame.length }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 6,
                    ...baseStyle,
                    backgroundColor: i % 2 ? "#1677ff" : "#1677ffbf",
                  }}
                >
                  <header className="mb-1 space-y-1">
                    <h1 className="font-display text-2xl text-center tracking-tight text-slate-100 dark:text-white">
                      {SetsGame[i]}{" "}
                    </h1>
                    <p className="font-display text-sm font-medium text-blue-500"></p>
                  </header>
                </div>
              ))}
            </Flex>
          </Flex>
        </Col>
      </Row>
      <Drawer
        title="Configuración"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <SettingsDrawer />
      </Drawer>
    </section>
  );
}