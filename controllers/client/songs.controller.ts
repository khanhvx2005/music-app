import { Request, Response } from "express";
import Topic from "../../models/topics.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
// Lấy ra danh sách các bài hát
export const list = async (req: Request, res: Response) => {
    const topic = await Topic.findOne({
        slug: req.params.slugTopic,
        deleted: false,
        status: "active"
    })
    // console.log(topic);
    const songs = await Song.find({
        topicId: topic.id,
        deleted: false,
        status: "active"
    }).select("title avatar slug like singerId");
    for (let song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
            status: "active"
        })
        song["infoSinger"] = infoSinger;
    }
    // console.log(songs);
    res.render('client/pages/songs/list', { titlePage: "Danh sách bài hát", songs: songs })
}