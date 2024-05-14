"use client";

import { color } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <Container>
      <Image
        src={"/images/logo/small_logo.svg"}
        alt="small_logo"
        width={50}
        height={50}
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
      />
    </Container>
  );
}

export default Header;

const Container = styled.div`
  background: ${color.light_blue};
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;