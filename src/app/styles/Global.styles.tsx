import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Silkscreen', sans-serif;
    transition: 350ms linear;
    color: ${({ theme: { white } }) => white};

    --three-px: 3px;
    --seven-px: 7px;
    --ten-px: 10px;
  }
`;

export default GlobalStyles;
