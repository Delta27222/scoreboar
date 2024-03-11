
import {useEffect } from "react";
import { Button, Space, Row, Col } from 'antd';
import { MinusOutlined } from '@ant-design/icons'
import { useTasks } from "../../../utils/ProviderContext";



const SetsScore = ({PlayerA, PlayerB}) => {
  const {
    GameA,
    GameB,
    SetsGame,
    setGameA,
    setGameB,
    ScoreBGameB,
    ScoreAGameA,
    doSetsScorehandleSaveA,
    doSetsScorehandleSaveB,
    setRestaGameSetsA,
    RestaGameSetsA,
    setRestaGameSetsB,
    RestaGameSetsB,
    UpdateScoreboard
  } = useTasks();

  useEffect(() => {
    doSetsScorehandleSaveA();
    UpdateScoreboard();
  }, [RestaGameSetsA]);

  useEffect(() => {
    doSetsScorehandleSaveB();
    UpdateScoreboard();
  }, [RestaGameSetsB]);

  return (
    <Row gutter={16} justify="center" >
      <Space>
        <Button
          type="primary"
          icon= {<MinusOutlined />}
          onClick={() => {
            GameA>0 ? setGameA(GameA-1) : setGameA(GameA);  
            doSetsScorehandleSaveA();
            ScoreAGameA.pop();
            setRestaGameSetsA(!RestaGameSetsA);
            UpdateScoreboard()
          }}
        ></Button>
        <Col span={4} className="gutter-row" >
          <div className="grid grid-cols-1 gap-1 m-0">
            <div className="col-span-6 sm:col-span-1">
              <header className="mb-1 space-y-1">
                <h1 className="font-display text-3xl text-center tracking-tight text-slate-100 dark:text-white">  {PlayerA}   </h1>
                <p className="font-display text-sm font-medium text-blue-500"></p>
              </header>
            </div>
          </div>
        </Col>
        <Col span={2} className="gutter-row" >
          <div className="grid grid-cols-1 gap-1 m-0">
            <div className="col-span-6 sm:col-span-1">
              <header className="mb-1 space-y-1">
                <h1 className="font-display text-3xl text-center tracking-tight text-slate-100 dark:text-white">  {PlayerB}  </h1>
                <p className="font-display text-sm font-medium text-blue-500"></p>
              </header>
            </div>
          </div>
        </Col>
        <Button
          type="primary" 
          icon= {<MinusOutlined />}
          onClick={() => {
            GameB>0 ? setGameB(GameB-1) : setGameB(GameB);
            doSetsScorehandleSaveB();
            ScoreBGameB.pop();
            setRestaGameSetsB(!RestaGameSetsB);
            UpdateScoreboard()
          }}
        ></Button>
      </Space>
    </Row>
  )
}
export default SetsScore