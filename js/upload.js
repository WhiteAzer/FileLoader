export default class Uploader {
    #openBtn;
    #input;

    constructor(selector) {
        this.#input = document.getElementById(selector);
    }

    btnCreater(selector) {
        this.#openBtn = document.createElement("button");

        this.#openBtn.classList.add("uploader-btn__open", "uploader-btn");
        this.#openBtn.textContent = "Открыть";

        this.#input.style.display = "none";
        this.#input.after(this.#openBtn);

        this.#inputClicker();
    }

    #inputClicker() {
        this.#openBtn.addEventListener("click", () => this.#input.click());
    }
}