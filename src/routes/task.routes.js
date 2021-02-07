import {Router} from 'express'
import * as taskCtrl from '../controllers/task.controller'

const router = Router();

router.post('/', taskCtrl.sendNewTasks);

router.get('/', taskCtrl.findAllTaks);

router.get('/done', taskCtrl.findAllDoneTasks);

router.get('/:id', taskCtrl.findOneTask)

router.delete('/:id', taskCtrl.deleteTask);

router.put('/:id', taskCtrl.updateTask);

export default router;