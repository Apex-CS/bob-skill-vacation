import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
const fetchSheet = require('@flumens/fetch-onedrive-excel');

const file = '01MBSI4KQ4IMJ2O2WHS5E2PQIUQ3DYQWMJ';
const sheet = 'Hoja1';

const NAMESPACE = 'Message Controller';

const message = async (req: Request, res: Response, _next: NextFunction) => {
    logging.info(NAMESPACE, 'Message route called.');
    let hoja = await fetchSheet({ file, sheet });
    let pto = hoja.find((user: { mail: string; PTO: number }) => user.mail == req.body.email).PTO;
    return res.status(200).json({
        type: 'message',
        message: 'YOU HAVE ' + pto + ' PTO DAYS LEFT'
    });
};

export default { message };
