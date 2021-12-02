import React from 'react';
import ReactDOMServer from 'react-dom/server';
let qs = require('qs');

class Render {
    static async react(Component: any, Response: any, Data: any = {}) {
        let body = JSON.stringify(Data);
        let cmp = React.createElement(Component, Data);
        let render = ReactDOMServer.renderToString(cmp);
        let page = Component.name + '.js';
        let css = 'App' + '.css';
        return Response.render('app', { render, page, css, body });
    }

    static async redirect(path: any, Response: any, Data: any = {}) {
        return Response.redirect(path +'?'+ qs.stringify((Data)));
    }
}

export { Render };
