import styled from "styled-components";

// Background layer for icons
export const BackgroundIcons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; // Make sure clicks pass through this layer
  overflow: hidden;
  
  img {
    position: absolute;
    width: 30px; // Adjust icon size
    height: 30px; // Adjust icon size
    opacity: 0.5; // Optional: Adjust opacity for background icons
    animation: float 5s infinite ease-in-out; // Optional: Add some animation for icons
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;
