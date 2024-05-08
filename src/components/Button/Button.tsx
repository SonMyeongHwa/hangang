"use client";

import { color } from "@/styles/color";
import styled from "@emotion/styled";

export type Props = {
  name: string;
}

const Button = ({ name }: Props) => {
  return (
    <Container>
      {name}
    </Container>
  )
}

export default Button;

const Container = styled.div`
  width: 100px;
  height: 40px;
  background: ${color.dark_blue};
  color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;