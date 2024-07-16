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
extend({ AmbientLight, SpotLight })

import { IceGlass } from "@/components/ice-glass"
import { LoadingSpinner } from "@/components/utility/loading-spinner"

const IceCube = dynamic(() => import("@/components/ice-cube"), {
  loading: () => (
    <Html>
      <LoadingSpinner />
    </Html>
  ),
  ssr: false,
})

export default function Scene() {
  return (
    <div className={cx("w-full h-full")}>
      <Canvas frameloop="always">
        <color attach="background" args={["#ffffff"]} />

        {/* <PerspectiveCamera makeDefault position={[0, 100, 180]} near={0.1} fov={100} /> */}
        <OrthographicCamera makeDefault position={[0, 0, 10]} near={0.1} zoom={50} />
        {/* <Camera /> */}

        <IceGlass />

        <PhysicsIceCube />

        <CanvasText />

        <Environment preset="studio">
          <Lightformer
            position={[5, 0, 0]}
            form="rect"
            intensity={5}
            color="#a2d2df"
            scale={[1, 5, 0]}
            target={[0, 0, 0]}
          />

          {/* <Lightformer
            position={[0, -10, 0]}
            form="rect"
            intensity={5}
            color="#a2d2df"
            scale={[1, 5, 0]}
            target={[0, 0, 0]}
          /> */}

          <Lightformer
            position={[10, 0, 0]}
            form="rect"
            intensity={5}
            color="#a2d2df"
            scale={[1, 5, 0]}
            target={[0, 0, 0]}
          />

          {/* <Lightformer
            position={[-1, 0, 0]}
            form="rect"
            intensity={5}
            color="#a2d2df"
            scale={[1, 5, 0]}
            target={[0, 0, 0]}
          />  */}
        </Environment>

        <ambientLight intensity={0.3} />
        <pointLight position={[10, 0, 10]} intensity={100.8} />
        <pointLight position={[-10, 0, -10]} intensity={100.5} />

        <Rig />
        {/* <OrbitControls /> */}
      </Canvas>
      <Leva hidden={false} />
    </div>
  )
}

function Walls() {
  const { width: viewportWidth, height: viewportHeight } = useThree((state) => state.viewport)

  return (
    <>
      {/* rectangle */}
      <CuboidCollider position={[0, viewportHeight / 2 + 1, 0]} args={[viewportWidth / 2, 1, 3]} />
      <CuboidCollider position={[0, -viewportHeight / 2 - 1, 0]} args={[viewportWidth / 2, 1, 3]} />
      <CuboidCollider position={[-viewportWidth / 2 - 1, 0, 0]} args={[1, viewportHeight * 10, 3]} />
      <CuboidCollider position={[viewportWidth / 2 + 1, 0, 0]} args={[1, viewportHeight * 10, 3]} />
      {/* rectangle */}
    </>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const api = useRef<RapierRigidBody>(null)

  useFrame(({ pointer, viewport }) => {
    api.current?.setNextKinematicTranslation(
      vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 3)
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
            {Array.from({ length: 20 }, (v, i) => (
              <IceCube
                key={i}
                scale={gsap.utils.random(0.5, 0.8, 0.001)}
                position={new THREE.Vector3(gsap.utils.random(-5, 5), gsap.utils.random(-5, 5), 3)}
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
      [Math.sin(-state.pointer.x), state.pointer.y, 8 + Math.cos(state.pointer.x)],
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
        position={[0, vw > 1024 ? 0 : 0.5, -2.2]}
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
