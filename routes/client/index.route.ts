import { topicRoute } from "./topics.route";
import { songsRoute } from "./songs.route";
import { Express } from "express";
import { favoriteSongRoute } from "./favorite-song.route";
const clientRoutes = (app: Express): void => {
    app.use('/topics', topicRoute)
    app.use('/songs', songsRoute)
    app.use('/favorite-songs', favoriteSongRoute)
}
export default clientRoutes;