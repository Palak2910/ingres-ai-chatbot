/* =====================================================
   INGRES AI
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   22 INDIAN LANGUAGES
===================================================== */

const languages = {

    "English": "en-IN",

    "Assamese": "as-IN",

    "Bengali": "bn-IN",

    "Bodo": "brx-IN",

    "Dogri": "doi-IN",

    "Gujarati": "gu-IN",

    "Hindi": "hi-IN",

    "Kannada": "kn-IN",

    "Kashmiri": "ks-IN",

    "Konkani": "kok-IN",

    "Maithili": "mai-IN",

    "Malayalam": "ml-IN",

    "Manipuri": "mni-IN",

    "Marathi": "mr-IN",

    "Nepali": "ne-IN",

    "Odia": "or-IN",

    "Punjabi": "pa-IN",

    "Sanskrit": "sa-IN",

    "Santali": "sat-IN",

    "Sindhi": "sd-IN",

    "Tamil": "ta-IN",

    "Telugu": "te-IN",

    "Urdu": "ur-IN"

};


/* =====================================================
   PAGE ELEMENTS
===================================================== */

const landing =
    document.getElementById("landing");

const loginPage =
    document.getElementById("login-page");

const assistant =
    document.getElementById("assistant");

const loginForm =
    document.getElementById("loginForm");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");

const loginError =
    document.getElementById("loginError");

const rememberMe =
    document.getElementById("rememberMe");

const messages =
    document.getElementById("messages");

const input =
    document.getElementById("messageInput");

const languageSelect =
    document.getElementById("languageSelect");

const languageCloud =
    document.getElementById("languageCloud");


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function openLogin() {

    landing.style.display = "none";

    loginPage.style.display = "block";

    assistant.style.display = "none";

    window.scrollTo(0, 0);

    setTimeout(() => {

        loginEmail.focus();

    }, 200);

}


function backToLanding() {

    loginPage.style.display = "none";

    assistant.style.display = "none";

    landing.style.display = "block";

    window.scrollTo(0, 0);

}


function openAssistant() {

    landing.style.display = "none";

    loginPage.style.display = "none";

    assistant.style.display = "block";

    window.scrollTo(0, 0);

}


/* =====================================================
   LOGIN
===================================================== */

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const email =
            loginEmail.value.trim();

        const password =
            loginPassword.value;


        loginError.textContent = "";

        loginError.style.color =
            "#ff6d7d";


        if (!email) {

            loginError.textContent =
                "Please enter your email address.";

            loginEmail.focus();

            return;

        }


        if (!isValidEmail(email)) {

            loginError.textContent =
                "Please enter a valid email address.";

            loginEmail.focus();

            return;

        }


        if (!password) {

            loginError.textContent =
                "Please enter your password.";

            loginPassword.focus();

            return;

        }


        if (password.length < 6) {

            loginError.textContent =
                "Password must contain at least 6 characters.";

            loginPassword.focus();

            return;

        }


        loginUser(email);

    }
);


/* =====================================================
   EMAIL VALIDATION
===================================================== */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =====================================================
   SUCCESSFUL LOGIN
===================================================== */

function loginUser(email) {

    const user = {

        email: email,

        loginTime:
            new Date().toISOString()

    };


    if (rememberMe.checked) {

        localStorage.setItem(
            "ingresUser",
            JSON.stringify(user)
        );

    } else {

        sessionStorage.setItem(
            "ingresUser",
            JSON.stringify(user)
        );

    }


    loginError.style.color =
        "#2be29d";

    loginError.textContent =
        "Login successful. Opening INGRES AI...";


    setTimeout(() => {

        loginPage.style.display =
            "none";

        landing.style.display =
            "none";

        assistant.style.display =
            "block";

        window.scrollTo(0, 0);

        showWelcomeMessage();

    }, 500);

}


/* =====================================================
   PASSWORD VISIBILITY
===================================================== */

