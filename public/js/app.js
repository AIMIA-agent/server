const modules = ['Interest', 'Skills', 'Values', 'Personality', 'Needs', 'Functional Measures', 'Final Results'];
let activeModule = 'Interest';
let isDropdownOpen = false;
let messages = [];
let inputMessage = '';
let isAudioInput = false;
let activeAssessment = null;

const chatToggleButton = document.getElementById('chatToggleButton');
const dropdownToggleButton = document.getElementById('dropdownToggleButton');
const dropdownMenu = document.getElementById('dropdownMenu');
const chatContainer = document.getElementById('chatContainer');
const assessmentContainer = document.getElementById('assessmentContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const recordButton = document.getElementById('recordButton');
const audioToggleButton = document.getElementById('audioToggleButton');
const audioToggleThumb = document.getElementById('audioToggleThumb');
const modulesContainer = document.getElementById('modulesContainer');
const progressContainer = document.getElementById('progressContainer');
const inputContainer = document.getElementById('inputContainer');

function renderModules() {
    modulesContainer.innerHTML = '';
    modules.forEach(module => {
        const moduleDiv = document.createElement('div');
        moduleDiv.className = `px-2 py-1 rounded text-center ${module === activeModule ? 'bg-primary text-white' : modules.indexOf(module) < modules.indexOf(activeModule) ? 'bg-success text-white' : 'bg-secondary text-white'}`;
        moduleDiv.innerText = module;
        modulesContainer.appendChild(moduleDiv);
    });
}

async function handleSendMessage(event) {
    event.preventDefault();

    if (inputMessage.trim()) {
        messages.push({ user: 'You', text: inputMessage });
        const tempMessage = inputMessage;

        inputMessage = '';
        messageInput.value = '';

        renderMessages();

        try {
            const response = await fetch('https://grass-fifth-marmot.glitch.me/send_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: tempMessage,
                    chat_id: 2 // Assuming chat_id is related to the active module
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                console.error('Error from server:', data.error);
                messages.push({ user: 'AIMIA', text: 'Error from server: ' + data.error });
            } else {
                messages.push({ user: 'AIMIA', text: data.response });
            }
        } catch (error) {
            console.error('Error:', error);
            messages.push({ user: 'AIMIA', text: 'Error: ' + error.message });
        }

        renderMessages();
    }
}

function renderMessages() {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = '';
    messages.forEach((message, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `d-flex ${message.user === 'You' ? 'justify-content-end' : 'justify-content-start'} mb-2`;
        messageDiv.innerHTML = `
            <div class="chat-message p-2 rounded ${message.user === 'You' ? 'bg-primary text-white' : 'bg-light border'}">
                <strong>${message.user}</strong><br>${message.text}
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
    });

    // Scroll to the bottom of the chat messages
    const lastMessage = messagesContainer.lastElementChild;
    if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleNextModule() {
    const currentIndex = modules.indexOf(activeModule);
    if (currentIndex < modules.length - 1) {
        activeModule = modules[currentIndex + 1];
        renderModules();
    }
}

chatToggleButton.addEventListener('click', () => {
    document.querySelectorAll('.controls').forEach(control => {
        control.style.display = 'block';
    });
    assessmentContainer.style.display = 'none';
    chatContainer.style.display = 'block';  // Ensure chatbox is displayed
    activeAssessment = null;
});

dropdownToggleButton.addEventListener('click', () => {
    isDropdownOpen = !isDropdownOpen;
    dropdownMenu.style.display = isDropdownOpen ? 'block' : 'none';
});

dropdownMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const assessment = e.target.getAttribute('data-assessment');
        activeAssessment = assessment;
        assessmentContainer.style.display = 'block';
        document.getElementById('assessmentTitle').innerText = assessment;
        chatContainer.style.display = 'none';
        document.querySelectorAll('.controls').forEach(control => {
            control.style.display = 'none';
        });
        renderAssessmentContent();
    }
});

function renderAssessmentContent() {
    document.getElementById('assessmentContent').innerText = `Graphs and text for ${activeAssessment} would be displayed here.`;
}

messageInput.addEventListener('input', (e) => {
    inputMessage = e.target.value;
});

sendButton.addEventListener('click', handleSendMessage);

audioToggleButton.addEventListener('click', () => {
    isAudioInput = !isAudioInput;
    audioToggleThumb.style.transform = isAudioInput ? 'translateX(24px)' : '';
    recordButton.style.display = isAudioInput ? 'block' : 'none';
    sendButton.style.display = isAudioInput ? 'none' : 'block';
});

renderModules();
