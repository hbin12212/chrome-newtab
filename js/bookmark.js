const bookMarkComponent = document.getElementById("bookmark");
const newBookMarkInputBox = document.getElementById("new-bookmark-item");
const bookMarkItemList = document.getElementById("bookmark-list");

// <--북마크 창-->
const isBookMarkOpen = localStorage?.getItem("isBookMarkOpen");
if (isBookMarkOpen === "close") {
    //localstorage에 isBookMarkOpen이 close라면
    bookMarkComponent.style.display = "none";
} else {
    bookMarkComponent.style.display = "block";
}

// <--북마크 창 toggle-->
const toggle = () => {
    let isBookMarkOpen = localStorage?.getItem("isBookMarkOpen");
    if (isBookMarkOpen) {
        //localstorage에 isBookMarkOpen이 있다면
        if (isBookMarkOpen === "open") {
            //닫기
            localStorage?.setItem("isBookMarkOpen", "close");
            bookMarkComponent.style.display = "none";
        } else {
            //열기
            localStorage.setItem("isBookMarkOpen", "open");
            bookMarkComponent.style.display = "block";
        }
    } else {
        //localstorage에 isBookMarkOpen이 없다면
        localStorage.setItem("isBookMarkOpen", "close");
        bookMarkComponent.style.display = "none";
    }
};

// <--북마크 추가 toggle-->
let addBtnClick = false;
newBookMarkInputBox.style.display = "none";

const newBookMarkToggle = () => {
    addBtnClick = !addBtnClick;
    if (addBtnClick) {
        newBookMarkInputBox.style.display = "block";
    } else {
        newBookMarkInputBox.style.display = "none";
    }
};

// <--북마크 저장-->
let bookMarkList = localStorage?.getItem("bookMarkList");
const saveItem = () => {
    let urlName = document.getElementById("new-url-name").value;
    let url = document.getElementById("new-url").value;
    bookMarkList.unshift({ name: urlName, url: url });
    localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList));
    document.getElementById("new-url").value = "";
    newBookMarkToggle();
    showBookMarkList();
};

// <--북마크 삭제-->
const deleteItem = () => {};

// <--북마크 리스트-->
const showBookMarkList = () => {
    let template = "";
    console.log(bookMarkList);
    bookMarkList?.map((it, idx) => {
        template += `<div class="bookmark-item" id="bookmark-item${idx}">
            <div class="item-header">
                <div class="btn-box">
                    <div class="del-btn" onclick="deleteItem(${idx})">삭제</div>
                </div>
            </div>
            <div class="bookmark_name" id="bookmark_name${idx}">
                <a href=${it?.url}>
                    ${it?.name}
                </a>
            </div>
        </div>`;
    });
    bookMarkItemList.insertAdjacentHTML("afterbegin", template);
};

showBookMarkList();
