"use client";
import Button from "@/components/Button/Button";
import styled from "@emotion/styled";
import { AREA_LIST } from "../../public/static/common";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <Container>
      <StyledImage
        src={"/images/logo/logo.svg"}
        alt="logo"
        width={150}
        height={120}
      />
      <div>원하는 한강공원을 선택하여 실시간 인구 수를 확인하세요!</div>
      <ButtonWrap>
        {AREA_LIST.map((item) => (
          <Link href={`/${item.path}`} key={item.path}>
            <Button name={item.name} />
          </Link>
        ))}
      </ButtonWrap>
    </Container>
  );
}

export default Page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  box-sizing: border-box;
  background: white;
  width: 100%;
  height: 100vh;
  padding: 10px;
`;

const StyledImage = styled(Image)`
  margin-left: 25px;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 8px;
  justify-content: center;
`;