
import { useState} from "react"; 
import { useTasks } from "../../../utils/ProviderContext";
import { SaveOutlined  } from '@ant-design/icons';
import { Button, Space } from 'antd';



const ButtonSavePlayes = ({}) => {   
    
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
   
  return (  
    
    <>      
   
        
   <div className="grid grid-cols-1 gap-1 m-1">                        
        <div className="col-span-6 sm:col-span-1">         
       
      <Space direction="vertical">    

          <Space wrap>  

         
          <Button 
              onClick={() => {                             
                UpdateScoreboard();      
                enterLoading(2);            
                }} 
              loading={loadings[2]}
              icon={<SaveOutlined />}>Save
            </Button> 
          
          </Space>
      </Space>  
  
                  
      </div>             
  </div>        
      
    

            
    </>
   
  )
}

export default ButtonSavePlayes