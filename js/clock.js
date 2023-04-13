(function () {
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");

    const modifyNumber = (number) => {
        return parseInt(number) < 10 ? "0" + number : number;
    };

    const getDate = () => {
        const nowDate = new Date();
        const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        let month = modifyNumber(nowDate.getMonth() + 1);
        let date = modifyNumber(nowDate.getDate());
        let day = week[nowDate.getDay()];
        setDate(month, date, day);
    };

    const setDate = (month, date, day) => {
        dateElement.textContent = `${month}월${date}일${day}`;
    };

    const getTime = () => {
        const nowDate = new Date();
        let hour = modifyNumber(nowDate.getHours());
        let minute = modifyNumber(nowDate.getMinutes());
        setTime(hour, minute);
    };

    const setTime = (hour, minute) => {
        timeElement.textContent = `${hour}:${minute}`;
    };

    getDate();
    getTime();
    setInterval(getTime, 1000);
})();
