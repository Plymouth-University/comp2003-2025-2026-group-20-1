let contentPage = document.getElementById('content')

let username = '';
let email = '';
let password = '';

// ============================================================
//          PROOF OF CONCEPT LOGIN SYSTEM (!REPLACE!)
// ============================================================
function saveLoginState() {
    const saveLogin = {
        username,
        email,
        password
    };
    localStorage.setItem("saveLogin", JSON.stringify(saveLogin));
}

function loadLoginState() {
    const loadLogin = JSON.parse(localStorage.getItem("saveLogin"));

    return loadLogin || null
}

function checkLogin(userInput, passInput) {
    const saved = loadLoginState();
    if (!saved) {
        return false;
    }

    return (saved.username === userInput || saved.email === userInput.toLowerCase()) && saved.password === passInput;
}

// ============================================================
//                       INITIALISATION
// ============================================================



// ============================================================
//                      PAGE DEFINITIONS
// ============================================================
function changePage(page) {
    switch (page) {
        // HOME PAGE
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

        // LOGIN PAGE
        case 'login':
            document.title = "Login | Crossing Danger Analysis"

            contentPage.innerHTML = `
                <div class="LoginCard">
                    <h1>Login</h1>

                    <form id="loginDetails">
                        <label for="usernameInput"> Username / Email: </label>
                        <input type="text" id="usernameInput" placeholder="Enter Username or Email">
                        <p class="errorMessages" id="userIssues"></p>

                        <label for="passwordInput">Password:</label>
                        <input type="password" id="passwordInput" placeholder="Enter password">
                        <p class="errorMessages" id="passIssues"></p>

                        <button type="submit" class="btn" id="loginEntryBtn">Continue</button>
                        <p class="smallBtn" id="back">Back</p>
                    </form>
                </div>
            `;

            // UNIQUE BUTTON
            const loginEntryBtn = document.getElementById("loginEntryBtn");

            if (loginEntryBtn) {
                loginEntryBtn.addEventListener("click", (l) => {
                    l.preventDefault();

                    const userInput = document.getElementById("usernameInput").value;
                    const passInput = document.getElementById("passwordInput").value;

                    let userIssues = document.getElementById("userIssues").value;
                    let passIssues = document.getElementById("passIssues").value;

                    if (checkLogin(userInput, passInput)) {
                        changePage("mainpage");

                    } else {
                        if (userInput == '') {
                            userIssues = `This field cannot be empty.`;
                        } else {
                            userIssues = ``;
                        }

                        if (passIssues == '') {
                            passIssues = `This field cannot be empty.`;
                        } else {
                            passIssues = ``;
                        }

                        if ((userInput != '') && (passInput != '')) {
                            passIssues = `Incorrect username/email or password.`
                        }
                    }
                });
            }
        break;


        // REGISTER PAGE
        case 'register':
            document.title = "Register | Crossing Danger Analysis";

            contentPage.innerHTML = `
                <div class="RegisterCard">
                    <h1>Register</h1>

                    <form id="registerDetails">
                        <label for="usernameInputReg"> Username: </label>
                        <input type="text" id="usernameInputReg" placeholder="Enter Username.">

                        <p class="errorMessages" id="usernameIssues"></p>

                        <label for="emailInputReg"> Email: </label>
                        <input type="text" id="emailInputReg" placeholder="Enter Email.">

                        <p class="errorMessages" id="emailIssues"></p>

                        <label for="passwordInputReg"> Password: </label>
                        <input type="password" id="passwordInputReg" placeholder="Enter Password.">

                        <label for="confirmPasswordInputReg"> Confirm Password: </label>
                        <input type="password" id="confirmPasswordInputReg" placeholder="Enter Password Again.">

                        <p class="errorMessages" id="passwordIssues"></p>

                        <button type="submit" class="btn" id="registerEntryBtn">Continue</button>
                        <p class="smallBtn" id="back">Back</p>
                    </form>
                </div>
            `;

            // ERROR MESSAGES
            const usernameIssues = document.getElementById("usernameIssues");
            const emailIssues = document.getElementById("emailIssues");
            const passwordIssues = document.getElementById("passwordIssues");

            const passwordInputReg = document.getElementById("passwordInputReg")
            const confirmPasswordInputReg = document.getElementById("confirmPasswordInputReg");
            const usernameInputReg = document.getElementById("usernameInputReg");
            const emailInputReg = document.getElementById("emailInputReg");
            // UNIQUE BUTTON FOR VALIDATION PURPOSES
            const registerEntryBtn = document.getElementById("registerEntryBtn");


            if (registerEntryBtn) {
                registerEntryBtn.addEventListener("click", (r) => {
                    r.preventDefault();

                    // CHECKS FOR ERRORS
                    if ((passwordInputReg.value == confirmPasswordInputReg.value) && (usernameInputReg.value != "") && (passwordInputReg.value != "") && (confirmPasswordInputReg.value != "") && (emailInputReg.value != "")) {

                        // IF NO ERRORS, SAVES CURRENT INPUTS
                        username = usernameInputReg.value;
                        email = emailInputReg.value.toLowerCase();
                        password = passwordInputReg.value;
                        saveLoginState();

                        changePage("mainpage")

                    }
                    if (passwordInputReg.value != confirmPasswordInputReg.value) {
                        passwordIssues.innerHTML = `Your passwords do not match!`;
                    } else {
                        passwordIssues.innerHTML = ``;
                    }
                    if (usernameInputReg.value == "") {
                        usernameIssues.innerHTML = `Your username input is empty!`;
                    } else {
                        usernameIssues.innerHTML = ``;
                    }

                    if (passwordInputReg.value == "") {
                        passwordIssues.innerHTML = `Your password input is empty!`;
                    } else {
                        passwordIssues.innerHTML = ``;
                    }

                    if (emailInputReg.value == "") {
                        emailIssues.innerHTML = `Your email input is empty!`;
                    } else {
                        emailIssues.innerHTML = ``;
                    }

                });
            }

            break;

        // PAGE WITH MAPS
        case 'mainpage':
            document.title = "Main Page | Crossing Danger Analysis";

            contentPage.innerHTML = `
                hello
                <p class="smallBtn" id="back">Back</p>
            `;
            break;

    }

    // BUTTON DEFINITIONS
    const loginButton = document.getElementById("LoginButton");
    const returnButton = document.getElementById("back");
    const registerButton = document.getElementById("RegisterButton");

    const guestButton = document.getElementById("GuestButton");


    // BUTTON ACTIONS
    if (loginButton) {
        loginButton.addEventListener("click", () => {
            changePage("login");
        });
    }

    if (registerButton) {
        registerButton.addEventListener("click", () => {
            changePage("register");
        });
    }

    if (returnButton) {
        returnButton.addEventListener("click", () => {
            changePage("home");
        });
    }

    if (guestButton) {
        guestButton.addEventListener("click", () => {
            changePage("mainpage");
        });
    }
}


changePage('home');