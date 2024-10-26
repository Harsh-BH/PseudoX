import styled, { keyframes, css } from "styled-components";

// Keyframes for animations
const slideIn = keyframes`
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 0, 255, 0.8);
  }
  100% {
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
  }
`;

interface IItem {
  $selected: boolean;
}

export const MainMenu = styled.main`
  height: 80px;
  width: fit-content;
  position: fixed;
  top: 12px;
  right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  animation: ${slideIn} 500ms ease-out; /* Slide-in animation */
`;

export const Item = styled.div<IItem>`
  position: relative;
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px 8px;
  background-color: ${({ $selected }) => ($selected ? "#111" : "#222")};
  color: #fff;
  overflow: hidden;
  cursor: pointer;
  padding: 0px 20px;
  border-radius: ${({ $selected }) => ($selected ? "0px 0px 10px 10px" : "10px")};
  transition: background-color 300ms ease, transform 200ms ease;
  box-shadow: ${({ $selected }) =>
    $selected ? "0px 0px 10px rgba(0, 0, 255, 0.5)" : "none"};
  
  /* Adding a glowing animation for selected items */
  ${({ $selected }) =>
    $selected &&
    css`
      animation: ${glow} 2s infinite alternate ease-in-out;
    `}

  &:hover {
    background-color: #333;
    transform: translateY(-5px); /* Adds lift on hover */
    &::after {
      width: 100%;
      background-color: ${({ theme: { blue } }) => `${blue}80`};
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: ${({ $selected }) => ($selected ? "100%" : "0px")};
    background-color: ${({ $selected, theme: { blue } }) =>
      $selected ? blue : `transparent`};
    transition: width 300ms linear, background-color 300ms ease;
  }
`;

export const ItemText = styled.h3`
  margin-left: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: inherit;
  transition: color 300ms ease;
  animation: ${fadeIn} 500ms ease-out; /* Text fades in */
`;

export const ItemImage = styled.img`
  --size: 32px;
  height: var(--size);
  width: var(--size);
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.4));
  transition: transform 300ms ease;
  animation: ${fadeIn} 500ms ease-out; /* Image fades in */

  ${Item}:hover & {
    transform: scale(1.1); /* Slight scale-up on hover */
  }
`;
