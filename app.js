/* =========================================================
   INGRES AI FRONTEND
========================================================= */


/* =========================================================
   LANGUAGES
========================================================= */

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


/* =========================================================
   LANDING
========================================================= */

function openAssistant() {

    document.getElementById("landing").style.display = "none";

    document.getElementById("assistant").style.display = "block";

    window.scrollTo(0, 0);

}


function scrollToFeatures() {

    document
        .getElementById("features")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   LANGUAGE SELECT
========================================================= */

const languageSelect =
    document.getElementById("languageSelect");

const languageCloud =
    document.getElementById("languageCloud");


Object.entries(languages).forEach(
    ([name, code]) => {

        const option =
            document.createElement("option");

        option.value = code;

        option.textContent = name;

        languageSelect.appendChild(option);


        const tag =
            document.createElement("div");

        tag.className = "language-tag";

        tag.textContent = name;

        languageCloud.appendChild(tag);

    }
);


languageSelect.value = "en-IN";


function languageChanged() {

    const selected =
        languageSelect.options[
            languageSelect.selectedIndex
        ].text;

    addAIMessage(

        `Language switched to <strong>${selected}</strong> 🌐.<br><br>
         You can now interact with INGRES AI using your selected language.`

    );

}


/* =========================================================
   INPUT
========================================================= */

const input =
    document.getElementById("messageInput");


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

        this.style.height = "auto";

        this.style.height =
            Math.min(
                this.scrollHeight,
                130
            ) + "px";

    }
);


/* =========================================================
   MESSAGE HELPERS
========================================================= */

function addUserMessage(text) {

    const messages =
        document.getElementById("messages");


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


    messages.appendChild(element);

    scrollMessages();

}


function addAIMessage(html) {

    const messages =
        document.getElementById("messages");


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


    messages.appendChild(element);

    scrollMessages();

}


