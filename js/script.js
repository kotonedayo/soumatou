window.addEventListener("load", () => {

    // ロゴにある16本の線を取得
    const lines = document.querySelectorAll(
        "#soumatou-logo svg line, #soumatou-logo svg path"
    );

    // まず全ての線を隠す
    lines.forEach((line) => {

        const length = line.getTotalLength();

        line.style.strokeDasharray = `${length} ${length}`;
        line.style.strokeDashoffset = length;

    });

    // 1秒後から、順番に線を描く
    setTimeout(() => {

        lines.forEach((line, index) => {

            const length = line.getTotalLength();

            // 1本ずつ描き始める時間をずらす
            setTimeout(() => {

                line.style.transition = "stroke-dashoffset 0.4s ease";
                line.style.strokeDashoffset = "0";

            }, index * 150);

        });

    }, 300);

    // ロゴにある8個の丸を取得
    const dots = document.querySelectorAll(
        "#soumatou-logo svg circle"
    );

    // 最初は丸を透明にする
    dots.forEach((dot) => {
        dot.style.opacity = "0";
    });

    // 線を描き終えたあと、丸を順番に表示する
    dots.forEach((dot, index) => {

        setTimeout(() => {

            dot.style.transition = "opacity 0.3s ease";
            dot.style.opacity = "1";

        }, 3200 + index * 100);

    });
});

// 夏の写真が画面に入ったら表示する

const memoryStart = document.querySelector(".memory-start");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

observer.observe(memoryStart);
// スクロールするとメニューバーを小さくする

const siteHeader = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        siteHeader.classList.add("is-small");
    } else {
        siteHeader.classList.remove("is-small");
    }
});
// ========================================
// 夏の記憶：何度でもアニメーション
// ========================================

// 2枚目と3枚目を取得
const summerScenes = document.querySelectorAll(
    ".summer-scene-2, .summer-scene-3, .summer-scene-4"
);

// 画面に入ったかどうかを監視
const summerSceneObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                // 画面に入ったら表示
                entry.target.classList.add("is-visible");
            } else {
                // 画面から出たらリセット
                entry.target.classList.remove("is-visible");
            }

        });
    },
    {
        threshold: 0.2
    }
);

// それぞれの写真を監視
summerScenes.forEach((scene) => {
    summerSceneObserver.observe(scene);
});
// 夏の記憶：1枚目をふわっと表示
const summerScene1 = document.querySelector(".summer-scene-1");

if (summerScene1) {
    const summerScene1Observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    summerScene1Observer.observe(summerScene1);
}
/* ========================================
   チェキ：下に通り過ぎると消える
======================================== */

const polaroids = document.querySelectorAll(".summer-polaroid");

function updatePolaroids() {
    polaroids.forEach((polaroid) => {
        const rect = polaroid.getBoundingClientRect();

        // チェキが画面の上端を通り過ぎたら消す
        if (rect.bottom < window.innerHeight * 0.5) {
            polaroid.classList.add("is-hidden");
        } else {
            polaroid.classList.remove("is-hidden");
        }
    });
}

window.addEventListener("scroll", updatePolaroids, { passive: true });
window.addEventListener("resize", updatePolaroids);

updatePolaroids();

/* ========================================
   03 / MIDORI
   写真の表示と背景色の変化
======================================== */

const greenSection = document.querySelector(".green-section");
const greenScenes = document.querySelectorAll(".green-scene");

