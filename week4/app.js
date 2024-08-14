let users = [];

window.onload = function () {

    // Add submitForm() to form submit button click event.
    let btn = document.getElementById("user-form-submit");
    btn.addEventListener("click", submitForm);

    // Add animate() to animWrapper element click event.
    document.getElementById("animWrapper").addEventListener("click", animate);

}

function submitForm() {
    let form = document.getElementById("user-form");

    let fname = form["first-name"].value;
    let lname = form["last-name"].value;

    const user = {
        firstName: fname,
        lastName: lname
    }

    users.push(user);
    loadUsers();
}

function loadUsers() {
    let userList = document.getElementById("user-list");
    userList.innerHTML = "";

    for (let i = 0; i < users.length; i++) {

        // Create new div
        let userDiv = document.createElement("div");
        // Give it a class for styling, etc
        userDiv.classList.add("user");

        let userFullName = users[i].firstName + " " + users[i].lastName;
        // Set the contents to the name of
        // the user object at index i
        userDiv.innerHTML = userFullName;

        // Add the div to the section
        userList.appendChild(userDiv);
    }
    userList.appendChild(document.createElement("br"));
}

function adReplay() {
    let ad = document.getElementById("adWrapper");
    let copy = ad.cloneNode(true);
    ad.replaceWith(copy);
}

function animate() {
    const element = document.getElementById("animBlock");
    let x = 0;
    let y = 0;
    let opacity = 1;
    let phase = 0;
    let animId;

    function doAnimation() {
        if (phase == 0) {
            x++;
            y++;

            element.style.left = x + 'px';
            element.style.top = y + 'px';

            if (x >= 300) {
                phase = 1;
            }
        }

        else if (phase == 1) {
            x--;
            element.style.left = x + 'px';
            if (x <= 20) {
                phase = 2;
            }
        }
        else if (phase == 2) {
            x++;
            y += 0.5;
            element.style.left = x + 'px';
            element.style.top = y + 'px';
            if (x >= 550) {
                phase = 3;
            }
        }
        else if (phase == 3) {
            opacity -= 0.02;
            element.style.opacity = opacity;
            if (opacity <= 0) {
                phase = 4;
                clearInterval(animId);
            }
        }
        
    }
    animId = setInterval(doAnimation, 10);
}

