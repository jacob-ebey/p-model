import { Component, Input, Node, Output } from "rete";
import * as mathjs from "mathjs";

import { ISphere, IVector3, TMaterial } from "@models/graph";
import { TInputData, TNodeData } from "./control-types";
import NumControl from "./NumControl";
import { materialSocket, meshSocket, numSocket, vector3Socket } from "./sockets";

export interface ISphereComponentData {
  diameter: string;
  segments: string;
  position: IVector3;
  rotation: IVector3;
  material: TMaterial;
}

export interface ISphereComponentOutput {
  type: "sphere";
  mesh: ISphere;
}

class SphereComponent extends Component {
  public constructor() {
    super("Sphere");
  }

  public async builder(node: Node) {
    const diameterInput = new Input("diameter", "Diameter", numSocket);
    const segmentsInput = new Input("segments", "Segments", numSocket);
    const positionInput = new Input("position", "Position", vector3Socket);
    const rotationInput = new Input("rotation", "Rotation", vector3Socket);
    const materialInput = new Input("material", "Material", materialSocket)
    const out = new Output("mesh", "Mesh", meshSocket);

    diameterInput.addControl(new NumControl(this.editor, "diameter", node));
    segmentsInput.addControl(new NumControl(this.editor, "segments", node));

    return node
      .addInput(diameterInput)
      .addInput(segmentsInput)
      .addInput(positionInput)
      .addInput(rotationInput)
      .addInput(materialInput)
      .addOutput(out);
  }

  public async worker(node: TNodeData<ISphereComponentData>, inputs: TInputData<ISphereComponentData>, outputs: ISphereComponentOutput) {
    const diameterInput = inputs.diameter.length ? inputs.diameter[0] : node.data.diameter;
    const segmentsInput = inputs.segments.length ? inputs.segments[0] : node.data.segments;
    const position = inputs.position.length ? inputs.position[0] : node.data.position;
    const rotation = inputs.rotation.length ? inputs.rotation[0] : node.data.rotation;
    const material = inputs.material.length ? inputs.material[0] : node.data.material;

    const diameter = (diameterInput && (mathjs as any).evaluate(diameterInput)) || 0;
    const segments = (segmentsInput && (mathjs as any).evaluate(segmentsInput)) || 0;

    outputs.type = "sphere";
    outputs.mesh = {
      type: "sphere",
      position: position || {
        type: "vector3",
        x: 0, y: 0, z: 0
      },
      rotation: rotation || {
        type: "vector3",
        x: 0, y: 0, z: 0
      },
      material,
      diameter,
      segments
    };
  }
}

export default SphereComponent;
