import Image from "next/image";
import React, { useEffect } from "react";
import { Badge } from "antd";
import { DribbbleOutlined } from '@ant-design/icons';
import { capitalLetters, getCanchaNumber } from "../../../utils/strings";

export const MarcadorSection = (
  {
    Cancha,
    PlayerA,
    PlayerB,
    PlayerC,
    PlayerD,
    ResultPlayerASet1,
    ResultPlayerASet2,
    ResultPlayerASet3,
    ResultPlayerBSet1,
    ResultPlayerBSet2,
    ResultPlayerBSet3,
    ScoreA,
    ScoreB,
    StartServeOp
  }) => {

  return (
    <>
      {/* Score Arriba */}
      <div className='relative w-full ultra_large_p:w-[23%] ultra_large_p2:w-[25%] ultra_large_m:w-[27%]'>
        <header className='bg-white top-[-35px] px-10 py-2 w-fit  large_p:absolute large_p:top-[-46px] ultra_large_p:top-[-47px] '>
          <p id="id_cancha" className=' font-united_kingdom text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl text-blue-back'>Cancha {!Cancha ? '#' : getCanchaNumber(Cancha)}</p>
        </header>
        <div className=''> {/* cambiar ese w para el tamano en medium_g */}
          <div className=" border-white border-[2.5px] border-b-[0] p-2 py-4 small_p:p-3 small_m:p-4 small_g:p-5 relative h-[50px] small_p:h-[60px] small_m:h-[70px] small_g:h-[80px] medium_p:h-[90px] medium_m:h-[100px] large_p:h-[90px] flex flex-col justify-center">
            <p className='font-bold text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl medium_m:text-3xl large_p:text-3xl ultra_large_p:text-2xl text-white' style={{ whiteSpace: 'nowrap' }}>{PlayerA ? capitalLetters(PlayerA) : 'NOMBRE APELLIDO'}</p>
            <p className='font-bold text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl medium_m:text-3xl large_p:text-3xl ultra_large_p:text-2xl text-white' style={{ whiteSpace: 'nowrap' }}>{PlayerB ? capitalLetters(PlayerB) : 'NOMBRE APELLIDO'}</p>
            {true
              ? <Badge
                  className='absolute bottom-0 right-0 pr-2 pb-2 large_p:pr-3 large_p:pb-3'
                  count={
                    <DribbbleOutlined
                      className="text-lg small_p:text-xl small_m:text-2xl small_g:text-3xl medium_m:text-4xl  ultra_large_p:text-4xl "
                      style={{
                        color: '#FB035B',
                        width:'auto'
                      }}
                    />
                  }
                >
                </Badge>
              : null}
              <p className='absolute text-xl small_p:text-2xl small_m:text-3xl small_g:text-4xl medium_p:text-[35px] medium_m:text-[38px] large_p:text-[41px] ultra_large_g:text-[34px] text-white small:left-[-25px] small_p:left-[-30px] small_m:left-[-35px] small_g:left-[-40px] medium_p:left-[-50px] medium_p:top-7 medium_m:left-[-55px]  large_p:left-[-60px] ultra_large_g:left-[-50px] ultra_large_p:top-6 font-united_kingdom  '>A</p>
          </div>
        </div>
        <div className=''>{/* cambiar ese w para el tamano en medium_g */}
          <div className=" border-white border-[2.5px]  p-2 py-4 small_p:p-3 small_m:p-4 small_g:p-5 relative h-[50px] small_p:h-[60px] small_m:h-[70px] small_g:h-[80px] medium_p:h-[90px] medium_m:h-[100px] large_p:h-[90px] flex flex-col justify-center">
            <p className='font-bold text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl medium_m:text-3xl ultra_large_p:text-2xl text-white' style={{ whiteSpace: 'nowrap' }}>{PlayerC ? capitalLetters(PlayerC) : 'NOMBRE APELLIDO'}</p>
            <p className='font-bold text-sm small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl medium_m:text-3xl ultra_large_p:text-2xl text-white' style={{ whiteSpace: 'nowrap' }}>{PlayerD ? capitalLetters(PlayerD) : 'NOMBRE APELLIDO'}</p>
            {StartServeOp==''
              ? <Badge
                  className='absolute bottom-0 right-0 pr-6 pb-6'
                  count={
                    <DribbbleOutlined
                      style={{
                        color: '#FB035B',
                        fontSize:'1%',
                        width:'auto'
                      }}
                    />
                  }
                >
                </Badge>
              : null}
              <p className='absolute text-xl small_p:text-2xl small_m:text-3xl small_g:text-4xl medium_p:text-[35px] medium_m:text-[38px] large_p:text-[41px] ultra_large_g:text-[34px] text-white small:left-[-25px] small_p:left-[-30px] small_m:left-[-35px] small_g:left-[-40px] medium_p:left-[-50px] medium_p:top-7 medium_m:left-[-55px]  large_p:left-[-60px] ultra_large_g:left-[-50px] ultra_large_p:top-6 font-united_kingdom '>B</p>
          </div>
        </div>
      </div>
      {/* Score abajo */}
      <div className='flex flex-row gap-2 large_p:mr-20 w-[85%] small_p:w-[87%] small_m:w-[88%] small_g:w-[89.5%] small_g2:w-[90%] small_g3:w-[91%] small_g4:w-[92%] small_g5:w-[92.5%] medium_p:w-[90%] medium_m:w-[88.5%] medium_g:w-[89.5%] large_p:w-[89%] large_m:w-[90%] large_g:w-[90.5%] ultra_large_p:w-[40%]'>
        <div className="grid grid-rows-2 grid-flow-col w-full">                                                {/* cambuiar ese w para el tamano */}
          <div className="border-white border-[2.5px] border-r-[0] border-b-[0] p-2 small_p:p-3 small_m:p-4 small_g:p-5 medium_p:p-6 flex justify-center items-center  w-full h-[50px] small_p:h-[60px] small_m:h-[70px] small_g:h-[80px] medium_p:h-[90px] medium_m:h-[100px] large_p:h-[90px] relative">
            <p className='absolute text-xs small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl text-white bottom-[55px] small_p:bottom-[65px] small_m:bottom-[75px] small_g:bottom-[85px] medium_p:bottom-[95px] medium_m:bottom-[105px] large_p:bottom-[105px] font-united_kingdom ultra_large_p:text-lg'>SET 1</p>
            <p className='absolute text-xl small_p:text-2xl small_m:text-3xl small_g:text-4xl medium_p:text-[35px] medium_m:text-[38px] large_p:text-[41px] text-white small:left-[-25px] small_p:left-[-30px] small_m:left-[-35px] small_g:left-[-40px] medium_p:left-[-50px] medium_p:top-7 medium_m:left-[-55px]  ultra_large_p:hidden font-united_kingdom '>A</p>
            <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px]  text-yellow-primary font-united_kingdom z-20">{ResultPlayerASet1}</p>
            <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px]  absolute text-pink-primary font-united_kingdom z-10 ml-[10px]">{ResultPlayerASet1}</p>
          </div>
          <div className="border-white border-[2.5px] border-r-[0] p-2 small_p:p-3 small_m:p-4 small_g:p-5 flex justify-center items-center  w-full h-[50px] small_p:h-[60px] small_m:h-[70px] small_g:h-[80px] medium_p:h-[90px] medium_m:h-[100px] large_p:h-[90px] relative">
            <p className='absolute text-xl small_p:text-2xl small_m:text-3xl small_g:text-4xl medium_p:text-[35px] medium_m:text-[38px] large_p:text-[41px] text-white small:left-[-25px] small_p:left-[-30px] small_m:left-[-35px] small_g:left-[-40px] medium_p:left-[-50px] medium_p:top-7 medium_m:left-[-55px]  ultra_large_p:hidden font-united_kingdom '>B</p>
            <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px]  text-yellow-primary font-united_kingdom z-20">{ResultPlayerBSet1}</p>
            <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px]  absolute text-pink-primary font-united_kingdom z-10 ml-[10px]">{ResultPlayerBSet1}</p>
          </div>
          <div className="border-white border-[2.5px] border-r-[0] border-b-[0] p-2 small_p:p-3 small_m:p-4 small_g:p-5 medium_p:p-6 flex justify-center items-center  w-full h-[50px] small_p:h-[60px] small_m:h-[70px] small_g:h-[80px] medium_p:h-[90px] medium_m:h-[100px] large_p:h-[90px] relative">
            <p className='absolute text-xs small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl text-white bottom-[55px] small_p:bottom-[65px] small_m:bottom-[75px] small_g:bottom-[85px] medium_p:bottom-[95px] medium_m:bottom-[105px] large_p:bottom-[105px] font-united_kingdom ultra_large_p:text-lg'>SET 2</p>
            <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px] text-yellow-primary font-united_kingdom z-20">{ResultPlayerASet2}</p>
            <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px] absolute text-pink-primary font-united_kingdom z-10 ml-[10px]">{ResultPlayerASet2}</p>
          </div>
          <div className="border-white border-[2.5px] border-r-[0] p-2 small_p:p-3 small_m:p-4 small_g:p-5 flex justify-center items-center  w-full h-[50px] small_p:h-[60px] small_m:h-[70px] small_g:h-[80px] medium_p:h-[90px] medium_m:h-[100px] large_p:h-[90px] relative">
            <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px] text-yellow-primary font-united_kingdom z-20">{ResultPlayerBSet2}</p>
            <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px] absolute text-pink-primary font-united_kingdom z-10 ml-[10px]">{ResultPlayerBSet2}</p>
          </div>
          <div className="border-white border-[2.5px]  border-b-[0] p-2 small_p:p-3 small_m:p-4 small_g:p-5 medium_p:p-6 flex justify-center items-center w-full h-[50px] small_p:h-[60px] small_m:h-[70px] small_g:h-[80px] medium_p:h-[90px] medium_m:h-[100px] large_p:h-[90px] relative">
            <p className='absolute text-xs small_p:text-base small_m:text-lg small_g:text-xl medium_p:text-2xl text-white bottom-[55px] small_p:bottom-[65px] small_m:bottom-[75px] small_g:bottom-[85px] medium_p:bottom-[95px] medium_m:bottom-[105px] large_p:bottom-[105px] font-united_kingdom ultra_large_p:text-lg'>SET 3</p>
            <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px]  text-yellow-primary font-united_kingdom z-20">{ResultPlayerASet3}</p>
            <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px]  absolute text-pink-primary font-united_kingdom z-10 ml-[10px]">{ResultPlayerASet3}</p>
          </div>
          <div className="border-white border-[2.5px] p-2 small_p:p-3 small_m:p-4 small_g:p-5 flex justify-center items-center  w-full h-[50px] small_p:h-[60px] small_m:h-[70px] small_g:h-[80px] medium_p:h-[90px] medium_m:h-[100px] large_p:h-[90px] relative">
            <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px] text-yellow-primary font-united_kingdom z-20">{ResultPlayerBSet3}</p>
            <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px] absolute text-pink-primary font-united_kingdom z-10 ml-[10px]">{ResultPlayerBSet3}</p>
          </div>
        </div>
        <div className='flex flex-row relative '>
          <div className='grid grid-rows-2 grid-flow-col'>
            <div className="bg-pink-primary w-14 pl-4 flex justify-center items-center z-30 medium_p:w-[75px] medium_m:w-[93px] large_p:w-[100px] ">
              <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px] text-blue-back font-united_kingdom">{ScoreA}</p>
            </div>
            <div className={`h-[2.5px] min-w-[90px] border-blue-back border-2 z-40 absolute top-[50%] medium_p:min-w-[115px] medium_m:min-w-[140px] large_p:min-w-[150px]`}></div>
            <div className="bg-pink-primary w-14 pl-4 flex justify-center items-center z-30 medium_p:w-[75px] medium_m:w-[93px] large_p:w-[100px] ">
              <p className="font-bold text-[30px] small_p:text-[35px] small_m:text-[40px] small_g:text-[45px] medium_p:text-[55px] medium_m:text-[60px] large_p:text-[55px] ultra_large_p:text-[45px] text-blue-back font-united_kingdom">{ScoreB}</p>
            </div>
          </div>
          <Image
            className="absolute w-full h-[101%] left-[53px] z-10 medium_p:left-[74px] medium_m:left-[91px] medium_g:left-[90px] large_p:left-[98px]"
            src={'/images/project/score3.png'}
            alt=""
            width={174}
            height={180}
            unoptimized
            priority
          />
        </div>
      </div>
    </>
  );
}


