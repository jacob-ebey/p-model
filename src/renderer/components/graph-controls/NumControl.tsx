import * as React from "react";
import * as Rete from "rete";
import * as mathjs from "mathjs";

class NumControl extends Rete.Control {
  static component = ({ value, onChange }: any) => {
    const [localVal, setLocalVal] = React.useState(value);

    const onLocalChange = React.useCallback((e: any) => {
      setLocalVal(e.target.value);

      try {
        (mathjs as any).evaluate(e.target.value);
        onChange(e.target.value);
      } catch (e) { }
    }, [setLocalVal]);

    return (
      <input
        value={localVal}
        onChange={onLocalChange}
        onPointerMove={e => e.stopPropagation()}
      />
    );
  };

  public component: any;
  public props: any;

  constructor(public emitter: Rete.Emitter<any>, public key: string, public node: any, public readonly = false) {
    super(key);
    this.component = NumControl.component;

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

export default NumControl;
