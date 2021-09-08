import React from "react";
import ReactDOMServer from "react-dom/server";

class Render {
  static options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: false, // The cookie only accessible by the web server
    signed: false, // Indicates if the cookie should be signed
  };

  static react(Component: any, Response: any, Data: any = {}) {
    Response.cookie("server", JSON.stringify(Data), this.options);
    var render = ReactDOMServer.renderToString(
      React.createElement(Component, { ...Data })
    );
    let page = Component.name + ".js";
    Response.render("app", { render, page });
  }
}

export { Render };
