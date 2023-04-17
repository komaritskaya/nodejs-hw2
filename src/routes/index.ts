import express from 'express';
import usersRouter from './users';
import groupsRouter from './groups';

const router = express.Router();

router.use(usersRouter);
router.use(groupsRouter);

export default router;