function togglePassword() {

    const toggle =
        document.getElementById(
            "passwordToggle"
        );


    if (loginPassword.type === "password") {

        loginPassword.type =
            "text";

        toggle.textContent =
            "🙈";

    } else {

        loginPassword.type =
            "password";

        toggle.textContent =
            "👁";

    }

}


/* =====================================================
   FORGOT PASSWORD
===================================================== */

function forgotPassword() {

    const email =
        loginEmail.value.trim();


    if (!email) {

        loginError.style.color =
            "#ff6d7d";

        loginError.textContent =
            "Enter your email address first.";

        loginEmail.focus();

        return;

    }


    if (!isValidEmail(email)) {

        loginError.style.color =
            "#ff6d7d";

        loginError.textContent =
            "Please enter a valid email address.";

        return;

    }


    loginError.style.color =
        "#2be29d";

    loginError.textContent =
        "Password reset instructions would be sent to your email.";

}


/* =====================================================
   GOOGLE LOGIN
===================================================== */

function googleLogin() {

    loginError.style.color =
        "#a7c8ff";

    loginError.textContent =
        "Google authentication will be connected here.";

}


/* =====================================================
   SIGN UP
===================================================== */

function showSignupMessage() {

    loginError.style.color =
        "#a7c8ff";

    loginError.textContent =
        "Account registration will be connected here.";

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "ingresUser"
    );

    sessionStorage.removeItem(
        "ingresUser"
    );


    assistant.style.display =
        "none";

    loginPage.style.display =
        "block";

    landing.style.display =
        "none";


    loginEmail.value = "";

    loginPassword.value = "";

    loginError.textContent = "";

    window.scrollTo(0, 0);

}


/* =====================================================
   AUTO LOGIN
===================================================== */

function checkExistingLogin() {

    const localUser =
        localStorage.getItem(
            "ingresUser"
        );

    const sessionUser =
        sessionStorage.getItem(
            "ingresUser"
        );


    if (localUser || sessionUser) {

        landing.style.display =
            "none";

        loginPage.style.display =
            "none";

        assistant.style.display =
            "block";

        showWelcomeMessage();

    }

}


/* =====================================================
   LANDING HELPERS
===================================================== */

function scrollToFeatures() {

    document
        .getElementById("features")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   LANGUAGE SETUP
===================================================== */

Object.entries(languages).forEach(
    ([name, code]) => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            code;

        option.textContent =
            name;

        languageSelect.appendChild(
            option
        );


        const tag =
            document.createElement(
                "div"
            );

        tag.className =
            "language-tag";

        tag.textContent =
            name;

        languageCloud.appendChild(
            tag
        );

    }
);


languageSelect.value =
    "en-IN";


/* =====================================================
   LANGUAGE CHANGE
===================================================== */

function languageChanged() {

    const selected =
        languageSelect
            .options[
                languageSelect.selectedIndex
            ].text;


    addAIMessage(

        `Language switched to
        <strong>${escapeHTML(selected)}</strong> 🌐.
        <br><br>
        You can now interact with INGRES AI
        using your selected language.`

    );

}


/* =====================================================
   INPUT EVENTS
===================================================== */

input.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


input.addEventListener(
    "input",
    function() {

        this.style.height =
            "auto";

        this.style.height =
            Math.min(
                this.scrollHeight,
                130
            ) + "px";

    }
);


/* =====================================================
   SEND MESSAGE
===================================================== */

async function sendMessage() {

    const text =
        input.value.trim();


    if (!text)
        return;


    addUserMessage(text);


    addHistoryItem(text);


    input.value = "";

    input.style.height =
        "auto";


    showTyping();


    await delay(900);


    removeTyping();


    const answer =
        generateINGRESResponse(text);


    addAIMessage(answer);

}


/* =====================================================
   PRESET QUESTIONS
===================================================== */

function askPreset(question) {

    input.value =
        question;

    sendMessage();

}


/* =====================================================
   USER MESSAGE
===================================================== */

