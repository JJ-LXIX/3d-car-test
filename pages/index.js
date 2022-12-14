import { Canvas } from "@react-three/fiber";
import Head from "next/head";
import { Suspense } from "react";

import {
  OrbitControls,
  PerspectiveCamera,
  CubeCamera,
  Environment,
} from "@react-three/drei";
import Ground from "../Components/Ground";
import Car from "../Components/Car";
import Rings from "../Components/Rings";
import Boxes from "../Components/Boxes";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import FloatingGrid from "../Components/FloatingGrid";
import Loading from "../Components/Loading";

const CarShow = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />

      {/* Car Component */}
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      {/* Rings Component */}
      <Rings />

      {/* Box Component */}
      <Boxes />

      {/*FloatingGrid Component */}
      <FloatingGrid />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      {/* Ground Component */}
      <Ground />

      {/* Effect Composer */}
      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.5}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer>
    </>
  );
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>React Three Fiber Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <Suspense fallback={<Loading />}>
          <Canvas shadows>
            <CarShow />
          </Canvas>
        </Suspense>
      </>
    </div>
  );
}
