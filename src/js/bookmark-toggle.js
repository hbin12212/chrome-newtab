const bookmarkBar = document.getElementById("bookmark-bar");
const bookMarkOpen = document.getElementById("bookmark-open");
const bookMarkClose = document.getElementById("bookmark-close");

// <--북마크 바-->
const isBookMarkBarOpen = localStorage.getItem("isBookMarkBarOpen");
if (isBookMarkBarOpen === "close") {
    //localstorage에 isBookMarkBarOpen이 close라면
    bookmarkBar.style.display = "none";
    bookMarkOpen.style.display = "none";
    bookMarkClose.style.display = "flex";
} else {
    //localstorage에 isBookMarkBarOpen이 open이라면
    bookmarkBar.style.display = "block";
    bookMarkOpen.style.display = "flex";
    bookMarkClose.style.display = "none";
}

// <--북마크 바 toggle-->
const bookmarkBarToggle = () => {
    let isBookMarkBarOpen = localStorage.getItem("isBookMarkBarOpen");
    //localstorage에 isBookMarkBarOpen이 있고, close라면
    if (isBookMarkBarOpen === "close") {
        localStorage.setItem("isBookMarkBarOpen", "open");
        bookmarkBar.style.display = "block";
        bookMarkOpen.style.display = "flex";
        bookMarkClose.style.display = "none";
        return;
    }
    //localstorage에 isBookMarkBarOpen이 있고 그 값이 open이거나
    //localstorage에 isBookMarkBarOpen이 없을 경우
    localStorage.setItem("isBookMarkBarOpen", "close");
    bookmarkBar.style.display = "none";
    bookMarkOpen.style.display = "none";
    bookMarkClose.style.display = "flex";

};

document.getElementById("bookmark-open-btn").addEventListener("click", bookmarkBarToggle);
document.getElementById("bookmark-close-btn").addEventListener("click", bookmarkBarToggle);
