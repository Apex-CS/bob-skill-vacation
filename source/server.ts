import http from 'http';
import express, { Application, Request, Response, NextFunction } from 'express';
import logging from './config/logging';
import config from './config/config';
import healthCheck from './routes/healthCheck';
import message from './routes/message';

const NAMESPACE = 'Server';
const router: Application = express();

/** Logging request */
router.use((req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

/** Parse req */
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** API Rules */
router.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Header', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/healthCheck', healthCheck);
router.use('/message', message);

/** Error handling */
router.use((req: Request, res: Response, _next: NextFunction) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

/** Create Server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server is running on ${config.server.hostname}:${config.server.port}`);
});