function addUserMessage(text) {

    const element =
        document.createElement("div");


    element.className =
        "chat-message user";


    element.innerHTML = `

        <div class="chat-avatar">
            U
        </div>

        <div class="message-body">

            <div class="message-label">
                You
            </div>

            <div class="message-text">
                ${escapeHTML(text)}
            </div>

        </div>

    `;


    messages.appendChild(
        element
    );


    scrollMessages();

}


/* =====================================================
   AI MESSAGE
===================================================== */

function addAIMessage(html) {

    const element =
        document.createElement("div");


    element.className =
        "chat-message";


    element.innerHTML = `

        <div class="chat-avatar">
            💧
        </div>

        <div class="message-body">

            <div class="message-label">
                INGRES AI
            </div>

            <div class="message-text">
                ${html}
            </div>

        </div>

    `;


    messages.appendChild(
        element
    );


    scrollMessages();

}


/* =====================================================
   TYPING
===================================================== */

function showTyping() {

    const element =
        document.createElement("div");


    element.id =
        "typingIndicator";


    element.className =
        "chat-message";


    element.innerHTML = `

        <div class="chat-avatar">
            💧
        </div>

        <div class="message-body">

            <div class="message-label">
                INGRES AI
            </div>

            <div class="typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>

    `;


    messages.appendChild(
        element
    );


    scrollMessages();

}


function removeTyping() {

    const element =
        document.getElementById(
            "typingIndicator"
        );


    if (element) {

        element.remove();

    }

}


/* =====================================================
   SCROLL
===================================================== */

function scrollMessages() {

    messages.scrollTop =
        messages.scrollHeight;

}


/* =====================================================
   INGRES RESPONSE ENGINE
===================================================== */