if (greenSection && greenScenes.length > 0) {

    /* 写真が画面に入ったら表示 */
    const greenPhotoObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    greenScenes.forEach((scene) => {
        greenPhotoObserver.observe(scene);
    });


    /* スクロール位置に合わせて背景色を変える */
    function updateGreenBackground() {

    const sectionRect = greenSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // MIDORIから離れているときは処理しない
    if (
        sectionRect.bottom < 0 ||
        sectionRect.top > viewportHeight
    ) {
        return;
    }

    const screenCenter = viewportHeight * 0.5;

    let currentStage = 1;

    greenScenes.forEach((scene, index) => {

        const rect = scene.getBoundingClientRect();

        if (rect.top <= screenCenter) {
            currentStage = index + 1;
        }

    });

    // 背景の段階が変わったときだけ更新
    if (greenSection.dataset.stage !== String(currentStage)) {
        greenSection.dataset.stage = currentStage;
    }
}

    window.addEventListener(
        "scroll",
        updateGreenBackground,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateGreenBackground
    );

    updateGreenBackground();
}
/* ========================================
   04 / KURO：スクロールで演出を再生
======================================== */

const kuroElements = document.querySelectorAll(
    ".kuro-main-photo, .kuro-intro"
);

const kuroObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                // 画面に入ったら演出を再生
                entry.target.classList.add("is-visible");

            } else {
                // 画面から出たらリセット
                entry.target.classList.remove("is-visible");
            }

        });
    },
    {
        threshold: 0.2
    }
);

kuroElements.forEach((element) => {
    kuroObserver.observe(element);
});
/* ========================================
   KURO：2枚目の写真
======================================== */

const kuroScene2 = document.querySelector(".kuro-scene-2");

if (kuroScene2) {
    const kuroScene2Observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    kuroScene2Observer.observe(kuroScene2);
}
/* ========================================
   KURO → ORANGE
   下から満ちてくるオレンジの海
======================================== */

const orangeSea = document.querySelector(".orange-sea");
const orangeSeaFill = document.querySelector(".orange-sea-fill");

if (orangeSea && orangeSeaFill) {

    function updateOrangeSea() {

        const rect = orangeSea.getBoundingClientRect();

        const viewportHeight = window.innerHeight;

        // 海のエリアをどれだけスクロールしたか
        const scrollDistance = -rect.top;

        // 色が満ちるまでの距離
        const maxDistance =
            orangeSea.offsetHeight - viewportHeight;

        // 0〜1の範囲に収める
        const progress = Math.min(
            Math.max(scrollDistance / Math.max(maxDistance, 1), 0),
            1
        );

        // 下からオレンジが満ちてくる
        orangeSeaFill.style.transform =
            `scaleY(${progress})`;
    }

    window.addEventListener(
        "scroll",
        updateOrangeSea,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateOrangeSea
    );

    updateOrangeSea();
}
/* ========================================
   KURO → ORANGE
   スクロールで光がにじんでくる
======================================== */

const lightTransition = document.querySelector(".light-transition");
const lightGlow = document.querySelector(".light-glow");
const lightWarmth = document.querySelector(".light-warmth");

if (lightTransition && lightGlow && lightWarmth) {

    // 0〜1の範囲に収める
    const clamp = (value) => Math.min(Math.max(value, 0), 1);

    function updateLightTransition() {

    const rect = lightTransition.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // 画面から十分離れていたら更新しない
    if (
        rect.bottom < -viewportHeight ||
        rect.top > viewportHeight * 2
    ) {
        return;
    }

        // 演出エリア内でスクロールした割合
        const maxDistance =
            lightTransition.offsetHeight - viewportHeight;

        const progress = clamp(
            -rect.top / Math.max(maxDistance, 1)
        );

        // 前半：光がじわっと現れる
        const glowProgress = clamp(progress / 0.7);

        lightGlow.style.opacity = glowProgress;

        // 光がゆっくり広がる
        const scale = 0.6 + progress * 1.5;

        lightGlow.style.transform = `scale(${scale})`;

        // 後半：画面全体がオレンジに染まる
        const warmthProgress = clamp(
            (progress - 0.55) / 0.45
        );

        lightWarmth.style.opacity = warmthProgress;
    }

    window.addEventListener(
        "scroll",
        updateLightTransition,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateLightTransition
    );

    updateLightTransition();
}
/* ========================================
   05 / ORANGE
   光の中から浮かぶ記憶
======================================== */