function showTyping() {

    const messages =
        document.getElementById("messages");


    const element =
        document.createElement("div");

    element.id = "typingIndicator";

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


    messages.appendChild(element);

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


function scrollMessages() {

    const messages =
        document.getElementById("messages");

    messages.scrollTop =
        messages.scrollHeight;

}


/* =========================================================
   SEND MESSAGE
========================================================= */

async function sendMessage() {

    const text = input.value.trim();

    if (!text)
        return;

    addUserMessage(text);

    input.value = "";
    input.style.height = "auto";

    showTyping();

    try {

        // Send the user's message to our FastAPI backend
        const response = await fetch("http://127.0.0.1:8001/api/chat", {

            // Our FastAPI /api/chat endpoint accepts POST requests
            method: "POST",

            // Tell FastAPI that we're sending JSON
            headers: {
                "Content-Type": "application/json"
            },

            // Convert JavaScript object into JSON
            body: JSON.stringify({
                message: text,
                language: languageSelect.value
            })
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Convert backend JSON response into JavaScript object
        const data = await response.json();

        if (!data || typeof data.answer !== "string") {
            throw new Error("Backend returned an invalid chat response");
        }

        removeTyping();

        // Display the answer returned by FastAPI
        addAIMessage(data.answer);

    } catch (error) {

        removeTyping();

        addAIMessage(
            '<strong>Backend Connection Failed.</strong>'
        );

        console.error("INGRES backend error:", error);
    }
}


/* =========================================================
   PRESET QUESTIONS
========================================================= */

function askPreset(question) {

    input.value = question;

    sendMessage();

}


/* =========================================================
   INGRES RESPONSE ENGINE
========================================================= */

function generateINGRESResponse(question) {

    const q =
        question.toLowerCase();


    /* WHAT IS INGRES */

    if (
        q.includes("what is ingres") ||
        q.includes("ingres kya") ||
        q.includes("ingres क्या")
    ) {

        return `

            <strong>What is INGRES? 💧</strong>

            <br><br>

            INGRES is the groundwater-resource assessment
            platform associated with India's groundwater
            resource assessment ecosystem.

            <br><br>

            It helps organize, assess and disseminate
            groundwater-resource information.

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
        q.includes("भूजल पुनर्भरण")
    ) {

        return `

            <strong>Groundwater Recharge 🌊</strong>

            <br><br>

            Groundwater recharge refers to the process
            through which water enters and replenishes
            underground aquifer systems.

            <div class="ai-card">

                <strong>INGRES perspective</strong>

                <br><br>

                Recharge is one of the important components
                considered during groundwater-resource
                assessment.

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

            <strong>Groundwater Extraction 📊</strong>

            <br><br>

            Groundwater extraction represents the amount
            of groundwater withdrawn for different uses.

            <br><br>

            INGRES-related assessment information can be
            used to understand extraction relative to
            available groundwater resources.

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

            <strong>Groundwater Status 🗺️</strong>

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

            You can use the map to explore locations
            and visualize groundwater-related information.

        `;

    }


    /* GRAPH */

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

            I've generated a visualization area for
            groundwater-resource trends.

        `;

    }


    /* HINDI */

    if (
        q.includes("नमस्ते") ||
        q.includes("भूजल") ||
        q.includes("आईएनजीआरईएस")
    ) {

        return `

            <strong>नमस्ते! 🇮🇳</strong>

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

            <strong>Namaste! 👋</strong>

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

        For a production version, this question will
        be sent to the INGRES AI backend and retrieved
        against the official INGRES/CGWB knowledge base.

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


/* =========================================================
   MAP
========================================================= */

let groundwaterMap = null;


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

        </div>

        <div class="map-container">

            <div id="groundwaterMap"></div>

        </div>

    `);


    setTimeout(() => {
    initializeMap();

    const mapElement =
        document.getElementById("groundwaterMap");

    if (mapElement) {
        mapElement.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}, 150);

}


function initializeMap() {

    if (typeof L === "undefined") {
        addAIMessage(`
            <strong>Map unavailable</strong>
            <br><br>
            The map library could not be loaded. Check your internet connection
            and reload the page.
        `);
        return;
    }

    const mapElement =
        document.getElementById("groundwaterMap");

    if (!mapElement)
        return;

    // Force a visible map height
    mapElement.style.width = "100%";
    mapElement.style.height = "450px";
    mapElement.style.minHeight = "450px";

    // Remove previous map if it exists
    if (groundwaterMap) {
        groundwaterMap.remove();
        groundwaterMap = null;
    }

    // Create map
    groundwaterMap = L.map("groundwaterMap", {
        center: [28.6139, 77.2090],
        zoom: 6
    });

    // OpenStreetMap tiles
    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap contributors",
            maxZoom: 19
        }
    ).addTo(groundwaterMap);

    // Demo groundwater locations
    const locations = [
        {
            name: "Haryana",
            lat: 29.0588,
            lon: 76.0856,
            status: "Groundwater assessment available"
        },
        {
            name: "Punjab",
            lat: 31.1471,
            lon: 75.3412,
            status: "Groundwater assessment available"
        },
        {
            name: "Rajasthan",
            lat: 27.0238,
            lon: 74.2179,
            status: "Groundwater assessment available"
        },
        {
            name: "Himachal Pradesh",
            lat: 31.1048,
            lon: 77.1734,
            status: "Groundwater assessment available"
        }
    ];

    // Add markers
    locations.forEach(location => {

        L.marker([
            location.lat,
            location.lon
        ])
        .addTo(groundwaterMap)
        .bindPopup(`
            <strong>${location.name}</strong>

            <br><br>

            ${location.status}

            <br><br>

            <button
                onclick="locationSelected('${location.name}')"
            >
                Explore →
            </button>
        `);

    });

    // Tell Leaflet the container has been resized
    setTimeout(() => {
        groundwaterMap.invalidateSize();
    }, 100);
}
async function locationSelected(name) {

    addAIMessage(`
        <strong>📍 ${name} selected</strong>
        <br><br>
        Loading groundwater information...
    `);

    try {

        const language = languageSelect.value;

        const response = await fetch(
            `http://127.0.0.1:8001/api/groundwater/state/${encodeURIComponent(name)}?language=${encodeURIComponent(language)}`
        );
        if (!response.ok) {
            throw new Error("Groundwater data not found");
        }

        const data = await response.json();

        if (!data || data.error || !data.location) {
            throw new Error(data?.error || "Groundwater data not found");
        }

        addAIMessage(`
            <strong>💧 Groundwater Status — ${data.location}</strong>

            <br><br>

            <div class="ai-card">

                💧 <strong>Recharge:</strong>
                ${data.recharge} BCM

                <br><br>

                🚰 <strong>Extraction:</strong>
                ${data.extraction} BCM

                <br><br>

                ⚠️ <strong>Extraction Stage:</strong>
                ${data.stage}%

                <br><br>

                🏷️ <strong>Category:</strong>
                ${data.category}

            </div>

            <br>

            <strong>🗣️ Simple Explanation</strong>

            <br><br>

            ${data.explanation}
        `);

    } catch (error) {

        console.error("Groundwater error:", error);

        addAIMessage(`
            <strong>⚠️ Unable to load groundwater data</strong>
            <br><br>
            Please try again.
        `);
    }
}


const locations = [

    {
        name: "Haryana",
        lat: 29.0588,
        lon: 76.0856,
        status: "Groundwater assessment available"
    },

    {
        name: "Punjab",
        lat: 31.1471,
        lon: 75.3412,
        status: "Groundwater assessment available"
    },

    {
        name: "Rajasthan",
        lat: 27.0238,
        lon: 74.2179,
        status: "Groundwater assessment available"
    },

    {
        name: "Himachal Pradesh",
        lat: 31.1048,
        lon: 77.1734,
        status: "Groundwater assessment available"
    }

];

/* =========================================================
   ANALYTICS
========================================================= */

function showAnalytics() {

    addAIMessage(`

        <strong>
            Groundwater Analytics 📊
        </strong>

        <br><br>

        Sample visualization interface for
        INGRES groundwater-resource data.

        <div class="ai-card">

            <div class="chart-container">

                <canvas id="groundwaterChart"></canvas>

            </div>

        </div>

        <small style="color:#555f70">
            Demo visualization — connect the chart
            to live INGRES data through the backend.
        </small>

    `);


    setTimeout(
        initializeChart,
        150
    );

}


function initializeChart() {

    if (typeof Chart === "undefined") {
        addAIMessage(`
            <strong>Analytics unavailable</strong>
            <br><br>
            The chart library could not be loaded. Check your internet connection
            and reload the page.
        `);
        return;
    }

    const canvas =
        document.getElementById(
            "groundwaterChart"
        );


    if (!canvas)
        return;


    new Chart(
        canvas,
        {

            type: "line",

            data: {

                labels: [
                    "2020",
                    "2021",
                    "2022",
                    "2023",
                    "2024",
                    "2025"
                ],

                datasets: [

                    {

                        label:
                            "Groundwater Extraction",

                        data: [
                            52,
                            57,
                            61,
                            66,
                            70,
                            73
                        ],

                        borderWidth: 2,

                        tension: .4,

                        pointRadius: 3

                    },

                    {

                        label:
                            "Recharge",

                        data: [
                            82,
                            80,
                            79,
                            77,
                            76,
                            74
                        ],

                        borderWidth: 2,

                        tension: .4,

                        pointRadius: 3

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        labels: {

                            color: "#8d98a8",

                            font: {
                                size: 9
                            }

                        }

                    }

                },

                scales: {

                    x: {

                        ticks: {

                            color: "#657082",

                            font: {
                                size: 8
                            }

                        },

                        grid: {

                            color:
                                "rgba(255,255,255,.04)"

                        }

                    },

                    y: {

                        ticks: {

                            color: "#657082",

                            font: {
                                size: 8
                            }

                        },

                        grid: {

                            color:
                                "rgba(255,255,255,.04)"

                        }

                    }

                }

            }

        }
    );

}


/* =========================================================
   VOICE ASSISTANT
========================================================= */

let recognition = null;


function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        addAIMessage(`

            <strong>
                Voice recognition unavailable 🎙️
            </strong>

            <br><br>

            Please use a browser that supports
            Web Speech Recognition, such as a
            compatible version of Chrome.

        `);

        return;

    }


    recognition =
        new SpeechRecognition();


    recognition.lang =
        languageSelect.value;


    recognition.continuous = false;

    recognition.interimResults = true;


    const voiceButton =
        document.getElementById(
            "voiceButton"
        );


    voiceButton.classList.add(
        "listening"
    );


    input.placeholder =
        "Listening... 🎙️";


    recognition.onresult =
        function(event) {

            let transcript = "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                transcript +=
                    event.results[i][0]
                        .transcript;

            }


            input.value =
                transcript;

        };


    recognition.onend =
        function() {

            voiceButton.classList.remove(
                "listening"
            );

            input.placeholder =
                "Ask anything about INGRES...";

        };


    recognition.onerror =
        function() {

            voiceButton.classList.remove(
                "listening"
            );

            input.placeholder =
                "Ask anything about INGRES...";

        };


    recognition.start();

}


