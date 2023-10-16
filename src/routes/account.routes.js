import {Router} from 'express';
import {getAccount,createAccount} from '../modules/accounts/account.controller.js'

const router =  Router();

router.get('/accounts',getAccount)
router.post('/createAccount',createAccount)

export default router;
