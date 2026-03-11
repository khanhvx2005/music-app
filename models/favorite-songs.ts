import mongoose from "mongoose";

const favoriteSongSchema = new mongoose.Schema(
    {
        user_id: String,
        song_id: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    }, { timestamps: true }
);
const FavoriteSong = mongoose.model('FavoriteSong', favoriteSongSchema, "favorite-songs");
export default FavoriteSong;