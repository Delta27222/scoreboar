
import {useEffect, useState} from "react"; 
import { CaretDownOutlined, CaretRightFilled } from '@ant-design/icons';
import { Button, Space, ConfigProvider, Card, Row, Col} from 'antd';
import { UseTasks } from "../../../utils/ProviderContext";



const TiebreakB = ({ Score, Navigation}) => { 
  
  const { 
    doTieScoreStatus,
    ScoreA, 
    setScoreA, 
    ScoreB,
    setScoreB,
    ScoreSuma,
    setScoreSuma,
    loadingsB,
    setLoadingsB,
    setLoadingsA,
    UpdateScoreboard
  } = UseTasks();
         
 
  const [RefNavigation, setRefNavigation] = useState([]);
 
  let navigation = Navigation 
      
        let allLinks = navigation.flatMap((section) => section.links)
        let linkIndex = allLinks.findIndex((link) => link.href === loadingsB)
        let previousPage = allLinks[linkIndex - 1]
        let nextPage = allLinks[linkIndex + 1]
       
        useEffect(() => {          

          Score(nextPage.value)          
          if (typeof window !== "undefined" && window.localStorage){
            localStorage.setItem("ScoreB", nextPage.title);  
            UpdateScoreboard();   
          }     
          
    
        }, [linkIndex]);
           
  
   
  return (  
    
    <>      
   
  
  
   <div className="grid grid-cols-1 gap-1 m-0">               

         
               <div className="col-span-6 sm:col-span-1 text-center">                
                 <ConfigProvider
                    theme={{
                      token: {       
                        colorPrimary: 'blue',
                        colorText:'blue',
                        borderRadius: 6,       
                        colorBgContainer: '#f6ffed',
                        fontSize:115,
                        controlHeight:130,
                        contentFontSize:50

                      },
                    }}
                  >
                  <Space>
                  <Button 
                    type="default" 
                    //icon= {<CaretRightFilled />}
                      onClick={() => {           
                        
                        ScoreSuma ===14 ? setLoadingsB('/G')  :                        
                        ScoreB >=7 && ScoreB-ScoreA>=2 ? doTieScoreStatus(true) : 
                        setLoadingsB(nextPage.href)
                        
                        
                      }}  
                    >{nextPage.title }</Button>
                  </Space>
                </ConfigProvider>
                
                
              </div>
          
      
    
              <div className="col-span-6 sm:col-span-1 text-center"> 
               <ConfigProvider
                    theme={{
                      token: {       
                        colorPrimary: 'blue',
                        colorText:'blue',
                        borderRadius: 6,       
                        colorBgContainer: '#f6ffed',
                        
                      },
                    }}
                  >
                  <Space>
                  <Button 
                    type="primary" 
                    icon= {<CaretDownOutlined />}
                        onClick={() => {    
                          linkIndex ==0 ?  setLoadingsB('/') : setLoadingsB(previousPage.href)            
                          
                    }}  
                    ></Button>
                  </Space>
                </ConfigProvider>
              
               

                 
                
              </div>
          
                  
               
  </div>        
      
                      
      

            
    </>
   
  )
}

export default TiebreakB