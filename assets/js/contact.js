const xhr = new XMLHttpRequest();
let isRecaptchaValidated = false;

function getFormData(form) {
    const elements = form.elements;
    let fields = ['name', 'email', 'message'];
    let formData = {};
    fields.forEach((key) => {
        let element = elements[key];
        formData[key] = element.value;
    });
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses";
    formData.formGoogleSendEmail = form.dataset.email || "";
    return formData;
}

function updateContactConfirmation(statusMessage, removedClasses, addedClasses) {
    document.querySelector('.js-notice-text').innerHTML = statusMessage;
    removedClasses.forEach((cssClass) => {
        document.querySelector('#contact-confirmation').classList?.remove(cssClass);
    });
    addedClasses.forEach((cssClass) => {
        document.querySelector('#contact-confirmation').classList?.add(cssClass);
    });
}

function onRecaptchaSuccess() {
    isRecaptchaValidated = true;
    updateContactConfirmation('', ['notice--danger', 'notice--info'], ['hidden']);
}

function onRecaptchaError() {
    isRecaptchaValidated = false;
}

function validateEmail(email) {
	return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

async function onSubmit(form) {
    const honeypot = form.querySelector('#honeypot').value;
    const email = form.querySelector('#email').value;
    if (!isRecaptchaValidated || honeypot) {
        updateContactConfirmation('Veuillez svp valider le reCAPTCHA.', ['hidden', 'notice--info'], ['notice--danger']);
        return;
    }
    if (!validateEmail(email)) {
        updateContactConfirmation('L\'adresse email est invalide.', ['hidden', 'notice--info'], ['notice--danger']);
        return;
    }
    const url = form.action;
    xhr.open('POST', url, true);
    xhr.onload = (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                form.reset();
                updateContactConfirmation('Merci pour votre message, je vous réponds bientôt&nbsp;!', ['hidden', 'notice--danger'], ['notice--info']);
            } else {
                form.reset();
                updateContactConfirmation('Une erreur est survenue lors de l\'envoi de votre message. Je vous invite à réessayer ultérieurement, ou à me contacter directement [contact.catherinephanvan(at)gmail.com] si le problème persiste.', ['hidden', 'notice--info'], ['notice--danger']);
            }
        }
    };
    xhr.onerror = (e) => {
        form.reset();
        updateContactConfirmation('Une erreur est survenue lors de l\'envoi de votre message. Je vous invite à réessayer ultérieurement, ou à me contacter directement [contact.catherinephanvan(at)gmail.com] si le problème persiste.', ['hidden', 'notice--info'], ['notice--danger']);
    };

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    const data = getFormData(form);
    const encoded = Object.keys(data).map((k) => {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    updateContactConfirmation('Envoi en cours&hellip;', ['hidden', 'notice--danger'], ['notice--info']);
    xhr.send(encoded);
}