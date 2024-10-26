import styled, { keyframes } from "styled-components";

interface IMainTxHistory {}

interface ITabNavigation {
  $selectedIndex: 0 | 1;
}

interface ITabTitle {
  $selected: boolean;
}

interface ITabScreen {
  $width: string;
}

// Keyframe animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MainTxHistory = styled.main<IMainTxHistory>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  position: relative;
 
  padding: calc(var(--ten-px) * 2) calc(var(--ten-px) * 3);
  animation: ${fadeIn} 0.5s ease-out;

  * {
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom right,
      rgba(10, 10, 10, 0.9),  /* Dark gray */
      rgba(5, 5, 5, 0.95),    /* Darker gray */
      rgba(0, 0, 0, 1)        /* Pure black */
    );

    z-index: 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('path/to/your/texture.png') repeat; /* Add texture here */
    opacity: 0.1; /* Adjust opacity for subtlety */
    z-index: 0;
  }
`;

export const MainTab = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  margin: calc(var(--three-px) * 2) 0px;
`;

export const TabNavigation = styled.div<ITabNavigation>`
  position: relative;
  height: 60px;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  transition: background-color 0.3s ease; /* Smooth background transition */

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 90%;
    transform: translate(-50%, -50%);
    background-color: #eee1;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: ${({ $selectedIndex }) => `${$selectedIndex * 50}%`};
    height: 2px;
    width: 50%;
    border-radius: 5px;
    background-color: ${({ theme: { blue } }) => blue};
    transition: left 350ms ease-out;
  }
`;

export const TabTitle = styled.h3<ITabTitle>`
  --color: ${({ $selected }) => ($selected ? "#ffffff" : "#c8e6c9")}; /* Light green when not selected */
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: bold;
  color: #000000;
  text-align: center;
  cursor: pointer;
  padding: 10px 15px; /* Added padding for better click area */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transition for background and transform */

  &:active {
    transform: scale(0.98);
  }

  &:hover {
    background-color: ${({ $selected }) => ($selected ? "transparent" : "#a5d6a7")}; /* Light hover color */
    color: #000; /* Change text color on hover */
  }
`;

export const TabController = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
`;

export const TabScreen = styled.main<ITabScreen>`
  height: 100%;
  width: ${({ $width }) => $width};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: calc(var(--seven-px) * 2);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  ); /* Subtle background gradient for TabScreen */
  animation: ${fadeIn} 0.5s ease-out; /* Apply fade in animation */
`;
