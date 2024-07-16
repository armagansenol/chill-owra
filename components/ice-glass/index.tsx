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

export function IceGlass(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/glb/bardak.glb") as GLTFResult
  const meshRef = useRef<THREE.Group>(null)
  const iceCubesMap = useLoader(THREE.TextureLoader, "/img/ice-cubes.png")

  const { viewport } = useThree()
  const vw = viewport.width * 100

  useFrame(() => {
    if (meshRef.current) {
      // meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.005
      // meshRef.current.rotation.z += 0.001
    }
  })

  useMemo(() => {
    if (iceCubesMap) {
      iceCubesMap.wrapS = iceCubesMap.wrapT = THREE.ClampToEdgeWrapping
      iceCubesMap.offset.set(0, 0)
      iceCubesMap.rotation = Math.PI
      iceCubesMap.flipY = false
      iceCubesMap.center = new THREE.Vector2(0.5, 0.5)

      const aspectRatio = iceCubesMap.image.width / iceCubesMap.image.height
      iceCubesMap.repeat.set(0.28 * aspectRatio, 0.55 * aspectRatio)
    }
  }, [iceCubesMap])

  return (
    <>
      <group
        {...props}
        dispose={null}
        scale={vw > 1024 ? 0.035 : 0.022}
        position={[0, vw > 1024 ? -4 : -2, 0]}
        rotation={[0, 0, 0]}
      >
        <group ref={meshRef}>
          {/* <IceCubes {...nodes} /> */}
          <Cup {...nodes} />
        </group>
        <mesh geometry={new THREE.BoxGeometry(4, 5, 0)} scale={44} position={[5, vw > 1024 ? 105 : -2, 0]}>
          <meshStandardMaterial
            map={iceCubesMap}
            bumpMap={iceCubesMap}
            bumpScale={4}
            color={"#D5FFFF"}
            transparent={true}
            opacity={0.4}
          />
        </mesh>
      </group>
    </>
  )
}

// function IceCubes(nodes: GLTFResult["nodes"]) {
//   const tex = useLoader(THREE.TextureLoader, "/img/ice-texture.jpg")

//   useMemo(() => {
//     const vec2 = new THREE.Vector2(1, 1)
//     tex.wrapS = THREE.RepeatWrapping
//     tex.wrapT = THREE.RepeatWrapping
//     tex.repeat.set(vec2.x, vec2.y)
//   }, [tex])

//   const materialProps = useControls("ice cubes in cup", {
//     transmissionSampler: true,
//     samples: { value: 4, min: 1, max: 32, step: 1 },
//     resolution: { value: 512, min: 256, max: 2048, step: 256 },
//     transmission: { value: 1, min: 0, max: 1 },
//     roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
//     thickness: { value: 2.3, min: 0, max: 10, step: 0.01 },
//     ior: { value: 1.35, min: 1, max: 5, step: 0.01 },
//     chromaticAberration: { value: 0, min: 0, max: 1 },
//     anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
//     clearcoat: { value: 1, min: 0, max: 1 },
//     attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
//     attenuationColor: "#ffffff",
//     color: "#ffffff",
//     bg: "#ffffff",
//     distortion: 0,
//     temporalDistortion: 0,
//   })

