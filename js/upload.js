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

                console.log(file.type)

                reader.readAsDataURL(file);
                const fileImgs = {
                    "application/pdf": "1.jpg",
                };

                reader.onload = e => {
                    let fileURL =  /*navigator.userAgent.includes('Safari') ? e.target.result :*/ fileImgs[file.type];

                    document.querySelector(".uploader-imgs").insertAdjacentHTML("afterbegin", `<img src=${fileURL} class="uploader-imgs__item"/>`);
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