function dropText(id, dropID) {
    //console.log(id);
    //console.log(dropID);
    var text = document.getElementById(id).innerHTML;

    //closeDropdown();

    document.getElementById(dropID).classList.toggle("show");
    if (document.getElementById(dropID).classList.contains('show')) {
        document.getElementById(id).innerHTML = "&or;";
    } else {
        document.getElementById(id).innerHTML = "&gt;";
    }

}

function closeDropdown(dropEvent){
    console.log(dropEvent);
    if (!dropEvent.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');

                var arrows = document.getElementsByClassName("dropdownArrow")
                for (var i = 0; i < arrows.length; i++) {
                    arrows[i].innerHTML = "&gt;";
                }
            }
        }

    }
}

window.onclick = function (event) {closeDropdown(event);};