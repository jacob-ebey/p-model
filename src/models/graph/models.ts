import { TMaterial } from "./materials";
import { IVector3 } from "./vectors";

export interface IMesh {
  position: IVector3;
  rotation: IVector3;
  material?: TMaterial;
}

export interface IBox extends IMesh {
  type: "box";
  width?: number;
  height?: number;
  depth?: number;
}

export interface ISphere extends IMesh {
  type: "sphere";
  diameter: number;
  segments: number;
}

export type TMesh = IBox | ISphere;

export interface ICSG {
  type: "csg";
  material?: (TMaterial | ((TMaterial | undefined)[]));
}

export enum CSGOperationType {
  intersect = "intersect",
  subtract = "subtract",
  union = "union"
}

export interface ICSGOperation {
  type: "csg-operation";
  material?: (TMaterial | ((TMaterial | undefined)[]));
  operation: CSGOperationType;
}