const orangeScene1 = document.querySelector(".orange-scene-1");
const orangePhoto1 = orangeScene1?.querySelector("img");
const orangeWhiteout = orangeScene1?.querySelector(".orange-whiteout");

if (orangeScene1 && orangePhoto1 && orangeWhiteout) {

    const clampOrange = (value) =>
        Math.min(Math.max(value, 0), 1);

    const smoothOrange = (value) => {
        const t = clampOrange(value);
        return t * t * (3 - 2 * t);
    };

    function getOrangeProgress(scene) {

        const rect = scene.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        return clampOrange(
            (viewportHeight - rect.top) /
            (viewportHeight + rect.height)
        );
    }

    function updateOrangePhotos() {

    const rect = orangeScene1.getBoundingClientRect();

    // 画面から十分離れているときは計算しない
    if (
        rect.bottom < -window.innerHeight ||
        rect.top > window.innerHeight * 2
    ) {
        return;
    }

    const progress = getOrangeProgress(orangeScene1);

        /* 写真がゆっくり現れる */
        const appear = smoothOrange(
            (progress - 0.10) / 0.25
        );

        /* 後半で写真が消えていく */
        const disappear = 1 - smoothOrange(
            (progress - 0.65) / 0.25
        );

        orangePhoto1.style.opacity = appear * disappear;

        /* ぼかしが弱くなる */
        const blur = 12 - appear * 10;

        /* 明るさが落ち着く */
        const brightness = 1.45 - appear * 0.45;

        orangePhoto1.style.filter =
            `blur(${blur}px) brightness(${brightness})`;

        /* わずかに縮小する */
        const scale = 1.035 - appear * 0.035;

        orangePhoto1.style.transform =
            `scale(${scale})`;

        /* 最後に白い光が広がる */
        const whiteProgress = smoothOrange(
            (progress - 0.70) / 0.25
        );

        orangeWhiteout.style.opacity = whiteProgress;
    }

    window.addEventListener(
        "scroll",
        updateOrangePhotos,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateOrangePhotos
    );

    updateOrangePhotos();
}
/* ========================================
   05 / ORANGE
   オレンジから白へ戻る背景
======================================== */

const orangeSection = document.querySelector(".orange-section");

if (orangeSection) {

    // 0〜1の範囲に収める
    const clampOrangeBg = (value) =>
        Math.min(Math.max(value, 0), 1);

    // なめらかに変化させる
    const smoothOrangeBg = (value) => {
        const t = clampOrangeBg(value);
        return t * t * (3 - 2 * t);
    };

    // 2つの色を混ぜる
    function mixOrangeColor(color1, color2, progress) {

        const t = smoothOrangeBg(progress);

        const r = Math.round(
            color1[0] + (color2[0] - color1[0]) * t
        );

        const g = Math.round(
            color1[1] + (color2[1] - color1[1]) * t
        );

        const b = Math.round(
            color1[2] + (color2[2] - color1[2]) * t
        );

        return `rgb(${r}, ${g}, ${b})`;
    }

    function updateOrangeBackground() {

        const rect = orangeSection.getBoundingClientRect();

        // オレンジの章に入ってからのスクロール距離
        const scrollDistance = Math.max(-rect.top, 0);

        // 80vhかけて白っぽくなる
        const transitionDistance = window.innerHeight * 0.5;

        const progress = clampOrangeBg(
            scrollDistance / transitionDistance
        );

        // CSS変数の色をRGB配列に変換
function getRootColor(variableName) {

    const color = getComputedStyle(document.documentElement)
        .getPropertyValue(variableName)
        .trim();

    const hex = color.replace("#", "");

    return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16)
    ];
}

