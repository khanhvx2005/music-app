// APLayer
document.addEventListener('DOMContentLoaded', function () {
    const aplayer = document.getElementById('aplayer');
    if (aplayer) {
        const dataSong = JSON.parse(aplayer.getAttribute("data_song"));
        const dataSinger = JSON.parse(aplayer.getAttribute("data_singer"));
        const ap = new APlayer({
            container: aplayer,
            audio: [{
                name: dataSong.title,
                artist: dataSinger.fullName,
                url: dataSong.audio,
                cover: dataSong.avatar
            }],
            autoplay: true
        });
        const avatar = document.querySelector(".singer-detail .inner-avatar");
        ap.on('play', function () {
            avatar.style.animationPlayState = "running";
        })
        ap.on('pause', function () {
            avatar.style.animationPlayState = "paused";
        })
    }

});
// APLayer
// Tính năng like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const idSong = buttonLike.getAttribute("button-like");
        const isActive = buttonLike.classList.contains('active');
        const typeLike = isActive ? "dislike" : "like";
        const link = `/songs/like/${typeLike}/${idSong}`;

        fetch(link, { method: "PATCH" })
            .then(res => res.json())
            .then(data => {
                const span = buttonLike.querySelector("span");
                span.innerHTML = `${data.like} thích`;
                buttonLike.classList.toggle("active");
            });
    })
}
// end tính năng like