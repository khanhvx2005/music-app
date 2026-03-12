import { Response, Request } from "express";
import FavoriteSong from "../../models/favorite-songs";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
// Lấy danh sách bài hát yêu thích
export const index = async (req: Request, res: Response) => {
    const favoriteSongs = await FavoriteSong.find({
        // userId
        deleted: false
    })
    for (const item of favoriteSongs) {
        const infoSong = await Song.findOne({
            _id: item.song_id,
            deleted: false,
            status: "active"
        })
        const infoSinger = await Singer.findOne({
            _id: infoSong.singerId,
            deleted: false,
            status: "active"
        })
        item["infoSong"] = infoSong;
        item["infoSinger"] = infoSinger;
    }
    res.render('client/pages/favorite-songs/index', { titlePage: "Trang bài hát yêu thích", favoriteSongs: favoriteSongs })
}