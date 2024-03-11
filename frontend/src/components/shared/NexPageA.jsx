import { useEffect, useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Space, ConfigProvider } from "antd";
import { useTasks } from "../../../utils/ProviderContext";

const NextPageA = ({ Score, Navigation }) => {
  const {
    doScoreStatus,
    ScoreA,
    setScoreA,
    ScoreB,
    setScoreB,
    ScoreSuma,
    setScoreSuma,
    loadingsA,
    setLoadingsA,
    ScoreAGameA,
    ScoreBGameB,
    ScoreGameSets,
    handleSave,
    UpdateScoreboard,
  } = useTasks();

  const [RefNavigation, setRefNavigation] = useState([]);

  let navigation = Navigation;

  let allLinks = navigation.flatMap((section) => section.links);
  let linkIndex = allLinks.findIndex((link) => link.href === loadingsA);
  let previousPage = allLinks[linkIndex - 1];
  let nextPage = allLinks[linkIndex + 1];

  //  console.log(nextPage)
  useEffect(() => {
    Score(nextPage.value);
    handleSave();

    if (typeof window !== "undefined" && window.localStorage) {
      // deberia ser nextPage.value
      localStorage.setItem("ScoreA", nextPage.title);
      UpdateScoreboard();
    }
  }, [linkIndex]);

  console.log(ScoreA, ScoreB, ScoreSuma);
  console.log(ScoreSuma);

  const handleButtonClick = () => {
    if (ScoreSuma === 80) {
      setLoadingsA("/G");
    } else if (linkIndex < 3) {
      setLoadingsA(nextPage.href);
    } else if (ScoreSuma === 90 && ScoreA === 40 && ScoreB === 50) {
      doScoreStatus(true);
    } else {
      doScoreStatus(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-1 m-0">
      <div className="col-span-6 sm:col-span-1 text-center">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00b96b",
              colorText: "#00b96b",
              borderRadius: 6,
              colorBgContainer: "#f6ffed",
              fontSize: 110,
              controlHeight: 130,
              contentFontSize: 50,
            },
          }}
        >
          <Space>
            <Button type="default" onClick={handleButtonClick}>
              {nextPage.title}
            </Button>
          </Space>
        </ConfigProvider>
      </div>

      <div className="col-span-6 sm:col-span-1 text-center">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00b96b",
              colorText: "#00b96b",
              borderRadius: 6,
              colorBgContainer: "#f6ffed",
            },
          }}
        >
          <Space>
            <Button
              type="primary"
              icon={<CaretDownOutlined />}
              onClick={() => {
                linkIndex === 0 ? setLoadingsA("/") : setLoadingsA(previousPage.href);
              }}
            ></Button>
          </Space>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default NextPageA;
