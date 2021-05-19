import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Health Check Controller';

const healthCheck = (req: Request, res: Response, _next: NextFunction) => {
    logging.info(NAMESPACE, 'Sample health check route called.');

    return res.status(200).json({
        status: 'OK'
    });
};

export default { healthCheck };
