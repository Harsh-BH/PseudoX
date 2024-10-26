import styled, { createGlobalStyle } from "styled-components";

interface IBody {
  $isNormal: boolean;
}

interface IImage {
  $bgImg: string;
}

interface IFloaterButton {
  $selected: boolean;
}

// Global styles to import the font for this component only
const FontStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap');
`;

export const MainHome = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px calc(var(--ten-px) * 8);
`;

export const MainScroller = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
`;

export const Image = styled.div<IImage>`
  width: 600px;
  height: 400px;
  background: url(${({ $bgImg }) => $bgImg});
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50px;
`;

export const Title = styled.h3`
  font-family: "Silkscreen", sans-serif; /* Apply Silkscreen font here */
  font-size: 3rem;
  font-weight: bolder;
  letter-spacing: 2px;

`;

export const Body = styled.span<IBody>`
  display: inline;
  font-family: "Silkscreen", sans-serif; /* Keep Open Sans for the body text */
  font-size: 1.5rem;
  font-weight: ${({ $isNormal }) => ($isNormal ? "200" : "900")};
  opacity: ${({ $isNormal }) => ($isNormal ? "0.7" : "1")};
  letter-spacing: 2px;
  line-height: 2.3rem;
  margin-bottom:-12rem;
`;

export const Floater = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
`;

export const FloaterButton = styled.div<IFloaterButton>`
  width: 40px;
  height: 4px;
  margin-right: calc(var(--ten-px) * 2);
  border-radius: 4px;
  background-color: ${({ $selected }) => ($selected ? "#FFF" : "#FFF4")};

  &:hover {
    background-color: ${({ $selected }) => ($selected ? "#FFF" : "#FFF9")};
  }
`;

// Export the FontStyles along with other components
export { FontStyles };
