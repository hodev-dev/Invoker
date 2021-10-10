import { Render } from '@core/render';
import { Request, Response } from 'express';

const CONTROLLER: ICONTROLLER = () => {
    return {};
};

interface ICONTROLLER {
    (): {};
}

export default CONTROLLER;
