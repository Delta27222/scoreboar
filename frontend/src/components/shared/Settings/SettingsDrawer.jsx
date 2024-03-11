
import {useEffect, useState } from "react"; 
import { UseTasks } from "../../../../utils/ProviderContext";
import { Button, Checkbox, Form, Input, Select, Space, Radio, Card, Row, Col, Divider  } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleTwoTone } from '@ant-design/icons';

import {SettingsPlayers} from '@/components/Cards/Scoreboard/Settings/SettingsPlayers'
import ButtonCreateGame from '@/components/Cards/Scoreboard/Settings/buttonCreateGame'
import {FormItemStatus} from '@/components/Cards/Scoreboard/ExternalBoard/FormItemStatus'
import {FormItemControlCancha} from '@/components/Cards/Scoreboard/ExternalBoard/FormItemStatus'
import ButtonRecharge from '@/components/Cards/Scoreboard/Settings/ButtonRecharge'

export  function SettingsDrawer({ }) {   
     
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
         
       


 return (

    <>


      
      <Row gutter={16} justify="start" >
      <Space>
      <Card title='Create New Game'>
           
              <Col span={30} className="gutter-row" >               
                <FormItemStatus  />   
              </Col> 
              <ButtonCreateGame/> 
              </Card> 
              </Space>            
             
              <SettingsPlayers/>
              
              <Card title='Clean board'>
              <Col span={2} className="gutter-row" >           
                <ButtonRecharge  />                   
            </Col>  
              </Card> 
         
                
      </Row>     

      
        
    </>
  
  )
    }