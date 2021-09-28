import { Invoker } from "@core/invoker";
import React, { useEffect } from "react";

const App3 = (props) => {
  useEffect(() => {
    props.init();
    console.log(props);
  }, []);

  return (
    <div
      className={"flex items-center justify-center w-full h-screen bg-white"}
    >
      <h1 className={"text-4xl text-black"}>Views:</h1>
      <h1 className={"text-4xl text-black"}>{props.counter}</h1>
    </div>
  );
};

Invoker.get().then((serverData) => {
  Invoker.render(App3, serverData);
});

export default App3;
