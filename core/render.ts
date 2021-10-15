import React from 'react';
import ReactDOMServer from 'react-dom/server';

class Render {
    static async react(Component: any, Response: any, Data: any = {}) {
        var responseData = JSON.stringify(Data);
        Response.cookie('data', responseData);
        let cmp = React.createElement(Component, { ...Data });
        var render = ReactDOMServer.renderToString(cmp);
        let page = Component.name + '.js';
        let css = 'App' + '.css';
        return Response.render('app', { render, page, css });
    }
}

export { Render };
