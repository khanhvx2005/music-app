import { topicRoute } from "./topics.route";
import { Express } from "express";
const clientRoutes = (app: Express): void => {
    app.use('/topics', topicRoute)
}
export default clientRoutes;