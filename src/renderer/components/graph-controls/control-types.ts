export type TNodeData<T> = {
  data: {
    [P in keyof T]?: T[P];
  };
}

export type TInputData<T> = {
  [P in keyof T]: T[P][];
}
