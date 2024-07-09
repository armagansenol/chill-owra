import { useGraph, useLoader } from "@react-three/fiber"
import * as React from "react"
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js"

export interface IceCubeObjProps {}

export default function IceCubeObj(props: IceCubeObjProps) {
  const materials = useLoader(MTLLoader, "/mtl/ice-cube.mtl")
  const object = useLoader(OBJLoader, "/obj/ice-cube.obj", (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  return <primitive object={object} />
}
