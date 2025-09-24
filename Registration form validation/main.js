// Get DOM elements
const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const resetBtn = document.getElementById('resetBtn');

// Form inputs
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const dateOfBirth = document.getElementById('dateOfBirth');
const terms = document.getElementById('terms');

// Error message elements
const firstNameError = document.getElementById('firstNameError');
const lastNameError = document.getElementById('lastNameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const dateOfBirthError = document.getElementById('dateOfBirthError');
const genderError = document.getElementById('genderError');
const termsError = document.getElementById('termsError');

// Password requirement elements
const lengthReq = document.getElementById('length');
const uppercaseReq = document.getElementById('uppercase');
const lowercaseReq = document.getElementById('lowercase');
const numberReq = document.getElementById('number');
const specialReq = document.getElementById('special');

// Validation functions
function validateFirstName() {
    const value = firstName.value.trim();
    if (value.length < 2) {
        showError(firstNameError, 'First name must be at least 2 characters long');
        setInputState(firstName, false);
        return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
        showError(firstNameError, 'First name should only contain letters');
        setInputState(firstName, false);
        return false;
    }
    clearError(firstNameError);
    setInputState(firstName, true);
    return true;
}

function validateLastName() {
    const value = lastName.value.trim();
    if (value.length < 2) {
        showError(lastNameError, 'Last name must be at least 2 characters long');
        setInputState(lastName, false);
        return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
        showError(lastNameError, 'Last name should only contain letters');
        setInputState(lastName, false);
        return false;
    }
    clearError(lastNameError);
    setInputState(lastName, true);
    return true;
}

function validateEmail() {
    const value = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        showError(emailError, 'Please enter a valid email address');
        setInputState(email, false);
        return false;
    }
    clearError(emailError);
    setInputState(email, true);
    return true;
}

function validatePhone() {
    const value = phone.value.trim();
    // Remove all non-digit characters for validation
    const digitsOnly = value.replace(/\D/g, '');
    
    if (digitsOnly.length < 10) {
        showError(phoneError, 'Phone number must be at least 10 digits');
        setInputState(phone, false);
        return false;
    }
    if (digitsOnly.length > 15) {
        showError(phoneError, 'Phone number cannot exceed 15 digits');
        setInputState(phone, false);
        return false;
    }
    clearError(phoneError);
    setInputState(phone, true);
    return true;
}

function validatePassword() {
    const value = password.value;
    let isValid = true;
    
    // Check length requirement
    if (value.length >= 8) {
        lengthReq.classList.add('valid');
    } else {
        lengthReq.classList.remove('valid');
        isValid = false;
    }
    
    // Check uppercase requirement
    if (/[A-Z]/.test(value)) {
        uppercaseReq.classList.add('valid');
    } else {
        uppercaseReq.classList.remove('valid');
        isValid = false;
    }
    
    // Check lowercase requirement
    if (/[a-z]/.test(value)) {
        lowercaseReq.classList.add('valid');
    } else {
        lowercaseReq.classList.remove('valid');
        isValid = false;
    }
    
    // Check number requirement
    if (/\d/.test(value)) {
        numberReq.classList.add('valid');
    } else {
        numberReq.classList.remove('valid');
        isValid = false;
    }
    
    // Check special character requirement
    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        specialReq.classList.add('valid');
    } else {
        specialReq.classList.remove('valid');
        isValid = false;
    }
    
    if (!isValid) {
        showError(passwordError, 'Password does not meet all requirements');
        setInputState(password, false);
        return false;
    }
    
    clearError(passwordError);
    setInputState(password, true);
    
    // Revalidate confirm password if it has a value
    if (confirmPassword.value) {
        validateConfirmPassword();
    }
    
    return true;
}

function validateConfirmPassword() {
    const value = confirmPassword.value;
    const passwordValue = password.value;
    
    if (value !== passwordValue) {
        showError(confirmPasswordError, 'Passwords do not match');
        setInputState(confirmPassword, false);
        return false;
    }
    
    if (value === '') {
        showError(confirmPasswordError, 'Please confirm your password');
        setInputState(confirmPassword, false);
        return false;
    }
    
    clearError(confirmPasswordError);
    setInputState(confirmPassword, true);
    return true;
}

