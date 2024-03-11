import React from 'react'
import { TimerGame } from "../../components/scoreboard/TimerGame";

export const TimeSection = ({ TimeComponent }) => {
  const timer = "00:00";
  const [minutos, segundos] = timer.split(":");

  console.log("Minutos:", minutos);
  console.log("Segundos:", segundos);

  //Lo anterior puede que funcione

  return (
    <>
      <article className='flex flex-col justify-center items-center gap-3 '>
        <p className=' text-[10px] small_p:text-[14px] small_m:text-[16px] small_g:text-[18px] text-white bottom-[65px] whitespace-nowrap font-united_kingdom -left-3' >TIEMPO DE SERVICIO</p>
        <div className="px-10 py-3 bg-blue-back2 text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl ">
          <TimerGame TSActive={true} TSPaused={false} />
        </div>
      </article>
      <article className='flex flex-col justify-center items-center gap-3'>
        <p className=' text-[10px] small_p:text-[14px] small_m:text-[16px] small_g:text-[18px] text-white bottom-[65px] whitespace-nowrap font-united_kingdom -left-10' >TIEMPO DE SERVICIO</p>
        <div className='px-10 py-3 bg-blue-back2 min-w-[160px] flex flex-col justify-center items-center'>
          <div className='relative'>
            <p className="text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl text-pink-primary font-united_kingdom z-20">{TimeComponent} </p>
            <p className="text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl absolute text-yellow-primary  font-united_kingdom z-10 top-0 ml-[-3px]">{TimeComponent} </p>
          </div>
        </div>
      </article>
    </>
  )
}

