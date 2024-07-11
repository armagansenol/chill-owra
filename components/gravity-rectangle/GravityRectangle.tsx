import { gsap } from "@/lib/gsap"
import { Environment, Html, Lightformer, OrthographicCamera, Text } from "@react-three/drei"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { BallCollider, CuboidCollider, Physics, RapierRigidBody, RigidBody } from "@react-three/rapier"
import cx from "clsx"
import { Leva } from "leva"
import { easing } from "maath"
import dynamic from "next/dynamic"
import { useRef } from "react"
import * as THREE from "three"
import { AmbientLight, SpotLight } from "three"
import { IceModel } from "../ice-model"
import { LoadingSpinner } from "../utility/loading-spinner"
import s from "./three-fiber-ultia.module.scss"
extend({ AmbientLight, SpotLight })

const IceCube = dynamic(() => import("@/components/ice-cube"), {
  loading: () => (
    <Html>
      <LoadingSpinner />
    </Html>
  ),
  ssr: false,
})

export interface GravityRectangleProps {}

export default function GravityRectangle(props: GravityRectangleProps) {
  return (
    <div className={cx(s.wrapper, "w-full h-full")}>
      <Canvas frameloop="always">
        {/* <PerspectiveCamera makeDefault position={[0, 0, 180]} near={0.1} fov={52} /> */}
        <OrthographicCamera makeDefault position={[0, 0, 1]} near={0.1} zoom={60} />
        {/* <Camera /> */}

        <color attach="background" args={["white"]} />

        <IceModel />

        <PhysicsIceCube />

        <CanvasText />

        <Environment
          background={false}
          preset="sunset"
          environmentIntensity={0.2}
          environmentRotation={new THREE.Euler(Math.PI * 1, 0, 0)}
          blur={64.8}
        >
          <Lightformer
            position={[5, 0, -5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={10} // power level (optional = 1)
            color="#0075ce" // (optional = white)
            scale={[3, 5, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          <Lightformer
            position={[-5, 0, 1]}
            form="circle" // circle | ring | rect (optional, default = rect)
            intensity={10} // power level (optional = 1)
            color="#0075ce" // (optional = white)
            scale={[2, 5, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          <Lightformer
            position={[0, 5, -2]}
            form="ring" // circle | ring | rect (optional, default = rect)
            intensity={10} // power level (optional = 1)
            color="#0075ce" // (optional = white)
            scale={[10, 5, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
          <Lightformer
            position={[0, 0, 5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={10} // power level (optional = 1)
            color="#0075ce" // (optional = white)
            scale={[10, 5, 0]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
        </Environment>

        <ambientLight intensity={Math.PI * 2} />
        {/* <spotLight position={[-20, -20, -20]} penumbra={1} castShadow angle={0.2} /> */}
        {/* <pointLight position={[-10, -10, -10]} /> */}
        {/* <directionalLight intensity={4} position={[0, 2, 3]} /> */}

        <Rig />
      </Canvas>
      <Leva hidden={true} />
    </div>
  )
}

function Walls() {
  const { width: viewportWidth, height: viewportHeight } = useThree((state) => state.viewport)
  const radius = viewportWidth / 2

  return (
    <>
      {/* rectangle */}
      <CuboidCollider position={[0, viewportHeight / 2 + 1, 0]} args={[viewportWidth / 2, 1, 1]} />
      <CuboidCollider position={[0, -viewportHeight / 2 - 1, 0]} args={[viewportWidth / 2, 1, 1]} />
      <CuboidCollider position={[-viewportWidth / 2 - 1, 0, 0]} args={[1, viewportHeight * 10, 10]} />
      <CuboidCollider position={[viewportWidth / 2 + 1, 0, 0]} args={[1, viewportHeight * 10, 1]} />
      {/* rectangle */}
    </>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const api = useRef<RapierRigidBody>(null)

  useFrame(({ pointer, viewport }) => {
    api.current?.setNextKinematicTranslation(
      vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0)
    )
  })

  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={api}>
      {/* <Sphere args={[0.2]}>
        <meshStandardMaterial color="#FF5B4A" />
      </Sphere> */}
      <BallCollider args={[1]} />
    </RigidBody>
  )
}

function PhysicsIceCube() {
  const { viewport } = useThree()
  const vw = viewport.width * 100

  return (
    <>
      <Physics gravity={[0, 0, 0]}>
        {vw > 1024 && (
          <>
            {Array.from({ length: 30 }, (v, i) => (
              <IceCube
                key={i}
                scale={gsap.utils.random(0.5, 0.8, 0.001)}
                position={new THREE.Vector3(gsap.utils.random(-5, 5), gsap.utils.random(-5, 5), 0)}
              />
            ))}
          </>
        )}
        <Walls />
        <Pointer />
      </Physics>
    </>
  )
}

function Rig() {
  const { viewport } = useThree()
  const vw = viewport.width * 100

  useFrame((state, delta) => {
    if (vw <= 1024) return

    easing.damp3(
      state.camera.position,
      [Math.sin(-state.pointer.x) / 2, state.pointer.y / 2, 10 + Math.cos(state.pointer.x) / 2],
      0.2,
      delta
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

function CanvasText() {
  const { viewport } = useThree()
  const vw = viewport.width * 100

  return (
    <>
      <Text
        position={[0, vw > 1024 ? 0 : 0.5, -10]}
        font="/fonts/dela-gothic-one/DelaGothicOne-Regular.ttf"
        fontSize={vw > 1024 ? 2.5 : 0.75}
        color="#D9D9D9"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.5}
      >
        {`Coming Soon`}
      </Text>
    </>
  )
}
