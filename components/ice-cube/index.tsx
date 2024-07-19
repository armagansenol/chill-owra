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

  const tex = useLoader(THREE.TextureLoader, "/img/ice-texture.jpg")

  React.useMemo(() => {
    const vec2 = new THREE.Vector2(5, 10)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(vec2.x, vec2.y)
  }, [tex])

  const materialProps = useControls("floatingIceCubes", {
    transmissionSampler: true,
    samples: { value: 4, min: 1, max: 32, step: 1 },
    resolution: { value: 512, min: 256, max: 2048, step: 256 },
    transmission: { value: 1, min: 0, max: 1 },
    roughness: { value: 1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.2, min: 0, max: 10, step: 0.01 },
    ior: { value: 5, min: 1, max: 5, step: 0.01 },
    anisotropy: { value: 1, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 0, min: 0, max: 1 },
    distortion: { value: 0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    attenuationDistance: { value: 3.56, min: 0, max: 10, step: 0.01 },
    attenuationColor: "#ffffff",
    color: "#ffffff",
  })

  // useFrame(() => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.x += 0.001
  //     meshRef.current.rotation.y += 0.001
  //     meshRef.current.rotation.z += 0.001
  //   }
  // })

  return (
    <>
      <Float floatIntensity={2}>
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
          <CuboidCollider args={[1, 1, 1]} />
          <mesh ref={meshRef} geometry={nodes.pCube1.geometry} rotation={[-Math.PI, 0, 0]}>
            <MeshTransmissionMaterial {...materialProps} map={tex} bumpMap={tex} bumpScale={4} />
          </mesh>
        </RigidBody>
      </Float>
    </>
  )
}
