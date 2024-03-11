'use client'
import { useState, createContext, useContext } from "react";
import { fetchAPI } from "./api";

export const UserContext = createContext({ isAuthenticated: false });
export const UseTasks = () => useContext(UserContext);




const UserProvider = ({ children }) => {

  async function ActiveUpdateScoreboard() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {

        // Desactivas el Scoreboard activo para poder crear uno nuevo

        if(!Number(localStorage.getItem("ScoreID")) ){
          getScoreboard()
        }

        let ScoreID=Number(localStorage.getItem("ScoreID"));
        let vCancha= localStorage.getItem("Cancha") 
        let vController= localStorage.getItem("Controller")

          let  raw = JSON.stringify({
            "data": {
              "Active": false,
              "Cancha":vCancha,
              "Controller":vController
            }
          });

          const options = {
            method: "PUT",
            body: raw,
          };

          const Iddata = await fetchAPI(`/scoreboards/${ScoreID}`, '', options,{
          }).then( keys => { return keys.data.id });

        return Iddata;
      }
    } catch (error) {
      console.log("error", error)
    }
  }
  async function CreateScoreboard() {
    try {
      ActiveUpdateScoreboard();

      let PlayerA=localStorage.getItem("PlayerA");
      let PlayerB=localStorage.getItem("PlayerB");
      let PlayerC=localStorage.getItem("PlayerC");
      let PlayerD=localStorage.getItem("PlayerD");

      let raw = JSON.stringify({
        data: {
          scorea: ScoreA || 0,
          scoreb: ScoreB || 0,
          Controller: Controller,
          Cancha: Cancha,
          Players: {
            PlayerA: PlayerA || "",
            PlayerB: PlayerB || "",
            PlayerC: PlayerC || "",
            PlayerD: PlayerD || "",
          },
        },
      });

      const options = {
        method: "POST",
        body: raw,
      };

      const Iddata = await fetchAPI("/scoreboards/", '', options,{
      }).then( keys => {
        if(keys){
          const{id}= keys.data;
          console.log(keys);
          localStorage.setItem("ScoreID", id ? id : 0);
          setScoreID(id ? id : 0);
          return keys.data.id 
        }
      });
      return Iddata
    } catch (error) {
      console.log("error", error)
    }
  }
  async function UpdateScoreboard() {
    try {
      let Active = true;

      if(Active){
        if (typeof window !== "undefined" && window.localStorage) {
          console.log('primer if')

          if( !Number(localStorage.getItem("ScoreID")) ){getScoreboard()}

          console.log('segundo if')
          let ScoreID=Number(localStorage.getItem("ScoreID"));
          // 50 = AD pero llega desde el controlador como string (AD) en vez de 50
          let scoreA=localStorage.getItem("ScoreA");
          let scoreB=localStorage.getItem("ScoreB");
          scoreA = scoreA === "AD" ? 50 : Number(scoreA);
          scoreB = scoreB === "AD" ? 50 : Number(scoreB);
          let ServiceStart=localStorage.getItem("ServeStart");
          let Cancha= localStorage.getItem("Cancha")

          let PlayerA=localStorage.getItem("PlayerA");
          let PlayerB=localStorage.getItem("PlayerB");
          let PlayerC=localStorage.getItem("PlayerC");
          let PlayerD=localStorage.getItem("PlayerD");

          let userData = JSON.parse(localStorage.getItem('GameResults'));

          let TimeData = JSON.parse(localStorage.getItem('ServiceTime'));

          const { ResultPlayerASet1, ResultPlayerBSet1, ResultPlayerASet2, ResultPlayerBSet2, ResultPlayerASet3, ResultPlayerBSet3,} = userData

          const TimeIsActive =localStorage.getItem('IsActive');
          const TimeIsPaused =localStorage.getItem('IsPaused');
          const TimeIsTime =localStorage.getItem('IsTime');  

          let  raw = JSON.stringify({
            "data": {
              "scorea": scoreA>=0 ? scoreA : ScoreA,
              "scoreb": scoreB>=0 ? scoreB : ScoreB,
              "ServiceStart": ServiceStart,
              "Cancha":Cancha,

              "Players": {
                "PlayerA": PlayerA || '',
                "PlayerB": PlayerB || '',
                "PlayerC": PlayerC || '',
                "PlayerD": PlayerD || '',
              },

              "SET1": {
                "ResultPlayerA": ResultPlayerASet1>=0 ? ResultPlayerASet1 : ResultsPlayerA1,
                "ResultPlayerB": ResultPlayerBSet1>=0 ? ResultPlayerBSet1 : ResultsPlayerB1,

              },
              "SET2": {
                "ResultPlayerA": ResultPlayerASet2>=0 ? ResultPlayerASet2 : ResultsPlayerA2,
                "ResultPlayerB": ResultPlayerBSet2>=0 ? ResultPlayerBSet2 : ResultsPlayerB2,

              },
              "SET3": {
                "ResultPlayerA": ResultPlayerASet3>=0 ? ResultPlayerASet3 : ResultsPlayerA3,
                "ResultPlayerB": ResultPlayerBSet3>=0 ? ResultPlayerBSet3 : ResultsPlayerB3,

              },
              "ServiceTime": {
              "status": TimeData ? TimeData.status : 0,
              "TimerSeconds": TimeData ? TimeData.TimerSeconds : false,
              "TimeIsActive": TimeIsActive ? TimeIsActive : false,
              "TimeIsPaused": TimeIsPaused ? TimeIsPaused : true,
              "TimeIsTime": TimeIsTime ? TimeIsTime : 0,
              }
            }
          });

          const options = {
            method: "PUT",
            body: raw,
          };

          const Iddata = await fetchAPI(`/scoreboards/${ScoreID}`, '', options,{
          }).then( keys => { return keys.data.id });
          return Iddata;
        }
      }
      } catch (error) {
        console.log("error", error)
      }
  }
  async function getScoreboard() {
    try {
      const options = {
        method: "GET",
      };
      let Cancha=localStorage.getItem("Cancha") ? localStorage.getItem("Cancha")  : 'Cancha20';
      let ScoreID=Number(localStorage.getItem("ScoreID"));

      let Active = true;

      if(Active){
        const Iddata = await fetchAPI(`/scoreboards?filters[Active][$eq]=true&filters[Cancha][$eq]=${Cancha}&filters[id][$eq]=${ScoreID}&populate=%2A&sort=id:DESC` ,{}).then( keys => {
            if(keys.data.length>=1){
              console.log(keys.data);
              const {id} = keys.data[0]
              const {scorea, scoreb, ServiceStart, SET1, SET2, SET3, ServiceTime, Players} = keys.data[0].attributes
              if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem("ScoreID", id ? id : 0);
                localStorage.setItem("ScoreA", scorea ? scorea : 0);
                localStorage.setItem("ScoreB", scoreb ? scoreb : 0); 
                localStorage.setItem("ServeStart", ServiceStart ? ServiceStart : false);

                localStorage.setItem("PlayerA", Players ? Players.PlayerA : '');
                localStorage.setItem("PlayerB", Players ? Players.PlayerB : '');
                localStorage.setItem("PlayerC", Players ? Players.PlayerC : '');
                localStorage.setItem("PlayerD", Players ? Players.PlayerD : '');
                setPlayerA(Players ? Players.PlayerA : '');
                setPlayerB(Players ? Players.PlayerB : '');
                setPlayerC(Players ? Players.PlayerC : '');
                setPlayerD(Players ? Players.PlayerD : '');
                localStorage.setItem(
                  "ServiceTime",
                  JSON.stringify({
                    status: ServiceTime ? ServiceTime.status: false,
                    TimerSeconds: ServiceTime ? Number(ServiceTime.TimerSeconds): 0,
                  })
                );
                localStorage.setItem("IsActive",ServiceTime ? ServiceTime.TimeIsActive : false );
                localStorage.setItem("IsPaused",ServiceTime ? ServiceTime.TimeIsPaused : true);
                localStorage.setItem("IsTime",ServiceTime ? ServiceTime.TimeIsTime : 0);
                localStorage.setItem(
                  "GameResults",
                  JSON.stringify({
                    SetNumber: SetsGame.length,
                    ResultPlayerASet1: SET1 ? Number(SET1.ResultPlayerA): 0,
                    ResultPlayerBSet1: SET1 ? Number(SET1.ResultPlayerB): 0,
                    ResultPlayerASet2: SET2 ? Number(SET2.ResultPlayerA): 0,
                    ResultPlayerBSet2: SET2 ? Number(SET2.ResultPlayerB): 0,
                    ResultPlayerASet3: SET3 ? Number(SET3.ResultPlayerA): 0,
                    ResultPlayerBSet3: SET3 ? Number(SET3.ResultPlayerB): 0,
                  })
                );
              }
              return keys.data.id
            }else{
              doResetlocalStorage();
            }
        });
        return Iddata
      }
    } catch (error) {
      console.log("error", error)
    }
  }


  async function getScorePointsboard() {
    try {
      const options = {
        method: "GET",
      };
      let Cancha=localStorage.getItem("Cancha") ? localStorage.getItem("Cancha")  : 'Cancha20';
      let ScoreID=Number(localStorage.getItem("ScoreID"));
      let Active = true;

      if(Active){
        const Iddata = await fetchAPI(`/scoreboards?filters[Active][$eq]=true&filters[Cancha][$eq]=${Cancha}&populate=%2A&sort=id:DESC` ,{})
          .then( keys => {
            if(keys.data.length>=1){
              console.log(keys.data);
              const {id} = keys.data[0]
              const {scorea, scoreb, ServiceStart, SET1, SET2, SET3, ServiceTime, Players} = keys.data[0].attributes
              if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem("ScoreID", id || 0);
                localStorage.setItem("ScoreA", scorea<50 ? scorea : "AD");
                localStorage.setItem("ScoreB", scoreb<50 ? scoreb : "AD");
                localStorage.setItem("ServeStart", ServiceStart || false);

                localStorage.setItem("PlayerA", Players ? Players.PlayerA : '');
                localStorage.setItem("PlayerB", Players ? Players.PlayerB : '');
                localStorage.setItem("PlayerC", Players ? Players.PlayerC : '');
                localStorage.setItem("PlayerD", Players ? Players.PlayerD : '');

                setPlayerA(Players ? Players.PlayerA : '');
                setPlayerB(Players ? Players.PlayerB : '');
                setPlayerC(Players ? Players.PlayerC : '');
                setPlayerD(Players ? Players.PlayerD : '');

                localStorage.setItem(
                  "ServiceTime",
                  JSON.stringify({
                    status: ServiceTime ? ServiceTime.status: false,
                    TimerSeconds: ServiceTime ? Number(ServiceTime.TimerSeconds): 0,
                  })
                );

                localStorage.setItem("IsActive",ServiceTime ? ServiceTime.TimeIsActive : false );
                localStorage.setItem("IsPaused",ServiceTime ? ServiceTime.TimeIsPaused : true);
                localStorage.setItem("IsTime",ServiceTime ? ServiceTime.TimeIsTime : 0);

                localStorage.setItem(
                  "GameResults",
                  JSON.stringify({ 
                    SetNumber: SetsGame.length, 
                    ResultPlayerASet1: SET1 ? Number(SET1.ResultPlayerA): 0,
                    ResultPlayerBSet1: SET1 ? Number(SET1.ResultPlayerB): 0,
                    ResultPlayerASet2: SET2 ? Number(SET2.ResultPlayerA): 0,
                    ResultPlayerBSet2: SET2 ? Number(SET2.ResultPlayerB): 0,
                    ResultPlayerASet3: SET3 ? Number(SET3.ResultPlayerA): 0,
                    ResultPlayerBSet3: SET3 ? Number(SET3.ResultPlayerB): 0,
                  })
                );
              }
              return keys.data.id
            }else{
              doResetlocalStorage();
            }
          });
        return Iddata
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  async function doResetlocalStorage() {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("ScoreA",  0);
      localStorage.setItem("ScoreB",  0);
      localStorage.setItem("ServeStart", false);

      localStorage.setItem("PlayerA",  '');
      localStorage.setItem("PlayerB",  '');
      localStorage.setItem("PlayerC",  '');
      localStorage.setItem("PlayerD",  '');

      //localStorage.setItem("ScoreID", '');
      // localStorage.setItem("Cancha", '');

      localStorage.getItem('IsActive') ? JSON.parse(localStorage.getItem('IsActive').toLowerCase()) : false;
      localStorage.getItem('IsPaused') ? JSON.parse(localStorage.getItem('IsPaused').toLowerCase()) :true;

      localStorage.setItem(
        "ServiceTime",
        JSON.stringify({
          status:  false,
          TimerSeconds:  0,
        })
      );

      localStorage.setItem(
        "GameResults",
        JSON.stringify({
          ResultPlayerASet1:  0,
          ResultPlayerBSet1:  0,
          ResultPlayerASet2:  0,
          ResultPlayerBSet2:  0,
          ResultPlayerASet3:  0,
          ResultPlayerBSet3:  0,
        })
      );

     // UpdateScoreboard();
    }
  }

  async function doClearlocalStorage() {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("ScoreA",  0);
      localStorage.setItem("ScoreB",  0);
      localStorage.setItem("ServeStart", false);

      localStorage.setItem("PlayerA",  '');
      localStorage.setItem("PlayerB",  '');
      localStorage.setItem("PlayerC",  '');
      localStorage.setItem("PlayerD",  '');

      localStorage.setItem("ScoreID", '');
      localStorage.setItem("Cancha", '');
      localStorage.setItem("Controller", '');

      localStorage.getItem('IsActive') ? JSON.parse(localStorage.getItem('IsActive').toLowerCase()) : false;
      localStorage.getItem('IsPaused') ? JSON.parse(localStorage.getItem('IsPaused').toLowerCase()) :true;

      localStorage.setItem(
        "ServiceTime",
        JSON.stringify({
          status:  false,
          TimerSeconds:  0,
        })
      );

      localStorage.setItem(
        "GameResults",
        JSON.stringify({
          ResultPlayerASet1:  0,
          ResultPlayerBSet1:  0,
          ResultPlayerASet2:  0,
          ResultPlayerBSet2:  0,
          ResultPlayerASet3:  0,
          ResultPlayerBSet3:  0,
        })
      );

     // UpdateScoreboard();
    }
  }
  /**localStorage*****************/

  function handleSave() {
    if (typeof window !== "undefined" && window.localStorage) {
      // localStorage.setItem("GameA", GameA);
      localStorage.setItem("SetsGame", SetsGame.length);

      // localStorage.setItem("ScoreA", ScoreA ? ScoreA : 0);
      // localStorage.setItem("ScoreB", ScoreB ? ScoreB : 0);

      localStorage.setItem("ServeStart", ServeStart ? ServeStart : 'false');
      localStorage.setItem(
          "ServiceTime",
            JSON.stringify({
                status: false,
                TimerSeconds: 0,
            })
        );

      if(localStorage.getItem('SetsGame')==0){setResultsPlayerA1(ResultsPlayerA1)}
      if(localStorage.getItem('SetsGame')==0){setResultsPlayerB1(ResultsPlayerB1)}

      if(localStorage.getItem('SetsGame')==1){setResultsPlayerA2(ResultsPlayerA2)}
      if(localStorage.getItem('SetsGame')==1){setResultsPlayerB2(ResultsPlayerB2)}

      if(localStorage.getItem('SetsGame')==2){setResultsPlayerA3(ResultsPlayerA3)}
      if(localStorage.getItem('SetsGame')==2){setResultsPlayerB3(ResultsPlayerB3)}

      localStorage.setItem(
        "GameResults",
        JSON.stringify({
          SetNumber: SetsGame.length,
          ResultPlayerASet1: ResultsPlayerA1,
          ResultPlayerBSet1: ResultsPlayerB1,
          ResultPlayerASet2: ResultsPlayerA2,
          ResultPlayerBSet2: ResultsPlayerB2,
          ResultPlayerASet3: ResultsPlayerA3,
          ResultPlayerBSet3: ResultsPlayerB3,
        })
      );

      let userData = JSON.parse(localStorage.getItem("GameResults"));
      let keys= [];
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(!localStorage.key(i));
      }

      setUserData(userData);
      setKeys(keys);
      setLength(localStorage.length);
    }
  }

  function handleRemove() {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("ScoreA");
      setUsername(null);
      setKeys((keys) => keys.filter((k) => k !== "ScoreA"));
      setLength(localStorage.length);
    }
  }

  function handleClear() {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.clear();
      setResultsPlayerA1(0);
      setResultsPlayerB1(0);
      setResultsPlayerA2(0);
      setResultsPlayerB2(0);
      setResultsPlayerA3(0);
      setResultsPlayerB3(0);
      setUserData(null);
      setKeys([]);
      setLength(localStorage.length);
    }
  }

  function doSetsScorehandleSaveA() {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("GameA", GameA);
      localStorage.setItem("SetsGame", SetsGame.length);

      let userData = JSON.parse(localStorage.getItem('GameResults'));
      let ResultsA1;
      let ResultsA2;
      let ResultsA3;

      if(localStorage.getItem('SetsGame')==0){ResultsA1= userData.ResultPlayerASet1>0 ? setResultsPlayerA1(Number(userData.ResultPlayerASet1)-1)  : 0 }
      if(localStorage.getItem('SetsGame')==1){ResultsA2= userData.ResultPlayerASet2>0 ? setResultsPlayerA2(Number(userData.ResultPlayerASet2)-1)  : 0 }
      if(localStorage.getItem('SetsGame')==2){ResultsA3= userData.ResultPlayerASet3>0 ? setResultsPlayerA3(Number(userData.ResultPlayerASet3)-1)  : 0 }

      console.log(ResultsPlayerA1)

      localStorage.setItem(
        "GameResults",
        JSON.stringify({ 
          SetNumber: SetsGame.length, 
          ResultPlayerASet1: ResultsA1 ? ResultsA1: ResultsPlayerA1,
          ResultPlayerBSet1: ResultsPlayerB1,
          ResultPlayerASet2: ResultsA2 ? ResultsA2: ResultsPlayerA2,
          ResultPlayerBSet2: ResultsPlayerB2,
          ResultPlayerASet3: ResultsA3 ? ResultsA3 : ResultsPlayerA3,
          ResultPlayerBSet3: ResultsPlayerB3,
        })
      );

      let keys= [];
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(!localStorage.key(i));
      }

      setUserData(userData);
      setKeys(keys);
      setLength(localStorage.length);
    }
  }

  function doSetsScorehandleSaveB() {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("GameA", GameA);
      localStorage.setItem("SetsGame", SetsGame.length);

      let userData = JSON.parse(localStorage.getItem('GameResults'));
      let ResultsB1;
      let ResultsB2;
      let ResultsB3;

      if(localStorage.getItem('SetsGame')==0){ResultsB1= userData.ResultPlayerBSet1>0 ? setResultsPlayerB1(Number(userData.ResultPlayerBSet1)-1)  : 0 }
      if(localStorage.getItem('SetsGame')==1){ResultsB2= userData.ResultPlayerBSet2>0 ? setResultsPlayerB2(Number(userData.ResultPlayerBSet2)-1)  : 0 }
      if(localStorage.getItem('SetsGame')==2){ResultsB3= userData.ResultPlayerBSet3>0 ? setResultsPlayerB3(Number(userData.ResultPlayerBSet3)-1)  : 0 }

      localStorage.setItem(
        "GameResults",
        JSON.stringify({ 
          SetNumber: SetsGame.length, 
          ResultPlayerASet1:ResultsPlayerA1, 
          ResultPlayerBSet1: ResultsB1 ? ResultsB1: ResultsPlayerB1,
          ResultPlayerASet2:  ResultsPlayerA2,
          ResultPlayerBSet2: ResultsB2 ? ResultsB2: ResultsPlayerB2,
          ResultPlayerASet3: ResultsPlayerA3 ,
          ResultPlayerBSet3: ResultsB3 ? ResultsB3 : ResultsPlayerB3,
        })
      );
      let keys= [];
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(!localStorage.key(i));
      }
      setUserData(userData);
      setKeys(keys);
      setLength(localStorage.length);
    }
  }

