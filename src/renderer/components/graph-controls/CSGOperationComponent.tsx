import { Component, Input, Node, Output } from "rete";

import { CSGOperationType, ICSG, ICSGOperation, TMaterial } from "@models/graph";
import { TNodeData, TInputData } from "./control-types";
import { csgSocket } from "./sockets";

import CSGOperationTypeControl from "./CSGOperationTypeControl";

export interface ICSGOperationComponentData {
  operation: CSGOperationType;
  a: ICSG;
  b: ICSG;
}

export interface ICSGOperationComponentOutput {
  type: "csg-operation";
  csg: ICSGOperation;
}

class CSGOperationComponent extends Component {
  public constructor() {
    super("CSG Operation");
  }

  public async builder(node: Node) {
    const a = new Input("a", "CSG A", csgSocket);
    const b = new Input("b", "CSG B", csgSocket);
    const out = new Output("csg", "CSG", csgSocket);

    node.addControl(new CSGOperationTypeControl(this.editor, "operation", node));

    return node
      .addInput(a)
      .addInput(b)
      .addOutput(out);
  }

  public async worker(node: TNodeData<ICSGOperationComponentData>, inputs: TInputData<ICSGOperationComponentData>, outputs: ICSGOperationComponentOutput) {
    const a = inputs.a.length ? inputs.a[0] : node.data.a;
    const b = inputs.b.length ? inputs.b[0] : node.data.b;

    outputs.type = "csg-operation";
    outputs.csg = {
      type: "csg-operation",
      operation: node.data.operation || CSGOperationType.subtract,
      material: reduceMaterials([a && a.material, b && b.material])
    };
  }
}

function reduceMaterials(material: any): (TMaterial | undefined)[] {
  return reduceMaterialsRecursive(material, []);
}

function reduceMaterialsRecursive(material: any, previous: any[]): (TMaterial | undefined)[] {
  if (!material) {
    return [...previous, undefined];
  }

  if (Array.isArray(material)) {
    return [
      ...material.reduce((p, mat) => {
        return reduceMaterialsRecursive(mat, p);
      }, []),
      ...previous
    ];
  }

  return [...previous, material];
}

export default CSGOperationComponent;
