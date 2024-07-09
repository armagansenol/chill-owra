import { gsap } from "@/lib/gsap"
import { Environment, Html, Sphere, Text } from "@react-three/drei"
import { Canvas, extend, useFrame, useLoader, useThree } from "@react-three/fiber"
import { EffectComposer, N8AO } from "@react-three/postprocessing"
import { CuboidCollider, Physics, RapierRigidBody, RigidBody } from "@react-three/rapier"
import cx from "clsx"
import { useControls } from "leva"
import { easing } from "maath"
import dynamic from "next/dynamic"
import { useRef, useState } from "react"
import * as THREE from "three"
import { AmbientLight, SpotLight, Vector3 } from "three"
import { LoadingSpinner } from "../utility/loading-spinner"
import s from "./three-fiber-ultia.module.scss"
import { IceModel } from "../ice-model"
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
  const envProps = useControls({ background: false })

  return (
    <div className={cx(s.wrapper, "w-full h-full")}>
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 100 }} frameloop="demand">
        {/* <color attach="background" args={["#e4f6f8"]} /> */}

        <Physics gravity={[0, 0, 0]}>
          {Array.from({ length: 30 }, (v, i) => (
            <IceCube
              key={i}
              scale={gsap.utils.random(0.3, 0.5, 0.001)}
              position={new THREE.Vector3(gsap.utils.random(-5, 5), gsap.utils.random(-5, 5), 0)}
            />
          ))}
          <Walls />
          <Pointer />
        </Physics>

        <IceModel />

        <group rotation={[0, 0, 0]}>
          <mesh position={[0, 0, -30]}>
            <sphereGeometry args={[3, 10, 64]} />
            <meshBasicMaterial color="#e4f6f8" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* <group rotation={[0, 0, 0]}>
          <mesh position={[0, 0, -35]}>
            <sphereGeometry args={[5, 10, 40]} />
            <meshBasicMaterial color="#7CB9E8" side={THREE.DoubleSide} />
          </mesh>
        </group> */}

        <Text
          position={[0, 0, -10]}
          font="/fonts/dela-gothic-one/DelaGothicOne-Regular.ttf"
          fontSize={1.5}
          color="#D9D9D9"
          anchorX="center"
          anchorY="middle"
          strokeWidth={5}
          strokeColor={"#E1E1E1"}
          strokeOpacity={1}
        >
          {`Coming Soon`}
        </Text>

        <Environment {...envProps} files="/hdr/adams_place_bridge_1k.hdr" />

        <EffectComposer>
          <N8AO aoRadius={3} distanceFalloff={3} intensity={1} />
          {/* <Bloom mipmapBlur luminanceThreshold={1} intensity={2} /> */}
          {/* <BrightnessContrast brightness={-0.1} contrast={0.9} /> */}
          {/* <HueSaturation hue={0} saturation={-0.15} /> */}
        </EffectComposer>

        <ambientLight intensity={Math.PI * 1.5} />
        <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
        <pointLight position={[-10, -10, -10]} />
        <Rig />
      </Canvas>
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

function Pointer({ vec = new Vector3() }) {
  const api = useRef<RapierRigidBody>(null)

  useFrame(({ pointer, viewport }, delta) => {
    easing.damp3(vec, [(pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0], 0, delta, Infinity)
    api.current?.setNextKinematicTranslation(vec)
  })

  return (
    <RigidBody type="kinematicPosition" colliders="ball" ref={api}>
      <Sphere args={[0.2]}>
        <meshStandardMaterial color="#FF5B4A" />
      </Sphere>
    </RigidBody>
  )
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [Math.sin(-state.pointer.x) / 2, state.pointer.y / 2, 15 + Math.cos(state.pointer.x) / 2],
      0.2,
      delta
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}
