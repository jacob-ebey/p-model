import * as React from "react";
import * as Rete from "rete";
import { Data, NodeData } from "rete/types/core/data";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import ReactRenderPlugin from "rete-react-render-plugin";

import { IActiveGraphCSG } from "../context/ActiveGraphContext";
import { IComputedData } from "./graph-controls";
import BoxComponent from "./graph-controls/BoxComponent";
import Color3Component from "./graph-controls/Color3Component";
import CSGComponent from "./graph-controls/CSGComponent";
import CSGOperationComponent from "./graph-controls/CSGOperationComponent";
import NumberComponent from "./graph-controls/NumberComponent";
import SphereComponent from "./graph-controls/SphereComponent";
import StandardMaterialComponent from "./graph-controls/StandardMaterialComponent";
import Vector3Component from "./graph-controls/Vector3Component";

const components = [
  new BoxComponent(),
  new Color3Component(),
  new CSGComponent(),
  new CSGOperationComponent(),
  new NumberComponent(),
  new SphereComponent(),
  new StandardMaterialComponent(),
  new Vector3Component()
];

export interface IGraphProps {
  initialData?: Data;
  setData(data?: Data, computedData?: IComputedData): void;
  setCsg(csg?: IActiveGraphCSG): void;
  setSelectedId(selectedId: string): void;
}

const Graph: React.FC<IGraphProps> = ({ initialData, setData, setSelectedId }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [engine, setEngine] = React.useState<Rete.Engine | null>(null);
  const [editor, setEditor] = React.useState<Rete.NodeEditor | null>(null);

  React.useEffect(() => {
    if (wrapperRef.current) {
      console.log("Initializing Graph");

      var editor = new Rete.NodeEditor("demo@0.1.0", wrapperRef.current);
      editor.use(ConnectionPlugin, { curvature: 0.4 });
      editor.use(ContextMenuPlugin);
      editor.use(ReactRenderPlugin);

      var engine = new Rete.Engine('demo@0.1.0');
      setEngine(engine);
      setEditor(editor);

      components.map(c => {
        editor.register(c);
        engine.register(c);
      });

      const onResize = () => {
        editor.view.resize();
        editor.trigger('process');
      };
      onResize();
      window.addEventListener("resize", onResize);

      (async () => {
        if (initialData) {
          await editor.fromJSON(initialData);
        } else if (editor) {
          editor.clear();
        }
      })();

      return () => {
        window.removeEventListener("resize", onResize);
        editor.destroy();
        engine.destroy();
      }
    }
  }, []);

  React.useEffect(() => {
    if (engine && editor) {
      const editorCallback = async () => {
        await engine.abort();
        const json = editor.toJSON();
        if (await engine.process(json) === "success") {
          const computedData = await getNodesData(engine);
          setData(json, computedData);
          console.log(json);
        }
      };

      const editorEvents = "process nodecreated noderemoved connectioncreated connectionremoved";
      editor.on(editorEvents as any, editorCallback);

      const selectedCallback = async (node: Rete.Node) => {
        setSelectedId(node.id.toString());
      };

      editor.on("nodeselected", selectedCallback);

      return () => {
        editorEvents.split(" ").forEach((event) => {
          editor.events[event].splice(editor.events[event].indexOf(editorCallback), 1);
        });

        editor.events.nodeselected.splice(editor.events.nodeselected.indexOf(selectedCallback), 1);
      }
    }
  }, [engine, editor, setSelectedId, setData]);

  return <div ref={wrapperRef} />;
}

async function getNodesData(engine: Rete.Engine) {
  if (!engine.data) {
    return;
  }

  const ids = Object.getOwnPropertyNames(engine.data.nodes);
  
  const data: any = {};
  await Promise.all(ids
    .map(id => (engine.data!.nodes[id] as any).outputData ? engine.data!.nodes[id] : undefined)
    .filter(d => !!d)
    .map(d => (async () => {
      data[d!.id] = {
        ...(await (d as any).outputData),
        inputs: d!.inputs
      };
    })()));

  return data;
}

export default Graph;
