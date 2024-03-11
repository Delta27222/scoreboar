import React from "react";

  
export default function Timer(props) {
  return (
    <div className={`flex flex-row justify-center items-center gap-1 small_p:gap-3 relative`}>
      <div className="relative">
        <span className="text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl text-pink-primary font-united_kingdom z-20 mr-0">
          {("0" + Math.floor((props.time / 3600000) % 60)).slice(-2)}:
        </span>
        <span className="text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl absolute  text-yellow-primary font-united_kingdom z-10 ml-[-29px] small_p:top-0 small_p:ml-[-35px]  medium_p:ml-[-51px] medium_p:top-[1px]">
          {("0" + Math.floor((props.time / 3600000) % 60)).slice(-2)}:
        </span>
      </div>
      <span className="font-bold absolute top-[-1px] small_p:top-[-3px] left-[25px] small_p:left-[33px] medium_p:left-[46px] text-yellow-primary z-30">:</span>
      <span className="font-bold absolute top-[-1px] small_p:top-[-3px] left-[26px] small_p:left-[35px] medium_p:left-[48px] text-pink-primary z-10">:</span>
      <div className="relative">
        <span className="text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl text-pink-primary font-united_kingdom z-20">
          {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl absolute  text-yellow-primary font-united_kingdom z-10 ml-[-28.5px] small_p:top-0 small_p:ml-[-34px] medium_p:ml-[-50px] medium_p:top-[1px]">
          {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
        </span>
      </div>
      <span className="font-bold absolute top-[-1px] small_p:top-[-3px] left-[57px] small_p:left-[76px] medium_p:left-[105px] text-yellow-primary z-30">:</span>
      <span className="font-bold absolute top-[-1px] small_p:top-[-3px] left-[58px] small_p:left-[78px] medium_p:left-[107px] text-pink-primary z-10">:</span>
      <div className="relative">
        <span className="text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl text-pink-primary font-united_kingdom z-20">
          {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
        </span>
        <span className="text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl absolute  text-yellow-primary font-united_kingdom z-10 ml-[-25.5px] small_p:top-0 small_p:ml-[-31px] medium_p:ml-[-46px] medium_p:top-[1px]">
          {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
        </span>
      </div>
    </div>
  );
}
