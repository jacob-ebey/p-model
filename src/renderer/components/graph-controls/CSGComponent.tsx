import { Component, Input, Node, Output } from "rete";

import { ICSG, TMesh } from "@models/graph";
import { TNodeData, TInputData } from "./control-types";
import { csgSocket, meshSocket } from "./sockets";

export interface ICSGComponentData {
  mesh: TMesh;
}

export interface ICSGComponentOutput {
  type: "csg";
  csg: ICSG;
}

class CSGComponent extends Component {
  public constructor() {
    super("CSG");
  }

  public async builder(node: Node) {
    const meshInput = new Input("mesh", "Mesh", meshSocket);
    const out = new Output("csg", "CSG", csgSocket);

    return node
      .addInput(meshInput)
      .addOutput(out);
  }

  public async worker(node: TNodeData<ICSGComponentData>, inputs: TInputData<ICSGComponentData>, outputs: ICSGComponentOutput) {
    const mesh = inputs.mesh.length ? inputs.mesh[0] : node.data.mesh;

    outputs.type = "csg";
    outputs.csg = {
      type: "csg",
      material: mesh && mesh.material
    };
  }
}

export default CSGComponent;
