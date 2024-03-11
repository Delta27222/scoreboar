
import {useEffect, useState } from "react";
import { UseTasks } from '../../../../utils/ProviderContext'
import { Space, Card, Row, Col } from 'antd';

import { SettingsPlayer } from '../../shared/Settings/SettingsPlayer'
import ButtonSavePlayes from '../../shared/buttonSavePlayes'

export  function SettingsPlayers({ }) {
  const {
    PlayerA,
    PlayerB,
    PlayerC,
    PlayerD,
    setPlayerA,
    setPlayerB,
    setPlayerC,
    setPlayerD,
  } = UseTasks();

    const [ScoreID, setScoreID] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        PlayerA=='' ?
        localStorage.setItem("PlayerA", localStorage.getItem("PlayerA")) :
        PlayerA !='' ?
        localStorage.setItem("PlayerA", PlayerA) :
        localStorage.getItem("PlayerA");
    }
  }, [PlayerA]);

  useEffect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
          PlayerB=='' ?
          localStorage.setItem("PlayerB", localStorage.getItem("PlayerB")) :
          PlayerB !='' ?
          localStorage.setItem("PlayerB", PlayerB) :
          localStorage.getItem("PlayerB");
      }
  }, [PlayerB]);

  useEffect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
          PlayerC=='' ?
          localStorage.setItem("PlayerC", localStorage.getItem("PlayerC")) :
          PlayerC !='' ?
          localStorage.setItem("PlayerC", PlayerC) :
          localStorage.getItem("PlayerC");
      }
  }, [PlayerC]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        PlayerD=='' ?
        localStorage.setItem("PlayerD", localStorage.getItem("PlayerD")) :
        PlayerD !='' ?
        localStorage.setItem("PlayerD", PlayerD) :
        localStorage.getItem("PlayerD");
    }
  }, [PlayerD]);

  return (
    <Card title="">
      <Space wrap justify="center">
        <Card title="Dupla A">
          <Space direction="vertical" size="small">
            <SettingsPlayer NamePlayer={setPlayerA} placeholde={"Jugador A"} />
            <SettingsPlayer NamePlayer={setPlayerB} placeholde={"Jugador B"} />
          </Space>
        </Card>
        <Card title="Dupla B">
          <Space direction="vertical" size="small">
            <SettingsPlayer NamePlayer={setPlayerC} placeholde={"Jugador C"} />
            <SettingsPlayer NamePlayer={setPlayerD} placeholde={"Jugador D"} />
          </Space>
        </Card>
      </Space>
    </Card>
  );
}