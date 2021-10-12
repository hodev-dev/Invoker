import Cookies from 'js-cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import { isBrowser } from './isBrowser';

class Invoker {
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
        let container: any = document.getElementById('root');
        // @ts-ignore
        const root = ReactDOM.createRoot(container);
        console.log(data);
        root.render(
            React.createElement(Component, {
                ...data,
                init: this.init,
            }),
        );
    }
}

export { Invoker };
