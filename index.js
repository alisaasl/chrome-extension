

let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ul = document.getElementById("ul-el");
const del = document.getElementById("delete");
const tabBtn = document.getElementById("tab")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))




if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})

function renderLeads(leads) {
    let listItems = "";

    for (let i = 0; i < leads.length; i++) {

        listItems += `<li>
            <a href='${leads[i]}' target='_blank'> 
            ${leads[i]}
            </a>
        </li>`

    }

    ul.innerHTML = listItems

}


del.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
})



inputBtn.addEventListener("click", function () {

    myLeads.push(inputEl.value);
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads);


})

