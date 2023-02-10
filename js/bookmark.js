const newBookmarkForm = document.getElementById("bookmark-item-input-form");
const bookmarkItemList = document.getElementById("bookmark-list");

// <--북마크 리스트 초기 설정-->
let bookmarkList = [];
localStorage.getItem("bookmarkList")
    ? (bookmarkList = JSON?.parse(localStorage.getItem("bookmarkList")))
    : localStorage.setItem("bookmarkList", bookmarkList);

// <--북마크 아이템 추가 버튼 초기 설정-->
let isAddBtnClick = false;
newBookmarkForm.style.display = "none";

// <--북마크 아이템 추가 버튼 Toggle-->
const newBookmarkToggle = () => {
    isAddBtnClick = !isAddBtnClick;
    isAddBtnClick ? (newBookmarkForm.style.display = "block") : (newBookmarkForm.style.display = "none");
};

// <--북마크 리스트 표시-->
const setBookmarkList = () => {
    let template = "";
    bookmarkList.forEach((it, idx) => {
        template += `<div class="bookmark-item" id="bookmark-item-${idx}">
            <div class="bookmark_name" id="bookmark_name-${idx}">
                <a href=${it.url}>
                    <div class="url-icon">
                        <img src="https://www.google.com/s2/favicons?domain_url=${it.url}" alt="icon-${idx}"></img>
                    </div>
                    <div class="url-name">${it.name}</div>
                </a>
            </div>   
            <div class="btn-box">
                <div class="del-btn" onclick="deleteBookmarkItem(${idx})">삭제</div>
            </div>
        </div>`;
    });
    bookmarkItemList.innerHTML = template;
};

// <--북마크 아이템 추가-->
const addBookmarkItem = () => {
    let urlName = document.getElementById("new-bookmark-url-name-input").value;
    let url = document.getElementById("new-bookmark-url-input").value;
    bookmarkList.unshift({ name: urlName, url: url });
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    document.getElementById("new-bookmark-url-name-input").value = "";
    document.getElementById("new-bookmark-url-input").value = "";
    newBookmarkToggle();
    setBookmarkList();
};

// <--북마크 아이템 삭제-->
const deleteBookmarkItem = (idx) => {
    const flag = window.confirm("정말 삭제하시겠습니까?");
    if (flag) {
        bookmarkList?.splice(idx, 1);
        localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
        setBookmarkList();
        return;
    }
};

setBookmarkList();
