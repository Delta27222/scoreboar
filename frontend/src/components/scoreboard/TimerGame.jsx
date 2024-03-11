
import {useEffect, useRef, useState } from "react"; 
import { UseTasks } from "../../../utils/ProviderContext";
import {ConfigProvider,Tag } from 'antd';
import {ArrowUpOutlined, ArrowDownOutlined, UpOutlined  } from '@ant-design/icons';
import Timer from "./Timer";


export  function TimerGame({TSeconds, TimerSeconds}) {  

    const { 
        isActive,
        isPaused,
        time,
        setIsActive,
        setIsPaused,
        setTime
    } = UseTasks();

    useEffect(() => {
      let interval = null;

      if (isActive && isPaused === false) {
        interval = setInterval(() => {
          setTime((time) => time + 10);
        }, 10);
      } else {
        clearInterval(interval);
      }
      return () => {
        clearInterval(interval);
      };
    }, [isActive, isPaused]);
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };
  return (
    <>
      <ConfigProvider
        theme={{
            token: {
                fontSize:100,
                lineWidth:0,
                lineHeight:1.20
            },
            components: {
              Table: {},
            },
        }}
      >
       <Timer time={120000} />   {/*  cambiar esto para que funcione*/}
      </ConfigProvider>
    </>
  );
}