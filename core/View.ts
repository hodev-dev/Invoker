import Cookies from 'js-cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import { isBrowser } from './isBrowser';

class View {
    static get() {
        return new Promise((resolve) => {
            if (isBrowser()) {
                resolve([]);
            }
        });
    }

    static init() {
        let container: any = document.getElementById('root');
        container.style.display = 'flex';
    }

    static render(Component: any, data) {
        if (isBrowser()) {
            let container: any = document.getElementById('root');
            const rawCookie: any = Cookies.get('data');
            const data: any = JSON.parse(rawCookie);
            // @ts-ignore
            let root = ReactDOM.hydrateRoot(container);
            const rootComponent: any = React.createElement(Component, {
                ...data,
                init: this.init,
            });
            root.render(rootComponent);
        }
    }
}

export { View };
