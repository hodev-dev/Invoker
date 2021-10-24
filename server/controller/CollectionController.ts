import { Render } from '@core/render';
import { Request, Response } from 'express';

const CollectionController: ICollectionController = () => {
    const get = {};
    const post = {};
    const render = {};
    return { get, post, render };
};

interface ICollectionController {
    (): {
        get: {};
        post: {};
        render: {};
    };
}

export default CollectionController;
