import { IColor3 } from "./vectors";

export interface IStandardMaterial {
  type: "standard-material";
  diffuseColor: IColor3;
  alpha: number;
}

export type TMaterial = IStandardMaterial;
