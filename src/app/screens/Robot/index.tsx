import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import RobotThree from "../../../models/robotThree";
import { OrbitControls, Text } from "@react-three/drei";
import Link from 'next/link'; // Import Link from next/link
import { MainNFTTracker } from "@/app/styles/NftTracker/NftTracker";

const Robot = () => {
    return (
     
        <div style={{ position: 'relative', width: '100%', height: '1000px', marginTop: '20px' }}>
            <Canvas
                shadows
                camera={{ position: [0, 140, 50] }}
                style={{ width: '100%', height: '100%', zIndex: 0 }}
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
                    <Text
                        position={[0, 100, 0]}
                        fontSize={6}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/Silkscreen-Bold.ttf"
                    >
                        FIND TX && HOLDINGS
                    </Text>

                    <RobotThree
                        position={[0, 0, 0]}
                        rotation={[-0.4, 0, 0]}
                        scale={[1.2, 1.2, 1.2]}
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

                    {/* <OrbitControls /> */}
                </Suspense>
            </Canvas>

            {/* Scroll Down Button */}
            <Link href="/holdings">
    <button
        style={{
            position: 'absolute',
            top: '50rem', // Position it below the text
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#008000',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            zIndex: 1,
            transition: 'background-color 0.3s, transform 0.3s', // Add transition for smooth effect
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#006400'; // Darker green on hover
            e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)'; // Slightly scale up
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#008000'; // Original color
            e.currentTarget.style.transform = 'translateX(-50%) scale(1)'; // Reset scale
        }}
    >
        Click me!!
    </button>
</Link>


        </div>
     
    );
};

export default Robot;
