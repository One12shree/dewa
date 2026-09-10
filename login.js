async function inheritHomepageFooter() {
    try {
        const response = await fetch('./index.html', { cache: 'no-store' });
        if (!response.ok) return;

        const homepage = new DOMParser().parseFromString(await response.text(), 'text/html');
        const homepageFooter = homepage.querySelector('.site-footer');
        const homepageDock = homepage.querySelector('.m13-footer--floating_inner');
        const currentFooter = document.querySelector('.login-footer');
        const currentDock = document.querySelector('.m13-footer--floating_inner');

        if (!homepageFooter || !homepageDock || !currentFooter || !currentDock) return;

        [homepageFooter, homepageDock].forEach((section) => {
            section.querySelectorAll('a').forEach((link) => {
                link.href = '#';
                link.removeAttribute('target');
                link.removeAttribute('rel');
                link.addEventListener('click', (event) => event.preventDefault());
            });
        });

        currentFooter.replaceWith(homepageFooter);
        currentDock.replaceWith(homepageDock);
    } catch (error) {
        console.warn('Homepage footer fallback is being used.');
    }
}

inheritHomepageFooter();

const roleOptions = {
    Consumer: {
        title: 'Consumer Sign In',
        credentialsTitle: 'For Businesses and Non-Emirates ID holders',
        description: 'Business and Non-Emirates ID holders may sign in using their DEWA credentials',
        username: 'Username',
        profile: 'Create Online Profile',
        uaePass: true
    },
    Builder: {
        title: 'Builder Sign In',
        credentialsTitle: 'For Builders',
        description: 'Builders may sign in using their DEWA credentials',
        username: 'Username',
        profile: 'Register as a Builder',
        uaePass: false
    },
    Supplier: {
        title: 'Supplier Sign In',
        credentialsTitle: 'For Suppliers',
        description: 'Suppliers may sign in using their DEWA credentials',
        username: 'Username',
        profile: 'Register as a Supplier',
        uaePass: false
    },
    Government: {
        title: 'Government Sign In',
        credentialsTitle: 'For Government Users',
        description: 'Government users may sign in using their DEWA credentials',
        username: 'Username',
        profile: 'Create Online Profile',
        uaePass: false
    },
    'Job Seeker': {
        title: 'Job Seeker Sign In',
        credentialsTitle: 'For Job Seekers',
        description: 'Job seekers may sign in to access their profile',
        username: 'Email or Username',
        profile: 'Create Job Seeker Profile',
        uaePass: false
    },
    'Other User': {
        title: 'Other User Sign In',
        credentialsTitle: 'For Other Users',
        description: 'Other users may sign in using their DEWA credentials',
        username: 'Username',
        profile: 'Create Online Profile',
        uaePass: false
    }
};

const loginForm = document.getElementById('localLoginForm');
const roleButtons = document.querySelectorAll('[data-login-role]');
const usernameInput = document.getElementById('form-field-login-main-username');
const passwordInput = document.getElementById('form-field-login-main-password');
const usernameValidation = document.getElementById('usernameValidation');
const passwordValidation = document.getElementById('passwordValidation');
const passwordToggle = document.querySelector('.login-password-toggle');
const loginSubmitButton = document.getElementById('loginSubmitButton');
const demoMessage = document.getElementById('loginDemoMessage');
let selectedRole = 'Consumer';

function setValidationState(input, messageElement, message) {
    const hasError = Boolean(message);
    input.classList.toggle('is-invalid', hasError);
    input.setAttribute('aria-invalid', String(hasError));
    messageElement.textContent = message;
    messageElement.hidden = !hasError;
    return !hasError;
}

function validateUsername() {
    const value = usernameInput.value.trim();

    if (!value) {
        return setValidationState(usernameInput, usernameValidation, selectedRole === 'Job Seeker' ? 'Enter your email or username.' : 'Enter your username.');
    }

    if (selectedRole === 'Job Seeker' && value.includes('@')) {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        return setValidationState(usernameInput, usernameValidation, validEmail ? '' : 'Enter a valid email address, for example name@example.com.');
    }

    return setValidationState(usernameInput, usernameValidation, /^[A-Za-z0-9]+$/.test(value) ? '' : 'Username can contain letters and numbers only.');
}

function validatePassword() {
    const value = passwordInput.value;

    if (!value) {
        return setValidationState(passwordInput, passwordValidation, 'Enter your password.');
    }

    const strongPassword = value.length >= 8
        && /[a-z]/.test(value)
        && /[A-Z]/.test(value)
        && /\d/.test(value)
        && /[^A-Za-z0-9]/.test(value);

    return setValidationState(
        passwordInput,
        passwordValidation,
        strongPassword ? '' : 'Use 8+ characters with uppercase, lowercase, number, and special character.'
    );
}

function clearValidation() {
    setValidationState(usernameInput, usernameValidation, '');
    setValidationState(passwordInput, passwordValidation, '');
}

function selectRole(role) {
    selectedRole = role;
    const option = roleOptions[role];
    document.getElementById('roleSignInTitle').textContent = option.title;
    document.getElementById('credentialsTitle').textContent = option.credentialsTitle;
    document.getElementById('credentialsDescription').textContent = option.description;
    document.getElementById('usernameLabel').firstChild.textContent = option.username + ' ';
    usernameInput.placeholder = option.username;
    usernameInput.inputMode = role === 'Job Seeker' ? 'email' : 'text';
    const createProfileButton = document.getElementById('createProfileButton');
    createProfileButton.textContent = option.profile;
    createProfileButton.setAttribute('aria_label', option.profile);
    document.getElementById('uaePassArea').hidden = !option.uaePass;
    loginForm.reset();
    clearValidation();
    demoMessage.hidden = true;

    roleButtons.forEach((button) => {
        const active = button.dataset.loginRole === role;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
    });
}

roleButtons.forEach((button) => button.addEventListener('click', () => selectRole(button.dataset.loginRole)));

usernameInput.addEventListener('input', () => {
    if (!usernameValidation.hidden) validateUsername();
});
usernameInput.addEventListener('blur', validateUsername);
passwordInput.addEventListener('input', () => {
    if (!passwordValidation.hidden) validatePassword();
});
passwordInput.addEventListener('blur', validatePassword);

passwordToggle.addEventListener('click', () => {
    const showPassword = passwordInput.type === 'password';
    passwordInput.type = showPassword ? 'text' : 'password';
    passwordToggle.setAttribute('aria-pressed', String(showPassword));
    passwordToggle.setAttribute('aria_label', showPassword ? 'Hide password' : 'Show password');
    passwordToggle.setAttribute('start_icon', showPassword ? 'visibility_off' : 'visibility');
});

loginSubmitButton.addEventListener('click', () => loginForm.requestSubmit());

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const usernameIsValid = validateUsername();
    const passwordIsValid = validatePassword();

    if (!usernameIsValid || !passwordIsValid) {
        demoMessage.hidden = true;
        (usernameIsValid ? passwordInput : usernameInput).focus();
        return;
    }

    demoMessage.textContent = selectedRole + ' sign-in is a non-functional frontend preview. No details were sent or stored.';
    demoMessage.hidden = false;
});

document.getElementById('uaePassButton').addEventListener('click', () => {
    demoMessage.textContent = 'UAE Pass is a non-functional frontend preview. No external page was opened.';
    demoMessage.hidden = false;
});