function generateINGRESResponse(question) {

    const q =
        question.toLowerCase();


    /* WHAT IS INGRES */

    if (

        q.includes("what is ingres") ||

        q.includes("ingres kya") ||

        q.includes("ingres क्या") ||

        q.includes("ingres")

    ) {

        return `

            <strong>
                What is INGRES? 💧
            </strong>

            <br><br>

            INGRES is associated with India's
            groundwater-resource assessment ecosystem.

            <br><br>

            It helps organize, assess and
            disseminate groundwater-resource
            information.

            <div class="ai-card">

                <div class="ai-card-title">
                    INGRES AI can help you explore
                </div>

                • Groundwater recharge<br>

                • Extractable groundwater resources<br>

                • Groundwater extraction<br>

                • Stage of groundwater extraction<br>

                • Assessment-unit categorization<br>

                • Reports and groundwater information<br>

                • Maps and analytics

            </div>

        `;

    }


    /* RECHARGE */

    if (

        q.includes("recharge") ||

        q.includes("भूजल पुनर्भरण") ||

        q.includes("replenish")

    ) {

        return `

            <strong>
                Groundwater Recharge 🌊
            </strong>

            <br><br>

            Groundwater recharge refers to
            the process through which water
            enters and replenishes underground
            aquifer systems.

            <div class="ai-card">

                <strong>
                    INGRES perspective
                </strong>

                <br><br>

                Recharge is one of the important
                components considered during
                groundwater-resource assessment.

            </div>

        `;

    }


    /* EXTRACTION */

    if (

        q.includes("extraction") ||

        q.includes("निकासी") ||

        q.includes("extracted")

    ) {

        return `

            <strong>
                Groundwater Extraction 📊
            </strong>

            <br><br>

            Groundwater extraction represents
            the amount of groundwater withdrawn
            for different uses.

            <br><br>

            INGRES-related assessment information
            can be used to understand extraction
            relative to available groundwater
            resources.

            <br><br>

            <button
                class="primary-button"
                onclick="showAnalytics()"
            >
                View Analytics →
            </button>

        `;

    }


    /* STATUS */

    if (

        q.includes("status") ||

        q.includes("condition") ||

        q.includes("स्थिति")

    ) {

        return `

            <strong>
                Groundwater Status 🗺️
            </strong>

            <br><br>

            I can help you explore groundwater-resource
            information for a selected location.

            <br><br>

            Try:

            <div class="ai-card">

                <strong>
                    "Show groundwater status of Haryana"
                </strong>

                <br><br>

                or

                <br><br>

                <strong>
                    "Show groundwater map of my district"
                </strong>

            </div>

            <button
                class="primary-button"
                onclick="showGroundwaterMap()"
            >
                Open Groundwater Map →
            </button>

        `;

    }


    /* MAP */

    if (

        q.includes("map") ||

        q.includes("district") ||

        q.includes("state") ||

        q.includes("location")

    ) {

        setTimeout(
            showGroundwaterMap,
            100
        );


        return `

            <strong>
                Opening the INGRES Groundwater Explorer... 🗺️
            </strong>

            <br><br>

            You can use the map to explore
            locations and visualize
            groundwater-related information.

        `;

    }


    /* ANALYTICS */

    if (

        q.includes("graph") ||

        q.includes("chart") ||

        q.includes("trend") ||

        q.includes("analytics")

    ) {

        setTimeout(
            showAnalytics,
            100
        );


        return `

            <strong>
                Groundwater Analytics 📊
            </strong>

            <br><br>

            I've generated a visualization area
            for groundwater-resource trends.

        `;

    }


    /* HINDI */

    if (

        q.includes("नमस्ते") ||

        q.includes("भूजल") ||

        q.includes("आईएनजीआरईएस")

    ) {

        return `

            <strong>
                नमस्ते! 🇮🇳
            </strong>

            <br><br>

            मैं <strong>INGRES AI</strong> हूँ।

            <br><br>

            मैं आपको भूजल संसाधन मूल्यांकन,
            भूजल पुनर्भरण, भूजल निकासी,
            INGRES डेटा, मानचित्र और रिपोर्ट
            समझने में सहायता कर सकता हूँ।

            <br><br>

            आप मुझसे अपने जिले या राज्य
            के बारे में भी पूछ सकते हैं।

        `;

    }


    /* GENERAL */

    if (

        q.includes("hello") ||

        q.includes("hi") ||

        q.includes("hey") ||

        q.includes("namaste")

    ) {

        return `

            <strong>
                Namaste! 👋
            </strong>

            <br><br>

            Welcome to <strong>INGRES AI</strong>.

            <br><br>

            I can help you with:

            <div class="ai-card">

                💧 Groundwater concepts<br>

                🗺️ Groundwater maps<br>

                📊 Groundwater analytics<br>

                📄 Reports and documents<br>

                🌐 Multilingual assistance<br>

                🎙️ Voice interaction

            </div>

            What would you like to explore?

        `;

    }


    /* DEFAULT */

    return `

        <strong>
            I understand your question. 🤖
        </strong>

        <br><br>

        For a production version, this question
        would be sent to the INGRES AI backend
        and retrieved against the official
        INGRES/CGWB knowledge base.

        <div class="ai-card">

            <div class="ai-card-title">
                Suggested INGRES questions
            </div>

            • What is groundwater recharge?<br>

            • Explain groundwater extraction.<br>

            • What is stage of groundwater extraction?<br>

            • Show groundwater status of a state.<br>

            • Explain this INGRES report.<br>

            • Show groundwater trends.

        </div>

    `;

}


/* =====================================================
   MAP
===================================================== */

function showGroundwaterMap() {

    addAIMessage(`

        <strong>
            INGRES Groundwater Explorer 🗺️
        </strong>

        <br><br>

        Select a location on the map to explore
        groundwater-related information.

        <div class="ai-card">

            <div class="ai-card-title">
                DEMO MAP
            </div>

            Interactive location explorer

            <br><br>

            📍 Haryana<br>
            📍 Punjab<br>
            📍 Rajasthan<br>
            📍 Uttar Pradesh

        </div>

    `);

}


/* =====================================================
   ANALYTICS
===================================================== */

