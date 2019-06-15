import { Component, Input, Node, Output } from "rete";
import * as mathjs from "mathjs";

import { IColor3, IStandardMaterial } from "@models/graph";
import { TNodeData, TInputData } from "./control-types";
import { color3Socket, materialSocket, numSocket } from "./sockets";
import NumControl from "./NumControl";

export interface IStandardMaterialComponentData {
  alpha: string
  diffuseColor: IColor3;
}

export interface IStandardMaterialComponentOutput {
  type: "standard-material";
  material: IStandardMaterial;
}

class StandardMaterialComponent extends Component {
  public constructor() {
    super("Standard Material");
  }

  public async builder(node: Node) {
    const diffuseColorInput = new Input("diffuseColor", "Diffuse Color", color3Socket);
    const alphaInput = new Input("alpha", "Alpha", numSocket);
    const out = new Output("material", "Material", materialSocket);

    alphaInput.addControl(new NumControl(this.editor, "alpha", node));

    return node
      .addInput(diffuseColorInput)
      .addInput(alphaInput)
      .addOutput(out);
  }

  public async worker(node: TNodeData<IStandardMaterialComponentData>, inputs: TInputData<IStandardMaterialComponentData>, outputs: IStandardMaterialComponentOutput) {
    const diffuseColor = inputs.diffuseColor.length ? inputs.diffuseColor[0] : node.data.diffuseColor;
    const alphaInput = inputs.alpha.length ? inputs.alpha[0] : node.data.alpha;

    const alpha = (alphaInput && (mathjs as any).evaluate(alphaInput)) || 0;

    outputs.type = "standard-material";
    outputs.material = {
      type: "standard-material",
      alpha,
      diffuseColor: diffuseColor || {
        type: "color3",
        r: 0.6, g: 0.6, b: 0.6
      }
    };
  }
}

export default StandardMaterialComponent;
