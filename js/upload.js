export default class Uploader {
    #openBtn;
    #input;
    #configs;

    constructor(selector, configs = {}) {
        this.#input = document.querySelector(selector);
        this.#configs = configs;
    }

    btnCreater(selector) {
        this.#openBtn = document.createElement("button");

        this.#openBtn.classList.add("uploader-btn__open", "uploader-btn");
        this.#openBtn.textContent = "Открыть";

        this.#input.style.display = "none";
        this.#input.after(this.#openBtn);

        this.#inputClicker();
        this.#inputConfig();
        this.PreviewPrinter()
    }

    PreviewPrinter() {
        const changeHandler = e => {
            const files = Array.from(e.target.files);

            files.forEach(file => {
                let reader = new FileReader();

                reader.readAsDataURL(file);
                
                reader.onload = e => {
                    this.#input.insertAdjacentHTML("beforebegin", `<img src=${e.target.result} />`);
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