var all_recipe = JSON.parse(localStorage.getItem("recipe_data")) || []
console.log(all_recipe)


function showRecipe(){
    document.getElementById("show_recipe").innerHTML = ""
    all_recipe.map((recipes,index)=>{
        let main_sec = document.createElement("div")
        main_sec.setAttribute("id","main_sec")
        let image = document.createElement("img")
        image.setAttribute("id","recipe_image")
        image.setAttribute("src",recipes.image)

        let name = document.createElement("div")
        name.setAttribute("id","recipe_name")
        name.append(recipes.title)
        let Ingred = document.createElement("div")
        Ingred.setAttribute("id","recipe_Ingred") 
        Ingred.append(recipes.ingredients)
        let Instruct = document.createElement("div")
        Instruct.setAttribute("id","recipe_Instruct") 
        Instruct.append(recipes.instructions)
        let cuise = document.createElement("div")
        cuise.setAttribute("id","recipe_cuise") 
        cuise.append(recipes.cuisine)
        let edit_sec = document.createElement("div")
        edit_sec.setAttribute("id","edit_sec")
        let edit = document.createElement("i")
        edit.addEventListener("click",()=>{
            let change_recipe = all_recipe.filter(ft => ft.id === index+1)
            
            edit_recipe(change_recipe) 
            showRecipe()
        })
        edit.setAttribute("class","bi bi-pencil-square") 
        let remove = document.createElement("i")
        remove.setAttribute("class","bi bi-x-lg") 
        remove.addEventListener("click",()=>{
            delete_recipe(all_recipe,index)
            showRecipe()
        })
        edit_sec.append(edit,remove)
        let hr = document.createElement("hr")
        main_sec.append(image,name,Ingred,Instruct,cuise,edit_sec)
        document.getElementById("show_recipe").append(main_sec,hr)
    })

}
showRecipe()

function delete_recipe(all_recipe,index){
    all_recipe.splice(index,1)
    localStorage.setItem("recipe_data",JSON.stringify(all_recipe))

    return all_recipe
}

function edit_recipe(recipe){
    let change = prompt()
    recipe[0].title.innerHTML = change
    
    return recipe
}

function filter_recipe(){
    let filter_type = document.getElementById("filter_cuisine").value
    if(filter_type == 'not selected'){
        showRecipe()
    }
    else {
        let filtered_recipe = all_recipe.filter(ft => ft.cuisine === filter_type)
        displayFiltered_recipe(filtered_recipe)
    }
}

function displayFiltered_recipe(filterRecipe){
    document.getElementById("show_recipe").innerHTML = ""
    filterRecipe.map((recipes,index)=>{
        let main_sec = document.createElement("div")
        main_sec.setAttribute("id","main_sec")
        let image = document.createElement("img")
        image.setAttribute("id","recipe_image")
        image.setAttribute("src",recipes.image)
        let name = document.createElement("div")
        name.setAttribute("id","recipe_name")
        name.append(recipes.title)
        let Ingred = document.createElement("div")
        Ingred.setAttribute("id","recipe_Ingred") 
        Ingred.append(recipes.ingredients)
        let Instruct = document.createElement("div")
        Instruct.setAttribute("id","recipe_Instruct") 
        Instruct.append(recipes.instructions)
        let cuise = document.createElement("div")
        cuise.setAttribute("id","recipe_cuise") 
        cuise.append(recipes.cuisine)
        let edit_sec = document.createElement("div")
        edit_sec.setAttribute("id","edit_sec")
        let edit = document.createElement("i")
        edit.addEventListener("click",()=>{
            let change_recipe = all_recipe.filter(ft => ft.id === index+1)
            edit_recipe(change_recipe) 
            showRecipe()
        })
        edit.setAttribute("class","bi bi-pencil-square") 
        let remove = document.createElement("i")
        remove.setAttribute("class","bi bi-x-lg") 
        let innerid = filterRecipe[index].id
        let outerindex = all_recipe.findIndex(ft => ft.id === innerid)
        remove.addEventListener("click",()=>{
            console.log(delete_recipe(all_recipe,outerindex))
            filter_recipe()
        })
        edit_sec.append(edit,remove)
        let hr = document.createElement("hr")
        main_sec.append(image,name,Ingred,Instruct,cuise,edit_sec)
        document.getElementById("show_recipe").append(main_sec,hr)
    })
}



function getdata(){
    var all_recipe = JSON.parse(localStorage.getItem("recipe_data")) || []
}

function setData(changes){
    localStorage.setItem("recipe_data",JSON.stringify(changes))
}