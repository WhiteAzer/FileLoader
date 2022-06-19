export default class Uploader {
    #openBtn;
    #removeBtn;
    #uploadBtn;
    #input;
    #configs;
    #fileList = [];
    #onUpload;

    constructor(selector, configs = {}) {
        this.#input = document.querySelector(selector);
        this.#configs = configs;
        this.#onUpload = configs.onUpload ?? noop;

        function noop() {};
    }

    #elementCreator(selector, classList, inner) {
        let elem = document.createElement(selector);
        if (classList) elem.classList.add(...classList);
        if (inner) elem.textContent = inner;

        return elem;
    }

    openBtnCreater(selector) {
        this.#openBtn = this.#elementCreator("button", ["uploader-btn__open", "uploader-btn"], "Открыть");

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
        const imgsGroup = this.#elementCreator("div", ["uploader-imgs"])
        document.querySelector(".uploader-title").after(imgsGroup);

        const changeHandler = e => {
            if(document.querySelector(".uploader-imgs__item-info__uploaded-progress")) {
                this.#fileList = [];
                document.querySelector(".uploader-imgs").innerHTML = "";
                document.querySelector(".uploader-title").textContent = "Загрузите ваши файлы";
            }

            let oldFilesCount = this.#fileList.length;
            this.#fileList = this.#fileList.concat(Array.from(e.target.files));

            this.#fileList.slice(oldFilesCount).forEach(file => {
                let reader = new FileReader();

                reader.onload = e => {
                    let text = file.name.length < 15 ? file.name : file.name.slice(0, 14) + "...";

                    let isSafari =  isSafari =  navigator.userAgent.includes('Safari') ? true : false;

                    if (file.type.includes("image") || (isSafari && file.type.includes("pdf"))) {
                        imgsGroup.insertAdjacentHTML('beforeend', `
                            <div class="uploader-imgs__item-container" data-file-name="${file.name}">
                                <img src="${e.target.result}" alt="${file.name}" class="uploader-imgs__item" />
                                <div class="uploader-imgs__item-info">
                                    <span>${text}</span>
                                    <span>${bytesToSize(file.size)}</span>
                                </div>
                            </div>
                        `);
                    } else {
                        imgsGroup.insertAdjacentHTML('beforeend', `
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
            if (!this.#uploadBtn) this.#uploadBtnCreator();
            if (!this.#removeBtn) this.#removeBtnCreater();
        }

        this.#input.addEventListener("change", changeHandler);

        function bytesToSize(bytes) {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (!bytes) return '0 Byte';
            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
         }
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

    #uploadBtnCreator() {
        this.#uploadBtn = this.#elementCreator("button", ["uploader-btn__upload", "uploader-btn"], "Загрузить")
        this.#openBtn.after(this.#uploadBtn);

        this.#uploadClicker();
    }
    
    #removeBtnCreater() {
        this.#removeBtn = this.#elementCreator("button", ["uploader-btn__remove", "uploader-btn"], "Удалить")
        this.#removeBtn.dataset.status = "inactive";

        this.#uploadBtn.after(this.#removeBtn);

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

                        let isFounded = false;
                        this.#fileList =  this.#fileList.filter(function (file) {
                                if (file.name === item.dataset.fileName && isFounded === false) {
                                    isFounded = true;
                                    return false;
                                } else {
                                    return true;
                                }
                        });
                        
                        item.classList.remove("selected");
                        item.classList.add("removing");
                        setTimeout(() => {
                            item.remove();
                        }, 500);
                    }
                });

                document.querySelector(".uploader-title").textContent = "Загрузите ваши файлы";

                if (!this.#fileList.length) {
                    this.#removeBtn.remove();
                    this.#removeBtn = null;

                    this.#uploadBtn.remove();
                    this.#uploadBtn = null;
                    return;
                }
    
                this.#removeBtn.textContent = "Удалить";
                this.#removeBtn.dataset.status = "inactive";
            }
        }

        this.#removeBtn.addEventListener("click", removeHandler);

        function removeAnimation()  {
            this.classList.toggle("selected");
        }
    }

    #uploadClicker() {
        const uploadHandler = () => {
            this.#removeBtn.remove();
            this.#removeBtn = null;

            this.#uploadBtn.remove();
            this.#uploadBtn = null;

            const info = document.querySelectorAll(".uploader-imgs__item-info");
            info.forEach(item => {
                item.innerHTML = "";
                item.classList.remove("uploader-imgs__item-info");
                item.classList.add("uploader-imgs__item-info__uploaded");
                item.innerHTML = `
                <div class="uploader-imgs__item-info__uploaded-progress">
                </div>
                `
            })

            this.#onUpload(this.#fileList, Array.from(info));
            document.querySelector(".uploader-title").textContent = "Нажмите на ваши файлы";
        }

        this.#uploadBtn.addEventListener("click", uploadHandler);
    }
}