// オレンジ → クリーム → 白
const orange = getRootColor("--color-orange");
const cream = getRootColor("--color-orange-cream");
const white = getRootColor("--color-orange-white");
        let backgroundColor;

        if (progress < 0.5) {

            // 前半：オレンジ → クリーム
            backgroundColor = mixOrangeColor(
                orange,
                cream,
                progress * 2
            );

        } else {

            // 後半：クリーム → 白
            backgroundColor = mixOrangeColor(
                cream,
                white,
                (progress - 0.5) * 2
            );
        }

        orangeSection.style.backgroundColor = backgroundColor;
    }

    window.addEventListener(
        "scroll",
        updateOrangeBackground,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateOrangeBackground
    );

    updateOrangeBackground();
}

/* ========================================
   走馬灯再生中のスクロール制御
======================================== */

let flashbackScrollLocked = false;

function lockFlashbackScroll() {
    if (flashbackScrollLocked) return;

    flashbackScrollLocked = true;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
}

function unlockFlashbackScroll() {
    if (!flashbackScrollLocked) return;

    flashbackScrollLocked = false;

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
}

/* ========================================
   走馬灯：記憶の逆流
   何度でも自動再生
======================================== */

const flashbackSection = document.querySelector(".flashback-section");

const photoA = document.querySelector(".photo-a");
const photoB = document.querySelector(".photo-b");

