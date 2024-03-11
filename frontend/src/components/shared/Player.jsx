import { Flex } from 'antd';
import { UseTasks } from '../../../utils/ProviderContext';

const Player = ({PlayerA, PlayerB}) => {   
         
  const { 
   ChangeEnd,
   

  } = UseTasks();


  const Player = ChangeEnd ? `${PlayerA}-${PlayerB}` : `${PlayerB}-${PlayerA}`
  
  
  return (  
    
    <>      
           
    <Flex gap="middle" vertical>     
    <Flex vertical={'vertical'} justify={"center"}>
   
           <div className="grid grid-cols-1 gap-1 m-0">                
                <div className="col-span-6 sm:col-span-1"> 
                <header className="mb-1 space-y-1">
                    <h1 className="font-display text-xs text-center tracking-tight text-slate-100 dark:text-white">  {Player} </h1>
                    <p className="font-display text-sm font-medium text-blue-500"></p>
                </header>
                </div>           
          </div>
        
          </Flex>
    </Flex>

            
    </>
   
  )
}

export default Player