export default class Uploader {
    #openBtn;
    #removeBtn;
    #input;
    #configs;
    #fileList

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
            this.#fileList = Array.from(e.target.files);

            this.#fileList.forEach(file => {
                let reader = new FileReader();

                reader.onload = e => {
                    let text = file.name.length < 15 ? file.name : file.name.slice(0, 14) + "...";

                    let isSafari =  isSafari =  navigator.userAgent.includes('Safari') ? true : false;

                    if (file.type.includes("image") || (isSafari && file.type.includes("pdf"))) {
                        imgsGroup.insertAdjacentHTML('afterbegin', `
                            <div class="uploader-imgs__item-container" data-file-name="${file.name}">
                                <img src="${e.target.result}" alt="${file.name}" class="uploader-imgs__item" />
                                <div class="uploader-imgs__item-info">
                                    <span>${text}</span>
                                    <span>${bytesToSize(file.size)}</span>
                                </div>
                            </div>
                        `);
                    } else {
                        imgsGroup.insertAdjacentHTML('afterbegin', `
                            <div class="uploader-imgs__item-container" data-file-name="${file.name}">
                                <div class="uploader-imgs__item uploader-imgs__file">
                                    <span class="uploader-imgs__item-text">${text}</span>
                                </div>
                                <div class="uploader-imgs__item-info">
                                    <span>${bytesToSize(file.size)}</span>
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
        this.#removeBtn.dataset.status = "inactive";

        this.#openBtn.after(this.#removeBtn)

        this.#removeClicker();
    }

    #removeClicker() {
        const removeHandler = () => {
            let items = document.querySelectorAll(".uploader-imgs__item-container");

            items.forEach(item => {
                item.classList.toggle("cursor");
             });

             if(this.#removeBtn.dataset.status === "inactive") {
                items.forEach(item => {
                    item.addEventListener("click", removeAnimation);
                 });

                this.#removeBtn.textContent = "Готово";
                document.querySelector(".uploader-title").textContent = "Выберите файлы";
                this.#removeBtn.dataset.status = "active";
            } else {
                items.forEach(item => {
                    item.removeEventListener("click", removeAnimation);

                    if (item.classList.contains("selected")) {
                        this.#fileList =  this.#fileList.filter(file =>
                            file.name !== item.dataset.fileName
                        );
                        
                        item.classList.remove("selected");
                        item.classList.add("removing");
                        setTimeout(() => item.remove(), 500);
                    }
                });

                if (!this.#fileList.length) {
                    this.#removeBtn.remove();
                    this.#removeBtn = null;
                    return;
                }
    
                this.#removeBtn.textContent = "Удалить";
                document.querySelector(".uploader-title").textContent = "Загрузите ваши файлы";
                this.#removeBtn.dataset.status = "inactive";
            }
        }

        this.#removeBtn.addEventListener("click", removeHandler);

        function removeAnimation()  {
            this.classList.toggle("selected");
        }
    }
}

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (!bytes) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
 }