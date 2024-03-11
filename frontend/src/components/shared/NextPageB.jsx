
import { useRouter } from 'next/router'
import Link from 'next/link'
import {useEffect, useState} from "react"; 
import { CaretDownOutlined,  } from '@ant-design/icons';
import { Button, Space, ConfigProvider} from 'antd';
import { UseTasks } from '../../../utils/ProviderContext';



const NextPageB = ({ Score, Navigation}) => { 
  
  const { 
    doScoreStatus,
    ScoreA, 
    setScoreA, 
    ScoreB,
    setScoreB,
    ScoreSuma,
    setScoreSuma,
    loadingsB,
    setLoadingsB,
    handleSave,
    UpdateScoreboard,
    
  
  } = UseTasks();
         
 
  const [RefNavigation, setRefNavigation] = useState([]);
 
  let navigation = Navigation 

  const [escore, setEscore] = useState(0);
      
        let allLinks = navigation.flatMap((section) => section.links)
        let linkIndex = allLinks.findIndex((link) => link.href === loadingsB)
        let previousPage = allLinks[linkIndex - 1]
        let nextPage = allLinks[linkIndex + 1]
       
        useEffect(() => {          

          Score(nextPage.value)
          handleSave();
          if (typeof window !== "undefined" && window.localStorage){
            localStorage.setItem("ScoreB", nextPage.title);  
            UpdateScoreboard();        
          }     
          
        }, [linkIndex]);
           
  
   
  return (
    <div>
      <div className="grid grid-cols-1 gap-1 m-0">
        <div className="col-span-6 sm:col-span-1 text-center">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#00b96b',
                colorText: '#00b96b',
                borderRadius: 6,
                colorBgContainer: '#f6ffed',
                fontSize: 110,
                controlHeight: 130,
                contentFontSize: 50
              }
            }}
          >
            <Space>
              <Button
                type="default"
                onClick={() => {
                  if (ScoreSuma === 80) {
                    setLoadingsB('/G');
                  } else if (linkIndex < 3) {
                    setLoadingsB(nextPage.href);
                  } else if (ScoreSuma === 90 && ScoreA === 50 && ScoreB === 40) {
                    doScoreStatus(true);
                  } else {
                    doScoreStatus(false);
                  }
                }}
              >
                {nextPage.title}
              </Button>
            </Space>
          </ConfigProvider>
        </div>

        <div className="col-span-6 sm:col-span-1 text-center">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#00b96b',
                colorText: '#00b96b',
                borderRadius: 6,
                colorBgContainer: '#f6ffed'
              }
            }}
          >
            <Space>
              <Button
                type="primary"
                icon={<CaretDownOutlined />}
                onClick={() => {
                  if (linkIndex === 0) {
                    setLoadingsB('/');
                  } else {
                    setLoadingsB(previousPage.href);
                  }
                }}
              ></Button>
            </Space>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default NextPageB