function showAnalytics() {

    addAIMessage(`

        <strong>
            Groundwater Analytics 📊
        </strong>

        <br><br>

        Demo groundwater-resource analytics
        are displayed below.

        <div class="ai-card">

            <div class="ai-card-title">
                DEMO ANALYTICS
            </div>

            Groundwater Recharge
            ███████████████ 78%

            <br>

            Groundwater Extraction
            ███████████ 58%

            <br>

            Resource Availability
            █████████████ 68%

            <br>

            Assessment Coverage
            ████████████████ 84%

        </div>

    `);

}


/* =====================================================
   NEW CHAT
===================================================== */

function newChat() {

    messages.innerHTML = "";

    showWelcomeMessage();

}


/* =====================================================
   WELCOME
===================================================== */

function showWelcomeMessage() {

    messages.innerHTML = `

        <div class="welcome-message">

            <div class="welcome-icon">
                💧
            </div>

            <h1>
                Namaste! I'm INGRES AI
            </h1>

            <p>
                Your AI-powered virtual assistant
                for groundwater information.
            </p>

            <div class="quick-grid">

                <button
                    onclick="askPreset('What is INGRES?')"
                >
                    <strong>
                        💧 What is INGRES?
                    </strong>

                    <span>
                        Learn about the platform
                    </span>
                </button>


                <button
                    onclick="askPreset('What is groundwater recharge?')"
                >
                    <strong>
                        🌊 Groundwater Recharge
                    </strong>

                    <span>
                        Understand recharge
                    </span>
                </button>


                <button
                    onclick="askPreset('Show groundwater status')"
                >
                    <strong>
                        🗺️ Groundwater Status
                    </strong>

                    <span>
                        Explore groundwater status
                    </span>
                </button>


                <button
                    onclick="askPreset('Show groundwater analytics')"
                >
                    <strong>
                        📊 Analytics
                    </strong>

                    <span>
                        Explore groundwater trends
                    </span>
                </button>

            </div>

        </div>

    `;

}


/* =====================================================
   HISTORY
===================================================== */

function addHistoryItem(text) {

    const history =
        document.getElementById(
            "history"
        );


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "history-item";


    item.textContent =
        text.length > 30
            ? text.substring(0,30) + "..."
            : text;


    item.onclick =
        function() {

            input.value =
                text;

            input.focus();

        };


    history.prepend(item);


    const items =
        history.querySelectorAll(
            ".history-item"
        );


    if (items.length > 5) {

        items[
            items.length - 1
        ].remove();

    }

}


/* =====================================================
   VOICE INPUT
===================================================== */

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        addAIMessage(`

            <strong>
                Voice input unavailable 🎙️
            </strong>

            <br><br>

            Your browser does not support
            speech recognition.

            <br><br>

            Try using Google Chrome or
            Microsoft Edge.

        `);

        return;

    }


    const recognition =
        new SpeechRecognition();


    recognition.lang =
        languageSelect.value ||
        "en-IN";


    recognition.interimResults =
        false;


    recognition.maxAlternatives =
        1;


    recognition.start();


    addAIMessage(`

        <strong>
            Listening... 🎙️
        </strong>

        <br><br>

        Please speak your question.

    `);


    recognition.onresult =
        function(event) {

            const transcript =
                event.results[0][0]
                    .transcript;


            input.value =
                transcript;


            input.focus();

        };


    recognition.onerror =
        function() {

            addAIMessage(`

                <strong>
                    Voice input could not be started.
                </strong>

                <br><br>

                Please check your microphone
                permission and try again.

            `);

        };

}


/* =====================================================
   HELPERS
===================================================== */

function delay(ms) {

    return new Promise(
        resolve =>
            setTimeout(resolve, ms)
    );

}


function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}


/* =====================================================
   INITIALIZE
===================================================== */

/*
   IMPORTANT:

   The first page shown is the landing page.

   If you want automatic login on a returning
   user, uncomment the next line.
*/

// checkExistingLogin();


landing.style.display =
    "block";

loginPage.style.display =
    "none";

assistant.style.display =
    "none";