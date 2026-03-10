import { Router } from "express";
const router: Router = Router();
import Topic from "../../models/topics.model";
import * as controller from "../../controllers/client/topics.controller";
router.get('/', controller.topics)
export const topicRoute: Router = router;