import { Request, Response, Router } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { groupSchema, validateSchema } from '../validators/groups-validators';
import { GroupRequestSchema } from '../types';
import GroupsController from '../controllers/groups-controller';
import GroupsModel from '../models/groups-model';
import GroupsService from '../services/groups-service';

const router = Router();
const groupsService = new GroupsService(GroupsModel);
const groupsController = new GroupsController(groupsService);

router.get(
    '/groups',
    async (req: Request, res: Response) => {
        const groups = await groupsController.getGroups();
        res.status(200).json(groups);
    }
);

router.get(
    '/groups/:id',
    async (req: Request, res: Response) => {
        const {id} = req.params;
        const group = await groupsController.getGroupById(id);

        if (!group) {
            res.status(404).json('404 | not found');
        } else {
            res.status(200).json(group);
        }
    }
);

router.post(
    '/groups',
    validateSchema(groupSchema),
    async (req: ValidatedRequest<GroupRequestSchema>, res: Response) => {
        const { name, permissions } = req.body;
        const newGroup = await groupsController.createGroup({ name, permissions });

        res.status(201).json(newGroup)
    }
);

router.put(
    '/groups/:id',
    validateSchema(groupSchema),
    async (req: ValidatedRequest<GroupRequestSchema>, res: Response) => {
        const { name, permissions } = req.body;
        const { id } = req.params;
        const updatedGroup = await groupsController.updateGroup(id, { name, permissions });

        if (!updatedGroup){
            res.status(404).json('404 | not found');
        } else {
            res.status(200).json(updatedGroup);
        }
    }
);

router.delete(
    '/groups/:id',
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const isDeleted = await groupsController.deleteGroup(id);
        
        if(!isDeleted) {
            res.status(404).json('404 | not found');
        } else {
            res.status(200).json(`Group with ID ${id} removed from DB`);
        }
    }
);

export default router;

