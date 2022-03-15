const memoComponent = document.getElementById("memo");
const newMemoInputBox = document.getElementById("new-memo-item");
const memoItemList = document.getElementById("memo-list");

let isMemoOpen = "";
if (localStorage?.getItem("isMemoOpen") === null) {
    isMemoOpen = "open";
    localStorage.setItem("isMemoOpen", isMemoOpen);
} else {
    isMemoOpen = localStorage.getItem("isMemoOpen");
}
let memoList = [];
if (localStorage.getItem("memoList") === null) {
    localStorage.setItem("memoList", memoList);
} else {
    memoList = JSON?.parse(localStorage.getItem("memoList"));
}

let addBtnClick = false;
let editBtnClick = false;

//시작할 때 닫을지 열지
const handleMemoComponent = () => {
    if (isMemoOpen === "open") {
        memoComponent.style.display = "block";
    } else {
        memoComponent.style.display = "none";
    }
};

//메모 닫기 & 열기
const toggle = () => {
    isMemoOpen = localStorage.getItem("isMemoOpen");
    //닫기
    if (isMemoOpen === "open") {
        localStorage.setItem("isMemoOpen", "close");
        memoComponent.style.display = "none";
    }
    //열기
    else {
        localStorage.setItem("isMemoOpen", "open");
        memoComponent.style.display = "block";
    }
};

const showMemoList = () => {
    let template = "";
    memoList?.map((it, idx) => {
        template += `<div class="memo-item" id="memo-item${idx}">
            <div class="item-header">
                <div class="create-date">${it.createDate}</div>
                <div class="btn-box">
                    <div class="edit-btn" onclick="editMemoToggle(${idx})">수정</div>
                    <div class="del-btn" onclick="deleteItem(${idx})">삭제</div>
                </div>
            </div>
            <div class="content" id="content${idx}">
                ${it.content}
            </div>
        </div>`;
    });
    memoItemList.innerHTML = template;
};

//추가 작성폼
const newMemoToggle = () => {
    addBtnClick = !addBtnClick;
    if (addBtnClick) {
        newMemoInputBox.style.display = "block";
    } else {
        newMemoInputBox.style.display = "none";
    }
};

const editMemoToggle = (idx) => {
    editBtnClick = !editBtnClick;
    let editMemoItem = document.getElementById(`memo-item${idx}`);
    let editMemoCreateDate = memoList[idx].createDate;
    let editMemoContent = memoList[idx].content;
    //수정폼
    if (editBtnClick) {
        editMemoItem.innerHTML = `<div class="edit-memo-item" id="edit-memo-item">
        <div class="content">
            <textarea id="edit-content${idx}">${editMemoContent}</textarea>
        </div>
        <div class="input-btn-box">
            <div class="cancel-btn" onclick="editMemoToggle(${idx})">취소</div>
            <div class="save-btn" onclick="editItem(${idx})">수정</div>
        </div>
        </div>`;
    }
    //취소
    else {
        editMemoItem.innerHTML = `
            <div class="item-header">
                <div class="create-date">${editMemoCreateDate}</div>
                <div class="btn-box">
                    <div class="edit-btn" onclick="editMemoToggle(${idx})">수정</div>
                    <div class="del-btn" onclick="deleteItem(${idx})">삭제</div>
                </div>
            </div>
            <div class="content" id="content${idx}">
                ${editMemoContent}
            </div>`;
    }
};

const editItem = (idx) => {
    let saveContent = document.getElementById(`edit-content${idx}`).value;
    memoList[idx].content = saveContent;
    localStorage.setItem("memoList", JSON.stringify(memoList));
    document.getElementById(`edit-content${idx}`).value = "";
    editMemoToggle(idx);
    showMemoList();
};

//삭제
const deleteItem = (idx) => {
    const flag = window.confirm("정말 삭제하시겠습니까?");
    if (flag) {
        memoList.splice(idx, 1);
        localStorage.setItem("memoList", JSON.stringify(memoList));
        showMemoList();
    }
    return;
};

//저장
const saveItem = () => {
    let date = new Date();
    let saveDate = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
    let saveContent = document.getElementById("new-content").value;
    memoList.unshift({ createDate: saveDate, content: saveContent });
    localStorage.setItem("memoList", JSON.stringify(memoList));
    document.getElementById("new-content").value = "";
    newMemoToggle();
    showMemoList();
};

handleMemoComponent();
showMemoList();
