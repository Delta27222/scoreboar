import {useEffect, useState} from "react";
import { UseTasks } from '../../../../utils/ProviderContext'
import { DribbbleOutlined  } from '@ant-design/icons';
import { Button, Space, Card } from 'antd';



const ButtonCreateGame = ({}) => {
  const {
    doResetGame,
    setServeStart,
    ServeStart,
    CreateScoreboard,
    setOpen,
    setRefrescaCreateId,
    RefrescaCreateId,
  } = UseTasks();

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
        <Button
          block
          onClick={() => {
            CreateScoreboard();
            setOpen(false);
            setRefrescaCreateId(!RefrescaCreateId);
          }}
          loading={loadings[2]}
          icon={<DribbbleOutlined />}
        >
          Crear Partida
        </Button>
  )
}

export default ButtonCreateGame