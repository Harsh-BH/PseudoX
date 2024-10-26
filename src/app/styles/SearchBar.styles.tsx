import styled, { keyframes } from "styled-components";

interface IMainSearch {
  $borderRadius?: string;
  $width?: string;
}

interface IButton {
  $bgImg: string;
  $disabled: boolean;
}

// Smooth scaling effect on hover
const scaleAnimation = keyframes`
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Pulse animation for TextInput focus
const focusPulse = keyframes`
  0% {
    box-shadow: 0 0 0px 0 rgba(100, 100, 100, 0.3);
  }
  100% {
    box-shadow: 0 0 8px 4px rgba(100, 100, 100, 0.3);
  }
`;

export const MainSearch = styled.main<IMainSearch>`
  height: 50px;
  width: ${({ $width }) => $width || "850px"};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border: 2px solid #9994;
  background-color: rgba(200, 200, 200, 0.1);
  padding-right: var(--seven-px);
  overflow: hidden;
  border-radius: ${({ $borderRadius }) => $borderRadius || "5px"};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const TextInput = styled.input`
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 200;
  padding: var(--seven-px);
  padding-left: calc(var(--ten-px) * 1.5);
  background: transparent;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
  
  &:focus {
    animation: ${focusPulse} 0.3s forwards;
  }

  &:active,
  &:-webkit-autofill,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:hover {
    background: transparent;
  }
`;

export const SubmitButton = styled.button<IButton>`
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  transform: scale(0.9);
  opacity: ${({ $disabled }) => ($disabled ? "0.3" : "1")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    animation: ${scaleAnimation} 500ms forwards linear;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.85);
  }
`;
