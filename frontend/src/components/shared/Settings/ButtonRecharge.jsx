import { useState } from "react";
import { useTasks } from "../../../../utils/ProviderContext";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

export const ButtonRecharge = ({}) => {
  const { doResetGame, ScoreGameSets, doClearlocalStorage, UpdateScoreboard } =
    useTasks();

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
      danger
      onClick={() => {
        doResetGame();
        enterLoading(2);
        doClearlocalStorage();
        UpdateScoreboard();
      }}
      loading={loadings[2]}
      icon={<DeleteOutlined />}
    ></Button>
  );
};
