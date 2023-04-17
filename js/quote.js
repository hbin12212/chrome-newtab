(function () {
    const API_URL = "https://port-0-random-quote-4uvg2mleme84ru.sel3.cloudtype.app/";
    const quoteElement = document.getElementById("quote");
    const quoteItem = localStorage.getItem("quote");

    //현재시간
    const nowDate = new Date();
    const month = nowDate.getMonth() + 1;
    const date = nowDate.getDate();

    const setQuote = (result) => {
        let quote = { createDate: `${month}-${date}`, quoteData: result };
        localStorage.setItem("quote", JSON.stringify(quote));
        quoteElement.textContent = `"${result}"`;
    };

    //명언 API
    const getQuote = async () => {
        try {
            const data = await fetch(API_URL).then((res) => res.json());
            console.log(data)
            const result = data[1].respond;
            setQuote(result);
        } catch (err) {
            console.log(`err : ${err}`);
            setQuote("만약 하루를 성공하고 싶다면, 반드시 첫 한 시간을 성공해야 한다.");
        }
    };

    if (quoteItem) {
        //localstorage에 quote가 있다면
        let { createDate, quoteData } = JSON.parse(quoteItem);
        if (createDate === `${month}-${date}`) {
            quoteElement.textContent = `"${quoteData}"`;
        } else {
            getQuote();
        }
    } else {
        //localstorage에 quote가 없다면
        getQuote();
    }
})();
