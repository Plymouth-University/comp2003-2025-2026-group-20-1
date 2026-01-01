let contentPage = document.getElementById('content')

// ============================================================
//                    PAGE DEFINITIONS
// ============================================================
function changePage(page) {
    switch (page) {
        case 'home':
            contentPage.innerHTML = `
                <div class="WelcomeCard">
                    <h1>Crossing Danger Analysis System</h1>

                    <div class="ButtonStuff">
                        <button class="btn" id="LoginButton">Login</button>
                        <button class="btn" id="RegisterButton">Register</button>
                        <p class="smallBtn" id="GuestButton">Continue As Guest</p>
                    </div>
                </div>
            `;
        break;

        case 'login':
            contentPage.innerHTML = `
                <div class="LoginCard">
                    <h1>Login</h1>

                    <form id="loginDetails">
                        <label for="usernameInput"> Username: / Email: </label>
                        <input type="text" id="usernameInput" placeholder="Enter Username or Email">

                        <label for="passwordInput">Password:</label>
                        <input type="password" id="passwordInput" placeholder="Enter password">

                        <button type="submit" class="btn" id="loginBtn">Submit</button>
                        <p class="smallBtn" id="back">Back</p>
                    </form>
                </div>
            `;
        break;

    }

    const loginButton = document.getElementById("LoginButton");
    const returnButton = document.getElementById("back");

    if (loginButton) {
        loginButton.addEventListener("click", () => {
            changePage("login");
        });
    } else if (returnButton) {
        returnButton.addEventListener("click", () => {
            changePage("home")
        })
    }
}


changePage('home');