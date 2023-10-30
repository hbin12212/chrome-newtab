const newBookmarkForm = document.getElementById("bookmark-item-input-form");
const bookmarkItemList = document.getElementById("bookmark-list");

// <--북마크 리스트 초기 설정-->
let bookmarkList = [];
localStorage.getItem("bookmarkList")
    ? (bookmarkList = JSON.parse(localStorage.getItem("bookmarkList")))
    : localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));

// <--북마크 아이템 추가 버튼 초기 설정-->
let isAddBtnClick = false;
newBookmarkForm.style.display = "none";

// <--북마크 아이템 추가 버튼 Toggle-->
const newBookmarkToggle = () => {
    isAddBtnClick = !isAddBtnClick;
    isAddBtnClick ? (newBookmarkForm.style.display = "block") : (newBookmarkForm.style.display = "none");
};

// <--북마크 아이템 삭제-->
const deleteBookmarkItem = (id) => {
    const isDelete = window.confirm("정말 삭제하시겠습니까?");
    if (isDelete) {
        let bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
        let nowBookmarkList = bookmarkList.filter((elm) => elm.createAt !== id);
        localStorage.setItem("bookmarkList", JSON.stringify(nowBookmarkList));
        document.getElementById(`bookmark-item-${id}`).remove();
        return;
    }
};

//<--북마크 아이템 나타내기-->
const setBookmarkItem = (item) => {
    const bookmarkItem = document.createElement("div");
    bookmarkItem.classList.add("bookmark-item");
    bookmarkItem.id = `bookmark-item-${item.createAt}`;

    const bookmarkInfo = document.createElement("div");
    bookmarkInfo.classList.add("bookmark-info");

    const bookmarkUrl = document.createElement("a");
    bookmarkUrl.classList.add("bookmark-url");

    const urlIcon = document.createElement("div");
    urlIcon.classList.add("url-icon");

    const urlIconImg = document.createElement("img");

    const nameElement = document.createElement("div");
    nameElement.classList.add("url-name");

    const bookmarkDelBtn = document.createElement("div");
    bookmarkDelBtn.classList.add("del-btn");
    bookmarkDelBtn.textContent = "삭제";
    bookmarkDelBtn.addEventListener("click", () => {
        deleteBookmarkItem(item.createAt);
    });

    bookmarkUrl.href = item.url;
    urlIconImg.src = `https://www.google.com/s2/favicons?domain_url=${item.url}`;
    nameElement.textContent = item.name;

    bookmarkItem.appendChild(bookmarkInfo);
    bookmarkItem.appendChild(bookmarkDelBtn);
    bookmarkInfo.appendChild(bookmarkUrl);
    bookmarkUrl.appendChild(urlIcon);
    bookmarkUrl.appendChild(nameElement);
    urlIcon.appendChild(urlIconImg);

    bookmarkItemList.appendChild(bookmarkItem);
};

// <--북마크 리스트 요소 꺼내기-->
const setBookmarkList = () => {
    bookmarkList.forEach((item) => {
        setBookmarkItem(item);
    });
};

// <--북마크 아이템 추가-->
const addBookmarkItem = () => {
    let bookmarkList =[];
    if(localStorage.getItem("bookmarkList")){
        bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
    }
    let name = document.getElementById("new-bookmark-name-input").value;
    let url = document.getElementById("new-bookmark-url-input").value;
    let createAt = Date.now();
    bookmarkList.push({ name: name, url: url, createAt: createAt });
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    document.getElementById("new-bookmark-name-input").value = "";
    document.getElementById("new-bookmark-url-input").value = "";
    setBookmarkItem({ name: name, url: url, createAt: createAt });
    newBookmarkToggle();
};


setBookmarkList();
document.getElementById("bookmark-item-add-btn").addEventListener("click", newBookmarkToggle);
document.getElementById("add-btn").addEventListener("click", addBookmarkItem);
document.getElementById("cancel-btn").addEventListener("click", newBookmarkToggle);
