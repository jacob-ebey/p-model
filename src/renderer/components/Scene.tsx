import * as BABYLON from "babylonjs";
import * as React from "react";
import * as Stats from "stats.js";
import usePrevious from "react-use/esm/usePrevious";

import { TMaterial, TMesh } from "@/models/graph";
import { ICSGComponentOutput } from "./graph-controls/CSGComponent";
import { ICSGOperationComponentOutput } from "./graph-controls/CSGOperationComponent";
import { IComputedData, TMeshOutput } from "./graph-controls";

const stats = new Stats();
stats.showPanel(0);
stats.dom.style.position = "absolute";

export interface ISceneProps {
  computedData?: IComputedData;
  csgOutput?: (ICSGComponentOutput | ICSGOperationComponentOutput) & { id: string }
}

const Scene: React.FC<ISceneProps> = ({ computedData, csgOutput }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = React.useState<BABYLON.Scene | undefined>(undefined);
  const [mesh, setMesh] = React.useState<BABYLON.Mesh | undefined>(undefined);
  const previousMesh = usePrevious(mesh);

  React.useEffect(() => {
    wrapperRef.current && wrapperRef.current.appendChild(stats.dom);

    const engine = new BABYLON.Engine(canvasRef.current, true);
    const scene = new BABYLON.Scene(engine);
    setScene(scene);

    const camera = new BABYLON.ArcRotateCamera("main-camera", 1, 1, 3, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvasRef.current as HTMLCanvasElement);

    new BABYLON.PointLight("light1", new BABYLON.Vector3(100, 100, 100), scene);
    new BABYLON.PointLight("light2", new BABYLON.Vector3(-100, 100, -100), scene);
    new BABYLON.PointLight("light3", new BABYLON.Vector3(0, -100, 0), scene);

    const onResize = () => {
      engine.resize();
    };

    const onRender = () => {
      stats.begin();

      scene.render();

      stats.end();
    };

    window.addEventListener("resize", onResize);

    engine.runRenderLoop(onRender);

    return () => {
      wrapperRef.current && wrapperRef.current.removeChild(stats.dom);
      window.removeEventListener("resize", onResize);
      engine.stopRenderLoop(onRender);
      scene.dispose();
      engine.dispose();
    };
  }, []);

  React.useEffect(() => {
    if (!scene || !csgOutput || !computedData) {
      return;
    }

    const materials = reduceMaterials(scene, csgOutput.csg.material);
    const material = new BABYLON.MultiMaterial(new Date().toISOString(), scene);
    material.subMaterials.push(...materials);

    let newMesh: BABYLON.Mesh | undefined;

    switch (csgOutput.type) {
      case "csg": {
        newMesh = csgOutputToMesh(scene, computedData, csgOutput.id);
        if (newMesh) newMesh.material = material;
        break;
      }
      case "csg-operation": {
        const csg = csgOperationOutputToCsg(scene, computedData, csgOutput.id);
        newMesh = csg && csg.toMesh(new Date().toISOString(), material, scene, true);
        if (newMesh) {
          scene.removeMesh(newMesh);
        }
      }
    }

    if (newMesh) {
      setMesh(newMesh);
    }

  }, [computedData, scene, csgOutput]);

  React.useEffect(() => {
    if (scene && previousMesh && (!mesh || (previousMesh !== mesh))) {
      if (!previousMesh.isDisposed())
        previousMesh.dispose();
    }
    if (scene && mesh) {
      scene.addMesh(mesh);
    }
  }, [mesh, previousMesh]);

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />;
    </div>
  );
}

const wrapperStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  flex: 1
};

const canvasStyle: React.CSSProperties = {
  flex: 1,
  margin: 0,
  padding: 0,
  border: 0
};

function csgOperationOutputToCsg(scene: BABYLON.Scene, computedData: IComputedData, id: string): BABYLON.CSG | undefined {
  const operation = computedData[id] as ICSGOperationComponentOutput;
  const a = computedData[id] && computedData[id].inputs.a.connections.map(c => c.node.toString())[0];
  const b = computedData[id] && computedData[id].inputs.b.connections.map(c => c.node.toString())[0];

  const csgA = csgOperationInputToCsg(scene, computedData, a);
  const csgB = csgOperationInputToCsg(scene, computedData, b);

  if (csgA && csgB) {
    console.log(operation.csg);
    return csgA[operation.csg.operation](csgB);
  }
}

function csgOperationInputToCsg(scene: BABYLON.Scene, computedData: IComputedData, id: string): BABYLON.CSG | undefined {
  const mesh = computedData[id];

  switch (mesh ? mesh.type : "") {
    case "csg-operation":2
      return csgOperationOutputToCsg(scene, computedData, id);
    case "csg": {
      const mesh = csgOutputToMesh(scene, computedData, id);
      return mesh && BABYLON.CSG.FromMesh(mesh);
    }
    default:
      return undefined;
  }
}

function csgOutputToMesh(scene: BABYLON.Scene, computedData: IComputedData, id: string): BABYLON.Mesh | undefined {
  const mesh = computedData[id] && computedData[id].inputs.mesh.connections.map(c => c.node.toString())[0];

  return meshToBabylonMesh(scene, computedData, mesh);
}

function meshToBabylonMesh(scene: BABYLON.Scene, computedData: IComputedData, id: string): BABYLON.Mesh | undefined {
  const mesh = computedData[id];

  if (!mesh) return undefined;

  switch (mesh.type) {
    case "box": {
      const res = BABYLON.MeshBuilder.CreateBox(new Date().toISOString(), {
        height: mesh.mesh.height,
        width: mesh.mesh.width,
        depth: mesh.mesh.depth
      }, scene);
      scene.removeMesh(res);

      res.position = new BABYLON.Vector3(mesh.mesh.position.x, mesh.mesh.position.y, mesh.mesh.position.z);
      res.rotation = new BABYLON.Vector3(mesh.mesh.rotation.x, mesh.mesh.rotation.y, mesh.mesh.rotation.z);

      return res;
    }
    case "sphere": {
      const res = BABYLON.MeshBuilder.CreateSphere(new Date().toDateString(), {
        diameter: mesh.mesh.diameter
      });
      scene.removeMesh(res);

      res.position = new BABYLON.Vector3(mesh.mesh.position.x, mesh.mesh.position.y, mesh.mesh.position.z);
      res.rotation = new BABYLON.Vector3(mesh.mesh.rotation.x, mesh.mesh.rotation.y, mesh.mesh.rotation.z);

      return res;
    }

    default:
      return undefined;
  }
}

function reduceMaterials(scene: BABYLON.Scene, material: any): BABYLON.Material[] {
  return reduceMaterialsRecursive(scene, material, []);
}

function standardMaterial(scene: BABYLON.Scene) {
  const mat = new BABYLON.StandardMaterial(new Date().toISOString(), scene);
  mat.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.6);
  return mat;
}

function reduceMaterialsRecursive(scene: BABYLON.Scene, material: any, previous: any[]): BABYLON.Material[] {
  if (!material) {
    return [...previous, standardMaterial(scene)];
  }

  if (Array.isArray(material)) {
    return [
      ...material.reduce((p, mat) => {
        return reduceMaterialsRecursive(scene, mat, p);
      }, []),
      ...previous
    ];
  }
  
  const mat = standardMaterial(scene);
  mat.diffuseColor = new BABYLON.Color3(material.diffuseColor.r, material.diffuseColor.g, material.diffuseColor.b);
  mat.alpha = material.alpha;
  return [...previous, mat];
}

export default Scene;
