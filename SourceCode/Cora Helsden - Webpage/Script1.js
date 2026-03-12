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

const allStats = [
    { id: 'crossings', label: 'Total Crossings Analysed', value: 47 },
    { id: 'danger', label: 'Danger Zones Identified', value: 12 },
    { id: 'warning', label: 'Warning Zones Identified', value: 23 },
    { id: 'safe', label: 'Safe Zones Identified', value: 10 },
    { id: 'incidents', label: 'Total Incidents', value: 4 },
    { id: 'critical', label: 'Critical Incidents', value: 51 },
    { id: 'pois', label: 'Amount of PoIs', value: 37 }
];

function initialiseSettings() {
    if (!userSettings.selectedStats || !Array.isArray(userSettings.selectedStats)) {
        userSettings.selectedStats = ['crossings', 'danger', 'warning', 'safe'];
    }
}

function getSelectedStats() {
    initialiseSettings();
    return allStats.filter(stat => userSettings.selectedStats.includes(stat.id));
}

function toggleStatSelection(statId) {
    initialiseSettings();
    const index = userSettings.selectedStats.indexOf(statId);

    if (index > -1) {
        userSettings.selectedStats.splice(index, 1);
    } else {
        if (userSettings.selectedStats.length < 4) {
            userSettings.selectedStats.push(statId);
        }
    }
}

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

            const selectedStats = getSelectedStats();

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
                            ${selectedStats.map(stat => `
                                <div class="statCard">
                                    <div class="statNumber">${stat.value}</div>
                                    <div class="statLabel">${stat.label}</div>
                                </div>
                            `).join('')}
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
                        <button class="iconBtn active" id="statsIcon"></button>
                        <button class="iconBtn" id="settingsIcon"></button>
                        <div class="taskbarSpaceImplementer"></div>
                        <button class="iconBtn" id="accountIcon"></button>
                    </aside>

                    <section class="actualContent fullPage">
                        <div class="statsFullPage">
                            <div class="fullPageContainer">
                                <div class="pageHeader">STATISTICS</div>

                                <div id="statsMessageContainer"></div>

                                <div class="settingsSection">
                                    <div class="sectionHeader">SELECT FOUR STATISTICS FOR DASHBOARD</div>
                                    <p class="statsNotifier">Click on any statistics to add or remove it. You must select exactly four.</p>

                                    ${allStats.map(stat => {
                                        const isSelected = userSettings.selectedStats.includes(stat.id);
                                        return `
                                            <div class="statItem selectable ${isSelected ? 'selected' : ''}" data-stat-id="${stat.id}">
                                                <div class="statContent">
                                                    <span class="statLabel">${stat.label}:</span>
                                                    <span class="statValue">${stat.value}:</span>
                                                </div>
                                                <div class="statCheckbox"></div>
                                            </div>
                                        `
                                    }).join('')}

                                    <button class="btn saveStatsBtn" id="saveStatsBtn">Save Dashboard Selection</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            `;

            // Add click listener to stats
            document.querySelectorAll('.statItem.selectable').forEach(item => {
                item.addEventListener('click', () => {
                    const statId = item.dataset.statId;
                    toggleStatSelection(statId);

                    // Update UI
                    if (userSettings.selectedStats.includes(statId)) {
                        item.classList.add('selected');
                    } else {
                        item.classList.remove('selected');
                    }

                    const messageContainer = document.getElementById('statsMessageContainer');
                    messageContainer.innerHTML = '';
                });
            });

            document.getElementById('saveStatsBtn').addEventListener('click', () => {
                const messageContainer = document.getElementById('statsMessageContainer');

                if (userSettings.selectedStats.length !== 4) {
                    messageContainer.innerHTML = `
                        <div class="statsMessage error">
                            Please select exactly FOUR statistics.
                        </div>
                    `;
                } else {
                    messageContainer.innerHTML = `
                        <div class = "statsMessage success">
                            Dashboard updated successfully!
                        </div>
                    `;
                }
            });

            break;

        case 'settingspage':
            document.title = "Settings Page | Crossing Danger Analysis";

            contentPage.innerHTML = `
                <div class="pageLayout">
                    <aside class="taskbar">
                        <button class="iconBtn" id="homeIcon"></button>
                        <button class="iconBtn" id="statsIcon"></button>
                        <button class="iconBtn active" id="settingsIcon"></button>
                        <div class="taskbarSpaceImplementer"></div>
                        <button class="iconBtn" id="accountIcon"></button>
                    </aside>

                    <section class="actualContent fullPage">
                        <div class="fullPageContainer">
                            <div class="settingsContainer">
                                <div class="pageHeader"> SETTINGS </div>

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

                        <button class="iconBtn active" id="accountIcon"></button>
                    </aside>

                    <section class="actualContent fullpage">
                        <div class="fullPageContainer">
                            <div class="pageHeader">ACCOUNT</div>

                            <div class="accountInfo">
                                <div class="accountField">
                                    <span class="accountLabel">Username:</span>
                                </div>
                                <div class="accountField">
                                    <span class="accountLabel">Email:</span>
                                </div>
                                <div class="accountField">
                                    <span class="accountLabel">Account Type:</span>
                                </div>
                            </div>

                            <button class="btn logoutBtn" id="logoutBtn">Logout</button>
                        </div>
                    </section>
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

    const logoutButton = document.getElementById("logoutBtn");

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

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            changePage("home");
        })
    }
}

initialiseSettings();
changePage('home');