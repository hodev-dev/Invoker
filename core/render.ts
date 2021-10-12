import React from 'react';
import ReactDOMServer from 'react-dom/server';

class Render {
    static async react(Component: any, Response: any, Data: any = {}) {
        // var stringify = JSON.stringify(Data);
        var render = ReactDOMServer.renderToString(
            React.createElement(Component, { ...Data }),
        );
        let page = Component.name + '.js';
        let css = 'App' + '.css';
        Response.render('app', { render, page, css });
    }
}

export { Render };
