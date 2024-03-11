'use client'
import {useEffect, useState } from "react"; 
import {Space ,Flex, Badge, Tag } from 'antd';
import { DribbbleOutlined } from '@ant-design/icons';
import { UseTasks } from "../../../utils/ProviderContext";
import Player from "../shared/Player";
import TiebreakA from "../shared/TiebreakA";
import NextPageA from "../shared/NexPageA";
import NextPageB from "../shared/NextPageB";
import TiebreakB from "../shared/TiebreakB";
import SetsScore from "../shared/SetsScore";


// La parte de arriba del controller

export function HeroScoreboard() {

  const {
    PlayerA,
    PlayerB,
    PlayerC,
    PlayerD,
    ScoreA, 
    setScoreA, 
    ScoreB,
    setScoreB,
    setScoreSuma,
    GameA,
    GameB,
    TieScoreGameSets,
    ServeStart,
    doRestartGame,
    ScoreGameSets,
    setServeStart,
    getScoreboard,
    RefrescaCreateId,
    ScoreID,
    setScoreID,
  } = UseTasks();

  const [Cancha, setCancha] = useState(0);
  const [Controller, setController] = useState(0);

  let navigation = [
    {
      links: [
        { title: '0',  value: 0,  href: '/' },
        { title: '0',  value: 0,  href: '/set' },
        { title: '15', value: 15,  href: '/learning/cursos-recientemente' },
        { title: '30', value: 30,  href: '/learning/testimonials' },
        { title: '40', value: 40,  href: '/G' },
        { title: 'AD', value: 50,  href: '/ad' },
      ],
    },
  ]

  let TieNavigation = [
    {
      links: [
        { title: '0', value: 0,  href: '/' },
        { title: '0', value: 0,  href: '/set' },
        { title: '1', value: 1,  href: '/1' },
        { title: '2', value: 2,  href: '/2' },
        { title: '3', value: 3,  href: '/3' },
        { title: '4', value: 4,  href: '/4' },
        { title: '5', value: 5,  href: '/5' },
        { title: '6', value: 6,  href: '/learning/testimonials' },
        { title: '7', value: 7,  href: '/G' },
        { title: '8', value: 8,  href: '/8' },

        { title: '9',  value: 9,  href: '/9' },
        { title: '10', value: 10,  href: '/10' },
        { title: '11', value: 11,  href: '/11' },
        { title: '12', value: 12,  href: '/12' },
        { title: '13', value: 13,  href: '/13' },
        { title: '14', value: 14,  href: '/14' },
        { title: '15', value: 15,  href: '/15' },
        { title: '16', value: 16,  href: '/16' },
        { title: '17', value: 17,  href: '/17' },
        { title: '18', value: 18,  href: '/18' },

        { title: '19', value: 19,  href: '/19' },
        { title: '20', value: 20,  href: '/20' },
        { title: '21', value: 21,  href: '/21' },
        { title: '22', value: 22,  href: '/22' },
        { title: '23', value: 23,  href: '/23' },
        { title: '24', value: 24,  href: '/24' },
        { title: '25', value: 25,  href: '/25' },
        { title: '26', value: 26,  href: '/26' },
        { title: '27', value: 27,  href: '/27' },
        { title: '28', value: 28,  href: '/28' },

        { title: '29', value:'29',  href: '/29' },
        { title: '30', value:'30',  href: '/30' },
        { title: '31', value:'31',  href: '/31' },
        { title: '32', value:'32',  href: '/32' },
        { title: '33', value:'33',  href: '/33' },
        { title: '34', value:'34',  href: '/34' },
        { title: '35', value:'35',  href: '/35' },
        { title: '36', value:'36',  href: '/36' },
        { title: '37', value:'37',  href: '/37' },
        { title: '38', value:'38',  href: '/38' },
      ],
    },
  ]

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      setScoreID(localStorage.getItem("ScoreID"));
      setCancha( localStorage.getItem("Cancha") );
      setController( localStorage.getItem("Controller") );
    }
  }, []);

  useEffect(() => {
    setScoreSuma(Number(ScoreA) + Number(ScoreB))
  }, [ScoreA,ScoreB]);

  useEffect(() => {
      if(ScoreGameSets){
          doRestartGame();
      }
  }, [ScoreGameSets]);

  useEffect(() => {
    // getScoreboard();
    if (typeof window !== 'undefined' && window.localStorage) {
      setScoreID(localStorage.getItem("ScoreID"));
      setCancha( localStorage.getItem("Cancha") );
      setController( localStorage.getItem("Controller") );
    }
  }, [ScoreID]);


  return (
    <section className="flex flex-col justify-center items-center m-auto bg-slate-900 py-20">
      <div className="flex flex-row justify-center items-center w-full gap-[25%]">
        <div className="relative z-10 md:text-center lg:text-left">
          <Space  >
          {ServeStart &&
            <Badge
              offset={[10, 0]}
              count={
                <DribbbleOutlined
                  style={{
                    color: 'green',
                  }}
                />
              }
            >
            </Badge>
          }
          </Space>
          <Player PlayerA={PlayerA} PlayerB={PlayerB} />
          {!TieScoreGameSets && <NextPageA  Score={setScoreA} Navigation={navigation}  />}
          {TieScoreGameSets && <TiebreakA  Score={setScoreA} Navigation={TieNavigation}  />}
        </div>
        <div className="relative z-10 md:text-center lg:text-left">
          <Space>
          {!ServeStart &&
            <Badge
              offset={[10, 0]}
              count={
                <DribbbleOutlined
                  style={{
                    color: 'green',
                  }}
                />
              }
            >
            </Badge>
          }
          </Space>
          <Player PlayerA={PlayerC} PlayerB={PlayerD} />
          {!TieScoreGameSets && <NextPageB  Score={setScoreB} Navigation={navigation} />}
          {TieScoreGameSets && <TiebreakB  Score={setScoreB} Navigation={TieNavigation} />}
        </div>
      </div>
      <div className="relative z-10 md:text-center lg:text-center m-5">
        <SetsScore PlayerA={GameA} PlayerB={GameB} />
      </div>
      <div className="flex flex-row  justify-start items-center gap-20 w-[70%]">
        <Tag color="green">{ScoreID}</Tag>
        <Tag color="green">{Cancha}</Tag>
      </div>
    </section>

  )
}
