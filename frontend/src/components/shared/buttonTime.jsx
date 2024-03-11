'use client'
import {useEffect, useState} from "react"; 
import { useTasks } from "../../../utils/ProviderContext";
import { SaveOutlined, FieldTimeOutlined  } from '@ant-design/icons';
import { Button, Space, Modal } from 'antd';



const buttonTime = ({label, TimerSeconds}) => {   
    
    const {          
      doResetGame,     
      UpdateScoreboard,
       } = useTasks(); 

       
        
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

       const { confirm } = Modal;
       const showConfirm = (IdIMG) => {
        confirm({        
          title: 'You want to start the selected time?',
          icon: <FieldTimeOutlined />,
          content: '',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
  
          onOk() {
                       
         
            if (typeof window !== "undefined" && window.localStorage){
                localStorage.setItem(
                    "ServiceTime",
                      JSON.stringify({             
                          status: true,
                          TimerSeconds: TimerSeconds ? TimerSeconds : 0,                   
                      })
                  );

                  
                 
                
              }

              UpdateScoreboard();
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };    
   
  return (  
    
    <>      
   
        
   <div className="grid grid-cols-1 gap-1 m-1">                        
        <div className="col-span-6 sm:col-span-1">         
       
      <Space direction="vertical">    

          <Space wrap>  

         
          <Button 
              onClick={() => {                             
                      
                enterLoading(2);
                showConfirm( );         
                }} 
              loading={loadings[2]}
              icon={<FieldTimeOutlined  style={{ fontSize: '16px', color: '#00b96b' }}  />}>{label}
            </Button> 
          
          </Space>
      </Space>  
  
                  
      </div>             
  </div>        
      
    

            
    </>
   
  )
}

export default buttonTime