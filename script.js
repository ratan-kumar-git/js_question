// Digital Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// Word Counter
const inputText = document.getElementById('inputText');
inputText.addEventListener('input', () => {
    const text = inputText.value.trim();
    const words = text.split(/\s+/).filter(word => word.length > 0);
    document.getElementById('wordCount').textContent = words.length;
    document.getElementById('charCount').textContent = text.length;
});

// Password Strength Meter
const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

function checkStrength(password) {
    let strength = 0;
    if (password.length > 0) strength++; // At least one character
    if (password.length >= 6) strength++; // Minimum 6 characters
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++; // Upper and lower case
    if (/\d/.test(password)) strength++; // Contains number
    if (/[@$!%*?&#]/.test(password)) strength++; // Special character

    // Update strength bar and text based on strength value
    switch (strength) {
        case 0:
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '#ddd';
            strengthText.textContent = 'Strength: Too Weak';
            break;
        case 1:
        case 2:
            strengthBar.style.width = '33%';
            strengthBar.style.backgroundColor = '#ff4d4d';
            strengthText.textContent = 'Strength: Weak';
            break;
        case 3:
            strengthBar.style.width = '66%';
            strengthBar.style.backgroundColor = '#ffcc00';
            strengthText.textContent = 'Strength: Medium';
            break;
        case 4:
        case 5:
            strengthBar.style.width = '100%';
            strengthBar.style.backgroundColor = '#4caf50';
            strengthText.textContent = 'Strength: Strong';
            break;
    }
}

// Listen for input changes
passwordInput.addEventListener('input', () => {
    checkStrength(passwordInput.value);
});

// Contact Form
const form = document.getElementById('contactForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

const errors = {
    nameError: document.getElementById('nameError'),
    emailError: document.getElementById('emailError'),
    subjectError: document.getElementById('subjectError'),
    messageError: document.getElementById('messageError'),
};

function clearErrors() {
    for (let key in errors) {
        errors[key].textContent = '';
    }
}

function validateForm() {
    clearErrors();
    let isValid = true;

    if (name.value.trim() === '') {
        errors.nameError.textContent = 'Name is required';
        isValid = false;
    }

    if (email.value.trim() === '') {
        errors.emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        errors.emailError.textContent = 'Invalid email format';
        isValid = false;
    }

    if (subject.value.trim() === '') {
        errors.subjectError.textContent = 'Subject is required';
        isValid = false;
    }

    if (message.value.trim() === '') {
        errors.messageError.textContent = 'Message is required';
        isValid = false;
    }

    return isValid;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        successMessage.textContent = 'Thank you for contacting us!';
        form.reset();
        setTimeout(() => (successMessage.textContent = ''), 3000);
    }
});

// Weather App
const apiKey = 'd0fad22818683310f1793de4c45df34f';
document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('weatherInfo').innerHTML = `
          <p><strong>${data.name}</strong></p>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Condition: ${data.weather[0].description}</p>
        `;
        })
        .catch(() => {
            document.getElementById('errorMessage').textContent = 'City not found.';
        });
});