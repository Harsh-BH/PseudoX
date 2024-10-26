// components/Tooltip.tsx
import React from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

interface TooltipData {
  collectionName: string;
  description: string;
}

interface TooltipProps {
  position: { x: number; y: number };
  data: TooltipData;
  onClose: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ position, data, onClose }) => {
  return (
    <TooltipContainer style={{ top: position.y, left: position.x }}>
      <h4>{data.collectionName}</h4>
      <p>{data.description}</p>
      <button onClick={onClose}>Close</button>
    </TooltipContainer>
  );
};

export default Tooltip;
