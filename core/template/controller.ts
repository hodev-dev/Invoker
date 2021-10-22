import { Render } from '@core/render';
import { Request, Response } from 'express';

const CONTROLLER: ICONTROLLER = () => {
    const get = {};
    const post = {};
    const render = {};
    return { get, post, render };
};

interface ICONTROLLER {
    (): {
        get: {};
        post: {};
        render: {};
    };
}

export default CONTROLLER;
