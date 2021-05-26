import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
const { description } = require('../../package.json');

const NAMESPACE = 'Health Check Controller';

const healthCheck = (req: Request, res: Response, _next: NextFunction) => {
    logging.info(NAMESPACE, 'Health check route called.');

    return res.status(200).json({
        status: 'OK',
        description: description,
        subscriptions: ['ON_MESSAGE']
    });
};

export default { healthCheck };
