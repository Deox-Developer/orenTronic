import {Router} from 'express';

import {getCatalog,createCatalog} from '../modules/catalog/catalog.controller.js'

const router =  Router();

router.get('/catalog',getCatalog)
router.post('/createCatalog',createCatalog)

export default router;