if (flashbackSection && photoA && photoB) {

    /* ========================================
       再生する写真
    ======================================== */

    const flashbackImages = [
        "img/hyousi.jpg",

        // 校内の写真
        "img/memory01.JPG",
        "img/memory02.jpg",
        "img/memory03.jpg",
        "img/memory04.JPG",
        "img/memory05.jpg",
        "img/memory06.jpg",

        // 夏の写真
        "img/summer01.JPG",
        "img/summer03.jpg",
        "img/summer07.jpg",
        "img/summer06.jpg",

        // 緑の写真
        "img/midori01.jpg",
        "img/midori02.jpg",
        "img/midori03.jpg",

        // 記憶が混ざる
        "img/memory03.jpg",
        "img/memory05.jpg",
        "img/summer06.jpg",
        "img/midori03.jpg",
        "img/orange02.jpg",
        "img/memory02.jpg",
        "img/summer01.JPG",
        "img/hyousi.jpg"
    ];

    /* ========================================
       写真を事前に読み込む
    ======================================== */

    const preparedImages = flashbackImages.map((src) => {
        const image = new Image();
        image.src = src;
        return image;
    });

    const imagesReady = Promise.all(
        preparedImages.map(async (image) => {
            try {
                await image.decode();
                return true;
            } catch (error) {
                console.warn("画像を読み込めませんでした:", image.src);
                return false;
            }
        })
    );

    /* ========================================
       再生状態
    ======================================== */

    let flashbackStarted = false;
    let animationId = null;

    // 再生の世代を管理
    // 画像準備中に離れた場合の誤再生を防ぐ
    let playVersion = 0;

    /* ========================================
       走馬灯をリセット
    ======================================== */

    function resetFlashback() {

        unlockFlashbackScroll();

        flashbackStarted = false;

        playVersion++;

        if (animationId !== null) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        photoA.classList.remove(
    "is-active",
    "is-intro",
    "is-visible"
);

photoB.classList.remove(
    "is-active",
    "is-intro",
    "is-visible"
);

        flashbackSection.classList.remove("is-finished");
        resetFinalMemory();
    }

    /* ========================================
       走馬灯を再生
    ======================================== */

    async function playFlashback() {

    if (flashbackStarted) return;

    flashbackStarted = true;

    // 走馬灯セクションの位置を取得
    const sectionTop =
        window.scrollY +
        flashbackSection.getBoundingClientRect().top;

    // 先にスクロール位置を合わせる
    window.scrollTo(0, sectionTop);

    // 直後にスクロールをロック
    lockFlashbackScroll();

    // 位置を合わせた次の描画タイミングでスクロールを止める
    requestAnimationFrame(() => {
        if (flashbackStarted) {
            lockFlashbackScroll();
        }
    });

        const currentVersion = ++playVersion;

        // 写真の表示準備を待つ
        const readyResults = await imagesReady;

        // 待っている間にリセットされたら中止
        if (
            !flashbackStarted ||
            currentVersion !== playVersion
        ) {
            return;
        }

        // 読み込み失敗の写真は除外
        const playableImages = preparedImages.filter(
            (_, index) => readyResults[index]
        );

        if (playableImages.length === 0) {

    console.warn("走馬灯の画像を読み込めませんでした");

    flashbackSection.classList.add("is-finished");

    // スクロールを解除
    unlockFlashbackScroll();

    return;
}

        /* ========================================
           再生速度
        ======================================== */

        const slowDuration = 1600;
        const fastDuration = 200;

        const durations = playableImages.map((_, index) => {

    if (index === 0) return 1600;

    if (index === 1) return 850;

    return 200;
});

        /* ========================================
           写真の切り替え時刻
        ======================================== */

        const changeTimes = [0];

        durations.forEach((duration) => {
            changeTimes.push(
                changeTimes[changeTimes.length - 1] + duration
            );
        });

        const totalDuration =
            changeTimes[changeTimes.length - 1];

        let currentIndex = -1;
        let activePhoto = photoB;
        let startTime = null;

        /* ========================================
           写真を表示
        ======================================== */

        function showPhoto(index) {

    const nextPhoto =
        activePhoto === photoA ? photoB : photoA;

    nextPhoto.src = playableImages[index].src;

    // 前回の演出をリセット
    nextPhoto.classList.remove("is-intro", "is-visible");

    if (index === 0) {

        // 最初の写真だけ、ふわっと現れる準備
        nextPhoto.classList.add("is-intro");

        nextPhoto.classList.add("is-active");

        // ブラウザに初期状態を反映させる
        void nextPhoto.offsetWidth;

        requestAnimationFrame(() => {

            // リセット済みなら表示しない
            if (!flashbackStarted) return;

            nextPhoto.classList.add("is-visible");
        });

    } else {

        // 2枚目以降は一瞬で切り替える
        nextPhoto.classList.add("is-active");
    }

    // 前の写真を非表示
    activePhoto.classList.remove(
        "is-active",
        "is-intro",
        "is-visible"
    );

    activePhoto = nextPhoto;
}

        /* ========================================
           時間に合わせて切り替える
        ======================================== */

        function animate(timestamp) {

            if (
                !flashbackStarted ||
                currentVersion !== playVersion
            ) {
                return;
            }

            if (startTime === null) {
                startTime = timestamp;
            }

            const elapsed = timestamp - startTime;

            if (elapsed >= totalDuration) {

    flashbackSection.classList.add("is-finished");

    animationId = null;

    // 1秒間、白い静寂を見せる
    setTimeout(() => {

    // リセットされていたら最後の写真を表示しない
    if (
        !flashbackStarted ||
        currentVersion !== playVersion
    ) {
        return;
    }

    revealFinalMemory();

}, 1000);

    return;
}


            let nextIndex = 0;

            for (let i = 0; i < playableImages.length; i++) {
                if (elapsed >= changeTimes[i]) {
                    nextIndex = i;
                }
            }

            if (nextIndex !== currentIndex) {
                showPhoto(nextIndex);
                currentIndex = nextIndex;
            }

            animationId = requestAnimationFrame(animate);
        }

        animationId = requestAnimationFrame(animate);
    }

 /* ========================================
   走馬灯：一度だけ再生
======================================== */

const flashbackObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                // 初めて入ったときだけ再生
                playFlashback();

                // 監視を終了して、再生を繰り返さない
                flashbackObserver.unobserve(flashbackSection);

            }

        });

    },
    {
    threshold: 0,
    rootMargin: "0px 0px -40% 0px"
}
);

flashbackObserver.observe(flashbackSection);
}
/* ========================================
   FINAL：最後の記憶と赤いロゴ
======================================== */

