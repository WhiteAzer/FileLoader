import Uploader from "../js/upload.js";

const uploader = new Uploader("#input", {
    multiple: true,
    accept: [".jpg", ".docx", ".png", ".pdf"]
});

uploader.BtnCreater();
uploader.PreviewPrinter();