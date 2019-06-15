import * as React from "react";

import Graph from "../components/Graph";
import { ActiveGraphContext } from "../context/ActiveGraphContext";

const GraphContainer: React.FC = () => {
  const ctx = React.useContext(ActiveGraphContext);

  return (
    <Graph
      initialData={ctx.data}
      setData={ctx.setData}
      setCsg={ctx.setCsg}
      setSelectedId={ctx.setSelectedId}
    />
  );
}

export default GraphContainer;
