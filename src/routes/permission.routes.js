import {Router} from 'express';

import {getPermission,createPermission} from '../modules/permission/permission.controller.js'

const router =  Router();

router.get('/permission',getPermission)
router.post('/createPermission',createPermission)

export default router;
