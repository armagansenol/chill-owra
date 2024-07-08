import { gsap } from "@/lib/gsap"
import { Html, Sphere } from "@react-three/drei"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { CuboidCollider, Physics, RapierRigidBody, RigidBody } from "@react-three/rapier"
import cx from "clsx"
import { easing } from "maath"
import dynamic from "next/dynamic"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
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
import s from "./three-fiber-ultia.module.scss"
extend({ AmbientLight, SpotLight })

const Smiley = dynamic(() => import("@/components/smiley"), {
  loading: () => (
    <Html>
      <p>Loading...</p>
    </Html>
  ),
  ssr: false,
})

export interface GravityRectangleProps {}

export default function GravityRectangle(props: GravityRectangleProps) {
  const shapes = [
    "heart",
    "blink",
    "blush",
    "laugh",
    "heart",
    "blink",
    "blush",
    "laugh",
    "heart",
    "blink",
    "blush",
    "laugh",
  ]

  return (
    <div className={cx(s.wrapper, "w-full h-full")}>
      <Canvas orthographic camera={{ position: [0, 0, 10], zoom: 120 }}>
        <ambientLight intensity={Math.PI * 1.5} />
        <Physics gravity={[0, -6, 0]}>
          {Array.from({ length: shapes.length }, (v, i) => (
            <Smiley
              key={i}
              which={shapes[i % shapes.length]}
              position={[gsap.utils.random(-5, 5), gsap.utils.random(-5, 5), 0]}
            />
          ))}
          <Walls />
          {/* <Pointer /> */}
        </Physics>
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

  useFrame(({ pointer, viewport }, delta) => {
    easing.damp3(vec, [(pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0], 0, delta, Infinity)
    api.current?.setNextKinematicTranslation(vec)
  })

  return (
    <RigidBody type="kinematicPosition" colliders="ball" ref={api}>
      <Sphere receiveShadow castShadow args={[0.05]}>
        <meshStandardMaterial color="hotpink" roughness={0} envMapIntensity={0.1} />
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
  }, [radius, segmentCount, viewportWidth])

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
