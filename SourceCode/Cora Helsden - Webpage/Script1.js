let contentPage = document.getElementById('content')
let currentPage = 'home';

// DEFAULT SETTINGS
let username = '';
let email = '';
let password = '';

let userSettings = {
    dangerColor: '#C30010',
    warningColor: '#DAA520',
    safeColor: '#568203',
    textSize: 'Small',
    colorblindMode: 'None'
};

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
//                      PAGE DEFINITIONS
// ============================================================
function changePage(page) {
    currentPage = page;


    switch (page) {
        // HOME PAGE
        case 'home':
            document.title = "Welcome! | Crossing Danger Analysis"

            contentPage.innerHTML = `
                <div class="authWrapper">
                    <div class="WelcomeCard">
                        <h1>Crossing Danger Analysis System</h1>

                        <div class="ButtonStuff">
                            <button class="btn" id="LoginButton">Login</button>
                            <button class="btn" id="RegisterButton">Register</button>
                            <p class="smallBtn" id="GuestButton">Continue As Guest</p>
                        </div>
                    </div>
                </div>
            `;
        break;

        // LOGIN PAGE
        case 'login':
            document.title = "Login | Crossing Danger Analysis"

            contentPage.innerHTML = `
                <div class="authWrapper">
                    <div class="LoginCard">
                        <h1>Login</h1>

                        <form id="loginDetails">
                            <label for="usernameInput"> Username / Email: </label>
                            <input type="text" id="usernameInput" placeholder="Enter Username or Email">
                            <p class="errorMessages" id="userIssues"></p>

                            <label for="passwordInput">Password:</label>
                            <input type="password" id="passwordInput" placeholder="Enter password">
                            <p class="errorMessages" id="passIssues"></p>

                            <button type="submit" class="btn">Continue</button>
                            <p class="smallBtn" id="back">Back</p>
                        </form>
                    </div>
                </div>
            `;

            document.getElementById("loginDetails").addEventListener("submit", (e) => {
                e.preventDefault();

                const userInput = document.getElementById("usernameInput").value;
                const passInput = document.getElementById("passwordInput").value;
                const userIssues = document.getElementById("userIssues");
                const passIssues = document.getElementById("passIssues");

                userIssues.textContent = "";
                passIssues.textContent = "";

                let errorHere = false;

                if (userInput === '') {
                    userIssues.textContent = 'This field cannot be empty.';
                    errorHere = true;
                }

                if (passInput === '') {
                    passIssues.textContent = 'This field cannot be empty.';
                    errorHere = true;
                }

                if (!errorHere) {
                    if (checkLogin(userInput, passInput)) {
                        changePage("mainpage");
                    } else {
                        passIssues.textContent = 'Incorrect username / email or password.';
                    }
                }
            });
        break;


        // REGISTER PAGE
        case 'register':
            document.title = "Register | Crossing Danger Analysis";

            contentPage.innerHTML = `
                <div class="authWrapper">
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

                            <button type="submit" class="btn">Continue</button>
                            <p class="smallBtn" id="back">Back</p>
                        </form>
                    </div>
                </div>
            `;

            document.getElementById("registerDetails").addEventListener("submit", (e) => {
                e.preventDefault();


                // ERROR MESSAGES
                const usernameIssues = document.getElementById("usernameIssues");
                const emailIssues = document.getElementById("emailIssues");
                const passwordIssues = document.getElementById("passwordIssues");

                // SETS INITIAL CONTENT
                usernameIssues.textContent = "";
                emailIssues.textContent = "";
                passwordIssues.textContent = "";

                const usernameInputReg = document.getElementById("usernameInputReg").value;
                const emailInputReg = document.getElementById("emailInputReg").value;
                const passwordInputReg = document.getElementById("passwordInputReg").value;
                const confirmPasswordInputReg = document.getElementById("confirmPasswordInputReg").value;

                let errorHere = false;

                // CHECKS FOR ERRORS
                if (usernameInputReg === "") {
                    usernameIssues.textContent = 'Username cannot be empty!';
                    errorHere = true;
                } else if (usernameInputReg.length < 3) {
                    usernameIssues.textContent = 'Username must be at least 3 characters!'
                    errorHere = true;
                }

                if (emailInputReg === "") {
                    emailIssues.textContent = 'Email cannot be empty!';
                    errorHere = true;
                } else if (!emailInputReg.includes("@")) {
                    emailIssues.textContent = 'Email cannot be empty!';
                    errorHere = true;
                }

                if (passwordInputReg === "") {
                    passwordIssues.textContent = 'Password cannot be empty!';
                    errorHere = true;
                } else if (passwordInputReg.length < 8) {
                    passwordIssues.textContent = 'Password must be at least 8 characters!';
                    errorHere = true;
                } else if (passwordInputReg !== confirmPasswordInputReg) {
                    passwordIssues.textContent = 'Passwords do not match!';
                    errorHere = true;
                }

                if (!errorHere) {
                    username = usernameInputReg.value;
                    email = emailInputReg.value;
                    password = passwordInputReg.value;

                    saveLoginState();

                    changePage("mainpage");

                }
                
            });

            break;

        // PAGE WITH MAPS
        case 'mainpage':
            document.title = "Main Page | Crossing Danger Analysis";

            contentPage.innerHTML = `
                <div class="pageLayout">
                    <aside class="taskbar">
                        <button class="iconBtn active" id="homeIcon"></button>
                        <button class="iconBtn" id="statsIcon"></button>
                        <button class="iconBtn" id="settingsIcon"></button>
                        <div class="taskbarSpaceImplementer"></div>
                        <button class="iconBtn" id="accountIcon"></button>
                    </aside>

                    <section class="actualContent homeGrid">
                        <div class="statsPart">
                            <div class="statCard">
                                <div class="statNumber">47</div>
                                <div class="statLabel">Crossings</div>
                            </div>
                            <div class="statCard">
                                <div class="statNumber">12</div>
                                <div class="statLabel">Danger Zones</div>
                            </div>
                            <div class="statCard">
                                <div class="statNumber">23</div>
                                <div class="statLabel">Warning Zones</div>
                            </div>
                            <div class="statCard">
                                <div class="statNumber">10</div>
                                <div class="statLabel">Safe Zones</div>
                            </div>
                        </div>

                        <div class="mapPart">
                            <p class="placeholderText"> Map loading... </p>
                        </div>
                    </section>
                </div>
            `;
            break;

        case 'statspage':
            document.title = "Statistics Page | Crossing Danger Analysis";

            contentPage.innerHTML = `
                <div class="pageLayout">
                    <aside class="taskbar">
                        <button class="iconBtn" id="homeIcon"></button>
                        <button class="iconBtn" id="statsIcon"></button>
                        <button class="iconBtn" id="settingsIcon"></button>

                        <div class="taskbarSpaceImplementer"></div>

                        <button class="iconBtn" id="accountIcon"></button>
                    </aside>

                    <section class="actualContent">
                        <div class="statsFullPage">
                            <div class="settingsContainer">
                                <div class="settingsHeader">STATISTICS</div>

                                <div class="settingsSection">
                                    <div class="sectionHeader">CROSSING ANALYSIS</div>

                                    <div class="statItem">
                                        <span class="statLabel">Totale Crossings Analysed:</span>
                                        <span class="statValue"></span>
                                    </div>

                                    <div class="statItem">
                                        <span class="statLabel">Danger Zones Identified:</span>
                                        <span class="statValue"></span>
                                    </div>

                                    <div class="statItem">
                                        <span class="statLabel">Warning Zones Identified:</span>
                                        <span class="statValue"></span>
                                    </div>

                                    <div class="statItem">
                                        <span class="statLabel">Safe Zones Identified:</span>
                                        <span class="statValue"></span>
                                    </div>

                                </div>

                                <div class="settingsSection">
                                    <div class="sectionHeader">INCIDENTS</div>

                                    <div class="statItem">
                                        <span class="statLabel">Total Incidents:</span>
                                        <span class="statValue"></span>
                                    </div>

                                    <div class="statItem">
                                        <span class="statLabel">Critical Incidents:</span>
                                        <span class="statValue"></span>
                                    </div>

                                    <div class="statItem">
                                        <span class="statLabel">Amount of PoIs:</span>
                                        <span class="statValue"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            `;

            break;

        case 'settingspage':
            document.title = "Settings Page | Crossing Danger Analysis";

            contentPage.innerHTML = `
                <div class="pageLayout">
                    <aside class="taskbar">
                        <button class="iconBtn" id="homeIcon"></button>
                        <button class="iconBtn" id="statsIcon"></button>
                        <button class="iconBtn" id="settingsIcon"></button>

                        <div class="taskbarSpaceImplementer"></div>

                        <button class="iconBtn" id="accountIcon"></button>
                    </aside>

                    <section class="actualContent" style="grid-template-rows: 1fr;">
                        <div class="settingsFullPage">
                            <div class="settingsContainer">
                                <div class="settingsHeader"> SETTINGS </div>

                                <div class="settingsSection">
                                    <div class="sectionHeader"> COLOUR SCHEME </div>

                                    <div class="colourOption">
                                        <label>Danger Area:</label>
                                        <input type="color" value="#C30010" class="colourPicker">
                                    </div>

                                    <div class="colourOption">
                                        <label>Warning Area:</label>
                                        <input type="color" value="#DAA520" class="colourPicker">
                                    </div>

                                    <div class="colourOption">
                                        <label>Safe Area:</label>
                                        <input type="color" value="#568203" class="colourPicker">
                                    </div>
                                </div>

                                <div class="settingsSection">
                                    <div class="sectionHeader">ACCESSIBILITY</div>

                                    <div class="accessibilityOption">
                                        <label>Text Size:</label>
                                        <select class="selectInput">
                                            <option>Small</option>
                                            <option>Medium</option>
                                            <option>Large</option>
                                        </select>
                                    </div>

                                    <div class="accessibilityOption">
                                        <label>Colourblind Mode:</label>
                                        <select class="selectInput">
                                            <option>None</option>
                                            <option>Deuteranopia</option>
                                            <option>Protanopia</option>
                                            <option>Tritanopia</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            `
            break;

        case 'accountpage':
            document.title = "Account | Crossing Danger Analysis";

            contentPage.innerHTML = `
                <div class="pageLayout">
                    <aside class="taskbar">
                        <button class="iconBtn" id="homeIcon"></button>
                        <button class="iconBtn" id="statsIcon"></button>
                        <button class="iconBtn" id="settingsIcon"></button>

                        <div class="taskbarSpaceImplementer"></div>

                        <button class="iconBtn" id="accountIcon"></button>
                    </aside>

                    <section class="actualContent">
                        <div class="accountFullPage">
                            <p class="placeholderText"> Account settings will appear here! </p>
                        </div>
                    </section>

                    <p class="smallBtn" id="back">Back</p>
                </div>
            `;
            break;

    }

    // BUTTON DEFINITIONS
    const loginButton = document.getElementById("LoginButton");
    const returnButton = document.getElementById("back");
    const registerButton = document.getElementById("RegisterButton");

    const guestButton = document.getElementById("GuestButton");

    const homeButton = document.getElementById("homeIcon");
    const statsButton = document.getElementById("statsIcon");
    const settingsButton = document.getElementById("settingsIcon");
    const accountButton = document.getElementById("accountIcon");

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

    if (homeButton) {
        homeButton.addEventListener("click", () => {
            changePage("mainpage");
        });
    }

    if (statsButton) {
        statsButton.addEventListener("click", () => {
            changePage("statspage");
        });
    }

    if (settingsButton) {
        settingsButton.addEventListener("click", () => {
            changePage("settingspage");
        });
    }

    if (accountButton) {
        accountButton.addEventListener("click", () => {
            changePage("accountpage");
        });
    }
}

changePage('home');