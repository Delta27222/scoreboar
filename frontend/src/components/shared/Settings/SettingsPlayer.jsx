import React from "react";
import { useTasks } from "../../../../utils/ProviderContext";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

export function SettingsPlayer({ NamePlayer, placeholde, value }) {
  const {} = useTasks();

  const handleChange = (e) => {
    NamePlayer(e.target.value);
  };

  return (
    <div>
        <Input
        /* Probablemente haya que quitar el onchange 
            Y dejar de guardar los nombres en el Localtorage*/
          onChange={handleChange}
          size="small"
          placeholder={placeholde}
          prefix={<UserOutlined />}
        />
    </div>
  );
}
