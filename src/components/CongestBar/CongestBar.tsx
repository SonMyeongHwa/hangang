"use client";

import styled from "@emotion/styled";
import { color } from "@/styles/color";
import Image from "next/image";

type Props = {
  congestLvl: string;
  congestArray: {
    name: string;
    color: string;
  }[];
};

const CongestBar = ({ congestLvl, congestArray }: Props) => {
  return (
    <Container>
      {congestArray.map((congest) => (
        <div key={congest.name} className={`color-box ${congest.color}`}>
          {congest.name === congestLvl && (
            <Image
              src={"/images/location/location.svg"}
              alt="location"
              width={15}
              height={15}
            />
          )}
          <span>{congest.name}</span>
        </div>
      ))}
    </Container>
  );
};

export default CongestBar;

const Container = styled.div`
  margin: 10px 0;
  width: 100%;

  .color-box {
    display: inline-block;
    width: 25%;
    height: 10px;
    text-align: center;
    position: relative;

    img {
      position: absolute;
      top: -14px;
      left: 0;
      width: 100%;
    }

    span {
      position: absolute;
      top: 10px;
      left: 0;
      width: 100%;
    }
  }

  .green {
    background: ${color.green};
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  .yellow {
    background: ${color.yellow};
  }
  .orange {
    background: ${color.orange};
  }
  .red {
    background: ${color.red};
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
`;
