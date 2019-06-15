import * as React from "react";
import * as Rete from "rete";

import { CSGOperationType } from "@models/graph";

class CSGOperationTypeControl extends Rete.Control {
  static component = ({ value, onChange }: any) => {
    const onLocalChange = React.useCallback((e: any) => {
      onChange(e.target.value);
    }, [onChange]);

    return (
      <select
        value={value}
        onChange={onLocalChange}
        onPointerMove={e => e.stopPropagation()}
      >
        <option key={CSGOperationType.subtract}>subtract</option>
        <option key={CSGOperationType.intersect}>intersect</option>
        <option key={CSGOperationType.union}>union</option>
      </select>
    );
  };

  public component: any;
  public props: any;

  constructor(public emitter: Rete.Emitter<any>, public key: string, public node: any, public readonly = false) {
    super(key);
    this.component = CSGOperationTypeControl.component;

    const initial = node.data[key] || 0;

    node.data[key] = initial;
    this.props = {
      readonly,
      value: initial,
      onChange: (v: any) => {
        this.setValue(v);
        this.emitter.trigger("process");
      }
    };
  }

  setValue(val: any) {
    this.props.value = val;
    this.putData(this.key, val);
    (this as any).update();
  }
}

export default CSGOperationTypeControl;
