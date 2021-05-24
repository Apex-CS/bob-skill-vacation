import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';

const NAMESPACE = 'Message Controller';

const message = (req: Request, res: Response, _next: NextFunction) => {
    logging.info(NAMESPACE, 'Message route called.');

    return res.status(200).json({
        type: 'message',
        message: 'YOU HAVE 0 PTO DAYS LEFT'
    });
};

export default { message };
