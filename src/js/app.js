import "../styles/style.scss"
import Uploader from "./upload.js";
import {
    initializeApp
} from "firebase/app";
import {
    getStorage, ref, uploadBytesResumable, getDownloadURL
} from "firebase/storage";


const firebaseConfig = {

    apiKey: "AIzaSyCZ8vIoawKf_dv6SwaFPwUnuU71xR0BvDs",

    authDomain: "fileloader-c16d6.firebaseapp.com",

    projectId: "fileloader-c16d6",

    storageBucket: "fileloader-c16d6.appspot.com",

    messagingSenderId: "1062029465074",

    appId: "1:1062029465074:web:966bb4dd01b56833ed076b"

};

const app = initializeApp(firebaseConfig);

const storage = getStorage();

const uploader = new Uploader("#input", {
    multiple: true, accept: [".jpg", ".docx", ".png", ".pdf"],
    onUpload(files, blocks) {
        files.forEach((file, i) => {
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", snapshot => {
                const percentage = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100) + "%";
                const block = blocks[i].querySelector(".uploader-imgs__item-info__uploaded-progress");

                block.textContent = percentage;
                block.style.width = percentage;
            }, er => {
                alert(er);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    files.forEach(file => {
                        if (decodeURI(downloadURL).includes(file.name)) {
                            let items = blocks.filter(item => item.closest(".uploader-imgs__item-container").dataset.fileName === file.name);

                            items.forEach(item => {
                                linkCreator(downloadURL, item);
                            })
                        }
                    });
                });
            });
        })
    }
});

function linkCreator(URL, elem) {
    let img = elem.previousElementSibling;
    let link = document.createElement("a");
    link.classList.add("uploader-imgs__item-link");
    link.href = URL;
    link.target = "_blank";
    link.innerHTML = img.outerHTML;
    img.replaceWith(link);
}

uploader.openBtnCreater();
uploader.PreviewPrinter();