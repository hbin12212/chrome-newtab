const handleSearch = () => {
    let searchWord = document.getElementById("search").value;
    window.location.href = `https://google.com/search?q=${searchWord}`;
    searchWord = "";
};

const enterKey = (e) => {
    if (e.keyCode === 13) {
        handleSearch();
    }
};
