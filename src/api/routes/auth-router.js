import express from 'express';
import {postLogin, getMe} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middelwares/authentication.js';

const authRuoter = express.Router();

authRuoter.post('/login', postLogin);
authRuoter.get('/me', authenticateToken, getMe);

export default authRuoter;
