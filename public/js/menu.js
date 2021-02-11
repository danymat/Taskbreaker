function loadMenuevent() {
    var logged_in = false
    var menu_icone = document.getElementById("menu_ico")
    var menu = document.getElementById("menu")
    menu_icone.addEventListener("click", function () {
        if (menu.firstChild.className == "hidden") {
            menu.className = "bg-purple-800 p-4 w-40 block";
            menu.firstChild.className = "block";
            if (logged_in) {
                menu.lastChild.className = "block";
            }
        }
        else {
            menu.className = "bg-purple-800 p-4 w-40 hidden";
            menu.firstChild.className = "hidden";
            if (logged_in) {
                menu.lastChild.className = "hidden";
            }
        }
    });
}