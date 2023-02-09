const newBookMarkInputBox = document.getElementById("new-bookmark-item");
const bookMarkItemList = document.getElementById("bookmark-list");

// <--bookMarkList 초기 설정-->
let bookMarkList = [];
if (localStorage.getItem("bookMarkList")) {
    bookMarkList = JSON?.parse(localStorage.getItem("bookMarkList"));
} else {
    localStorage.setItem("bookMarkList", bookMarkList);
}

// <--북마크 리스트 표시-->
const showBookMarkList = () => {
    let template = "";
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

// <--북마크 추가 버튼-->
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
const saveItem = () => {
    let urlName = document.getElementById("new-url-name").value;
    let url = document.getElementById("new-url").value;
    bookMarkList.unshift({ name: urlName, url: url });
    localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList));
    document.getElementById("new-url-name").value = "";
    document.getElementById("new-url").value = "";
    newBookMarkToggle();
    while (bookMarkItemList.firstChild) {
        bookMarkItemList.removeChild(bookMarkItemList.firstChild);
    }
    showBookMarkList();
};

// <--북마크 삭제-->
const deleteItem = (idx) => {
    const flag = window.confirm("정말 삭제하시겠습니까?");
    if (flag) {
        bookMarkList?.splice(idx, 1);
        localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList));
        while (bookMarkItemList.firstChild) {
            bookMarkItemList.removeChild(bookMarkItemList.firstChild);
        }
        showBookMarkList();
    }
    return;
};

showBookMarkList();
