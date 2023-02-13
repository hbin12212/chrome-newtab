const $searchInput = document.getElementById("search-input");

const handleSearch = () => {
    let searchWord = $searchInput.value;
    window.location.href = `https://google.com/search?q=${searchWord}`;
    searchWord = "";
};

const enterKey = (e) => {
    if (e.keyCode === 13) {
        handleSearch();
    }
};

$searchInput.addEventListener("keypress", (e) => {
    enterKey(e);
});
