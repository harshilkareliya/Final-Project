var task = JSON.parse(localStorage.getItem("alltask"))||[]
console.log(task)

function enterdata(){
    let task_name = document.getElementById("task-name").value
    let task_detail = document.getElementById("task-detail").value
    let task_priority = document.getElementById("task-priority").value
    let index = task.length+1

    var adddata = {
        index : index,
        taskname : task_name,
        taskdetail : task_detail,
        taskpriority : task_priority
    }
    task.push(adddata);
    localStorage.setItem("alltask",JSON.stringify(task))

    showdata()
    clear();
}
showdata(task)


function clear(){
    let task_name = document.getElementById("task-name").value = ''
    let task_detail = document.getElementById("task-detail").value = ''
    let task_priority = document.getElementById("task-priority").value = "high"
}

function showdata(){
    document.getElementById("showtask").innerHTML = ""
    task.map((tasks,index)=>{
        let li = document.createElement("li")
        li.setAttribute("id","showli")
        li.innerHTML = `<strong>${tasks.taskname} </strong> - ${tasks.taskdetail} (Priority : ${tasks.taskpriority})`
        let button = document.createElement("i")
        button.addEventListener("click",()=>{
            deletethistask(task,index)
            showdata()
        })
        button.setAttribute("class","bi bi-trash3")
        li.append(button)
        document.getElementById("showtask").append(li)
    })
}

function deletethistask(arr,index){
    arr.splice(index,1)
    localStorage.setItem("alltask",JSON.stringify(arr))

    return arr
}

function filtertask(){
    let filterpriority = document.getElementById("filterpriority").value
    if(filterpriority === 'all'){
        showdata()
    }
    else if(filterpriority == "high" || filterpriority == "low" || filterpriority == "medium"){
        let filtered = task.filter(ft => ft.taskpriority === filterpriority)
        showfilterdata(filtered)
    }
    else if(filterpriority == "htol"){
        let filtered = task.filter(ft => ft.taskpriority === "high")
        let filtered2 = task.filter(ft => ft.taskpriority === "medium")
        let filtered3 = task.filter(ft => ft.taskpriority === "low")
        showfilterdata2(filtered,filtered2,filtered3)
    }
    else{
        let filtered = task.filter(ft => ft.taskpriority === "low")
        let filtered2 = task.filter(ft => ft.taskpriority === "medium")
        let filtered3 = task.filter(ft => ft.taskpriority === "high")
        showfilterdata2(filtered,filtered2,filtered3)
    }
}

function showfilterdata(filtered){
    document.getElementById("showtask").innerHTML = ""
    
    filtered.map((tasks,index)=>{
        let li = document.createElement("li")
        li.setAttribute("id","showli")
        li.innerHTML = `<strong>${tasks.taskname} </strong> - ${tasks.taskdetail} (Priority : ${tasks.taskpriority})`
        let button = document.createElement("i")
        let innerindex = filtered[index].index
        let outerindex = task.findIndex(p => p.index == innerindex)
        console.log(innerindex,outerindex)
        button.addEventListener("click",()=>{
            deletethistask(task,outerindex)
            filtertask()
        })
        button.setAttribute("class","bi bi-trash3")
        li.append(button)
        document.getElementById("showtask").append(li)
    })
}

function showfilterdata2(filtered,filtered2,filtered3){
    document.getElementById("showtask").innerHTML = ""
    
    filtered.map((tasks,index)=>{
        let li = document.createElement("li")
        li.setAttribute("id","showli")
        li.innerHTML = `<strong>${tasks.taskname} </strong> - ${tasks.taskdetail} (Priority : ${tasks.taskpriority})`
        let button = document.createElement("i")
        let innerindex = filtered[index].index
        let outerindex = task.findIndex(p => p.index == innerindex)
        button.addEventListener("click",()=>{
            deletethistask(task,outerindex)
            filtertask()
        })
        button.setAttribute("class","bi bi-trash3")
        li.append(button)
        document.getElementById("showtask").append(li)
    })
    filtered2.map((tasks,index)=>{
        let li = document.createElement("li")
        li.setAttribute("id","showli")
        li.innerHTML = `<strong>${tasks.taskname} </strong> - ${tasks.taskdetail} (Priority : ${tasks.taskpriority})`
        let button = document.createElement("i")
        let innerindex = filtered2[index].index
        let outerindex = task.findIndex(p => p.index == innerindex)
        button.addEventListener("click",()=>{
            deletethistask(task,outerindex)
            filtertask()
        })
        button.setAttribute("class","bi bi-trash3")
        li.append(button)
        document.getElementById("showtask").append(li)
    })
    filtered3.map((tasks,index)=>{
        let li = document.createElement("li")
        li.setAttribute("id","showli")
        li.innerHTML = `<strong>${tasks.taskname} </strong> - ${tasks.taskdetail} (Priority : ${tasks.taskpriority})`
        let button = document.createElement("i")
        let innerindex = filtered3[index].index
        let outerindex = task.findIndex(p => p.index == innerindex)
        button.addEventListener("click",()=>{
            deletethistask(task,outerindex)
            filtertask()
        })
        button.setAttribute("class","bi bi-trash3")
        li.append(button)
        document.getElementById("showtask").append(li)
    })
}
