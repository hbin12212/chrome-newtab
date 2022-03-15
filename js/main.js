const setDayAndTime = () => {
    let nowDate = new Date();
    //시계
    let hour = modifyNumber(nowDate.getHours());
    let minute = modifyNumber(nowDate.getMinutes());
    //날짜
    let month = modifyNumber(nowDate.getMonth() + 1);
    let date = modifyNumber(nowDate.getDate());
    //요일
    const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    let day = week[nowDate.getDay()];
    //추가
    document.getElementById("clock").innerHTML = hour + ":" + minute;
    document.getElementById("date").innerHTML = month + "." + date + "." + day;
};

const modifyNumber = (time) => {
    if (parseInt(time) < 10) {
        return "0" + time;
    }
    return time;
};

const handleSearch = () => {
    let searchWord = document.getElementById("search").value;
    console.log(searchWord);
    window.location.href = `https://google.com/search?q=${searchWord}`;
    searchWord = "";
};

const enterKey = (e) => {
    if (e.keyCode === 13) {
        handleSearch();
    }
};

setDayAndTime();
setInterval(setDayAndTime, 1000);
