import { useGLTF } from "@react-three/drei"
import { ThreeEvent, useFrame } from "@react-three/fiber"
import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier"
import * as React from "react"
import * as THREE from "three"

export interface ISmileysProps {
  which: string
  [key: string]: any
}

export default function Smiley(props: ISmileysProps) {
  const { which, position } = props

  const api = React.useRef<RapierRigidBody>(null)
  const { nodes, materials } = useGLTF("/glb/smileys-transformed.glb")

  const [dragged, drag] = React.useState<any>(false)

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

  return (
    <>
      <RigidBody
        ref={api}
        colliders={false}
        enabledRotations={[false, false, true]}
        enabledTranslations={[true, true, false]}
        linearDamping={2}
        angularDamping={2}
        mass={1}
        canSleep={false}
        type={dragged ? "kinematicPosition" : "dynamic"}
        ccd={true}
        {...props}
      >
        <BallCollider args={[0.48]} />
        <group
          onPointerUp={(e: ThreeEvent<PointerEvent>) => {
            if (!e.target) return
            e.target?.releasePointerCapture(e.pointerId)
            drag(false)
          }}
          onPointerDown={(e: ThreeEvent<PointerEvent>) => {
            if (!e.target) return
            if (!api.current) return

            e.target?.setPointerCapture(e.pointerId)
            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(api.current.translation())))
          }}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes[which].geometry}
            material={materials.PaletteMaterial001}
            material-roughness={0.2}
            material-toneMapped={false}
          />
        </group>
      </RigidBody>
    </>
  )
}
