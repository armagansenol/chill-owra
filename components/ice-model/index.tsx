import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { useControls } from "leva"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    ["pCube1-mesh"]: THREE.Mesh
    ["pCube1-mesh_1"]: THREE.Mesh
    ["pCube1-mesh_2"]: THREE.Mesh
    ["pCube1-mesh_3"]: THREE.Mesh
    ["pCube1-mesh_4"]: THREE.Mesh
    ["pCube1-mesh_5"]: THREE.Mesh
    ["pCube1-mesh_6"]: THREE.Mesh
    ["pCube1-mesh_7"]: THREE.Mesh
    ["pCube1-mesh_8"]: THREE.Mesh
    ["pCube1-mesh_9"]: THREE.Mesh
    ["pCube1-mesh_10"]: THREE.Mesh
    ["pCube1-mesh_11"]: THREE.Mesh
    ["pCube1-mesh_12"]: THREE.Mesh
    ["pCube1-mesh_13"]: THREE.Mesh
    CUsersberkaOneDriveMasaüstüBardak_Altobj: THREE.Mesh
    CUsersberkaOneDriveMasaüstüBardak_Ustobj: THREE.Mesh
  }
  materials: {
    bus: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #2"]: THREE.MeshPhysicalMaterial
    ["bus #3"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #4"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #2"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #2"]: THREE.MeshPhysicalMaterial
    ["Glass Basic Grey #2"]: THREE.MeshPhysicalMaterial
    Paint: THREE.MeshPhysicalMaterial
  }
}

