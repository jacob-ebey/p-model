import * as BABYLON from "babylonjs";
import * as React from "react";
import { Data } from "rete/types/core/data";

import tempGraph from "./tempGraph";
import { IComputedData } from "../components/graph-controls";

const noop = () => {};

export interface IActiveGraphCSG {
  csg: BABYLON.CSG;
}

export interface IActiveGraphContext {
  data?: Data;
  computedData?: IComputedData;
  csg?: IActiveGraphCSG;
  selectedId?: string;
  setData(data?: Data, computedData?: IComputedData): void;
  setCsg(csg?: IActiveGraphCSG): void;
  setSelectedId(selectedId?: string): void;
}

export const ActiveGraphContext = React.createContext<IActiveGraphContext>({
  setData: noop,
  setCsg: noop,
  setSelectedId: noop
});

export const ActiveGraphProvider: React.FC = ({ children }) => {
  const [context, setContext] = React.useState<{ selectedId?: string; data?: Data; csg?: IActiveGraphCSG; computedData?: IComputedData; }>({
    data: tempGraph as any
  });

  const setData = React.useCallback((data?: Data, computedData?: IComputedData) => {
    setContext({
      ...context,
      data,
      computedData
    });
  }, [context, setContext]);

  const setCsg = React.useCallback((csg?: IActiveGraphCSG) => {
    setContext({
      ...context,
      csg,
    });
  }, [context, setContext]);

  const setSelectedId = React.useCallback((selectedId?: string) => {
    setContext({
      ...context,
      selectedId
    });
  }, [context, setContext])

  return (
    <ActiveGraphContext.Provider value={{
      ...context,
      setData,
      setCsg,
      setSelectedId
    }}>
      {children}
    </ActiveGraphContext.Provider>
  );
};
