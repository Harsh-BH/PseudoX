"use client";
// screens
import Home from "../screens/Home";
import NftTracker from "../screens/NftTracker";
import Robot from "../screens/Robot";

// styles
import { FlexContainer } from "../styles/shared/Container.styles";

export default function Primary() {
  return (
    <FlexContainer>
      <Home />
      <NftTracker />
      <Robot/>
  
    </FlexContainer>
  );
}
