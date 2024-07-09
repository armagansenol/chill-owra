import useMousePosition from "@/hooks/use-mouse-position"
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei"
import { ThreeElements, useFrame, useLoader } from "@react-three/fiber"
import { CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier"
import { useControls } from "leva"
import * as React from "react"
import * as THREE from "three"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    pCube1: THREE.Mesh
  }
  materials: {
    ["Glass Wavy White #1"]: THREE.MeshPhysicalMaterial
  }
}

interface Props {
  scale: number
}

export default function IceCube(props: Props) {
  const meshRef = React.useRef<ThreeElements["mesh"] | null>(null)
  const api = React.useRef<RapierRigidBody | null>(null)
  const { nodes } = useGLTF("/glb/ice-origin-center.glb") as GLTFResult

  const [dragged, drag] = React.useState<{ x: number; y: number; z: number } | null>(null)

  const colorMap = useLoader(THREE.TextureLoader, "/img/ice-texture.jpg")

  const vec = new THREE.Vector3()
  const dir = new THREE.Vector3()

  useFrame((state) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      api.current?.wakeUp()
      api.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: 0 })
    }
  })

  const materialProps = useControls({
    transmissionSampler: true,
    backside: true,
    samples: { value: 4, min: 1, max: 32, step: 1 },
    resolution: { value: 512, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 3, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    iridescence: { value: 1, min: 1, max: 5, step: 0.01 },
    iridescenceIOR: { value: 1, min: 1, max: 5, step: 0.01 },
    iridescenceThicknessRange: { value: [0, 1400], min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.025, min: 0, max: 1 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.2, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#ffffff",
    color: "#ffffff",
    bg: "#ffffff",
  })

  // const transition = useTransition(meshRef.current, {
  //   from: { scale: [0, 0, 0], rotation: [0, 0, 0] },
  //   enter: ({ r }) => ({ scale: [1, 1, 1], rotation: [r * 3, r * 3, r * 3] }),
  //   leave: { scale: [0.1, 0.1, 0.1], rotation: [0, 0, 0] },
  //   config: { mass: 5, tension: 1000, friction: 100 },
  //   trail: 100,
  // })

  // const { x = 0, y = 0 } = useMousePosition()

  return (
    <>
      <RigidBody
        ref={api}
        colliders={false}
        enabledRotations={[false, false, true]}
        enabledTranslations={[true, true, true]}
        linearDamping={5}
        angularDamping={5}
        mass={1}
        canSleep={false}
        type={dragged ? "kinematicPosition" : "dynamic"}
        ccd={true}
        restitution={0}
        friction={0}
        // {...props}
      >
        <group
          scale={props.scale}
          dispose={null}

          //   onPointerUp={(e: ThreeEvent<PointerEvent>) => {
          //     if (!e.target) return
          //     e.target?.releasePointerCapture(e.pointerId)
          //     drag(false)
          //   }}
          //   onPointerDown={(e: ThreeEvent<PointerEvent>) => {
          //     if (!e.target) return
          //     if (!api.current) return

          //     e.target?.setPointerCapture(e.pointerId)
          //     drag(new THREE.Vector3().copy(e.point).sub(vec.copy(api.current.translation())))
          //   }}
        >
          <group rotation={[-Math.PI, 0, 0]}>
            <mesh castShadow geometry={nodes.pCube1.geometry} rotation={[-Math.PI, 0, 0]}>
              <MeshTransmissionMaterial {...materialProps} />
              <CuboidCollider args={[0.8, 0.8, 0.8]} />
            </mesh>
          </group>
        </group>
      </RigidBody>
    </>
  )
}
