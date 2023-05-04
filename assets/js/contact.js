const xhr = new XMLHttpRequest();
let isRecaptchaValidated = false;

function getFormData(form) {
    const elements = form.elements;
    const currentTimestamp= new Date();
    let fields = ['name', 'email', 'message', 'url'];
    let formData = {};
    fields.forEach((key) => {
        let element = elements[key];
        formData[key] = element?.value;
    });
    if (form.id === "new_comment") {
        formData.date = currentTimestamp.toLocaleString('fr-FR');
        formData.id = currentTimestamp.valueOf() + '-' + elements.name?.value;
        formData.pageId = form.querySelector('#pageIdForComment').innerText;
        fields.push('date', 'id', 'pageId');
    }
    fields.push('type');
    formData.type = form.id;
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

async function onSubmit(form) {
    const honeypot = form.querySelector('#honeypot').value;
    const email = form.querySelector('#email').value;
    const formId = form.id;
    if (!isRecaptchaValidated || honeypot) {
        updateContactConfirmation('Veuillez svp valider le reCAPTCHA.', ['hidden', 'notice--info'], ['notice--danger']);
        return;
    }
    if ((formId === 'new_contact' || email !== '') && !(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
        updateContactConfirmation('L\'adresse email est invalide.', ['hidden', 'notice--info'], ['notice--danger']);
        return;
    }
    const url = form.action;
    const ackMessage = formId === 'new_comment' ? 'Merci pour votre commentaire, il sera visible sur le site une fois approuvé.'
        : 'Merci pour votre message, je vous réponds bientôt&nbsp;!';
    const errMessage = formId === 'new_comment' ? 'Une erreur imprévue s\'est produite lors de la soumission de votre commentaire. Je vous invite à réessayer ultérieurement, ou à me contacter directement si le problème persiste.'
        : 'Une erreur est survenue lors de l\'envoi de votre message. Je vous invite à réessayer ultérieurement, ou à me contacter directement [contact.catherinephanvan(at)gmail.com] si le problème persiste.';
    xhr.open('POST', url, true);
    xhr.onload = (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                form.reset();
                
                updateContactConfirmation(ackMessage, ['hidden', 'notice--danger'], ['notice--info']);
            } else {
                form.reset();
                updateContactConfirmation(errMessage, ['hidden', 'notice--info'], ['notice--danger']);
            }
        }
    };
    xhr.onerror = (e) => {
        form.reset();
        updateContactConfirmation(errMessage, ['hidden', 'notice--info'], ['notice--danger']);
    };

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    const data = getFormData(form);
    const encoded = Object.keys(data).map((k) => {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    updateContactConfirmation('Envoi en cours&hellip;', ['hidden', 'notice--danger'], ['notice--info']);
    xhr.send(encoded);
}