//   const groupData = [
//     {
//       position: [-26.55535039, 99.56734329, 23.99786381],
//       rotation: [1.54505176, 0.68495736, -1.23814758],
//       scale: [19568.18806821, 19568.18806822, 19568.18806822],
//       meshData: [
//         {
//           geometry: nodes["pCube1-mesh"].geometry,
//           position: [4.77869025, 8.33988007, -2.93984335],
//           rotation: [0.36461895, -0.22149031, 0.9556353],
//           scale: [0.99999972, 1.00000003, 1.00000019],
//           materialProps: { ...materialProps },
//         },
//       ],
//     },
//     {
//       position: [-13.26210922, 109.14398185, -25.94821946],
//       rotation: [1.54505176, 0.68495736, -1.23814758],
//       scale: [19568.18806821, 19568.18806822, 19568.18806822],
//       meshData: [
//         {
//           geometry: nodes["pCube1-mesh_1"].geometry,
//           position: [-3.78540198, 7.85727021, -2.40549208],
//           rotation: [0.69971642, 0.76042812, 2.84765694],
//           scale: [0.9999999, 0.99999994, 0.99999982],
//           materialProps: { ...materialProps },
//         },
//       ],
//     },
//     {
//       position: [-1.73237897, 117.45016225, -69.26834427],
//       rotation: [1.54505176, 0.68495736, -1.23814758],
//       scale: [19568.18806821, 19568.18806822, 19568.18806822],
//       meshData: [
//         {
//           geometry: nodes["pCube1-mesh_2"].geometry,
//           position: [-1.56717739, 6.66600564, -5.76584721],
//           rotation: [1.54993564, 1.29283338, 3.01026538],
//           scale: [0.99999985, 0.9999997, 1.00000024],
//           materialProps: { ...materialProps },
//         },
//       ],
//     },
//     {
//       position: [-24.38965062, 158.7791465, 35.9275121],
//       rotation: [1.54505176, 0.68495736, -1.23814758],
//       scale: [19568.18806821, 19568.18806822, 19568.18806822],
//       meshData: [
//         {
//           geometry: nodes["pCube1-mesh_3"].geometry,
//           position: [1.57180323, 4.36639243, -7.304711],
//           rotation: [-0.27664154, 1.1078338, -0.221704],
//           scale: [1.00000016, 1.00000021, 1.00000027],
//           materialProps: { ...materialProps },
//         },
//       ],
//     },
//     {
//       position: [-11.09640945, 168.35578506, -14.01857117],
//       rotation: [1.54505176, 0.68495736, -1.23814758],
//       scale: [19568.18806821, 19568.18806822, 19568.18806822],
//       meshData: [
//         {
//           geometry: nodes["pCube1-mesh_4"].geometry,
//           position: [-0.86380866, 7.18127366, -4.87157994],
//           rotation: [-1.07742939, 1.3779754, 2.74543045],
//           scale: [0.99999995, 0.99999993, 0.99999986],
//           materialProps: { ...materialProps },
//         },
//       ],
//     },
//     {
//       position: [0.43332079, 176.66196546, -57.33869597],
//       rotation: [1.54505176, 0.68495736, -1.23814758],
//       scale: [19568.18806821, 19568.18806822, 19568.18806822],
//       meshData: [
//         {
//           geometry: nodes["pCube1-mesh_5"].geometry,
//           position: [-0.04234855, 8.60382593, -3.71624693],
//           rotation: [-3.0491177, 0.23356668, 0.51936721],
//           scale: [0.9999999, 1.00000017, 1.00000009],
//           materialProps: { ...materialProps },
//         },
//       ],
//     },
//     {
//       position: [393.30028149, 725.97411246, 66.57451542],
//       rotation: [1.28542452, 1.0949235, 2.25032753],
//       scale: [19568.18806821, 19568.18806822, 19568.18806822],
//       meshData: [
//         {
//           geometry: nodes["pCube1-mesh_6"].geometry,
//           position: [5.37501257, 20.76267624, -6.03138388],
//           rotation: [1.80077345, -0.71495445, 2.52940719],
//           scale: [1.00000013, 1.00000015, 1.00000025],
//           materialProps: { ...materialProps },
//         },
//       ],
//     },
//     {
//       position: [378.16735536, 709.30939262, 114.07520131],
//       rotation: [1.28542452, 1.0949235, 2.25032753],
//       scale: [19568.18806821, 19568.18806822, 19568.18806822],
//       meshData: [
//         {
//           geometry: nodes["pCube1-mesh_7"].geometry,
//           position: [3.9031161, 22.7521046, -6.8716689],
//           rotation: [0.14285985, 0.20797873, -1.91430372],
//           scale: [1.00000049, 1.0000006, 1.0000004],
//           materialProps: { ...materialProps },
//         },
//       ],
//     },
//     {
//       position: [365.04199685, 694.85545157, 155.2743406],
//       rotation: [1.28542452, 1.0949235, 2.25032753],
//       scale: [19568.18806821, 19568.18806822, 19568.18806822],
//       meshData: [
//         {
//           geometry: nodes["pCube1-mesh_8"].geometry,
//           position: [3.4597084, 27.11127848, -3.95665172],
//           rotation: [-1.06272036, -0.80080873, 0.41966276],
//           scale: [0.99999939, 0.99999977, 0.99999938],
//           materialProps: { ...materialProps },
//         },
//       ],
//     },
//     {
//       position: [339.30416858, 710.80437069, 44.05023678],
//       rotation: [1.28542452, 1.0949235, 2.25032753],
//       scale: [19568.18806821, 19568.18806822, 19568.18806822],
//       meshData: [
//         {
//           geometry: nodes["pCube1-mesh_9"].geometry,
//           position: [4.79398532, 22.9032723, -4.39598398],
//           rotation: [-0.14279437, -0.85964999, 1.06658227],
//           scale: [1.00000036, 1.00000002, 1.0000003],
//           materialProps: { ...materialProps },
//         },
//       ],
//     },
//     {
//       position: [324.17124245, 694.13965085, 91.55092267],
//       rotation: [1.28542452, 1.0949235, 2.25032753],
//       scale: [19568.18806821, 19568.18806822, 19568.18806822],
//       meshData: [
//         {
//           geometry: nodes["pCube1-mesh_10"].geometry,
//           position: [3.45934046, 24.22309125, -7.02739054],
//           rotation: [1.17127847, 0.610312, 1.01464035],
//           scale: [1.00000005, 1.00000019, 0.99999976],
//           materialProps: { ...materialProps },
//         },
//       ],
//     },
//     {
//       position: [311.04588394, 679.6857098, 132.75006196],
//       rotation: [1.28542452, 1.0949235, 2.25032753],
//       scale: [19568.18806821, 19568.18806822, 19568.18806822],
//       meshData: [
//         {
//           geometry: nodes["pCube1-mesh_11"].geometry,
//           position: [2.82575038, 22.17913649, -4.88592393],
//           rotation: [1.54993158, 1.3963441, -1.70027942],
//           scale: [0.99999984, 0.99999965, 0.99999978],
//           materialProps: { ...materialProps },
//         },
//       ],
//     },
//   ]

