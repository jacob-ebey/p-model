import { InputsData } from "rete/types/core/data";

import { IBoxComponentOutput } from "./BoxComponent";
import { IColor3ComponentOutput } from "./Color3Component";
import { ICSGComponentOutput } from "./CSGComponent";
import { ICSGOperationComponentOutput } from "./CSGOperationComponent";
import { INumberComponentOutput } from "./NumberComponent";
import { ISphereComponentOutput } from "./SphereComponent";
import { IStandardMaterialComponentOutput } from "./StandardMaterialComponent";
import { IVector3ComponentOutput } from "./Vector3Component";

export { IBoxComponentOutput, INumberComponentOutput, IVector3ComponentOutput };

export type TMeshOutput = IBoxComponentOutput
  | ISphereComponentOutput;

export type TGraphOutput = TMeshOutput
  | IColor3ComponentOutput
  | ICSGComponentOutput
  | ICSGOperationComponentOutput
  | INumberComponentOutput
  | IStandardMaterialComponentOutput
  | IVector3ComponentOutput;

export interface IComputedData {
  [key: string]: TGraphOutput & { inputs: InputsData; };
}
