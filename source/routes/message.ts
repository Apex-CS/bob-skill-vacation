import express, { Router } from 'express';
import controller from '../controllers/message';

const router = express.Router();

router.post('/', controller.message);

export = router;
