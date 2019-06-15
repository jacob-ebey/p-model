import * as React from "react";
import ConsoleCom from "react-console-component";
import 'react-console-component/main.css';

const Console: React.FC = () => {
  const consoleRef = React.useRef<ConsoleCom>(null);

  const onCommand = React.useCallback((text: string) => {
    console.log(text);
    consoleRef.current && consoleRef.current.return();
  }, []);

  const onComplete = React.useCallback((words: string[], curr: number, promptText: string) => {
    return words.map(w => w + "1");
  }, []);

  return (
    <ConsoleCom
      ref={consoleRef}
      autofocus={true}  
      handler={onCommand}
      complete={onComplete}
    />
  );
}

export default Console;
