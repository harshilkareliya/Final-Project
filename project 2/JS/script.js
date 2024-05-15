var applicationData = JSON.parse(localStorage.getItem("appData")) || []
console.log(applicationData)



function add_application(){
    let addName = document.getElementById("name").value
    let addEmail = document.getElementById("email").value
    let addField = document.getElementById("field").value
    let addSalary = document.getElementById("salary").value 

    const userData = {
        id : applicationData.length,
        name : addName,
        email : addEmail,
        field : addField,
        salary : addSalary                                              
    }
    applicationData.push(userData)

    localStorage.setItem("appData",JSON.stringify(applicationData))
    clearData()
}

function clearData(){
    document.getElementById("name").value = ""
    document.getElementById("email").value = ""
    document.getElementById("field").value = "Frontend"
    document.getElementById("salary").value = ""
}

showData()

function showData(){
    // document.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("show").innerHTML = ""
        applicationData.map((showAppData,index)=>{
            let table = document.createElement("table")
            table.setAttribute("id","table")
            let tableRow = document.createElement("tr")
            tableRow.setAttribute("id","tableRow")
            let name = document.createElement("td")
            name.innerHTML = showAppData.name
            name.setAttribute("id","tableName")
            let email = document.createElement("td")
            email.innerHTML = showAppData.email
            email.setAttribute("id","tableEmail")
            let aplied = document.createElement("td")
            aplied.innerHTML = showAppData.field
            aplied.setAttribute("id","tableField")
            let salary = document.createElement("td")
            salary.innerHTML = showAppData.salary
            salary.setAttribute("id","tableSalary")
            let bookmark = document.createElement("a")
            bookmark.innerHTML = "Bookmark"
            // bookmark.setAttribute("href","")
            bookmark.addEventListener("click",()=>{
                 addBookmark(index)
            })
            tableRow.append(name,email,aplied,salary,bookmark)
            table.append(tableRow)
            document.getElementById("show").append(table)
            
        })
    // })
}

var bookmark = JSON.parse(localStorage.getItem("bookmarkData")) || []
console.log(bookmark)
function addBookmark(index){

    applicationData.map((bookmarkMap)=>{
        if(bookmarkMap.id === index){
            let bookmarkName = bookmarkMap.name
            let bookmarkEmail = bookmarkMap.email
            let bookmarkField = bookmarkMap.field
            let bookmarkSalary = bookmarkMap.salary

            const userData = {
                id : bookmark.length-1,
                name : bookmarkName,
                email : bookmarkEmail,
                field : bookmarkField,
                salary : bookmarkSalary                                              
            }
            bookmark.push(userData)
            localStorage.setItem("bookmarkData",JSON.stringify(bookmark))
        }
    })
}

function showFilteredData(data){
    // document.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("show").innerHTML = ""
        data.map((data,index)=>{
            let table = document.createElement("table")
            table.setAttribute("id","table")
            let tableRow = document.createElement("tr")
            tableRow.setAttribute("id","tableRow")
            let name = document.createElement("td")
            name.innerHTML = data.name
            name.setAttribute("id","tableName")
            let email = document.createElement("td")
            email.innerHTML = data.email
            email.setAttribute("id","tableEmail")
            let aplied = document.createElement("td")
            aplied.innerHTML = data.field
            aplied.setAttribute("id","tableField")
            let salary = document.createElement("td")
            salary.innerHTML = data.salary
            salary.setAttribute("id","tableSalary")
            let bookmark = document.createElement("a")
            bookmark.innerHTML = "Bookmark"
            // bookmark.setAttribute("href","")
            bookmark.addEventListener("click",()=>{
                
                addBookmark(index)
            })
            tableRow.append(name,email,aplied,salary,bookmark)
            table.append(tableRow)
            document.getElementById("show").append(table)
            
        })
    // })
}


function nameFilter(){
// var applicationData = JSON.parse(localStorage.getItem("appData")) || []

    let nameType = document.getElementById("filterName").value
    let selectType

    if(nameType === 'all'){
        selectType = applicationData.slice()
    }
    else if(nameType === 'atoz'){
        selectType = applicationData.slice().sort((a,b)=>a.name.localeCompare(b.name))
    }
    else{
        selectType = applicationData.slice().sort((a,b)=>b.name.localeCompare(a.name))
    }
    showFilteredData(selectType)
}

function roleFilter(){
    let roleType = document.getElementById("filterRole").value
    let selectType

    if(roleType === 'all'){
        selectType = applicationData.slice()
    }
    else{
        selectType = applicationData.filter(f => f.field === roleType)
    }
    showFilteredData(selectType)
}

function salaryFilter(){
    let salaryType = document.getElementById("filterSalary").value
    let selectType

    if(salaryType === 'all'){
        selectType = applicationData.slice()
    }
    else if(salaryType === 'ltoh'){
        selectType = applicationData.slice().sort((a,b)=>a.salary - b.salary)
    }
    else{
        selectType = applicationData.slice().sort((a,b)=>b.salary - a.salary)
    }
    showFilteredData(selectType)
}