export function IceModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/glb/bardak.glb") as GLTFResult
  const meshRef = useRef<THREE.Group>(null)

  const { viewport } = useThree()
  const vw = viewport.width * 100

  const tex = useLoader(THREE.TextureLoader, "/img/ice-texture.jpg")
  const packageMap = useLoader(THREE.TextureLoader, "/img/chill-owra-package.png")
  const bump = useLoader(THREE.TextureLoader, "/img/ice-bump.jpg")

  useMemo(() => {
    const vec2 = new THREE.Vector2(3, 3)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(vec2.x, vec2.y)

    bump.wrapS = THREE.RepeatWrapping
    bump.wrapT = THREE.RepeatWrapping
    bump.repeat.set(vec2.x, vec2.y)
  }, [tex, bump])

  const materialProps = useControls("cup", {
    attenuationColor: "#e4f6f8",
    color: "#e4f6f8",
    bg: "#e4f6f8",
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.01 }, // Increase roughness for less reflection
    transmission: { value: 0.95, min: 0, max: 1, step: 0.01 }, // Increase transmission for more transparency
    ior: { value: 1.3, min: 1, max: 20, step: 0.01 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: false },
    anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01 }, // Reduce clearcoat for less reflection
    metalness: { value: 0.4, min: 0, max: 1, step: 0.01 }, // Ensure metalness is low for plastic
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
  })

  const cubeMaterialProps = useControls("iceCube", {
    attenuationColor: "#e4f6f8",
    color: "#e4f6f8",
    bg: "#e4f6f8",
    transmission: { value: 0.5, min: 0, max: 1, step: 0.01 }, // High transmission for transparency
    roughness: { value: 1, min: 0, max: 1, step: 0.01 }, // Low roughness for smooth surface
    clearcoat: { value: 0.3, min: 0, max: 1, step: 0.01 }, // High clearcoat for glossy effect
    clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.01 }, // Low clearcoat roughness
    metalness: { value: 0.16, min: 0, max: 1, step: 0.01 }, // Zero metalness for non-metallic
    ior: { value: 1, min: 1, max: 2.5, step: 0.01 }, // Index of refraction
    thickness: { value: 0.01, min: 0, max: 5, step: 0.01 }, // Thickness of the material
    attenuationDistance: { value: 1, min: 0, max: 10, step: 0.1 }, // Light attenuation distance
    opacity: { value: 0.25, min: 0, max: 1, step: 0.01 }, // Control overall transparency
    transparent: true,
  })

  useFrame(() => {
    if (meshRef.current) {
      // meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.005
      // meshRef.current.rotation.z += 0.001
    }
  })

  return (
    <group
      {...props}
      dispose={null}
      ref={meshRef}
      scale={vw > 1024 ? 0.03 : 0.022}
      position={[0, vw > 1024 ? -4 : -2, -5]}
      rotation={[0, Math.PI * 0.35, 0]}
    >
      <group>
        <>
          <group
            position={[-91.58413696, -220.24613953, -75.99475861]}
            rotation={[0.0231247, -0.63019977, -0.22694059]}
            scale={[1.00000005, 1.00000006, 1.00000008]}
          >
            <group
              position={[-26.55535039, 99.56734329, 23.99786381]}
              rotation={[1.54505176, 0.68495736, -1.23814758]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    geometry={nodes["pCube1-mesh"].geometry}
                    position={[4.77869025, 8.33988007, -2.93984335]}
                    rotation={[0.36461895, -0.22149031, 0.9556353]}
                    scale={[0.99999972, 1.00000003, 1.00000019]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} map={tex} /> */}
                    <meshBasicMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[-13.26210922, 109.14398185, -25.94821946]}
              rotation={[1.54505176, 0.68495736, -1.23814758]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    geometry={nodes["pCube1-mesh_1"].geometry}
                    position={[-3.78540198, 7.85727021, -2.40549208]}
                    rotation={[0.69971642, 0.76042812, 2.84765694]}
                    scale={[0.9999999, 0.99999994, 0.99999982]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[-1.73237897, 117.45016225, -69.26834427]}
              rotation={[1.54505176, 0.68495736, -1.23814758]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    geometry={nodes["pCube1-mesh_2"].geometry}
                    position={[-1.56717739, 6.66600564, -5.76584721]}
                    rotation={[1.54993564, 1.29283338, 3.01026538]}
                    scale={[0.99999985, 0.9999997, 1.00000024]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[-24.38965062, 158.7791465, 35.9275121]}
              rotation={[1.54505176, 0.68495736, -1.23814758]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    geometry={nodes["pCube1-mesh_3"].geometry}
                    material={materials["bus #3"]}
                    position={[1.57180323, 4.36639243, -7.304711]}
                    rotation={[-0.27664154, 1.1078338, -0.221704]}
                    scale={[1.00000016, 1.00000021, 1.00000027]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[-11.09640945, 168.35578506, -14.01857117]}
              rotation={[1.54505176, 0.68495736, -1.23814758]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    geometry={nodes["pCube1-mesh_4"].geometry}
                    position={[-0.86380866, 7.18127366, -4.87157994]}
                    rotation={[-1.07742939, 1.3779754, 2.74543045]}
                    scale={[0.99999995, 0.99999993, 0.99999986]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[0.43332079, 176.66196546, -57.33869597]}
              rotation={[1.54505176, 0.68495736, -1.23814758]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    geometry={nodes["pCube1-mesh_5"].geometry}
                    position={[-0.04234855, 8.60382593, -3.71624693]}
                    rotation={[-3.0491177, 0.23356668, 0.51936721]}
                    scale={[0.9999999, 1.00000017, 1.00000009]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[393.30028149, 725.97411246, 66.57451542]}
              rotation={[1.28542452, 1.0949235, 2.25032753]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    geometry={nodes["pCube1-mesh_6"].geometry}
                    material={materials["bus #4"]}
                    position={[5.37501257, 20.76267624, -6.03138388]}
                    rotation={[1.80077345, -0.71495445, 2.52940719]}
                    scale={[1.00000013, 1.00000015, 1.00000025]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[378.16735536, 709.30939262, 114.07520131]}
              rotation={[1.28542452, 1.0949235, 2.25032753]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    geometry={nodes["pCube1-mesh_7"].geometry}
                    position={[3.9031161, 22.7521046, -6.8716689]}
                    rotation={[0.14285985, 0.20797873, -1.91430372]}
                    scale={[1.00000049, 1.0000006, 1.0000004]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[365.04199685, 694.85545157, 155.2743406]}
              rotation={[1.28542452, 1.0949235, 2.25032753]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    geometry={nodes["pCube1-mesh_8"].geometry}
                    position={[3.4597084, 27.11127848, -3.95665172]}
                    rotation={[-1.06272036, -0.80080873, 0.41966276]}
                    scale={[0.99999939, 0.99999977, 0.99999938]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[339.30416858, 710.80437069, 44.05023678]}
              rotation={[1.28542452, 1.0949235, 2.25032753]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    geometry={nodes["pCube1-mesh_9"].geometry}
                    position={[4.79398532, 22.9032723, -4.39598398]}
                    rotation={[-0.14279437, -0.85964999, 1.06658227]}
                    scale={[1.00000036, 1.00000002, 1.0000003]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[324.17124245, 694.13965085, 91.55092267]}
              rotation={[1.28542452, 1.0949235, 2.25032753]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    geometry={nodes["pCube1-mesh_10"].geometry}
                    position={[3.45934046, 24.22309125, -7.02739054]}
                    rotation={[1.17127847, 0.610312, 1.01464035]}
                    scale={[1.00000005, 1.00000005, 1.00000022]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[311.04588394, 679.6857098, 132.75006196]}
              rotation={[1.28542452, 1.0949235, 2.25032753]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    geometry={nodes["pCube1-mesh_11"].geometry}
                    position={[-0.00977291, 20.77246279, -5.09957169]}
                    rotation={[-3.02814977, -0.31550422, -2.57438133]}
                    scale={[1.00000006, 1.00000013, 1.00000021]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[376.42686027, 763.98141848, 22.78403417]}
              rotation={[1.28542452, 1.0949235, 2.25032753]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    castShadow
                    receiveShadow
                    geometry={nodes["pCube1-mesh_12"].geometry}
                    position={[6.24455682, 21.52576186, -7.27071306]}
                    rotation={[-2.7599163, -0.60163167, 2.90486386]}
                    scale={[1.00000011, 1.00000042, 1.00000051]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
            <group
              position={[332.66935244, 767.14246013, 54.46321156]}
              rotation={[1.28542452, 1.0949235, 2.25032753]}
              scale={[19568.18806821, 19568.18806822, 19568.18806822]}
            >
              <group scale={0.001}>
                <group position={[2.3003099, 0.02521, 0.183025]}>
                  <mesh
                    frustumCulled={false}
                    castShadow
                    receiveShadow
                    geometry={nodes["pCube1-mesh_13"].geometry}
                    position={[7.48424439, 25.02028589, -5.16116538]}
                    rotation={[-2.41580988, -0.80181023, -1.34521012]}
                    scale={[0.99999997, 0.99999986, 0.99999975]}
                  >
                    {/* <MeshTransmissionMaterial {...cubeMaterialProps} /> */}
                    <meshPhysicalMaterial map={tex} {...cubeMaterialProps} />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        </>

        <mesh
          geometry={nodes.CUsersberkaOneDriveMasaüstüBardak_Ustobj.geometry}
          position={[1.37532806, -83.60058784, 0.00108719]}
        >
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>

        <mesh geometry={nodes.CUsersberkaOneDriveMasaüstüBardak_Altobj.geometry} position={[1.3753624, -79.21138, 0]}>
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>

        <mesh
          // castShadow
          // receiveShadow
          geometry={new THREE.CylinderGeometry(83, 54, 195, 32)}
          position={[1.3753624, 98, 0]}
          frustumCulled={false}
        >
          <meshBasicMaterial map={packageMap} transparent={true} opacity={1} />
        </mesh>

        {/* <mesh geometry={new THREE.SphereGeometry(83, 54, 195, 32)} position={[1.3753624, 98, 0]}>
          <MeshTransmissionMaterial {...materialProps} />
        </mesh> */}
      </group>
    </group>
  )
}

useGLTF.preload("/glb/bardak.glb")
