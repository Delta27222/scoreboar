import  React, { useState } from "react"; 
import { useTasks } from "../../../utils/ProviderContext";
import { Form, Select, Radio } from 'antd';


export function FormItemStatus() {
    const { Option } = Select;
    const Status = [
      {
        label: 'Cancha1',
        value: 'Cancha1',
      },
      {
        label: 'Cancha2',
        value: 'Cancha2',
      },
      {
        label: 'Cancha3',
        value: 'Cancha3',
      },
      {
        label: 'Cancha4',
        value: 'Cancha4',
      },
      {
        label: 'Cancha5',
        value: 'Cancha5',
      },
    ];

  const {
      setCancha,
      Cancha,
      UpdateScoreboard
  } = useTasks();

  const handleChange = (value) => {
    if (typeof window !== "undefined" && window.localStorage){
        localStorage.setItem("Cancha", value);
        setCancha(value);
        UpdateScoreboard();
      }
  };
  return (
    <div className="grid grid-cols-1 gap-1 m-1">
      <Form.Item
        name="status"
        label="Canchas"
        style={{ marginBottom: "10px" }}
        // initialValue={ ValueStatus }
        rules={[
          {
            required: true,
            message: "Missing status",
          },
        ]}
      >
        <Select
          options={Status}
          showSearch
          onChange={handleChange}
          placeholder="Toca Aquì"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
        />
      </Form.Item>
    </div>
  );
}



// export function FormItemCancha() {
//   const { Option } = Select;
//   const Status = [
//     {
//       label: 'Cancha1',
//       value: 'Cancha1',
//     },
//     {
//       label: 'Cancha2',
//       value: 'Cancha2',
//     },
//     {
//       label: 'Cancha3',
//       value: 'Cancha3',
//     },
//     {
//       label: 'Cancha4',
//       value: 'Cancha4',
//     },
//     {
//       label: 'Cancha5',
//       value: 'Cancha5',
//     },
//   ];
//   const [size, setSize] = useState('large');

//   const handleChange = (e) => {
//     if (typeof window !== "undefined" && window.localStorage){
//       localStorage.setItem("Cancha", e.target.value);
//     }
//   };
//   return (
//     <div className="grid grid-cols-1 gap-1 m-1">
//           <div className="col-span-6 sm:col-span-1">
//             <Radio.Group   onChange={handleChange}  >
//               <Radio.Button value="Cancha1">Cancha1</Radio.Button>
//               <Radio.Button value="Cancha2">Cancha2</Radio.Button>
//               <Radio.Button value="Cancha3">Cancha3</Radio.Button>
//               <Radio.Button value="Cancha4">Cancha4</Radio.Button>
//               <Radio.Button value="Cancha5">Cancha5</Radio.Button>
//             </Radio.Group>
//         </div>
//     </div>
//   )
// }
