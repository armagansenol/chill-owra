import { gsap } from "@/lib/gsap"
import { useTransition } from "@react-spring/three"
import { Float, MeshTransmissionMaterial, useGLTF } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
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
  position: THREE.Vector3
}

export default function IceCube(props: Props) {
  const api = React.useRef<RapierRigidBody | null>(null)
  const { nodes } = useGLTF("/glb/ice-origin-center.glb") as GLTFResult
  const meshRef = React.useRef<any>(null)

  const texture = useLoader(THREE.TextureLoader, "/img/ice-texture.jpg")
  const bump = useLoader(THREE.TextureLoader, "/img/ice-bump.jpg")

  React.useMemo(() => {
    const vec2 = new THREE.Vector2(1, 1)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(vec2.x, vec2.y)

    bump.wrapS = THREE.RepeatWrapping
    bump.wrapT = THREE.RepeatWrapping
    bump.repeat.set(vec2.x, vec2.y)
  }, [texture, bump])

  const materialProps = useControls({
    transmissionSampler: true,
    samples: { value: 4, min: 1, max: 32, step: 1 },
    resolution: { value: 512, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    thickness: { value: 1, min: 0, max: 10, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 0.025, min: 0, max: 1 },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.2, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#e4f6f8",
    color: "#e4f6f8",
    bg: "#e4f6f8",
  })

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.001
      meshRef.current.rotation.z += 0.001
    }
  })

  return (
    <>
      <RigidBody
        ref={api}
        colliders={false}
        enabledRotations={[false, false, true]}
        enabledTranslations={[true, true, false]}
        linearDamping={2}
        angularDamping={2}
        mass={0}
        canSleep={false}
        restitution={0}
        friction={10}
        ccd={true}
        position={props.position}
        scale={props.scale}
      >
        <Float floatIntensity={2}>
          <group dispose={null} ref={meshRef}>
            <mesh castShadow geometry={nodes.pCube1.geometry} rotation={[-Math.PI, 0, 0]}>
              <MeshTransmissionMaterial
                {...materialProps}
                map={texture}
                // bumpMap={bump}
                // bumpScale={1.3}
                displacementMap={bump}
                displacementScale={0.1}
                opacity={0.5}
                transparent={true}
              />
              {/* <meshPhongMaterial
                  map={texture}
                  // displacementMap={texture}
                  // displacementScale={0.1}
                  transparent={true}
                  opacity={0.6}
                /> */}
              {/* <meshStandardMaterial map={texture} /> */}
              <CuboidCollider args={[1, 1, 1]} />
            </mesh>
          </group>
        </Float>
      </RigidBody>
    </>
  )
}
