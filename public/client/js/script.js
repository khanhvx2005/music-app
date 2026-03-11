
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