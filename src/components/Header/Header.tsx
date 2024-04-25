"use client";

import { color } from "@/styles/color";
import styled from "@emotion/styled";

const Header = () => {
  return (
    <Container>Header</Container>
  )
}

export default Header;

const Container = styled.div`
  background: ${color.light_gray};
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 10vh;
`;