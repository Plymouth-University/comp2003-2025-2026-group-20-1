let contentPage = document.getElementById('content')

// ============================================================
//                    PAGE DEFINITIONS
// ============================================================
function changePage(page) {
    switch (page) {
        case 'home':
            document.title = "Welcome! | Crossing Danger Analysis"

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
            document.title = "Login | Crossing Danger Analysis"

            contentPage.innerHTML = `
                <div class="LoginCard">
                    <h1>Login</h1>

                    <form id="loginDetails">
                        <label for="usernameInput"> Username / Email: </label>
                        <input type="text" id="usernameInput" placeholder="Enter Username or Email">

                        <label for="passwordInput">Password:</label>
                        <input type="password" id="passwordInput" placeholder="Enter password">

                        <button type="submit" class="btn" id="loginBtn">Continue</button>
                        <p class="smallBtn" id="back">Back</p>
                    </form>
                </div>
            `;
            break;

        case 'register':
            document.title = "Register | Crossing Danger Analysis"

            contentPage.innerHTML = `
                <div class="RegisterCard">
                    <h1>Register</h1>

                    <form id="registerDetails">
                        <label for="usernameInputReg"> Username: </label>
                        <input type="text" id="usernameInputReg" placeholder="Enter Username.">

                        <label for="emailInputReg"> Email: </label>
                        <input type="text" id="emailInputReg" placeholder="Enter Email.">

                        <label for="passwordInputReg"> Password: </label>
                        <input type="password" id="passwordInputReg" placeholder="Enter Password.">

                        <label for="confirmPasswordInputReg"> Confirm Password: </label>
                        <input type="password" id="confirmPasswordInputReg" placeholder="Enter Password Again.">

                        <button type="submit" class="btn" id="registerBtn">Continue</button>
                        <p class="smallBtn" id="back">Back</p>
                    </form>
                </div>
            `;
            break;

    }

    const loginButton = document.getElementById("LoginButton");
    const returnButton = document.getElementById("back");
    const registerButton = document.getElementById("RegisterButton");

    const guestButton = document.getElementById("GuestButton");

    if (loginButton) {
        loginButton.addEventListener("click", () => {
            changePage("login");
        });
    }

    if (registerButton) {
        registerButton.addEventListener("click", () => {
            changePage("register")
        });
    }

    if (returnButton) {
        returnButton.addEventListener("click", () => {
            changePage("home")
        });
    }
}


changePage('home');