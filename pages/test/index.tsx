import s from "./test.module.scss"

import { CupTest } from "@/components/cup-test"
import { Environment, Html, Lightformer, OrbitControls, OrthographicCamera, Text } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import * as THREE from "three"

export interface TestProps {}

export default function Test(props: TestProps) {
  return (
    <div className="w-screen h-screen">
      <Canvas frameloop="always">
        {/* <PerspectiveCamera makeDefault position={[0, 0, 10]} near={0.1} fov={52} /> */}
        <OrthographicCamera makeDefault position={[0, 0, 1]} near={0.1} zoom={60} />

        <color attach="background" args={["white"]} />

        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 30, 0]} intensity={100} />

        <CupTest />

        <CanvasText />

        {/* <group position={[0, 0, -23]}>
          <mesh geometry={new THREE.SphereGeometry(5, 50)}>
            <meshBasicMaterial color="#e4f6f8" />
          </mesh>
        </group> */}

        <OrbitControls />

        <Environment background={false}>
          <Lightformer
            position={[0, 0, 0]}
            form="circle" // circle | ring | rect (optional, default = rect)
            intensity={100} // power level (optional = 1)
            color="#ffffff" // (optional = white)
            scale={[30, 50, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          {/* <Lightformer
            position={[-5, 0, 1]}
            form="circle" // circle | ring | rect (optional, default = rect)
            intensity={10} // power level (optional = 1)
            color="#ffffff" // (optional = white)
            scale={[2, 5, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          <Lightformer
            position={[0, 5, -2]}
            form="ring" // circle | ring | rect (optional, default = rect)
            intensity={10} // power level (optional = 1)
            color="#ffffff" // (optional = white)
            scale={[10, 5, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
          <Lightformer
            position={[0, 0, 5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={10} // power level (optional = 1)
            color="#ffffff" // (optional = white)
            scale={[10, 5, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          /> */}
        </Environment>
      </Canvas>
    </div>
  )
}

function CanvasText() {
  const { viewport } = useThree()
  const vw = viewport.width * 100

  return (
    <>
      <Text
        position={[0, vw > 1024 ? 0 : 0.5, -50]}
        font="/fonts/dela-gothic-one/DelaGothicOne-Regular.ttf"
        fontSize={vw > 1024 ? 2.5 : 0.75}
        color="#FF5B4A"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.5}
      >
        {`owra`}
      </Text>
    </>
  )
}
