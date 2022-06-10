export default class Uploader {
    #openBtn;
    #removeBtn;
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
        this.#input.insertAdjacentHTML("afterend", `
            <div class="uploader-btn__group">
            </div>
        `);
        this.#input.nextElementSibling.append(this.#openBtn);

        this.#inputClicker();
        this.#inputConfig();
    }

    PreviewPrinter() {
        const imgsGroup = document.createElement("div");
        imgsGroup.classList.add("uploader-imgs");
        document.querySelector(".uploader-title").after(imgsGroup);

        const changeHandler = e => {
            const files = Array.from(e.target.files);

            files.forEach(file => {
                let reader = new FileReader();

                reader.onload = e => {
                    let isSafari =  isSafari =  navigator.userAgent.includes('Safari') ? true : false;

                    if (file.type.includes("image") || (isSafari && file.type.includes("pdf"))) {
                        imgsGroup.insertAdjacentHTML('afterbegin', `
                            <div class="uploader-imgs__item-container">
                                <img src="${e.target.result}" alt="${file.name}" class="uploader-imgs__item" />
                            </div>
                        `);
                    } else {
                        let text = file.name.length < 15 ? file.name : file.name.slice(0, 14) + "...";

                        imgsGroup.insertAdjacentHTML('afterbegin', `
                            <div class="uploader-imgs__item-container">
                                <div class="uploader-imgs__item uploader-imgs__file">
                                    <p class="uploader-imgs__item-text">${text}</p>
                                </div>
                            </div>
                        `);
                    }
                }

                reader.readAsDataURL(file);
            });
            if (!this.#removeBtn) this.#removeBtnCreater();
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
    
    #removeBtnCreater() {
        this.#removeBtn = document.createElement("button");
        this.#removeBtn.classList.add("uploader-btn__remove", "uploader-btn");
        this.#removeBtn.textContent = "Удалить";
        this.#removeBtn.setAttribute("status", "inactive");

        this.#openBtn.after(this.#removeBtn)

        this.#removeClicker();
    }

    #removeClicker() {
        const clickHandler = () => {
            let items = document.querySelectorAll(".uploader-imgs__item-container");

            items.forEach(item => {
                item.classList.toggle("cursor");
             });

            if(this.#removeBtn.getAttribute("status") === "inactive") {
                items.forEach(item => {
                    item.addEventListener("click", removeAnimation);
                 });

                this.#removeBtn.textContent = "Готово";
                this.#removeBtn.setAttribute("status", "active");
            } else {
                items.forEach(item => {
                    item.removeEventListener("click", removeAnimation);

                    if (item.classList.contains("selected")) {
                        item.remove();
                    }
                });
    
                this.#removeBtn.textContent = "Удалить";
                this.#removeBtn.setAttribute("status", "inactive");
            }
        }

        this.#removeBtn.addEventListener("click", clickHandler);

        function removeAnimation()  {
            this.classList.toggle("selected");
        }
    }
}