const quotesComponent = document.getElementById("quotes");
const quotesItem = localStorage.getItem("quotes");
//현재시간
const nowDate = new Date();
const month = nowDate.getMonth() + 1;
const date = nowDate.getDate();

//명언 API
const getQuotes = async () => {
    const res = await fetch("https://api.qwer.pw/request/helpful_text?apikey=guest");
    const data = await res.json();
    if (data[0].result === "success") {
        //성공
        let quotes = { date: `${month}-${date}`, data: data[1].respond };
        quotesComponent.innerText = `"${data[1].respond}"`;
        localStorage.setItem("quotes", JSON.stringify(quotes));
    } else {
        //실패
        let quotes = [
            { date: `${month}-${date}`, data: "만약 하루를 성공하고 싶다면, 반드시 첫 한 시간을 성공해야 한다." },
        ];
        localStorage.setItem("quotes", JSON.stringify(quotes));
        quotesComponent.innerText = "만약 하루를 성공하고 싶다면, 반드시 첫 한 시간을 성공해야 한다.";
    }
};

if (quotesItem) {
    //localstorage에 저장된 값이 있으면
    let quotesItemDate = JSON?.parse(quotesItem).date;
    let quotesItemData = JSON?.parse(quotesItem).data;
    //날짜가 같으면
    if (quotesItemDate === `${month}-${date}`) {
        quotesComponent.innerText = `"${quotesItemData}"`;
    } else {
        //날짜가 같지 않으면
        getQuotes();
    }
} else {
    //localstorage에 저장된 값이 없으면
    getQuotes();
}
