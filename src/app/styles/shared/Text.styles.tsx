import styled from "styled-components";

interface ISearchText {
  $opacity?: string;
}

export const Title = styled.h3`
  font-family: "Silkscreen", sans-serif; 
  font-size: 3rem;
  font-weight: 900;
  color: #000000;
  opacity: 0.8;
`;


export const SearchText = styled.h3<ISearchText>`
  font-size: 1.12rem;
  opacity: ${({ $opacity }) => $opacity || 1};
  padding: var(--ten-px) 0px;

  &:nth-of-type(1) {
    margin-right: var(--ten-px);
  }
`;
