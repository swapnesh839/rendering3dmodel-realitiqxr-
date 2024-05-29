import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useLayoutEffect, useTransition } from 'react'
import { useEffect, useRef, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { useGLTF } from "@react-three/drei";
import logo from '../../assets/logo.png'
import LOT10 from "../../assets/Lot10.glb"
import LOT144 from "../../assets/LOT144.glb"
import LOT32 from "../../assets/Lot32.glb"
import LOT232 from "../../assets/Lot232.glb"
import LOT79 from "../../assets/LOT79.glb"
import LOT308 from "../../assets/LOT308.glb"
import LOT344 from "../../assets/LOT344.glb"
import LOT5 from "../../assets/Lot5.glb"
import LOT17 from "../../assets/Lot17.glb"
import LOT119 from "../../assets/Lot119.glb"
import LOT307 from "../../assets/Lot307.glb"
import LOT311 from "../../assets/Lot311.glb"
import LOT284 from "../../assets/LOT284.glb"
import Headphone3M from "../../assets/Headphone3M.glb"
import Model from "../../assets/Model.glb"
import Recline_Sofa from "../../assets/Recline_Sofa.glb"
import White_Sofa_Smooth_Fabric from "../../assets/White_Sofa_Smooth_Fabric.glb"
import { Html } from "@react-three/drei";
import { useParams } from "react-router-dom";

const pathlist = { Model, LOT10, Headphone3M, LOT144, LOT32, LOT232, LOT79, LOT308, LOT344, LOT5, White_Sofa_Smooth_Fabric, Recline_Sofa, LOT17, LOT119, LOT307, LOT311, LOT284 }



const RenderFile = () => {
  const [path, setpath] = useState(null)
  const [smallsize, setsmallsize] = useState(false)
  const { model } = useParams()
  useLayoutEffect(() => {
    if (model) {
      setpath(model);
    } else {
      setpath("LOT144");
    }
  }, [model]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const ImportedFile = () => {
    const ImportedFileref = useRef(null)
    const { scene } = useGLTF(pathlist[path])
    useFrame((state, delta) => {
      ImportedFileref.current.rotation.y += delta
    })

    const width = document.body.offsetWidth

    useEffect(() => {
      if (width < 576) {
        // console.log(width);
        setsmallsize(true)
      } else {
        setsmallsize(false)
      }
    }, [width])
    return (
      <>
        <primitive
          scale={smallsize ? [.5, .5, .5] : [1, 1, 1]}
          object={scene} ref={ImportedFileref} />
      </>
    )
  };

  return (
    <>
      <a href="https://realitiqxr.com/">
        <img className='p-2 m-2 position-absolute' style={{ zIndex: "80", width: "200px" }} src={logo} />
      </a>
      {loading ?
        <div className="h-100 w-100 d-flex">
          <ClipLoader
            className="m-auto"
            color="#ffffff"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        : (pathlist[path]) ?
          <Canvas className="h-100 w-100" >
            <Suspense fallback={<Html className="h-100 w-100 d-flex">
              {/* <span className="m-auto text-light text-center">Can't Find The Model/Error Loading the Model Plese Relode The Page Or Check the Model Name</span> */}
              <ClipLoader
                className="m-auto"
                color="#ffffff"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Html>}>
              <OrbitControls />
              {/* <Environment files={} /> */}
              <directionalLight args={["#ffffff", 1]} />
              <PerspectiveCamera makeDefault position={[0, 3, 7]} />
              <directionalLight color={"#ffffff"} intensity={1} position={[1, 1, 1]} />
              <directionalLight color={"#ffffff"} intensity={1} position={[-1, -1, -1]} />
              <directionalLight color={"#ffffff"} intensity={1} position={[-1, 1, 1]} />
              <directionalLight color={"#ffffff"} intensity={2} position={[1, -1, -1]} />
              <directionalLight color={"#ffffff"} intensity={1} position={[1, 1, -1]} />
              <directionalLight color={"#ffffff"} intensity={1} position={[-1, -1, 1]} />
              <directionalLight color={"#ffffff"} intensity={5} position={[0, 0, 1]} />
              <ambientLight args={["white", 1]} />
              <ImportedFile />
            </Suspense>
          </Canvas>
          : <div className="h-100 w-100 d-flex">
            <span className="m-auto text-light text-center">Can't Find The Model Plese Relode The Page Or Check the Model Name</span>
          </div>
      }

    </>
  )
}




export default RenderFile