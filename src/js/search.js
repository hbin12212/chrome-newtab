const searchInput = document.getElementById("search-input");

const showSearchResult = () => {
    let searchWord = searchInput.value;
    window.location.href = `https://google.com/search?q=${searchWord}`;
    searchWord = "";
};

const enterKey = (event) => {
    if (event.code === "Enter") {
        showSearchResult();
    }
};

searchInput.addEventListener("keypress", (event) => {
    enterKey(event);
});
