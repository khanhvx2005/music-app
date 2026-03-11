import { Request, Response } from "express";
import Topic from "../../models/topics.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-songs";
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
        const favoriteSong = await FavoriteSong.findOne({
            _id: song.id
        })

        song["isFavoriteSong"] = favoriteSong ? true : false;
        res.render('client/pages/songs/detail', { titlePage: "Chi tiết bài hát", song: song, singer: singer, topic: topic })
    } catch (error) {
        res.redirect("/");
    }
}
// Tính năng like 1 bài hát
export const like = async (req: Request, res: Response) => {
    try {
        const idSong = req.params.idSong; // lấy id của bài hát
        const typeLike = req.params.typeLike;
        // Lấy ra số lượng like hiện tại của bài hát rồi cộng thêm 1
        const song = await Song.findOne({
            _id: idSong,
            deleted: false,
            status: "active"
        }).select("like");
        const newLike = typeLike === "like" ? song.like + 1 : song.like - 1;
        await Song.updateOne({
            _id: idSong
        }, {
            like: newLike
        })
        // like : [id_user_1 , id_user_2] 1 mảng chứa các user đăng nhập click nút like
        res.json({
            code: 200,
            message: "Thành công",
            like: newLike
        })
    } catch (error) {
        res.redirect('/')
    }
}
// Tính năng bài hát yêu thích
export const favorite = async (req: Request, res: Response) => {
    try {
        const idSong = req.params.idSong;
        const typeFavorite = req.params.typeFavorite;

        switch (typeFavorite) {
            case "favorite":
                const exitsFavoriteSong = await FavoriteSong.findOne({
                    _id: idSong
                })
                if (!exitsFavoriteSong) {
                    const record = new FavoriteSong({
                        // user_id : 
                        song_id: idSong
                    });
                    await record.save();

                }
                break;
            case "unfavorite":
                await FavoriteSong.deleteOne({ _id: idSong })
                break;
            default:
                break;
        }

        res.json({
            code: 200,
            message: "Thành công"
        })
    } catch (error) {
        res.redirect('/');
    }
}