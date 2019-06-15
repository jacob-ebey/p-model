import { Component, Input, Node, Output } from "rete";
import * as mathjs from "mathjs";

import { IColor3 } from "@models/graph"
import { TInputData, TNodeData } from "./control-types";
import NumControl from "./NumControl";
import { numSocket, color3Socket } from "./sockets";

export interface IColor3ComponentData {
  r: number;
  g: number;
  b: number;
}

export interface IColor3ComponentOutput {
  type: "color3";
  color3: IColor3;
}

class Color3Component extends Component {
  public constructor() {
    super("Color3");
  }

  public async builder(node: Node) {
    const rInput = new Input("r", "r", numSocket);
    const gInput = new Input("g", "g", numSocket);
    const bInput = new Input("b", "b", numSocket);
    const out = new Output("color3", "Color3", color3Socket);

    rInput.addControl(new NumControl(this.editor, "r", node));
    gInput.addControl(new NumControl(this.editor, "g", node));
    bInput.addControl(new NumControl(this.editor, "b", node));

    return node
      .addInput(rInput)
      .addInput(gInput)
      .addInput(bInput)
      .addOutput(out);
  }

  public async worker(node: TNodeData<IColor3ComponentData>, inputs: TInputData<IColor3ComponentData>, outputs: IColor3ComponentOutput) {
    const rInput = inputs.r.length ? inputs.r[0] : node.data.r;
    const gInput = inputs.g.length ? inputs.g[0] : node.data.g;
    const bInput = inputs.b.length ? inputs.b[0] : node.data.b;

    const r = rInput && (mathjs as any).evaluate(rInput);
    const g = gInput && (mathjs as any).evaluate(gInput);
    const b = bInput && (mathjs as any).evaluate(bInput);

    outputs.type = "color3";
    outputs.color3 = {
      type: "color3",
      r: r || 0,
      g: g || 0,
      b: b || 0
    };
  }
}

export default Color3Component;
