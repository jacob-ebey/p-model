import "babel-polyfill";

import * as React from "react";
import * as ReactDOM from "react-dom";
import SplitPlane from "react-split-pane";

import "@public/style.css";
import Console from "./components/Console";
import Graph from "./containers/Graph";
import Scene from "./containers/Scene";

import { ActiveGraphProvider } from "./context/ActiveGraphContext";

ReactDOM.render(
  <ActiveGraphProvider>
    <SplitPlane defaultSize="50%">
      <SplitPlane split="horizontal" defaultSize="80%">
        <Graph />
        <Console />
      </SplitPlane>
      <Scene />
    </SplitPlane>
  </ActiveGraphProvider>,
  document.getElementById("app")
);