/* =========================================================
   TEXT TO SPEECH
========================================================= */

function speak(text) {

    if (
        !window.speechSynthesis
    )
        return;


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    utterance.lang =
        languageSelect.value;


    window.speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   FILE UPLOAD
========================================================= */

function fileSelected(event) {

    const file =
        event.target.files[0];


    if (!file)
        return;


    addUserMessage(
        `📎 Uploaded document: ${file.name}`
    );


    showTyping();


    setTimeout(
        () => {

            removeTyping();


            addAIMessage(`

                <strong>
                    Document received 📄
                </strong>

                <br><br>

                <strong>
                    ${escapeHTML(file.name)}
                </strong>

                is ready for processing.

                <br><br>

                In the production version,
                the backend will extract the document
                content and add it to the INGRES RAG
                pipeline for question answering.

            `);

        },
        900
    );

}


/* =========================================================
   NEW CHAT
========================================================= */

function newChat() {

    const messages =
        document.getElementById(
            "messages"
        );


    messages.innerHTML = `

        <div class="welcome">

            <div class="welcome-icon">
                💧
            </div>

            <h2>
                New INGRES conversation.
            </h2>

            <p>
                What would you like to explore?
            </p>

        </div>

    `;

}


/* =========================================================
   UTILS
========================================================= */

function delay(ms) {

    return new Promise(
        resolve => setTimeout(
            resolve,
            ms
        )
    );

}


function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}