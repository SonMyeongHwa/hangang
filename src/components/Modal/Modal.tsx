"use client";

import { getCityPerson } from "@/api/api";
import { color } from "@/styles/color";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import CongestBar from "../CongestBar/CongestBar";
import BarChart from "../BarChart/BarChart";
import { useState } from "react";

type Props = {
  visible: boolean;
  onClose: () => void;
  areaName: string;
};

const congestArray = [
  {
    name: "여유",
    color: "green",
    path: "smiley_happy",
  },
  {
    name: "보통",
    color: "yellow",
    path: "happy",
  },
  {
    name: "약간 붐빔",
    color: "orange",
    path: "straight",
  },
  {
    name: "붐빔",
    color: "red",
    path: "sad",
  },
];

const Modal = ({ visible, onClose, areaName }: Props) => {
  const [rotation, setRotation] = useState(false);
  
  const { data, refetch } = useQuery({
    queryKey: [areaName],
    queryFn: () => getCityPerson(areaName),
  });

  const cityData = data?.["SeoulRtd.citydata_ppltn"][0];

  const congestData = congestArray.find((item) => cityData?.AREA_CONGEST_LVL === item.name);

  const congestMsg = cityData?.AREA_CONGEST_MSG;
  const splitMsg = congestMsg ? congestMsg.split(/(?<=\.)\s+/) : [];

  const handleClickRefetch = async () => {
    setRotation(true);
    await refetch();
    setRotation(false);
  };

  return (
    <Container visible={visible}>
      <Wrap onClick={(e) => e.stopPropagation()}>
        <div className="close">
          <Image
            src={"/images/close/close.svg"}
            alt="close"
            width={20}
            height={20}
            onClick={onClose}
          />
        </div>
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
                실시간 인구 : {Number(cityData.AREA_PPLTN_MIN).toLocaleString()}{" "}
                ~ {Number(cityData.AREA_PPLTN_MAX).toLocaleString()}명
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
      </Wrap>
    </Container>
  );
};

export default Modal;

const Container = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 999;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(25px);

  .close {
    text-align: right;

    img {
      cursor: pointer;
    }
  }

  .fontBold {
    font-weight: bold;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  box-sizing: border-box;
  padding: 20px 20px 40px 20px;
  border-radius: 20px;
  width: 500px;
  height: 500px;

  .msg {
    list-style-type: "📢 ";
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;

const Title = styled.div`
  .title {
    font-size: 24px;

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