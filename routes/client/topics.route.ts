import { Response, Request, Router } from "express";
const router: Router = Router();
import Topic from "../../models/topics.model";
router.get('/', (req: Request, res: Response) => {
    res.render('client/pages/topics/index')
})
export const topicRoute: Router = router;