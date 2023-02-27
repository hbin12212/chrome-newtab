(function () {
    const API_URL = "https://port-0-random-quote-4uvg2mleme84ru.sel3.cloudtype.app/";
    const $quoteElement = document.getElementById("quote");
    const quoteItem = localStorage.getItem("quote");

    //현재시간
    const nowDate = new Date();
    const month = nowDate.getMonth() + 1;
    const date = nowDate.getDate();

    const setQuote = (respond) => {
        let quote = { createDate: `${month}-${date}`, quoteData: respond };
        localStorage.setItem("quote", JSON.stringify(quote));
        $quoteElement.innerText = `"${respond}"`;
    };

    //명언 API
    const getQuote = async () => {
        try {
            const data = await fetch(API_URL).then((res) => res.json());
            const respond = data[1].respond;
            setQuote(respond);
        } catch (err) {
            console.log(`err : ${err}`);
            setQuote("만약 하루를 성공하고 싶다면, 반드시 첫 한 시간을 성공해야 한다.");
        }
    };

    if (quoteItem) {
        //localstorage에 quote가 있다면
        let { createDate, quoteData } = JSON.parse(quoteItem);
        if (createDate === `${month}-${date}`) {
            $quoteElement.textContent = `"${quoteData}"`;
        } else {
            getQuote();
        }
    } else {
        //localstorage에 quote가 있다면
        getQuote();
    }
})();
