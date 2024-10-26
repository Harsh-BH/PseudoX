  "use client";
  import React, { Suspense, useEffect, useState } from "react";
  // api
  import { ethereumWhales, fetchNFTs } from "@/api";
  // components
  import SearchBar from "@/app/components/SearchBar";
  // store
  import { useOwnerNFTPortfolioStore } from "@/store";
  // styles
  import { Loader } from "@/app/styles/Loader.styles";
  import {

     FaWpexplorer
  } from "react-icons/fa";


  import {BackgroundIcons} from "@/app/styles/BackgroundIcons"


  import {
    AddressButton,
    AddressScroller,
    MainNFTTracker,
    NFTCard,
    NFTCardContainer,
    NFTCardField,
    NFTCardScroller,
    NFTCardText,
  } from "@/app/styles/NftTracker/NftTracker";
  import { FlexContainer } from "@/app/styles/shared/Container.styles";
  import { SearchText, Title } from "@/app/styles/shared/Text.styles";
  // utils
  import { screens } from "@/utils/data";
  import { Canvas } from '@react-three/fiber';

  const LOCAL_STORAGE_ADDRESS_NFTS = "addressNFTsPortfolio";
  import RobotTwo from "../../../models/robotTwo"
import { VscRemoteExplorer } from "react-icons/vsc";
import { SiAzuredataexplorer, SiBlockchaindotcom, SiHiveBlockchain } from "react-icons/si";
import { GrTransaction } from "react-icons/gr";
import { FaUsersViewfinder } from "react-icons/fa6";
import { TbViewfinder } from "react-icons/tb";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { ImFinder } from "react-icons/im";
import { BsBehance, BsCloudHaze2, BsCurrencyDollar, BsFillMotherboardFill } from "react-icons/bs";

  const NftTracker = () => {
    const {
      default: {
        images: { defaultImage, loaderGif, logo },
      },
    } = screens;

    const [currentSearchedAddress, setCurrentSearchedAddress] = useState("");
    const [formState, setFormState] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [walletAddresses, setWalletAddresses] = useState(ethereumWhales);
    

    const [ownerNFTPortfolioState, setOwnerNFTPortfolioState] =
      useOwnerNFTPortfolioStore(({ state, setState }) => [state, setState]);

    const selectedWalletAddress = walletAddresses.find((item) => item.selected)!;

    const handleWalletAddressClick = (_index: number) => {
      setWalletAddresses((prevState) => {
        const updatedWalletAddress = prevState.map((item, index) => ({
          ...item,
          selected: _index == index,
        }));

        return updatedWalletAddress;
      });
    };

    const svgPositions = [
      { top: '10%', left: '15%', fontSize: '70px', rotation: '15deg' },
      { top: '25%', left: '70%', fontSize: '70px', rotation: '-20deg' },
      { top: '50%', left: '40%', fontSize: '70px', rotation: '30deg' },
      { top: '70%', left: '80%', fontSize: '75px', rotation: '45deg' },
      { top: '70%', left: '30%', fontSize: '75px', rotation: '-30deg' },
      { top: '15%', left: '50%', fontSize: '75px', rotation: '60deg' },
      { top: '35%', left: '10%', fontSize: '75px', rotation: '-45deg' },
      { top: '60%', left: '60%', fontSize: '70px', rotation: '15deg' },
      { top: '35%', left: '80%', fontSize: '75px', rotation: '-45deg' },
      { top: '60%', left: '90%', fontSize: '70px', rotation: '15deg' },
      { top: '20%', left: '90%', fontSize: '70px', rotation: '15deg' },
      { top: '70%', left: '10%', fontSize: '75px', rotation: '45deg' },
      { top: '20%', left: '30%', fontSize: '75px', rotation: '-30deg' },
       
  ];

  const musicalIcons = [
    <FaWpexplorer />,
    <VscRemoteExplorer />,
    <SiAzuredataexplorer />,
    <GrTransaction />,
    <FaUsersViewfinder />,
    <TbViewfinder />,
    <HiMiniViewfinderCircle />,
    <ImFinder />,
    <SiBlockchaindotcom />,
    <BsBehance />,
    <BsCloudHaze2 />,
    <BsCurrencyDollar />,
    <BsFillMotherboardFill />

];

const numberOfIcons = 30;


const renderIcons = () => {
  return svgPositions.map((position, index) => {
    const randomIcon = musicalIcons[Math.floor(Math.random() * musicalIcons.length)]; // Randomly choose an icon
    return (
      <div
        key={index}
        style={{
          position: 'absolute',
          left: position.left,
          top: position.top,
          transform: `translate(-50%, -50%) rotate(${position.rotation})`, // Rotate icon
          fontSize: position.fontSize, // Set font size from position
          opacity: 0.2, // Adjust opacity for background icons
          pointerEvents: 'none', // Allow clicks to pass through
        }}
      >
        {randomIcon}
      </div>
    );
  });
};


    

    const handleNFTCardClick = (_index: number) => {
      const assets = ownerNFTPortfolioState[
        selectedWalletAddress.text
      ].assets.map((item, index) => ({
        ...item,
        selected: index == _index ? !item.selected : false,
      }));

      setOwnerNFTPortfolioState({
        [selectedWalletAddress.text]: {
          ...ownerNFTPortfolioState[selectedWalletAddress.text],
          assets,
        },
      });
    };

    const handleSearchBarChange: React.ChangeEventHandler = ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => {
      setFormState(value);
    };

    const handleSearchSubmit = async () => {
      if (formState.length == 0) {
        return;
      }

      const isValid = formState.toLowerCase().match(/(\b0x[a-f0-9]{40}\b)/g);

      if (!isValid) {
        alert("Invalid wallet address. Must be a valid Ethereum Address");
        return;
      }

      setSearchLoading(true);
      setLoading(true);

      const { data, error, success } = await fetchNFTs(formState);

      console.log(data)

      if (success) {
        const { owner } = data;

        setCurrentSearchedAddress(formState);
        setOwnerNFTPortfolioState({ [owner]: data });
      }
    };

    useEffect(() => {
      const localStorageOwnerNFTPortfolioState = localStorage.getItem(
        LOCAL_STORAGE_ADDRESS_NFTS
      );

      if (localStorageOwnerNFTPortfolioState) {
        setOwnerNFTPortfolioState(JSON.parse(localStorageOwnerNFTPortfolioState));
      }

      Promise.all(
        walletAddresses.map(async ({ text }) => {
          if (!ownerNFTPortfolioState[text]) {
            const { data, error, success } = await fetchNFTs(text);

            if (!success) {
              throw error;
            }

            const { owner } = data;

+
            setOwnerNFTPortfolioState({ [owner]: data });
          }
        })
      )
        .then((res) => { })
        .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
      setLoading(false);
      setSearchLoading(false);
      const keys = Object.getOwnPropertyNames(ownerNFTPortfolioState);

      if (keys.length) {
        localStorage.setItem(
          LOCAL_STORAGE_ADDRESS_NFTS,
          JSON.stringify(ownerNFTPortfolioState)
        );
      }
    }, [ownerNFTPortfolioState]);

    useEffect(() => {
      if (currentSearchedAddress) {
        setWalletAddresses((prevState) => {
          const updatedWalletAddress = prevState.map((item) => ({
            ...item,
            selected: false,
          }));

          return updatedWalletAddress;
        });
      }
    }, [currentSearchedAddress]);

    useEffect(() => {
      const selectedWalletAddress = walletAddresses.find((item) => item.selected);

      if (selectedWalletAddress) {
        setLoading(true);
        setCurrentSearchedAddress("");
        fetchNFTs(selectedWalletAddress.text)
          .then((res) => {
            const { data, error, success } = res;

            if (!success) throw error;

            const { owner } = data;

            setOwnerNFTPortfolioState({ [owner]: data });
          })
          .catch((err) => console.log(err));
      }
    }, [walletAddresses]);

    console.log("NFT assets:", ownerNFTPortfolioState[currentSearchedAddress]?.assets);

    console.log("Current Searched Address:", currentSearchedAddress);
    console.log("Owner NFT Portfolio State:", ownerNFTPortfolioState);

    
    
    return (
      <MainNFTTracker $bgImg={logo.src}>
        <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Allow clicks to pass through
      }}>
        {renderIcons()}
      </div>
        <FlexContainer $flexDirection="row" $padding="20px 0 40px 0">
          <Title>NFT Portfolio Tracker</Title>
        </FlexContainer>

        {/* Main split container */}
        <FlexContainer $flexDirection="row" $alignItems="stretch">
          {/* Left Side: Search Section */}
          <FlexContainer
            $flexDirection="row"
            $alignItems="center"
            $width="50%"
            $padding="0 10px"
          >
            <FlexContainer $flexDirection="column" $alignItems="center" $width="90%" $padding="0 10px">
              <FlexContainer $flexDirection="row"  $alignItems="end"  $justifyContent="end" >
              <SearchBar
            disabled={formState.length == 0}
            loading={searchLoading}
            id="input_search"
            name="input_search"
            placeholder="Owner: 0xffdd..."
            value={formState}
            onChange={handleSearchBarChange}
            searchFunction={handleSearchSubmit}
          />
              </FlexContainer>

              {currentSearchedAddress.length > 0 && (
                <FlexContainer $flexDirection="row" $width="fit-content" $padding="0 0 0 15px">
                  <SearchText $opacity="0.4">Showing Results for:</SearchText>
                  <SearchText>{currentSearchedAddress}</SearchText>
                </FlexContainer>
              )}

              {/* 3D Model Canvas - Now placed below the SearchBar */}
              <Canvas
                shadows
                camera={{ position: [0, 0, 10] }}
                style={{ width: '1400px', height: '900px', zIndex: 0, marginTop: '20px' }}
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
                  <RobotTwo
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                    scale={[1.5,1.5,1.5]}
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


            {/* Right Side: Address and NFT Cards */}
            <FlexContainer $flexDirection="column" $width="50%" $padding="0 10px">
              {/* Address Scroller */}
              <AddressScroller style={{ maxHeight: "200px", overflowY: "auto" }}>
                <FlexContainer $flexDirection="row" $justifyContent="flex-start" $width="fit-content">
                  {walletAddresses.reverse().map(({ text, selected }, key) => (
                    <AddressButton
                      key={key}
                      $selected={selected}
                      onClick={() => handleWalletAddressClick(key)}
                    >
                      {text}
                    </AddressButton>
                  ))}
                </FlexContainer>
              </AddressScroller>

              {/* NFT Cards */}
              <NFTCardScroller style={{ maxHeight: "800px", overflowY: "auto" }}>
                {loading ? (
                  <FlexContainer $height="100%" $alignItems="center" $justifyContent="center">
                    <Loader src={loaderGif.src} $size="80px" />
                  </FlexContainer>
                ) : (
                  <FlexContainer $flexDirection="row" $flexWrap="wrap" $justifyContent="flex-start" $alignItems="flex-start">
                    {currentSearchedAddress.length > 0 ? (
                      ownerNFTPortfolioState[currentSearchedAddress]?.assets.length === 0 ||
                        !ownerNFTPortfolioState[currentSearchedAddress] ? (
                        <FlexContainer $height="100%" $alignItems="center" $justifyContent="center">
                          <SearchText>No NFTs found</SearchText>
                        </FlexContainer>
                      ) : (
                        ownerNFTPortfolioState[currentSearchedAddress]?.assets.map(
                          ({ collectionName, collectionTokenId, description, imageUrl, selected }, key) => (
                            <NFTCard
                              key={key}
                              $bgImg={imageUrl || defaultImage.src}
                              $selected={selected}
                              $tokenId={`"#${collectionTokenId}"`}
                              onClick={() => handleNFTCardClick(key)}
                            >
                              <NFTCardContainer $selected={selected}>
                                <FlexContainer $flexDirection="row" $alignItems="center" $justifyContent="flex-start" $padding="10px 20px">
                                  <NFTCardField>Collection:</NFTCardField>
                                  <NFTCardText>{collectionName}</NFTCardText>
                                </FlexContainer>
                                {selected && (
                                  <FlexContainer $flexDirection="row" $alignItems="center" $justifyContent="flex-start" $padding="10px 20px">
                                    <NFTCardText $fontFamily="Open Sans" $fontSize="1.1rem">
                                      {description}
                                    </NFTCardText>
                                  </FlexContainer>
                                )}
                              </NFTCardContainer>
                            </NFTCard>
                          )
                        )
                      )
                    ) : (
                      ownerNFTPortfolioState[selectedWalletAddress.text]?.assets.map(
                        ({ collectionName, collectionTokenId, description, imageUrl, selected }, key) => (
                          <NFTCard
                            key={key}
                            $bgImg={imageUrl || defaultImage.src}
                            $selected={selected}
                            $tokenId={`"#${collectionTokenId}"`}
                            onClick={() => handleNFTCardClick(key)}
                          >
                            <NFTCardContainer $selected={selected}>
                              <FlexContainer $flexDirection="row" $alignItems="center" $justifyContent="flex-start" $padding="10px 20px">
                                <NFTCardField>Collection:</NFTCardField>
                                <NFTCardText>{collectionName}</NFTCardText>
                              </FlexContainer>
                              {selected && (
                                <FlexContainer $flexDirection="row" $alignItems="center" $justifyContent="flex-start" $padding="10px 20px">
                                  <NFTCardText $fontFamily="Open Sans" $fontSize="1.1rem">
                                    {description}
                                  </NFTCardText>
                                </FlexContainer>
                              )}
                            </NFTCardContainer>
                          </NFTCard>
                        )
                      )
                    )}
                  </FlexContainer>
                )}
              </NFTCardScroller>
            </FlexContainer>
          </FlexContainer>

      </MainNFTTracker>
    );


  };

  export default NftTracker;
