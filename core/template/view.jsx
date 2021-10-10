import { Invoker } from "@core/invoker";
import React, { useEffect } from "react";

export const VIEW_NAME = () => {
  useEffect(() => {
    props.init();
  }, [props]);

  return (
    <div divsuppressHydrationWarning={true}>
        // render
    </div>
  );
};

Invoker.get().then((serverData) => {
  Invoker.render(VIEW_NAME, serverData);
});
