function dropText(id, dropID) {
    //console.log(id);
    //console.log(dropID);
    //var text = document.getElementById(id).innerHTML;

    closeDropdown(null, dropID);

    document.getElementById(id).classList.toggle("rotateArrow");
    document.getElementById(dropID).classList.toggle("show");

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
        }
    }
}

window.onclick = function (event) {
    closeDropdown(event);
};