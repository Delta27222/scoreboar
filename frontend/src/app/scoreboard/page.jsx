'use client'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Image from 'next/image';
import { Layout } from 'antd';
import { TimerScore } from "../../components/scoreboard/TimerScore";
import { SponsorSection } from "../../components/scoreboard/SponsorSection";
import { MarcadorSection } from "../../components/scoreboard/MarcadorSection";
import { TimeSection } from "../../components/scoreboard/TimeSection";
import { Menu } from "../../components/scoreboard/Menu";
import { useTasks } from '../../../utils/ProviderContext';

const ScoreBoard = () => {
  const {
    PlayerA,
    setPlayerA,
    PlayerB,
    setPlayerB,
    PlayerC,
    setPlayerC,
    PlayerD,
    setPlayerD,

    setScoreSuma,
    GameA,
    GameB,
    TieScoreGameSets,
    ServeStart,
    setServeStart,
    doRestartGame,
    ScoreGameSets,
    handleSave,
    handleClear,
    handleRemove,
    SetsGame,

    userData,
    keys,
    length,
    setUsername,
    setUserId,
    setUserData,
    setKeys,
    setLength,

    ResultsPlayerA1,
    getScorePointsboard,
    timerSeconds,
    setTimerSeconds,

    isActive,
    isPaused,
    time,
    setIsActive,
    setIsPaused,
    setTime
  } = useTasks();

  const [ScoreA, setScoreA] = useState(0);
  const [ScoreB, setScoreB] = useState(0);

  const [ScoreID, setScoreID] = useState(0);
  const [Cancha, setCancha] = useState(0);

  const [ResultPlayerASet1, setResultPlayerASet1] = useState(0);
  const [ResultPlayerBSet1, setResultPlayerBSet1] = useState(0);

  const [ResultPlayerASet2, setResultPlayerASet2] = useState(0);
  const [ResultPlayerBSet2, setResultPlayerBSet2] = useState(0);

  const [ResultPlayerASet3, setResultPlayerASet3] = useState(0);
  const [ResultPlayerBSet3, setResultPlayerBSet3] = useState(0);

  const [StartServeOp, setStartServeOp] = useState(ServeStart);

  const [TimeComponent, setTimeComponent] = useState();

  const [PlayerVideo, setPlayerVideo] = useState();

  const [TimeGame, setTimeGame] = useState();

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };

  const { Content } = Layout;

  //#########################Hay que cambiar esta logica para que en la peticion a la api se traigra el valor para que inciie el timer
  const getDeadTime = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      console.log('Service Time-> ',localStorage.getItem('ServiceTime'))
      const TimeData = JSON.parse(localStorage.getItem('ServiceTime'));
      const TimeSeg= TimeData ? TimeData.TimerSeconds : 0;
      return TimeSeg;
    }
  }

  useEffect(() => {
    setTimeComponent(<TimerScore  TimerSeconds={getDeadTime()} />);
  }, [timerSeconds]);
  //#########################Hay que cambiar esta logica para que en la peticion a la api se traigra el valor para que inciie el timer

  useEffect(() => {
    setPlayerVideo(
      <ReactPlayer
      url='https://app.emmanuelruiz.website/uploads/VID_20231103_26e7e46f0c.mp4?updated_at=2023-11-03T18:41:03.563Z'
      className='object-cover p-0 m-0'
      playing={true}
      controls={false}
      loop={true}
      muted={true}
      playsinline={true}
      onReady={onLoadedData}
      width={'100%'}
      height={'100%'}
    />
    );
  }, []);

  const [canchaName, setCanchaName] = useState('Cancha1');
  useEffect(() => {
    localStorage.setItem('canchaName', canchaName);
  }, [canchaName]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`http://localhost:1383/api/scoreboards?filters[Active][$eq]=true&filters[Cancha][$eq]=${localStorage.getItem('canchaName')}&populate=%2A&sort=id:DESC`)
      .then(response => response.json()) // Corregido: response.json() aquí
      .then(data => {
        const dataEx = data.data[0].attributes;

        /**TimerGame***************** cambiarrrrrrrrrrrrrrrrrrrrrr */
        setTimerSeconds(getDeadTime());

        setScoreA(dataEx.scorea);
        setScoreB(dataEx.scoreb);
        setStartServeOp(dataEx.ServiceStart);

        setResultPlayerASet1(dataEx.SET1.ResultPlayerA);
        setResultPlayerBSet1(dataEx.SET1.ResultPlayerB);

        setResultPlayerASet2(dataEx.SET2.ResultPlayerA);
        setResultPlayerBSet2(dataEx.SET2.ResultPlayerB);

        setResultPlayerASet3(dataEx.SET3.ResultPlayerA);
        setResultPlayerBSet3(dataEx.SET3.ResultPlayerB);

        setPlayerA(dataEx.Players.PlayerA);
        setPlayerB(dataEx.Players.PlayerB);
        setPlayerC(dataEx.Players.PlayerC);
        setPlayerD(dataEx.Players.PlayerD);

        })
        .catch(error => {
          // Manejar errores
          console.error('Error en la petición:', error);
        });
        return () => clearInterval(interval);
    }, 500);  //##############Cambiar cuan rapido se desea que se actualice la informacion###################
  }, []);

  return (
    <section className='h-[100vh] bg-blue-back relative flex flex-col justify-start mt-12 ultra_large_p:mt-0 ultra_large_p:justify-center items-center overflow-hidden w-[100%]'>
      <div className=' hidden ultra_large_p:flex absolute left-[0] top-0  h-screen'>
        {PlayerVideo}
      </div>                                                                                 {/*  cambiar esto para que no choque con el video */}
      <div className='flex flex-col justify-center items-center relative gap-5 ultra_large_p:gap-10 ultra_large_p:ml-[75%] ultra_large_p2:ml-[73%] ultra_large_m:ml-[70%] ultra_large_p:items-start ultra_large_p:mt-5 w-[100%] ultra_large_p:max-w-[100%]'>
        {/* Menu -> TODO -> Falta mejorar esto, que se mueve mucho*/}
        <header className='small_g5:w-[90%] small_g5:flex small_g5:justify-end small_g5:items-end ultra_large_p:w-[61.5%]'>
          <Menu canchaName={canchaName} setCanchaName={setCanchaName}/>
        </header>
        {/*Sponsors */}
        <section className='ultra_large_p:ml-24 '>
          <SponsorSection url={'/images/project/Recurso13.png'} alt={'sponsor1'} width={250} height={250} className={''} classNameImg={'small_p:w-[300px] small_m:w-[350px] small_g:w-[400px] medium_p:w-[480px] '}/>
        </section>
        {/* Marcador */}                                                                                                                                                {/*  cambiar esto */}
        <section className='relative flex flex-col justify-start items-start  gap-20 w-[100%] pl-[10%] pr-[5%] ultra_large_p:pl-0 ultra_large_p:pr-0 ultra_large_p:flex-row ultra_large_p:gap-5 ultra_large_p:w-[100%]  ultra_large_p:scale-75 ultra_large_p:right-[7%] ultra_large_p2:right-[8%] ultra_large_m:right-[8%] ultra_large_g:right-[8.5%]'>
          <MarcadorSection
            Cancha={canchaName}
            PlayerA={PlayerA}
            PlayerB={PlayerB}
            PlayerC={PlayerC}
            PlayerD={PlayerD}
            ResultPlayerASet1={ResultPlayerASet1}
            ResultPlayerASet2={ResultPlayerASet2}
            ResultPlayerASet3={ResultPlayerASet3}
            ResultPlayerBSet1={ResultPlayerBSet1}
            ResultPlayerBSet2={ResultPlayerBSet2}
            ResultPlayerBSet3={ResultPlayerBSet3}
            ScoreA={ScoreA}
            ScoreB={ScoreB}
            StartServeOp={StartServeOp}
          />
        </section>
        {/* Timer */}
        <section className='flex flex-row justify-center items-center gap-7 medium_p:gap-28 medium_g:gap-36 large_g:gap-28 large_p:ml-14'>
          <TimeSection TimeComponent={TimeComponent} />
        </section>
        {/* Sponsors */}
        <section className='ultra_large_p:ml-24 '>
          <SponsorSection url={'/images/project/Recurso14.png'} alt={'sponsor2'} width={250} height={250} className={'flex flex-col justify-center items-center'} classNameImg={'small_p:w-[300px] small_m:w-[350px] small_g:small_m:w-[400px] medium_p:w-[480px]'}/>
        </section>
      </div>
    </section>
  )
}

export default ScoreBoard

