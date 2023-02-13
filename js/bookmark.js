const $newBookmarkForm = document.getElementById("bookmark-item-input-form");
const $bookmarkItemList = document.getElementById("bookmark-list");

// <--북마크 리스트 초기 설정-->
let bookmarkList = [];
localStorage.getItem("bookmarkList")
    ? (bookmarkList = JSON.parse(localStorage.getItem("bookmarkList")))
    : localStorage.setItem("bookmarkList", bookmarkList);

// <--북마크 아이템 추가 버튼 초기 설정-->
let isAddBtnClick = false;
$newBookmarkForm.style.display = "none";

// <--북마크 아이템 추가 버튼 Toggle-->
const newBookmarkToggle = () => {
    isAddBtnClick = !isAddBtnClick;
    isAddBtnClick ? ($newBookmarkForm.style.display = "block") : ($newBookmarkForm.style.display = "none");
};

//<--북마크 아이템 -->
const setBookmarkItem = (item) => {
    const $bookmarkItem = document.createElement("div");
    $bookmarkItem.classList.add("bookmark-item");
    $bookmarkItem.id = `bookmark-item-${item.createAt}`;

    const $bookmarkName = document.createElement("div");
    $bookmarkName.classList.add("bookmark-name");

    const $bookmarkUrl = document.createElement("a");
    $bookmarkUrl.classList.add("bookmark-url");

    const $urlIcon = document.createElement("div");
    $urlIcon.classList.add("url-icon");

    const $urlIconImg = document.createElement("img");

    const $urlName = document.createElement("div");
    $urlName.classList.add("url-name");

    const $bookmarkDelBtn = document.createElement("div");
    $bookmarkDelBtn.classList.add("del-btn");
    $bookmarkDelBtn.innerText = "삭제";
    $bookmarkDelBtn.addEventListener("click", () => {
        deleteBookmarkItem(item.createAt);
    });

    $bookmarkUrl.href = item.url;
    $urlIconImg.src = `https://www.google.com/s2/favicons?domain_url=${item.url}`;
    $urlName.innerText = item.name;

    $bookmarkItem.appendChild($bookmarkName);
    $bookmarkItem.appendChild($bookmarkDelBtn);
    $bookmarkName.appendChild($bookmarkUrl);
    $bookmarkUrl.appendChild($urlIcon);
    $urlIcon.appendChild($urlIconImg);

    $bookmarkUrl.appendChild($urlName);
    $bookmarkItemList.appendChild($bookmarkItem);
};

// <--북마크 리스트 표시-->
const setBookmarkList = () => {
    bookmarkList.forEach((item) => {
        setBookmarkItem(item);
    });
};

// <--북마크 아이템 추가-->
const addBookmarkItem = () => {
    let bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
    let urlName = document.getElementById("new-bookmark-url-name-input").value;
    let url = document.getElementById("new-bookmark-url-input").value;
    let createAt = Date.now();
    bookmarkList.push({ name: urlName, url: url, createAt: createAt });
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    document.getElementById("new-bookmark-url-name-input").value = "";
    document.getElementById("new-bookmark-url-input").value = "";
    setBookmarkItem({ name: urlName, url: url, createAt: createAt });
    newBookmarkToggle();
};

// <--북마크 아이템 삭제-->
const deleteBookmarkItem = (id) => {
    const flag = window.confirm("정말 삭제하시겠습니까?");
    if (flag) {
        let bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
        let newBookmarkList = bookmarkList.filter((elm) => elm.createAt !== id);
        localStorage.setItem("bookmarkList", JSON.stringify(newBookmarkList));
        document.getElementById(`bookmark-item-${id}`).remove();
        return;
    }
};

setBookmarkList();
document.getElementById("bookmark-item-add-btn").addEventListener("click", newBookmarkToggle);
document.getElementById("cancel-btn").addEventListener("click", newBookmarkToggle);
document.getElementById("add-btn").addEventListener("click", addBookmarkItem);
