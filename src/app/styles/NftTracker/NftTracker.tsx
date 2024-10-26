import styled, { keyframes } from "styled-components";

const scaleUp = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;


interface IMainNFTTracker {
  $bgImg: string;
}

interface IAddressButton {
  $selected: boolean;
}

interface INFTCard {
  $bgImg: string;
  $selected: boolean;
  $tokenId: string;
}

interface INFTCardContainer {
  $selected: boolean;
}

interface INFTCardText {
  $fontFamily?: string;
  $fontSize?: string;
}

export const MainNFTTracker = styled.main<IMainNFTTracker>`
 width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: calc(var(--ten-px) * 2) calc(var(--ten-px) * 3);
  background: linear-gradient(180deg, #fcf55f, #f0e68a);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
`;

export const AddressScroller = styled.main`
 width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: auto;
  margin: calc(var(--ten-px) * 2.5) 0 calc(var(--ten-px) * 3.5);
`;

export const AddressButton = styled.button<IAddressButton>`
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  letter-spacing: 1px;
  margin-right: var(--ten-px);
  padding: var(--ten-px) calc(var(--ten-px) * 2);
  color: ${({ $selected }) => ($selected ? "#fff" : "#4B0082")};
  background: ${({ $selected }) =>
    $selected ? "#4B0082" : "#E6E6FA"};
  border: 1px solid ${({ $selected }) => ($selected ? "transparent" : "#4B0082")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background: ${({ $selected }) => ($selected ? "#4B0082" : "#DCDCDC")};
    transform: scale(1.05);
  }
`;

export const NFTCardScroller = styled.main`
    height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;
  padding: calc(var(--ten-px) * 2);
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2) inset;
`;

export const NFTCard = styled.main<INFTCard>`
   position: relative;
  width: ${({ $selected }) => ($selected ? "70%" : "30%")};
  height: 450px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  background: url(${({ $bgImg }) => $bgImg});
  background-position: ${({ $selected }) => ($selected ? "center" : "top")};
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  margin: 0 auto 20px;
  transition: transform 0.3s ease;
  animation: ${fadeIn} 0.5s;

  &:hover {
    transform: scale(1.05);
  }
  &::before {
    content: ${({ $selected, $tokenId }) => ($selected ? `${$tokenId}` : "")};
    position: absolute;
    top: 0px;
    right: 0px;
    height: 50px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    border-radius: 0px 15px 0px 15px;
    padding: 0px
      ${({ $selected }) => ($selected ? "calc(var(--ten-px) * 2.5)" : "0px")};
    background-color: ${({ theme: { blue } }) => blue};
    opacity: ${({ $selected }) => ($selected ? "0.9" : "0.001")};
    z-index: 2;
  }


`;

export const NFTCardContainer = styled.div<INFTCardContainer>`
  position: absolute;
  bottom: 0;
  left: ${({ $selected }) => (!$selected ? "0" : "")};
  right: ${({ $selected }) => ($selected ? "0" : "")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${({ $selected }) => ($selected ? "100%" : "0")};
  width: ${({ $selected }) => ($selected ? "80%" : "100%")};
  background: rgba(253, 218, 13, 0.9);
  border-radius: ${({ $selected }) =>
    $selected ? "0 15px 15px 0" : "1px"};
  box-shadow: 0 -150px 300px rgba(0, 0, 0, 0.15);
  z-index: 1;
  transition: height 0.3s ease;

  * {
    visibility: ${({ $selected }) => ($selected ? "visible" : "hidden")};
  }
`;

export const NFTCardField = styled.h3`
 font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-right: var(--ten-px);
  text-transform: uppercase;
`;

export const NFTCardText = styled.h3<INFTCardText>`
 font-family: ${({ $fontFamily }) => $fontFamily || "Source Sans Pro"};
  font-size: ${({ $fontSize }) => $fontSize || "1.3rem"};
  font-weight: 300;
  color: #fff;
  height: fit-content;
  max-height: 250px;
  overflow-y: auto;
  padding: 10px;
  text-align: justify;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
`;
