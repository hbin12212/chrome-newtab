const $bookMarkComponent = document.getElementById("bookmark-bar");
const $bookMarkOpenIcon = document.getElementById("bookmark-open");
const $bookMarkCloseIcon = document.getElementById("bookmark-close");

// <--북마크 창-->
const isBookMarkOpen = localStorage.getItem("isBookMarkOpen");
if (isBookMarkOpen === "close") {
    //localstorage에 isBookMarkOpen이 close라면
    $bookMarkComponent.style.display = "none";
    $bookMarkOpenIcon.style.display = "none";
    $bookMarkCloseIcon.style.display = "flex";
} else {
    //localstorage에 isBookMarkOpen이 open이라면
    $bookMarkComponent.style.display = "block";
    $bookMarkOpenIcon.style.display = "flex";
    $bookMarkCloseIcon.style.display = "none";
}

// <--북마크 창 toggle-->
const bookmarkBarToggle = () => {
    let isBookMarkOpen = localStorage.getItem("isBookMarkOpen");
    if (isBookMarkOpen) {
        //localstorage에 isBookMarkOpen이 있다면
        if (isBookMarkOpen === "open") {
            //닫기
            localStorage?.setItem("isBookMarkOpen", "close");
            $bookMarkComponent.style.display = "none";
            $bookMarkOpenIcon.style.display = "none";
            $bookMarkCloseIcon.style.display = "flex";
        } else {
            //열기
            localStorage.setItem("isBookMarkOpen", "open");
            $bookMarkComponent.style.display = "block";
            $bookMarkOpenIcon.style.display = "flex";
            $bookMarkCloseIcon.style.display = "none";
        }
    } else {
        //localstorage에 isBookMarkOpen이 없다면
        localStorage.setItem("isBookMarkOpen", "close");
        $bookMarkComponent.style.display = "none";
        $bookMarkOpenIcon.style.display = "none";
        $bookMarkCloseIcon.style.display = "flex";
    }
};

document.getElementById("bookmark-open-btn").addEventListener("click", bookmarkBarToggle);
document.getElementById("bookmark-close-btn").addEventListener("click", bookmarkBarToggle);
