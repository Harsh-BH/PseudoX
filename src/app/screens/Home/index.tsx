import React, { MutableRefObject,Suspense, useEffect, useRef, useState } from "react";
// styles
import {
  Body,
  Floater,
  FloaterButton,
  Image,
  MainHome,
  MainScroller,
  Title,
  FontStyles // Import FontStyles here
} from "@/app/styles/Home/index.styles";
import { FlexContainer } from "@/app/styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";

import { Canvas } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';
import Robot from "@/models/robot";

const Home = () => {
  const mainScrollerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const {
    home: { BODY_BOLD, BODY_NORMAL, contents },
  } = screens;

  const [contentState, setContentState] = useState(contents);
  const [scrollerCounter, setScrollerCounter] = useState(0);
  const [scrollerRefWidth, setScrollerRefWidth] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const target = mainScrollerRef.current;

      if (target) {
        setScrollerCounter((prevState) =>
          prevState >= target.children[0].children.length - 1
            ? 0
            : prevState + 1
        );
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const target = mainScrollerRef.current;
    const scrollXBy = target.clientWidth * scrollerCounter;

    let newWidth = `${target.clientWidth}px`;

    if (scrollerRefWidth !== newWidth) {
      setScrollerRefWidth(newWidth);
    }

    target.scrollTo({
      behavior: "smooth",
      left: scrollXBy,
      top: 0,
    });
  }, [scrollerCounter]);

  return (
    <>
      <FontStyles /> {/* Ensure FontStyles is rendered */}
      <MainHome>
        <MainScroller ref={mainScrollerRef}>
          <FlexContainer
            $flexDirection="row"
            $justifyContent="flex-start"
            $alignItems="top"
            $height="100%"
            $width="fit-content"
          >
            {contentState.map(({ body, image, title }, key) => (
              <FlexContainer
                key={key}
                $flexDirection="column"
                $justifyContent="flex-start"
                $alignItems="flex-start"
                $height="100%"
                $width={scrollerRefWidth}
              >
                <FlexContainer
                  $flexDirection="column"
                  $height="100%"
                  $padding={"40px 0px 0px 0px"}
                  $width="50%"
                  $justifyContent="top"
                  $alignItems="top"
                >
                  <Image $bgImg={image} />
                </FlexContainer>
                <FlexContainer
                  $flexDirection="column"
                  $height="100%"
                  $width="50%"
                  $padding={"0px 0px 0px 0px"}
                  $justifyContent="Top"
                >
                  <Title>{title}</Title>
                  <FlexContainer
                    $alignSelf="flex-start"
                    $flexWrap="wrap"
                    $flexDirection="row"
                    $width="600px"
                    $miscellaneous="transform: translateY(30%);"
                  >
                    <Body $isNormal={true}>
                      {body.map(({ text, type }, key) =>
                        type === BODY_NORMAL ? (
                          text
                        ) : (
                          <Body key={key} $isNormal={type === BODY_NORMAL}>
                            {text}
                          </Body>
                        )
                      )}
                    </Body>
                  </FlexContainer>
                </FlexContainer>
              </FlexContainer>
            ))}
          </FlexContainer>
        </MainScroller>
        <Floater>
          {contentState.map((_, index) => (
            <FloaterButton key={index} $selected={index === scrollerCounter} />
          ))}
        </Floater>

        <Canvas shadows camera={{ position: [0, 0, 10] }} style={{ position: 'absolute', right: 0,  width: '70%' ,zIndex:'0' }}>
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
            <Robot 
              position={[1, -2, 0]} 
              rotation={[0.2, 0, 0]} 
              scale={[3.1,3.1,3.1]} 
              castShadow 
              receiveShadow
              // animation={animations[animationIndex]} 
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
      </MainHome>
    </>
  );
};

export default Home;
