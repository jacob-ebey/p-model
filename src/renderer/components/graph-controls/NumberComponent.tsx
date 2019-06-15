import { Component, Node, Output } from "rete";
import * as mathjs from "mathjs";

import { TInputData, TNodeData } from "./control-types";
import NumControl from "./NumControl";
import { numSocket } from "./sockets";

export interface INumberComponentData {
  math: string;
}

export interface INumberComponentOutput {
  type: "number";
  number: number;
}

class NumberComponent extends Component {
  public constructor() {
    super("Number");
  }

  public async builder(node: Node) {
    const numControl = new NumControl(this.editor, "math", node);
    const out = new Output("number", "Number", numSocket);

    return node.addControl(numControl).addOutput(out);
  }

  public async worker(node: TNodeData<INumberComponentData>, inputs: TInputData<INumberComponentData>, outputs: INumberComponentOutput) {
    outputs.type = "number";
    outputs.number = (mathjs as any).evaluate(node.data.math);
  }
}

export default NumberComponent;
