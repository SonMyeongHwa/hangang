"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { AREA_LIST, congestArray } from "../../../public/static/common";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCityPerson } from "@/api/api";
import { color } from "@/styles/color";
import CongestBar from "@/components/CongestBar/CongestBar";
import BarChart from "@/components/BarChart/BarChart";
import Map from "@/components/Map/Map";
import { useParams } from "next/navigation";

const Page = () => {
  const { path } = useParams();
  const areaData = AREA_LIST.find(item => item.path === path);
  const [rotation, setRotation] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: [areaData?.name],
    queryFn: () => getCityPerson(areaData?.name as unknown as string),
  });

  const cityData = data?.["SeoulRtd.citydata_ppltn"][0];

  const congestData = congestArray.find(
    (item) => cityData?.AREA_CONGEST_LVL === item.name
  );

  const congestMsg = cityData?.AREA_CONGEST_MSG;
  const splitMsg = congestMsg ? congestMsg.split(/(?<=\.)\s+/) : [];

  const handleClickRefetch = async () => {
    setRotation(true);
    await refetch();
    setRotation(false);
  };

  return (
    <Container>
      <Map location={areaData?.location as string} />
      {cityData && (
        <Content>
          <Title>
            <div className="title">
              <span className="fontBold">{cityData.AREA_NM}</span> 실시간 인구
              현황
            </div>
            <div className="time">
              <span>{cityData.PPLTN_TIME} 기준</span>
              <span className={rotation ? "rotation" : ""}>
                <Image
                  src={"/images/redo/redo.svg"}
                  alt="redo"
                  width={12}
                  height={12}
                  onClick={handleClickRefetch}
                />
              </span>
            </div>
          </Title>
          <Congest>
            <div className="congest">
              인구 혼잡도 :
              <span className={`fontBold ${congestData?.color}`}>
                {cityData.AREA_CONGEST_LVL}
              </span>
              <Image
                src={`/images/face/${congestData?.path}_face.svg`}
                alt="face"
                width={15}
                height={15}
              />
            </div>
            <div className="people fontBold">
              실시간 인구 : {Number(cityData.AREA_PPLTN_MIN).toLocaleString()} ~{" "}
              {Number(cityData.AREA_PPLTN_MAX).toLocaleString()}명
            </div>
          </Congest>
          <ul className="msg">
            {splitMsg.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
          <CongestBar
            congestLvl={cityData.AREA_CONGEST_LVL}
            congestArray={congestArray}
          />
          <BarChart
            peopleData={cityData.FCST_PPLTN}
            congestArray={congestArray}
          />
        </Content>
      )}
    </Container>
  );
};

export default Page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  box-sizing: border-box;
  background: white;
  width: 100%;
  //height: 90vh;
  padding: 20px;

  .msg {
    list-style-type: "📢 ";
    margin-left: 20px;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 100%;

  .fontBold {
    font-weight: bold;
  }
`;

const Title = styled.div`
  .title {
    font-size: 20px;

    span {
      color: ${color.blue};
    }
  }

  .time {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;

    span {
      color: ${color.gray};
    }

    img {
      cursor: pointer;
    }

    .rotation {
      animation: rotate_image 2s linear infinite;
      transform-origin: 50% 50%;
    }

    @keyframes rotate_image {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

const Congest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .congest {
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 4px;

    .green {
      color: ${color.green};
    }
    .yellow {
      color: ${color.yellow};
    }
    .orange {
      color: ${color.orange};
    }
    .red {
      color: ${color.red};
    }
  }

  .people {
    color: ${color.gray};
    font-size: 14px;
  }
`;