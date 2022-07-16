const videoEl = document.getElementById("my-video");
const mediaSource = new MediaSource();
const sourceUrl = URL.createObjectURL(mediaSource);
videoEl.src = sourceUrl;
let videoSource;
let segCheck;
let currentSegmentIndex = 0;
let lastTime;

// get mainfest file
const xmlData = await fetch("MANIFEST_URL_FROM_SERVER")
    .then((r) => r.text())
    .then((xml) => parser.parseFromString(xml, "text/xml", 0));

// extract data from manifest file
const file = xmlData.querySelectorAll("BaseURL")[0].textContent.toString();
const rep = xmlData.querySelectorAll("Representation");
const type = rep[0].getAttribute("mimeType");
const codecs = rep[0].getAttribute("codecs");
const width = rep[0].getAttribute("width");
const height = rep[0].getAttribute("height");
const bandwidth = rep[0].getAttribute("bandwidth");
const ini = xmlData.querySelectorAll("Initialization");
const initialization = ini[0].getAttribute("range");
const segments = xmlData.querySelectorAll("SegmentURL");
const segList = xmlData.querySelectorAll("SegmentList");
let segDuration = segList[0].getAttribute("duration");

// wait for media source to ready
mediaSource.addEventListener("sourceopen", e => {
    try {
        videoSource = mediaSource.addSourceBuffer("video/mp4");
        initVideo(initialization, file);
    } catch (e) {
        log("Exception calling addSourceBuffer for video", e);
        return;
    }
});

// init the video with first segment
async function initVideo(range, url) {
    const segmentVideoBuffer = await fetch(url, {
        header: `Range: "bytes=${range}"`,
    });
    B.appendBuffer(new Uint8Array(segmentVideoBuffer));
    videoEl.addEventListener("timeupdate", playSegment);
}

// play all segment one by one if necessary
async function playSegment() {
    if (index < segments.length && videoEl.currentTime - lastTime >= segCheck) {
        const range = segments[index].getAttribute("mediaRange").toString();
        segCheck = (timeToDownload(range) * 0.8).toFixed(3);
        const segmentVideoBuffer = await fetch(url, {
            header: `Range: "bytes=${range}"`,
        });
        videoSource.appendBuffer(new Uint8Array(segmentVideoBuffer));
        segCheck = (timeToDownload(range) * 0.8).toFixed(3);
        lastTime = videoElement.currentTime;
    }
}

// Helper
function timeToDownload(range) {
    const [start, end] = range.split("-");
    return ((end - start) * 8) / bandwidth;
}