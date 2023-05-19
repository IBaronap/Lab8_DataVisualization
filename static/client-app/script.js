// const socketURL = `${window.location.hostname}`;

// let socket = io(socketURL, { path: '/real-time' });

const form = document.querySelector('form');
const formInputs = document.querySelectorAll('.form-input');
const privacyCheckbox = document.querySelector('.form-checkbox');
const submitBtn = document.querySelector('.form-btn');

const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const inputDOB = document.querySelector('#dob');
const inputPhone = document.querySelector('#phone');
const inputPrivacy = document.querySelector('#privacy-agreement');

console.log(formInputs)
let inputStates = {
    hasName: false,
    hasEmail: false,
    hasDOB: false,
    hasPhone: false,
    hasAgree: false,
};
console.log(`inputStates:`);
console.log(inputStates)

const checkInputs = (event) => {
    //let { hasName, hasEmail, hasDOB, hasPhone, hasAgree } = inputStates;
    inputStates.hasName = inputName.value != '' ? true : false;
    inputStates.hasEmail = inputEmail.value != '' ? true : false;
    inputStates.hasDOB = inputDOB.value != '' ? true : false;
    inputStates.hasPhone = inputPhone.value != '' ? true : false;
    inputStates.hasAgree = inputPrivacy.checked;

    console.log(`inputStates:`);
    console.table(inputStates);
    let { hasName, hasEmail, hasDOB, hasPhone, hasAgree } = inputStates

    if (hasName && hasEmail && hasDOB && hasPhone && hasAgree) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
    return event;
}

privacyCheckbox.addEventListener('change', checkInputs);
formInputs.forEach(input => {
    input.addEventListener('input', checkInputs);
});


function resetInputs() {
    formInputs.forEach(input => {
        input.value = '';
    })
    privacyCheckbox.checked = false;
    submitBtn.disabled = true;
}

form.addEventListener('submit', (e) => {
    let DeviceType;

    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        DeviceType = 'iOS'; //Añadido a userData
    } else if (/Android/.test(navigator.userAgent)) {
        DeviceType = 'Android'; //Añadido a userData
    } else {
        DeviceType = 'Desktop'; //Añadido a userData
    };

    //Get time
    let now = new Date();

    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    Submit_Time = `${hours}:${minutes}`;

    //Get day

    let options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    let dateWithoutCommas = now.toLocaleDateString('en-US', options).replace(/,/g, '');
    Submit_Date = dateWithoutCommas;

    e.preventDefault();
    newUser = {
        name: inputName.value,
        email: inputEmail.value,
        dob:inputDOB.value,
        phone:inputPhone.value,
        privacyAgreement: inputPrivacy.checked,
        OS: DeviceType,
        timeStamp: Submit_Time,
        date: Submit_Date
    };
    sendUserData(newUser);
    resetInputs();
    console.log(`submited:`);
    console.log(newUser);
});

async function sendUserData(newUser) {
    console.log(':D POST');
    
    const posted = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }
    
    // socket.emit('data-update', 'Update');

    return await fetch(`/user`, posted);
}