/**************************/
/**************************/
  const doRestartGame = (value) => {
    if(SetsGame.length==0){
      setResultsPlayerA1(GameA);
      setResultsPlayerB1(GameB);
    }
    if(SetsGame.length==1){
      setResultsPlayerA2(GameA);
      setResultsPlayerB2(GameB);
    }

    if(SetsGame.length==2){
      setResultsPlayerA3(GameA);
      setResultsPlayerB3(GameB);
    }

    SetsGame.push(GameA +'-'+ GameB);

    setSetsGame(SetsGame);
    setGameA(0);
    setGameB(0);
    setScoreAGameA([])
    setScoreBGameB([])
    setScoreGameSets(false);
  };

  const doResetGame = () => {
    setGameA(0);
    setGameB(0);
    setScoreA(0);
    setScoreB(0);

    setResultsPlayerA1(0);
    setResultsPlayerB1(0);

    setResultsPlayerA2(0);
    setResultsPlayerB2(0);

    setResultsPlayerA3(0);
    setResultsPlayerB3(0);

    setLoadingsA('/');
    setLoadingsB('/');
    setScoreAGameA([])
    setScoreBGameB([])
    setSetsGame([]);
    setScoreGameSets(false);

    doResetlocalStorage();
  };

  const doGameScoreA = (value) => {
    setServeStart(!ServeStart);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem("ServeStart", ServeStart)
    }
    setGameA(GameA+1)
    ScoreAGameA.push(value);
    setScoreAGameA(ScoreAGameA);
    ScoreAGameA.length >=6 ? setScoreGameSets(true) : setScoreGameSets(false);

    if(SetsGame.length==0){
      setResultsPlayerA1(GameA+1);
    }
    if(SetsGame.length==1){
      setResultsPlayerA2(GameA+1);
    }
    if(SetsGame.length==2){
      setResultsPlayerA3(GameA+1);
    }
    if(ScoreAGameA.length ==6){
      let value = ScoreAGameA.length - ScoreBGameB.length

      value <=2 ? setScoreGameSets(false) : setScoreGameSets(true);

      if(value==2){
        setScoreGameSets(true)
      }
      if(value==0){
        setScoreGameSets(false)
        setTieScoreGameSets(true)

        if(SetsGame.length==0){
          localStorage.setItem(
            "GameResults",
            JSON.stringify({
              SetNumber: SetsGame.length,
              ResultPlayerASet1: 6,
              ResultPlayerBSet1: ResultsPlayerB1,
              ResultPlayerASet2: ResultsPlayerA2,
              ResultPlayerBSet2: ResultsPlayerB2,
              ResultPlayerASet3: ResultsPlayerA3,
              ResultPlayerBSet3: ResultsPlayerB3,
            })
          );
        }
        if(SetsGame.length==1){
          localStorage.setItem(
            "GameResults",
            JSON.stringify({
              SetNumber: SetsGame.length,
              ResultPlayerASet1: ResultsPlayerA1,
              ResultPlayerBSet1: ResultsPlayerB1,
              ResultPlayerASet2: 6,
              ResultPlayerBSet2: ResultsPlayerB2,
              ResultPlayerASet3: ResultsPlayerA3,
              ResultPlayerBSet3: ResultsPlayerB3,
            })
          );
        }
        if(SetsGame.length==2){
          localStorage.setItem(
            "GameResults",
            JSON.stringify({
              SetNumber: SetsGame.length,
              ResultPlayerASet1: ResultsPlayerA1,
              ResultPlayerBSet1: ResultsPlayerB1,
              ResultPlayerASet2: ResultsPlayerA2,
              ResultPlayerBSet2: ResultsPlayerB2,
              ResultPlayerASet3: 6,
              ResultPlayerBSet3: ResultsPlayerB3,
            })
          );
        }
        localStorage.setItem("ScoreA",  0);
        localStorage.setItem("ScoreB",  0);
      }
    }
  };

  const doGameScoreB = (value) => {
    setServeStart(!ServeStart);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem("ServeStart", ServeStart)
    }
    setGameB(GameB+1)
    ScoreBGameB.push(value);
    setScoreBGameB(ScoreBGameB);
    ScoreBGameB.length >=6 ? setScoreGameSets(true) : setScoreGameSets(false);

    if(SetsGame.length==0){
      setResultsPlayerB1(GameB+1);
    }

    if(SetsGame.length==1){
    setResultsPlayerB2(GameB+1);
    }

    if(SetsGame.length==2){
    setResultsPlayerB3(GameB+1);
    }

    if(ScoreBGameB.length ==6){
      let value = ScoreBGameB.length - ScoreAGameA.length
      value <=2 ? setScoreGameSets(false) : setScoreGameSets(true);
      if(value==2){
        setScoreGameSets(true)
      }
      if(value==0){
        setScoreGameSets(false)
        setTieScoreGameSets(true)
        if(SetsGame.length==0){
          localStorage.setItem(
            "GameResults",
            JSON.stringify({
              SetNumber: SetsGame.length,
              ResultPlayerASet1: ResultsPlayerA1,
              ResultPlayerBSet1: 6,
              ResultPlayerASet2: ResultsPlayerA2,
              ResultPlayerBSet2: ResultsPlayerB2,
              ResultPlayerASet3: ResultsPlayerA3,
              ResultPlayerBSet3: ResultsPlayerB3,
            })
          );
        }
        if(SetsGame.length==1){
          localStorage.setItem(
            "GameResults",
            JSON.stringify({ 
              SetNumber: SetsGame.length,
              ResultPlayerASet1: ResultsPlayerA1,
              ResultPlayerBSet1: ResultsPlayerB1,
              ResultPlayerASet2: ResultsPlayerA2,
              ResultPlayerBSet2: 6,
              ResultPlayerASet3: ResultsPlayerA3,
              ResultPlayerBSet3: ResultsPlayerB3,
            })
          );
        }
        if(SetsGame.length==2){
          localStorage.setItem(
            "GameResults",
            JSON.stringify({
              SetNumber: SetsGame.length,
              ResultPlayerASet1: ResultsPlayerA1,
              ResultPlayerBSet1: ResultsPlayerB1,
              ResultPlayerASet2: ResultsPlayerA2,
              ResultPlayerBSet2: ResultsPlayerB2,
              ResultPlayerASet3: ResultsPlayerA3,
              ResultPlayerBSet3: 6,
            })
          );
        }
        localStorage.setItem("ScoreA",  0);
        localStorage.setItem("ScoreB",  0);
      }
    }

    if(ScoreBGameB.length ==7){
      let value = ScoreBGameB.length - ScoreAGameA.length
      if(value==2){
        setScoreGameSets(true)
      }
      if(value==0){
        setScoreGameSets(false)
        setTieScoreGameSets(true)
      }
      console.log(SetsGame)
    }
  };

  const doGameStatus = (value) => {
    if(!ScoreGameSets){
      if(ScoreA==40){
        ScoreB ==50 ? doGameScoreB(1) : setGameB(GameB)
        if( ScoreA > ScoreB){
          ScoreA > ScoreB ? doGameScoreA(1) :  setGameA(GameA)
        }
      }else{
        if(ScoreB==40){
          ScoreA ==50 ? doGameScoreA(1) : setGameA(GameA)
          if( ScoreB > ScoreA){
            ScoreB > ScoreA ? doGameScoreB(1) : setGameB(GameB)
          }
        }
        setLoadingsA('/')
        setLoadingsB('/')
        return ScoreB
      }
    }
    setLoadingsA('/')
    setLoadingsB('/')
  };

  const doScoreStatus = (value) => {
    if(value){
      setLoadingsA('/learning/testimonials')
      setLoadingsB('/learning/testimonials')
    }
    if(!value){
      doGameStatus()
    }
  };

  const doTieGameStatus = (value) => {
    //console.log(ScoreA, ScoreB)
    if(!ScoreGameSets){
      if(ScoreA > ScoreB){
        ScoreA > ScoreB ? doGameScoreA(1) :  setGameA(GameA)
        setLoadingsA('/')
        setLoadingsB('/') 
        setScoreGameSets(true)
        setTieScoreGameSets(false)
        localStorage.setItem("ScoreA",  0);
        localStorage.setItem("ScoreB",  0);
      }

      if( ScoreB > ScoreA){
        ScoreB > ScoreA ? doGameScoreB(1) : setGameB(GameB)
        setLoadingsA('/')
        setLoadingsB('/')
        setScoreGameSets(true)
        setTieScoreGameSets(false)
        localStorage.setItem("ScoreA",  0);
        localStorage.setItem("ScoreB",  0);
      }

    }
  };

  const doTieScoreStatus = (value) => {
    if(value){
      doTieGameStatus()
    };
  };

  const doChangeEnd = () => {
    if(!ChangeEnd){
      setPlayerA(PlayerC)
      setPlayerB(PlayerD)
      setPlayerC(PlayerA)
      setPlayerD(PlayerB)
    };
  };

  const onClose = () => {
    setOpen(false);
  };

  const [timerSeconds, setTimerSeconds] = UseState(0);

  const [PlayerA, setPlayerA] = UseState('');
  const [PlayerB, setPlayerB] = UseState('');
  const [PlayerC, setPlayerC] = UseState('');
  const [PlayerD, setPlayerD] = UseState('');

  const [ResultsPlayerA1, setResultsPlayerA1] = UseState(0);
  const [ResultsPlayerB1, setResultsPlayerB1] = UseState(0);
  const [ResultsPlayerA2, setResultsPlayerA2] = UseState(0);
  const [ResultsPlayerB2, setResultsPlayerB2] = UseState(0);
  const [ResultsPlayerA3, setResultsPlayerA3] = UseState(0);
  const [ResultsPlayerB3, setResultsPlayerB3] = UseState(0);


  const [ChangeEnd, setChangeEnd] = UseState(false);
  const [ServeStart, setServeStart] = UseState(false);

  /**Puntaje*****************/
  const [ScoreID, setScoreID] = UseState(0);
  const [ScoreA, setScoreA] = UseState(0);
  const [ScoreB, setScoreB] = UseState(0);
  const [ScoreSuma, setScoreSuma] = UseState();

  const [GameA, setGameA] = UseState(0);
  const [GameB, setGameB] = UseState(0);
  const [GameSuma, setGameSuma] = UseState();
  const [SetsGame, setSetsGame] = UseState([]);

  const [loadingsA, setLoadingsA] = UseState('/');
  const [loadingsB, setLoadingsB] = UseState('/');

  const [ScoreAGameA, setScoreAGameA] = UseState([]);
  const [ScoreBGameB, setScoreBGameB] = UseState([]);

  const [ScoreGameSets, setScoreGameSets] = UseState(false);

  const [TieScoreGameSets, setTieScoreGameSets] = UseState(false);

  const [RestaGameSetsA, setRestaGameSetsA] = UseState(false);
  const [RestaGameSetsB, setRestaGameSetsB] = UseState(false);

  /**localStorage*****************/
  const [username, setUsername] = UseState(null);
  const [userId, setUserId] = UseState(null);
  const [userData, setUserData] = UseState(null);
  const [keys, setKeys] = UseState([]);
  const [length, setLength] = UseState(0);

  const [open, setOpen] = UseState(false);
  const [RefrescaCreateId, setRefrescaCreateId] = UseState(false);

  /**TimerGame*****************/
  const [isActive, setIsActive] = UseState(false);
  const [isPaused, setIsPaused] = UseState(true);
  const [time, setTime] = UseState(0);


  const [Controller, setController] = UseState(); 
  const [Cancha, setCancha] = UseState(); 

  const useract = {
    setController:setController,
    Controller:Controller,
    setCancha:setCancha,
    Cancha:Cancha,

    setIsActive:setIsActive,
    isActive:isActive,
    setIsPaused:setIsPaused,
    isPaused:isPaused,
    setTime:setTime,
    time:time,

    setOpen:setOpen,
    open:open,
    setRefrescaCreateId:setRefrescaCreateId,
    RefrescaCreateId:RefrescaCreateId,
    onClose:onClose,

    setScoreID:setScoreID,
    ScoreID:ScoreID,
    setPlayerA:setPlayerA,
    PlayerA:PlayerA,
    setPlayerB:setPlayerB,
    PlayerB:PlayerB,
    setPlayerC:setPlayerC,
    PlayerC:PlayerC,
    setPlayerD:setPlayerD,
    PlayerD:PlayerD,
    setChangeEnd:setChangeEnd,
    ChangeEnd:ChangeEnd,
    setServeStart:setServeStart,
    ServeStart:ServeStart,

    setResultsPlayerA1:setResultsPlayerA1,
    ResultsPlayerA1:ResultsPlayerA1,


    doScoreStatus:doScoreStatus,
    doTieScoreStatus:doTieScoreStatus,
    doRestartGame:doRestartGame,
    doResetGame,doResetGame,
    doChangeEnd:doChangeEnd,
    doSetsScorehandleSaveA:doSetsScorehandleSaveA,
    doSetsScorehandleSaveB:doSetsScorehandleSaveB,
    doResetlocalStorage:doResetlocalStorage,
    doClearlocalStorage:doClearlocalStorage,

    CreateScoreboard:CreateScoreboard,
    UpdateScoreboard:UpdateScoreboard,
    getScoreboard:getScoreboard,
    getScorePointsboard:getScorePointsboard,

    handleSave:handleSave,
    handleRemove:handleRemove,
    handleClear:handleClear,

    setScoreA:setScoreA,
    ScoreA:ScoreA,
    setScoreB:setScoreB,
    ScoreB:ScoreB,
    setScoreSuma:setScoreSuma,
    ScoreSuma:ScoreSuma,

    setLoadingsA:setLoadingsA,
    loadingsA:loadingsA,
    setLoadingsB:setLoadingsB,
    loadingsB:loadingsB,

    setGameA:setGameA,
    GameA:GameA,
    setGameB:setGameB,
    GameB:GameB,

    setScoreAGameA:setScoreAGameA,
    ScoreAGameA:ScoreAGameA,

    setScoreBGameB:setScoreBGameB,
    ScoreBGameB:ScoreBGameB,

    setScoreGameSets:setScoreGameSets,
    ScoreGameSets:ScoreGameSets,

    setTieScoreGameSets:setTieScoreGameSets,
    TieScoreGameSets:TieScoreGameSets,

    setSetsGame:setSetsGame,
    SetsGame:SetsGame,

    userData:userData,
    keys:keys,
    length:length,
    setUserData:setUserData,
    setKeys:setKeys,
    setLength:setLength,

    setTimerSeconds:setTimerSeconds,
    timerSeconds:timerSeconds,

    setRestaGameSetsA:setRestaGameSetsA,
    RestaGameSetsA:RestaGameSetsA,
    setRestaGameSetsB:setRestaGameSetsB,
    RestaGameSetsB:RestaGameSetsB,

  };
  return (
    <UserContext.Provider value={useract}>{children}</UserContext.Provider>
  );
};

export default UserProvider;