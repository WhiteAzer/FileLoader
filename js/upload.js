export default class Uploader {
    #openBtn;
    #input;
    #configs;

    constructor(selector, configs = {}) {
        this.#input = document.querySelector(selector);
        this.#configs = configs;
    }

    BtnCreater(selector) {
        this.#openBtn = document.createElement("button");

        this.#openBtn.classList.add("uploader-btn__open", "uploader-btn");
        this.#openBtn.textContent = "Открыть";

        this.#input.style.display = "none";
        this.#input.after(this.#openBtn);

        this.#inputClicker();
        this.#inputConfig();
    }

    PreviewPrinter() {
        const changeHandler = e => {
            const files = Array.from(e.target.files);

            files.forEach(file => {
                let reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onload = e => {
                    const imgsGroup = document.querySelector(".uploader-imgs");

                    const imgContainer = document.createElement("div");
                    imgContainer.classList.add("uploader-imgs__item-container");

                    let isSafari =  isSafari =  navigator.userAgent.includes('Safari') ? true : false;

                    if (file.type.includes("image") || (isSafari && file.type.includes("pdf"))) {
                        let img = document.createElement("img");
                        img.src = e.target.result;
                        img.classList.add("uploader-imgs__item");
                        imgContainer.append(img);
                        imgsGroup.append(imgContainer);
                    } else {
                        let div = document.createElement("div");
                        div.textContent = file.name.length < 15 ? file.name : file.name.slice(0, 14) + "...";
                        div.classList.add("uploader-imgs__item", "uploader-imgs__file");
                        imgContainer.append(div);
                        imgsGroup.append(imgContainer);
                    }
                }
            });
        }

        this.#input.addEventListener("change", changeHandler)
    }

    #inputConfig() {
        if (this.#configs.multiple) {
            this.#input.setAttribute("multiple", true);
        }

        if (this.#configs.accept && Array.isArray(this.#configs.accept)) {
            const accept = this.#configs.accept.join(", ");

            this.#input.setAttribute("accept", accept)
        }
    }

    #inputClicker() {
        const clickHandler = () => this.#input.click();

        this.#openBtn.addEventListener("click", clickHandler);
    }
}