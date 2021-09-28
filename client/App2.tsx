import { Invoker } from "@core/invoker";
import React, { useEffect } from "react";
import "./css/index.css";
import Header from "./Header";

export const App2 = (props) => {
  useEffect(() => {
    props.init();
    console.log(props);
  }, [props]);

  const render = () => {
    return props.data.map((d, index) => {
      return (
        <h1
          className={
            "w-full h-32 bg-white shadow-xl border text-black justify-center items-center flex"
          }
          key={index}
        >
          <a className={"text-2xl text-black "} href={"/inside"}>
            {index}
          </a>
        </h1>
      );
    });
  };
  return (
    <div className={"w-full h-screen bg-green-700"}>
      <Header />
      <h1>page2</h1>
      <a href={"/test1"}>go to page1</a>
      {render()}
    </div>
  );
};

Invoker.get().then((serverData) => {
  serverData = { data: [...Array(100)] };
  Invoker.render(App2, serverData);
});