function validateDateOfBirth() {
    const value = dateOfBirth.value;
    if (!value) {
        showError(dateOfBirthError, 'Date of birth is required');
        setInputState(dateOfBirth, false);
        return false;
    }
    
    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if (age < 13) {
        showError(dateOfBirthError, 'You must be at least 13 years old to register');
        setInputState(dateOfBirth, false);
        return false;
    }
    
    if (age > 120) {
        showError(dateOfBirthError, 'Please enter a valid date of birth');
        setInputState(dateOfBirth, false);
        return false;
    }
    
    clearError(dateOfBirthError);
    setInputState(dateOfBirth, true);
    return true;
}

function validateGender() {
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const isSelected = Array.from(genderInputs).some(input => input.checked);
    
    if (!isSelected) {
        showError(genderError, 'Please select your gender');
        return false;
    }
    
    clearError(genderError);
    return true;
}

function validateTerms() {
    if (!terms.checked) {
        showError(termsError, 'You must agree to the terms and conditions');
        return false;
    }
    
    clearError(termsError);
    return true;
}

// Utility functions
function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

function setInputState(input, isValid) {
    input.classList.remove('valid', 'invalid');
    if (isValid) {
        input.classList.add('valid');
    } else {
        input.classList.add('invalid');
    }
}

// Real-time validation event listeners
firstName.addEventListener('blur', validateFirstName);
firstName.addEventListener('input', () => {
    if (firstName.value.trim().length > 0) {
        validateFirstName();
    }
});

lastName.addEventListener('blur', validateLastName);
lastName.addEventListener('input', () => {
    if (lastName.value.trim().length > 0) {
        validateLastName();
    }
});

email.addEventListener('blur', validateEmail);
email.addEventListener('input', () => {
    if (email.value.trim().length > 0) {
        validateEmail();
    }
});

phone.addEventListener('blur', validatePhone);
phone.addEventListener('input', () => {
    if (phone.value.trim().length > 0) {
        validatePhone();
    }
});

password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validateConfirmPassword);
dateOfBirth.addEventListener('change', validateDateOfBirth);

// Gender radio buttons validation
const genderInputs = document.querySelectorAll('input[name="gender"]');
genderInputs.forEach(input => {
    input.addEventListener('change', validateGender);
});

// Terms checkbox validation
terms.addEventListener('change', validateTerms);

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const validations = [
        validateFirstName(),
        validateLastName(),
        validateEmail(),
        validatePhone(),
        validatePassword(),
        validateConfirmPassword(),
        validateDateOfBirth(),
        validateGender(),
        validateTerms()
    ];
    
    // Check if all validations passed
    const isFormValid = validations.every(validation => validation === true);
    
    if (isFormValid) {
        // Show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Log form data (in real app, this would be sent to server)
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        console.log('Registration Data:', data);
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.error-message:not(:empty)');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Reset form handler
resetBtn.addEventListener('click', function() {
    // Reset form
    form.reset();
    
    // Clear all validation states
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
    
    // Clear all error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    // Reset password requirements
    const requirements = document.querySelectorAll('.password-requirements li');
    requirements.forEach(req => {
        req.classList.remove('valid');
    });
    
    // Show form and hide success message
    form.style.display = 'flex';
    successMessage.style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Phone number formatting (optional enhancement)
phone.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    let formattedValue = '';
    
    if (value.length >= 6) {
        formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
        formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else {
        formattedValue = value;
    }
    
    e.target.value = formattedValue;
});

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    // Set max date for date of birth (today)
    const today = new Date().toISOString().split('T')[0];
    dateOfBirth.setAttribute('max', today);
    
    // Set min date (120 years ago)
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 120);
    dateOfBirth.setAttribute('min', minDate.toISOString().split('T')[0]);
});