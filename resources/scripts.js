function dropText(id, dropID) {
    //console.log(id);
    //console.log(dropID);
    //var text = document.getElementById(id).innerHTML;

    closeDropdown(null, dropID);

    document.getElementById(dropID).classList.toggle("show");
    if (document.getElementById(dropID).classList.contains('show')) {
        document.getElementById(id).innerHTML = "&#x25BC;";
    } else {
        document.getElementById(id).innerHTML = "&#x25B6;";
    }

}

function closeDropdown(dropEvent, notThisOne) {
    //console.log(dropEvent);
    const dropdowns = document.getElementsByClassName("dropdown-content");
    try {
        if (!dropEvent.target.matches('.dropbtn')) {
            closeDropdownsList(dropdowns);
        }
    } catch (TypeError) {

        let newDropdowns = [];

        for (let n = 0; n < dropdowns.length; n++) {
            //console.log(dropdowns[n]);
            if (dropdowns[n].id !== notThisOne) {
                newDropdowns.push(dropdowns[n]);
            }
        }

        closeDropdownsList(newDropdowns);

    }
}

function closeDropdownsList(dropdownsCollection) {
    let i;
    for (i = 0; i < dropdownsCollection.length; i++) {
        const openDropdown = dropdownsCollection[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');

            const arrows = document.getElementsByClassName("dropdownArrow")
            for (i = 0; i < arrows.length; i++) {
                arrows[i].innerHTML = "&gt;";
            }
        }
    }
}

window.onclick = function (event) {
    closeDropdown(event);
};