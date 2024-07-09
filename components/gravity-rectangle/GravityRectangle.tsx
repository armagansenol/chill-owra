import { gsap } from "@/lib/gsap"
import { Environment, Float, Html, Sphere } from "@react-three/drei"
import { Canvas, extend, useFrame, useLoader, useThree } from "@react-three/fiber"
import { EffectComposer, N8AO } from "@react-three/postprocessing"
import { CuboidCollider, Physics, RapierRigidBody, RigidBody } from "@react-three/rapier"
import cx from "clsx"
import { useControls } from "leva"
import { easing } from "maath"
import dynamic from "next/dynamic"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import {
  AmbientLight,
  BoxGeometry,
  EdgesGeometry,
  Euler,
  LineBasicMaterial,
  LineSegments,
  SpotLight,
  Vector3,
} from "three"
import { IceModel } from "../ice-model"
import s from "./three-fiber-ultia.module.scss"
extend({ AmbientLight, SpotLight })

const IceCube = dynamic(() => import("@/components/ice-cube"), {
  loading: () => (
    <Html>
      <p>Loading...</p>
    </Html>
  ),
  ssr: false,
})

export interface GravityRectangleProps {}

export default function GravityRectangle(props: GravityRectangleProps) {
  const icesMap = useLoader(THREE.TextureLoader, "/img/ices.png")
  const [iceCount, setIceCount] = useState(10)
  const envProps = useControls({ background: false })

  return (
    <div className={cx(s.wrapper, "w-full h-full")} onClick={() => setIceCount((prev) => prev + 1)}>
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 100, fov: 50 }}>
        {/* <color attach="background" args={["#ffffff"]} /> */}

        <Physics gravity={[0, -6, 0]}>
          {Array.from({ length: iceCount }, (v, i) => (
            <IceCube key={i} scale={gsap.utils.random(0.3, 0.4)} />
          ))}
          <Walls />
          <Pointer />
        </Physics>

        {/* <OrbitControls /> */}

        <Float floatIntensity={0.5} floatingRange={[0, 0.5]} rotationIntensity={0.5} speed={2}>
          <IceModel />
        </Float>

        <group rotation={[0, 0, Math.PI / 4]}>
          <mesh position={[0, 0, -20]}>
            <sphereGeometry args={[3, 8, 64]} />
            <meshBasicMaterial color="#e4f6f8" side={THREE.DoubleSide} />
          </mesh>
          {/* <mesh position={[0, 0, -10]}>
            <planeGeometry args={[2, 20]} />
            <meshBasicMaterial color="#FF5B4A" side={THREE.DoubleSide} />
          </mesh> */}
        </group>

        <Environment {...envProps} files="/hdr/adams_place_bridge_1k.hdr" />

        <EffectComposer>
          <N8AO aoRadius={3} distanceFalloff={3} intensity={1} />
        </EffectComposer>

        <ambientLight intensity={Math.PI * 1.5} />
        <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
        <pointLight position={[-10, -10, -10]} />

        {/* <Rig /> */}
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

      {/* circle */}
      {/* <CircleColliders radius={radius} segmentCount={360} height={0.025} /> */}
      {/* circle */}
    </>
  )
}

function Pointer({ vec = new Vector3() }) {
  const api = useRef<RapierRigidBody>(null)

  useFrame(({ pointer, viewport }) => {
    const vectorX = (pointer.x * viewport.width) / 2
    const vectorY = (pointer.y * viewport.height) / 2
    const vectorZ = 0

    api.current?.setNextKinematicTranslation({ x: vectorX, y: vectorY, z: vectorZ })
  })

  return (
    <RigidBody type="kinematicPosition" colliders="ball" ref={api}>
      <Sphere args={[0.2]}>
        <meshStandardMaterial color="#FF5B4A" />
      </Sphere>
    </RigidBody>
  )
}

interface WireframeColliderProps {
  position: Vector3
  args: any
}

const WireframeCollider = ({ position, args }: WireframeColliderProps) => {
  const [edges, setEdges] = useState<LineSegments | null>(null)

  useEffect(() => {
    const geometry = new BoxGeometry(...args)
    const edgesGeometry = new EdgesGeometry(geometry)
    const lineMaterial = new LineBasicMaterial({ color: "#000000" })
    const lineSegments = new LineSegments(edgesGeometry, lineMaterial)
    setEdges(lineSegments)
  }, [args])

  return edges ? <primitive object={edges} position={position} /> : null
}

interface ColliderProps {
  radius: number
  segmentCount: number
  height: number
}

function CircleColliders({ radius, segmentCount, height }: ColliderProps) {
  const { width: viewportWidth } = useThree((state) => state.viewport)

  const colliders = useMemo((): { position: Vector3; rotation: Euler }[] => {
    const angleStep = (2 * Math.PI) / segmentCount
    return Array.from({ length: segmentCount }).map((_, i) => {
      const angle = i * angleStep
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)
      return { position: new Vector3(x, y, 0), rotation: new Euler(0, angle, 0) }
    })
  }, [radius, segmentCount])

  return (
    <>
      {colliders.map(({ position, rotation }, i) => (
        <Fragment key={i}>
          <CuboidCollider key={i} position={position} args={[height, height, 0]} rotation={rotation} />
          <WireframeCollider position={position} args={[height, height, 0]} />
        </Fragment>
      ))}
    </>
  )
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [Math.sin(-state.pointer.x) * 5, state.pointer.y * 3.5, 15 + Math.cos(state.pointer.x) * 10],
      0.2,
      delta
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}
