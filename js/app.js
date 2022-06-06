import Uploader from "../js/upload.js";

const uploader = new Uploader("#input", {
    multiple: true,
    accept: [".jpg", ".HEIC", ".png", ".pdf"]
});

uploader.btnCreater();