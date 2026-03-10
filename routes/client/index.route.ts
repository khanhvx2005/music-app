import { topicRoute } from "./topics.route";
import { songsRoute } from "./songs.route";
import { Express } from "express";
const clientRoutes = (app: Express): void => {
    app.use('/topics', topicRoute)
    app.use('/songs', songsRoute)

}
export default clientRoutes;