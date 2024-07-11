import { a, useSpring } from "@react-spring/three"
import { PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

const AnimatedCamera = a(PerspectiveCamera)

export function Camera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const { fov, position } = useSpring({
    fov: 60, // Example field of view
    position: [0, 0, 10], // Example position
    config: { mass: 1, tension: 170, friction: 126 }, // Customize easing here
  })

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.updateProjectionMatrix()
    }
  })

  return <AnimatedCamera ref={cameraRef} fov={fov} makeDefault position={[0, 180, 180]} near={0.5} />
}
