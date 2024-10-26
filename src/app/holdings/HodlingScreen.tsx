"use client";
import React, { useEffect, useState ,Suspense} from "react";
// api
import { ethereumWhales, getWalletTokenBalance } from "@/api";
import { IWalletTokenBalanceResult } from "@/api/interface";
// components
import Card from "@/app/components/txHodlings/Card";
import SearchBar from "@/app/components/SearchBar";
import { Canvas } from '@react-three/fiber';
// styles
import {
  HodlingContainer,
  HodlingScroller,
  ViewButton,
} from "@/app/styles/TxHodlings/HodlingScreen.styles";
import { SearchText } from "@/app/styles/shared/Text.styles";
import {
  FlexContainer,
  PositionContainer,
} from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";
import { Loader } from "@/app/styles/Loader.styles";
import Game from "../../models/game"
import { OrbitControls } from "@react-three/drei";
import Drone from "../../models/game";

const LOCAL_STORAGE_IS_GRID_VIEW = "localStorageIsGridView";

const HodlingScreen = () => {
  const [currentSearchedAddress, setCurrentSearchedAddress] = useState("");
  const [formState, setFormState] = useState("");
  const [isGridView, setIsGridView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [walletTokens, setWalletTokens] = useState<IWalletTokenBalanceResult[]>(
    []
  );

  const {
    default: {
      images: { loaderGif },
    },
    txHodlings: {
      hodlingScreen: {
        images: { gridViewIcon, listViewIcon },
      },
    },
  } = screens;

  const handleSearchBarChange: React.ChangeEventHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(value);
  };

  const handleSearchSubmit = async () => {
    if (formState.length === 0) {
      return;
    }

    const isValid = formState.toLowerCase().match(/(\b0x[a-f0-9]{40}\b)/g);

    if (!isValid) {
      alert("Invalid wallet address. Must be a valid Ethereum Address");
      return;
    }

    setSearchLoading(true);
    setLoading(true);

    const { data, error, success } = await getWalletTokenBalance(formState);

    if (success) {
      setCurrentSearchedAddress(formState);
      setWalletTokens(data.result);
    }
  };

  const handleViewButtonClick = (isGridView: boolean) => {
    setIsGridView(isGridView);
  };

  useEffect(() => {
    const localStorageIsGridView = localStorage.getItem(LOCAL_STORAGE_IS_GRID_VIEW);

    if (localStorageIsGridView) {
      setIsGridView(JSON.parse(localStorageIsGridView));
    }

    const randomIndex = Math.floor(Math.random() * ethereumWhales.length);

    if (walletTokens.length === 0) {
      getWalletTokenBalance(ethereumWhales[randomIndex].text)
        .then((res) => {
          const { data, error, success } = res;

          if (!success) {
            throw error;
          }

          setWalletTokens(data.result);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    setLoading(false);
    setSearchLoading(false);
  }, [walletTokens]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_IS_GRID_VIEW, JSON.stringify(isGridView));
  }, [isGridView]);

  return (
    <FlexContainer $height={"100%"} $flexDirection="row">
      {/* Left Side: Search Bar and Results */}
      <FlexContainer $flexDirection="column" $width="70%" $padding="20px">
        <PositionContainer
          $position="relative"
          $flexDirection="row"
          $justifyContent="space-between"
          $alignItems="center"
          $width={"100%"}
        >
          <FlexContainer $flexDirection="row" $justifyContent="center">
            <SearchBar
              disabled={formState.length === 0}
              loading={searchLoading}
              id="input_tx_searchbar"
              name="input_tx_searchbar"
              placeholder="Address: 0x42d904b..."
              borderRadius="10px"
              width="500px"
              value={formState}
              onChange={handleSearchBarChange}
              searchFunction={handleSearchSubmit}
            />
          </FlexContainer>
          <PositionContainer
            $right="8%"
            $flexDirection="row"
            $justifyContent="flex-end"
            $width="fit-content"
            $padding={"0px 0px 0px 0px"}
          >
            <ViewButton
              $bgImg={gridViewIcon.src}
              $selected={isGridView}
              onClick={() => handleViewButtonClick(true)}
            ></ViewButton>
            <ViewButton
              $bgImg={listViewIcon.src}
              $selected={!isGridView}
              onClick={() => handleViewButtonClick(false)}
            ></ViewButton>
          </PositionContainer>
        </PositionContainer>
        {loading ? (
          <FlexContainer
            $flexDirection="row"
            $alignItems="center"
            $justifyContent="center"
          >
            <Loader src={loaderGif.src} $size="70px" />
          </FlexContainer>
        ) : currentSearchedAddress.length ? (
          <FlexContainer
            $flexDirection="row"
            $alignItems="center"
            $justifyContent="center"
          >
            <SearchText $opacity={"0.4"}>Showing Results for: </SearchText>
            <SearchText>{currentSearchedAddress}</SearchText>
          </FlexContainer>
        ) : (
          <></>
        )}
        {walletTokens.length ? (
          <HodlingScroller>
            <HodlingContainer $isGridView={isGridView}>
              {walletTokens.map(({ name, symbol, decimals, totalBalance }, key) =>
                Number(totalBalance) > 0 && name && symbol ? (
                  <Card
                    key={key}  // Added key prop for Card
                    decimals={Number(decimals || 1)}
                    isGridView={isGridView}
                    name={name || ""}
                    symbol={symbol || ""}
                    totalBalance={Number(totalBalance)}
                  />
                ) : null
              )}
            </HodlingContainer>
          </HodlingScroller>
        ) : (
          <FlexContainer
            $height="100%"
            $alignItems="center"
            $justifyContent="center"
          >
            <SearchText>No ERC-20 tokens found</SearchText>
          </FlexContainer>
        )}
      </FlexContainer>

      {/* Right Side: Space for the model */}
      <FlexContainer $width="50%" $padding="20px" $alignItems="center" $justifyContent="center">
        {/* Place your model component or content here */}
        <Canvas
                shadows
                camera={{ position: [0, 0, 10] }}
                style={{ width: '1400px', height: '900px', zIndex: 20, marginTop: '20px' }}
              >
                <ambientLight intensity={0.5} />
                <directionalLight
                  position={[5, 10, 5]}
                  intensity={5}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                  shadow-camera-near={0.5}
                  shadow-camera-far={50}
                  shadow-camera-left={-10}
                  shadow-camera-right={10}
                  shadow-camera-top={10}
                  shadow-camera-bottom={-10}
                />
                <pointLight position={[0, 10, 10]} intensity={1} />
                <pointLight position={[0, -10, -10]} intensity={0.5} />
                <Suspense fallback={null}>
                  <Drone
                    position={[0, 0, 3]}
                    rotation={[0.2, -0.2, 0]}
                    scale={[10,10,10]}
                    castShadow
                    receiveShadow
                  />
              
                  <mesh
                    position={[0, -3, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    receiveShadow
                  >
                    <planeGeometry args={[50, 50]} />
                    <shadowMaterial opacity={0.5} />
                  </mesh>
                </Suspense>
              </Canvas>
      </FlexContainer>
    </FlexContainer>
  );
};

export default HodlingScreen;
