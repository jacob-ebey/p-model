import * as React from "react";

import Scene from "../components/Scene";
import { ICSGOperationComponentOutput } from "../components/graph-controls/CSGOperationComponent";
import { ICSGComponentOutput } from "../components/graph-controls/CSGComponent";
import { ActiveGraphContext } from "../context/ActiveGraphContext";

const SceneContainer: React.FC = () => {
  const ctx = React.useContext(ActiveGraphContext);
  const [csgOutput, setCsgOutput] = React.useState<((ICSGComponentOutput | ICSGOperationComponentOutput) & { id: string }) | undefined>(undefined);

  React.useEffect(() => {
    if (!ctx.selectedId || !ctx.computedData) {
      return;
    }

    const data = ctx.computedData[ctx.selectedId];
    if (!data) return;

    switch (data.type) {
      case "csg":
      case "csg-operation":
          setCsgOutput({
            id: ctx.selectedId,
            ...data
          });
        break;
    }
  }, [setCsgOutput, ctx.selectedId, ctx.computedData]);

  return (
    <Scene
      csgOutput={csgOutput}
      computedData={ctx.computedData}
    />
  );
}

export default SceneContainer;
