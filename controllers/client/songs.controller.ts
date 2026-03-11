import { Request, Response } from "express";
import Topic from "../../models/topics.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
// Lấy ra danh sách các bài hát
export const list = async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        res.redirect('/');
    }
}
// Lấy chi tiết bài hát
export const detail = async (req: Request, res: Response) => {
    try {
        const song = await Song.findOne({
            slug: req.params.slugSong,
            deleted: false,
            status: "active"
        })
        // Lấy tên ca sĩ của bài hát
        const singer = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
            status: "active"
        }).select("fullName")
        // Lấy ra tên chủ đề của bài hát
        const topic = await Topic.findOne({
            _id: song.topicId,
            deleted: false,
            status: "active"
        }).select("title")
        res.render('client/pages/songs/detail', { titlePage: "Chi tiết bài hát", song: song, singer: singer, topic: topic })
    } catch (error) {
        res.redirect("/");
    }
}