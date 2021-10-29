import Cookies from 'js-cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import { isBrowser } from './isBrowser';

class View {
    static get() {
        return new Promise((resolve) => {
            if (isBrowser()) {
                let body: any = document.getElementById('body');
                const parseData: any = JSON.parse(body.textContent);
                resolve(parseData);
            }
        });
    }

    static init() {
        let container: any = document.getElementById('root');
        container.style.display = 'flex';
    }

    static render(Component: any, data) {
        let container: any = document.getElementById('root');
        // @ts-ignore
        let root = ReactDOM.hydrateRoot(container);
        const rootComponent: any = React.createElement(Component, data);
        root.render(rootComponent);
    }
}

export { View };
