const timeComponent = document.getElementById("clock");
const dateComponent = document.getElementById("date");

const setDayAndTime = () => {
    let nowDate = new Date();
    //시계
    let hour = modifyNumber(nowDate.getHours());
    let minute = modifyNumber(nowDate.getMinutes());
    //날짜
    let month = modifyNumber(nowDate.getMonth() + 1);
    let date = modifyNumber(nowDate.getDate());
    //요일
    let week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    let day = week[nowDate.getDay()];
    //추가
    timeComponent.innerText = hour + ":" + minute;
    dateComponent.innerText = month + "." + date + "." + day;
};

const modifyNumber = (time) => {
    if (parseInt(time) < 10) {
        return "0" + time;
    }
    return time;
};

setDayAndTime();
setInterval(setDayAndTime, 1000);