//   // const instanceCount = groupData.length // Number of instances

//   // useEffect(() => {
//   //   const mesh = meshRef.current

//   //   for (let i = 0; i < instanceCount; i++) {
//   //     const matrix = new THREE.Matrix4()
//   //     const position = new THREE.Vector3(i * 2, 0, 0) // Example positioning
//   //     const rotation = new THREE.Quaternion()
//   //     const scale = new THREE.Vector3(1, 1, 1)

//   //     matrix.compose(position, rotation, scale)
//   //     mesh.setMatrixAt(i, matrix)
//   //   }

//   //   mesh.instanceMatrix.needsUpdate = true
//   // }, [instanceCount])

//   return (
//     <group
//       position={[-91.58413696, -220.24613953, -75.99475861]}
//       rotation={[0.0231247, -0.63019977, -0.22694059]}
//       scale={[1.00000005, 1.00000006, 1.00000008]}
//     >
//       <>
//         {groupData.map((group, index) => (
//           <group
//             key={index}
//             position={new THREE.Vector3(group.position[0], group.position[1], group.position[2])}
//             rotation={new THREE.Euler(group.rotation[0], group.rotation[1], group.rotation[2])}
//             scale={new THREE.Vector3(group.scale[0], group.scale[1], group.scale[2])}
//           >
//             <group scale={0.001}>
//               {group.meshData.map((mesh, meshIndex) => (
//                 <group key={meshIndex} position={[2.3003099, 0.02521, 0.183025]}>
//                   <mesh
//                     geometry={mesh.geometry}
//                     position={new THREE.Vector3(mesh.position[0], mesh.position[1], mesh.position[2])}
//                     rotation={new THREE.Euler(mesh.rotation[0], mesh.rotation[1], mesh.rotation[2])}
//                     scale={new THREE.Vector3(mesh.scale[0], mesh.scale[1], mesh.scale[2])}
//                   >
//                     <MeshTransmissionMaterial map={tex} bumpMap={tex} bumpScale={4} {...mesh.materialProps} />
//                   </mesh>
//                 </group>
//               ))}
//             </group>
//           </group>
//         ))}
//       </>
//     </group>
//   )
// }

function Cup(nodes: GLTFResult["nodes"]) {
  const packageMap = useLoader(THREE.TextureLoader, "/img/chill-owra-package.png")

  useMemo(() => {
    if (packageMap) {
      packageMap.wrapS = packageMap.wrapT = THREE.ClampToEdgeWrapping
      packageMap.offset.set(-1.2, -0.2)
      packageMap.rotation = Math.PI * 1.5
      packageMap.flipY = true
      packageMap.center = new THREE.Vector2(0.5, 0.5)

      const aspectRatio = packageMap.image.width / packageMap.image.height
      packageMap.repeat.set(1.2, 1.5)
    }
  }, [packageMap])

  const materialProps = useControls("cup", {
    thickness: { value: 0.1, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.01 }, // Increase roughness for less reflection
    transmission: { value: 1, min: 0, max: 1, step: 0.01 }, // Increase transmission for more transparency
    ior: { value: 1.3, min: 1, max: 20, step: 0.01 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01 }, // Reduce clearcoat for less reflection
    metalness: { value: 0, min: 0, max: 1, step: 0.01 }, // Ensure metalness is low for plastic
    backside: { value: false },
  })

  return (
    <>
      <group>
        <mesh
          geometry={nodes.CUsersberkaOneDriveMasaüstüBardak_Ustobj.geometry}
          position={[1.37532806, -83.60058784, 0.00108719]}
        >
          <MeshTransmissionMaterial {...materialProps} side={THREE.DoubleSide} />
        </mesh>

        <mesh geometry={nodes.CUsersberkaOneDriveMasaüstüBardak_Altobj.geometry} position={[1.3753624, -79.21138, 0]}>
          <MeshTransmissionMaterial {...materialProps} map={packageMap} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  )
}

useGLTF.preload("/glb/bardak.glb")
