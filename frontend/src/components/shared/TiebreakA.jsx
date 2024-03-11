
import { useRouter } from 'next/router'
import Link from 'next/link'
import {useEffect, useState} from "react"; 
import { CaretDownOutlined, CaretRightFilled } from '@ant-design/icons';
import { Button, Space, ConfigProvider, Card, Row, Col} from 'antd';
import { useTasks } from '../../../utils/ProviderContext';



const TiebreakA = ({ Score, Navigation}) => { 
  
  const {
    doTieScoreStatus, 
    ScoreA, 
    setScoreA, 
    ScoreB,
    setScoreB,
    ScoreSuma,
    setScoreSuma,
    loadingsA,
    setLoadingsA,
    setLoadingsB,
    ScoreAGameA,
    ScoreBGameB,
    ScoreGameSets,
    UpdateScoreboard} = useTasks();
         

  const [RefNavigation, setRefNavigation] = useState([]);
 
  let navigation = Navigation
      
        let allLinks = navigation.flatMap((section) => section.links)
        let linkIndex = allLinks.findIndex((link) => link.href === loadingsA)
        let previousPage = allLinks[linkIndex - 1]
        let nextPage = allLinks[linkIndex + 1]
       
        
  //  console.log(nextPage)
  useEffect(() => {          

    Score(nextPage.value)   

    if (typeof window !== "undefined" && window.localStorage){
      localStorage.setItem("ScoreA", nextPage.title);
      UpdateScoreboard();
    }

    

  }, [linkIndex]);

   //console.log( ScoreA,ScoreB, ScoreSuma)
//    console.log(ScoreA)
   
  return (
    <div className="grid grid-cols-1 gap-1 m-0">
      <div className="col-span-6 sm:col-span-1 text-center">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'blue',
              colorText: 'blue',
              borderRadius: 6,
              colorBgContainer: '#f6ffed',
              fontSize: 115,
              controlHeight: 130,
              contentFontSize: 50,
            },
          }}
        >
          <Space>
            <Button
              type="default"
              onClick={() => {
                if (ScoreSuma === 50) {
                  setLoadingsA('/G');
                } else if (ScoreA >= 7 && ScoreA - ScoreB >= 2) {
                  doTieScoreStatus(true);
                } else {
                  setLoadingsA(nextPage.href);
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
              colorPrimary: 'blue',
              colorText: 'blue',
              borderRadius: 6,
              colorBgContainer: '#f6ffed',
            },
          }}
        >
          <Space>
            <Button
              type="primary"
              icon={<CaretDownOutlined />}
              onClick={() => {
                if (linkIndex === 0) {
                  setLoadingsA('/');
                } else {
                  setLoadingsA(previousPage.href);
                }
              }}
            ></Button>
          </Space>
        </ConfigProvider>
      </div>
    </div>
  );
}

export default TiebreakA