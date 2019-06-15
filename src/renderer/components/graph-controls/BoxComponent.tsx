import { Component, Input, Node, Output } from "rete";
import * as mathjs from "mathjs";

import { IBox, IVector3, TMaterial } from "@models/graph";
import { TInputData, TNodeData } from "./control-types";
import NumControl from "./NumControl";
import { materialSocket, meshSocket, numSocket, vector3Socket } from "./sockets";

export interface IBoxComponentData {
  width: string;
  height: string;
  depth: string;
  position: IVector3;
  rotation: IVector3;
  material: TMaterial;
}

export interface IBoxComponentOutput {
  type: "box";
  mesh: IBox;
}

class BoxComponent extends Component {
  public constructor() {
    super("Box");
  }

  public async builder(node: Node) {
    const widthInput = new Input("width", "Width", numSocket);
    const heightInput = new Input("height", "Height", numSocket);
    const depthInput = new Input("depth", "Depth", numSocket);
    const positionInput = new Input("position", "Position", vector3Socket);
    const rotationInput = new Input("rotation", "Rotation", vector3Socket);
    const materialInput = new Input("material", "Material", materialSocket)
    const out = new Output("mesh", "Mesh", meshSocket);

    widthInput.addControl(new NumControl(this.editor, "width", node));
    heightInput.addControl(new NumControl(this.editor, "height", node));
    depthInput.addControl(new NumControl(this.editor, "depth", node));

    return node
      .addInput(widthInput)
      .addInput(heightInput)
      .addInput(depthInput)
      .addInput(positionInput)
      .addInput(rotationInput)
      .addInput(materialInput)
      .addOutput(out);
  }

  public async worker(node: TNodeData<IBoxComponentData>, inputs: TInputData<IBoxComponentData>, outputs: IBoxComponentOutput) {
    const widthInput = inputs.width.length ? inputs.width[0] : node.data.width;
    const heightInput = inputs.height.length ? inputs.height[0] : node.data.height;
    const depthInput = inputs.depth.length ? inputs.depth[0] : node.data.depth;
    const position = inputs.position.length ? inputs.position[0] : node.data.position;
    const rotation = inputs.rotation.length ? inputs.rotation[0] : node.data.rotation;
    const material = inputs.material.length ? inputs.material[0] : node.data.material;

    const width = (widthInput && (mathjs as any).evaluate(widthInput)) || 0;
    const height = (heightInput && (mathjs as any).evaluate(heightInput)) || 0;
    const depth = (depthInput && (mathjs as any).evaluate(depthInput)) || 0;

    outputs.type = "box";
    outputs.mesh = {
      type: "box",
      position: position || {
        type: "vector3",
        x: 0, y: 0, z: 0
      },
      rotation: rotation || {
        type: "vector3",
        x: 0, y: 0, z: 0
      },
      material,
      depth,
      height,
      width
    };
  }
}

export default BoxComponent;
