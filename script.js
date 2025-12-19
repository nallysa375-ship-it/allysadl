document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // LIGHTBOX (IMAGE + VIDEO)
    // ===============================
    const box = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    const video = document.getElementById("lightbox-video");

    window.openImage = function (src) {
        if (!box || !img) return;

        if (video) {
            video.pause();
            video.src = "";
            video.style.display = "none";
        }

        img.src = src;
        img.style.display = "block";
        box.style.display = "flex";
    };

    window.openVideo = function (src) {
        if (!box || !video) return;

        if (img) {
            img.src = "";
            img.style.display = "none";
        }

        video.src = src;
        video.style.display = "block";
        video.play().catch(() => { });
        box.style.display = "flex";
    };

    window.closeLightbox = function () {
        if (video) {
            video.pause();
            video.src = "";
            video.style.display = "none";
        }
        if (img) {
            img.src = "";
            img.style.display = "none";
        }
        if (box) box.style.display = "none";
    };

    // ===============================
    // IMAGES GRID
    // ===============================
    const gallery = document.getElementById("polaroid-gallery");
    if (gallery) {
        const images = [
            { src: "gallery1.jpg", caption: "(つ > - • )う" },
            { src: "gallery2.jpg", caption: " > _ <" },
            { src: "gallery3.jpg", caption: "𝓅𝑒𝑒𝓅𝓈!" },
            { src: "gallery4.jpg", caption: "𝒾𝓃𝓉ℯ𝓇𝓃𝓈𝒽𝒾𝓅" },
            { src: "gallery5.jpg", caption: "𝓇𝒶𝓎𝒶 !" },
            { src: "gallery7.jpg", caption: "☆  _  ☆" },
            { src: "gallery8.jpg", caption: "𝓃ℯ𝓀𝓃𝒶" },
            { src: "gallery9.jpg", caption: "𝒷𝓇ℴ𝓌𝓃𝒾ℯ !" },
            { src: "gallery10.jpg", caption: "૮ ˶´ ᵕˋ ˶ა!" },
            { src: "gallery11.jpg", caption: "𝓇𝒶𝓌𝓇 !" },
            { src: "gallery12.jpg", caption: "𝒸ℯ𝓁ℯ𝒷𝓇𝒶𝓉𝒾ℴ𝓃𝓈 !" },
            { src: "gallery13.jpg", caption: "𝓁ℴ𝓋ℯ" },
            { src: "gallery14.jpg", caption: "⋆｡ ﾟ☾ ﾟ｡⋆" },
            { src: "gallery15.jpg", caption: "𝒜𝒜𝒜𝒜𝒜𝒜𝒜 !" },
            { src: "gallery16.jpg", caption: "𝒹𝒾𝓃𝓃ℯ𝓇" },
            { src: "gallery17.jpg", caption: "𝓈𝒽ℴ𝓇𝓉 𝓉𝓇𝒾𝓅 !" },
            { src: "gallery18.jpg", caption: "𝒾𝓀ℯ𝒶 !" },
            { src: "gallery19.jpg", caption: "𝓈ℯ𝓁𝓊𝓃𝒶" },
            { src: "gallery21.jpg", caption: "૮₍ • ﻌ• ₎ა ♡" },
            { src: "gallery22.jpg", caption: "ೀ⋆｡˚✮⋆˙" },
            { src: "gallery23.jpg", caption: "𝓀𝓁" },
            { src: "gallery24.jpg", caption: "𝓁ℯ𝑔ℴ-𝓉𝒾𝓂ℯ!" },
            { src: "gallery25.jpg", caption: "𝒜𝒢𝑀" },
            { src: "gallery26.jpg", caption: "☆*.+" },
            { src: "gallery27.jpg", caption: "𝓰𝓇ℯℯ𝓃𝒾𝓍 !" },
            { src: "gallery29.jpg", caption: "𝒽𝒾𝓰𝒽𝓈𝒸𝒽ℴℴ𝓁" },
            { src: "gallery30.jpg", caption: "𝒾𝒷𝓊 & 𝒶𝓎𝒶𝒽" },
            { src: "gallery31.jpg", caption: "𝒻𝒶𝓂𝒾𝓁𝒾𝒶 !" },
            { src: "gallery32.jpg", caption: "𝒷𝒶𝒷𝒶𝒽 !" },
            { src: "gallery33.jpg", caption: "𝒶𝒻𝓉ℯ𝓇 𝓈𝒸𝒽ℴℴ𝓁 !" },
            { src: "gallery34.jpg", caption: ">•<" },
            { src: "gallery39.jpg", caption: "𝓊𝓃𝒸𝓁ℯ𝓈 !" }
        ];

        gallery.innerHTML = "";
        images.forEach((item) => {
            const card = document.createElement("div");
            card.className = "polaroid";
            card.innerHTML = `
        <img src="${item.src}" alt="${item.caption}">
        <span>${item.caption}</span>
      `;
            card.onclick = () => window.openImage(item.src);
            gallery.appendChild(card);
        });
    }

    // ===============================
    // VIDEOS (BOTTOM, CENTER, BIG)
    // ===============================
    const videoWrap = document.getElementById("video-gallery");
    if (videoWrap) {
        const videos = [
            { src: "gallery20.mp4", caption: "𝓂𝒶𝓇𝒸𝒽𝒾𝓃𝓰 𝒷𝒶𝓃𝒹" },
            { src: "secvid.mp4", caption: "𝓋ℯ𝓁ℴ𝒸𝒾𝓉𝓎 !" }
        ];

        videoWrap.innerHTML = "";
        videos.forEach((v) => {
            const card = document.createElement("div");
            card.className = "polaroid video-polaroid";
            card.innerHTML = `
        <div class="video-thumb">
          <video src="${v.src}" muted playsinline preload="metadata"></video>
        </div>
        <span>${v.caption}</span>
      `;
            card.onclick = () => window.openVideo(v.src);
            videoWrap.appendChild(card);
        });
    }

    const music = document.getElementById("bg-music");
    const btn = document.getElementById("music-btn");

    if (!music || !btn) return;

    // ===============================
    // RESTORE MUSIC STATE
    // ===============================
    const isPlaying = localStorage.getItem("music-playing");
    const savedTime = localStorage.getItem("music-time");

    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    if (isPlaying === "true") {
        music.play().then(() => {
            btn.classList.remove("paused");
        }).catch(() => {
            btn.classList.add("paused");
        });
    }

    // ===============================
    // BUTTON CONTROL
    // ===============================
    btn.addEventListener("click", () => {
        if (music.paused) {
            music.play().then(() => {
                btn.classList.remove("paused");
                localStorage.setItem("music-playing", "true");
            }).catch(() => { });
        } else {
            music.pause();
            btn.classList.add("paused");
            localStorage.setItem("music-playing", "false");
        }
    });

    // ===============================
    // SAVE TIME CONTINUOUSLY
    // ===============================
    setInterval(() => {
        if (!music.paused) {
            localStorage.setItem("music-time", music.currentTime);
        }
    }, 1000);

});
// ===============================
// DATE & TIME (LIVE)
// ===============================
function updateDateTime() {
    const el = document.getElementById("date-time");
    if (!el) return;

    const now = new Date();

    const optionsDate = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const optionsTime = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };

    const date = now.toLocaleDateString("en-GB", optionsDate);
    const time = now.toLocaleTimeString("en-GB", optionsTime);

    el.innerHTML = `
        <b>Date:</b> ${date}<br>
        <b>Time:</b> ${time}
    `;
}

setInterval(updateDateTime, 1000);
updateDateTime();