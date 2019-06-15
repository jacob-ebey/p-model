import { Component, Input, Node, Output } from "rete";
import * as mathjs from "mathjs";

import { IVector3 } from "@models/graph"
import { TInputData, TNodeData } from "./control-types";
import NumControl from "./NumControl";
import { numSocket, vector3Socket } from "./sockets";

export interface IVector3ComponentData {
  x: number;
  y: number;
  z: number;
}

export interface IVector3ComponentOutput {
  type: "vector3";
  vector3: IVector3;
}

class Vector3Component extends Component {
  public constructor() {
    super("Vector3");
  }

  public async builder(node: Node) {
    const xInput = new Input("x", "X", numSocket);
    const yInput = new Input("y", "Y", numSocket);
    const zInput = new Input("z", "Z", numSocket);
    const out = new Output("vector3", "Vector3", vector3Socket);

    xInput.addControl(new NumControl(this.editor, "x", node));
    yInput.addControl(new NumControl(this.editor, "y", node));
    zInput.addControl(new NumControl(this.editor, "z", node));

    return node
      .addInput(xInput)
      .addInput(yInput)
      .addInput(zInput)
      .addOutput(out);
  }

  public async worker(node: TNodeData<IVector3ComponentData>, inputs: TInputData<IVector3ComponentData>, outputs: IVector3ComponentOutput) {
    const xInput = inputs.x.length ? inputs.x[0] : node.data.x;
    const yInput = inputs.y.length ? inputs.y[0] : node.data.y;
    const zInput = inputs.z.length ? inputs.z[0] : node.data.z;

    const x = xInput && (mathjs as any).evaluate(xInput);
    const y = yInput && (mathjs as any).evaluate(yInput);
    const z = zInput && (mathjs as any).evaluate(zInput);

    outputs.type = "vector3";
    outputs.vector3 = {
      type: "vector3",
      x: x || 0,
      y: y || 0,
      z: z || 0
    };
  }
}

export default Vector3Component;
