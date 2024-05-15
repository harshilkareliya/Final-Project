function header(){
    let nav = `<div id="header">
    <div><img src="logo.jpg" alt="" id="logo"></div>
    <nav id="navbar">
        <li><a href="index.html">Add Recipe</a></li>
        <li><a href="recipe.html" target="_blank">My Recipe</a></li>
    </nav>
    </div>`
    document.getElementById("header").innerHTML = nav
}
export{header}