const flashbackFinal = document.querySelector(".flashback-final");

const finalLogoLines = document.querySelectorAll(
    ".final-logo-strokes line:not(.final-logo-last-line), .final-logo-strokes path:not(.final-logo-blood)"
);

const finalLastLine = document.querySelector(".final-logo-last-line");

const finalLogoDots = document.querySelectorAll(
    ".final-logo-dots circle"
);

let finalAnimationTimers = [];

function clearFinalTimers() {

    finalAnimationTimers.forEach(clearTimeout);
    finalAnimationTimers = [];
}

function resetFinalMemory() {

    clearFinalTimers();
    document.querySelector(".final-footer")
    ?.classList.remove("is-ready");

    flashbackSection?.classList.remove("is-final-revealed");

    const allLines = [
    ...finalLogoLines,
    finalLastLine
].filter(Boolean);

    allLines.forEach((line) => {

        const length = line.getTotalLength();

        line.style.transition = "none";
        line.style.strokeDasharray = `${length} ${length}`;
        line.style.strokeDashoffset = length;
    });

    finalLogoDots.forEach((dot) => {
        dot.style.opacity = "0";
        dot.style.transition = "none";
    });
}
/* ========================================
   FINAL：赤い線を写真の下端まで伸ばす
======================================== */

function adjustFinalBloodLength() {

    const finalScreen = document.querySelector(".flashback-final");
    const finalSvg = document.querySelector(".flashback-final-logo svg");
    const lastLine = document.querySelector(".final-logo-last-line");

    if (!finalScreen || !finalSvg || !lastLine) return;

    // 写真の下端を取得
    const screenBottom = finalScreen.getBoundingClientRect().bottom;

    // SVGの位置と表示サイズを取得
    const svgRect = finalSvg.getBoundingClientRect();

    // SVGの座標を画面上のピクセルに変換する倍率
    const scale = svgRect.width / 105.83;

    // 写真の下端に対応するSVG座標
    const targetY = (screenBottom - svgRect.top) / scale;

    // 「灯」の最後の縦線を写真の下端まで伸ばす
    lastLine.setAttribute("y2", targetY);
}
function revealFinalMemory() {

    if (!flashbackFinal || !flashbackSection) return;

    adjustFinalBloodLength();
    resetFinalMemory();

    // 最後の写真をふわっと表示
    flashbackSection.classList.add("is-final-revealed");

    // 写真が浮かび上がってからロゴを描き始める
    const photoDelay = 2200;

    const lineDuration = 400;
    const lineInterval = 150;

    const lines = [
        ...finalLogoLines,
        finalLastLine
    ].filter(Boolean);

    lines.forEach((line, index) => {

    const timer = setTimeout(() => {

        // 最後の長い縦線だけ、ゆっくり描く
        const duration = line.classList.contains("final-logo-last-line")
            ? 3000
            : lineDuration;

        line.style.transition =
            `stroke-dashoffset ${duration}ms linear`;

        line.style.strokeDashoffset = "0";

    }, photoDelay + index * lineInterval);

    finalAnimationTimers.push(timer);
});
    const linesEnd =
    photoDelay +
    (lines.length - 1) * lineInterval +
    3000;

    finalLogoDots.forEach((dot, index) => {

        const timer = setTimeout(() => {

            dot.style.transition = "opacity 0.3s ease";
            dot.style.opacity = "1";

        }, linesEnd + index * 100);

        finalAnimationTimers.push(timer);
    });
    /* ========================================
   血の線が伸び終わったらフッターを解放
======================================== */

const finalFooter = document.querySelector(".final-footer");

const footerTimer = setTimeout(() => {

    // フッターを表示できる状態にする
    finalFooter?.classList.add("is-ready");

    // スクロール解禁
    unlockFlashbackScroll();

}, linesEnd);

finalAnimationTimers.push(footerTimer);
}
// 最初はロゴを非表示にする
if (flashbackFinal) {
    resetFinalMemory();
}
