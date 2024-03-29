function subscribe(form) {
    document.querySelector('#error-message')?.classList?.add('hidden');
    document.querySelector('#success-message')?.classList?.add('hidden');
    form.querySelector('#validation-message')?.classList?.add('hidden');
    form.querySelectorAll('.entry__error').forEach((el) => { 
        el.innerHTML = '';
    });
    let email = form.querySelector('#EMAIL')?.value;
	if (!validateEmail(email)) {
        form.querySelector('#validation-message>span').innerHTML = ' L\'adresse email est invalide.';
        form.querySelector('#validation-message')?.classList?.remove('hidden');
		return false;
	}
	let firstName = form.querySelector('#PRENOM')?.value || '';
    let url = `${form.getAttribute("action")}?isAjax=1`;
	form.querySelector('#EMAIL').value = '';
	if (firstName !== '') {
		form.querySelector('#PRENOM').value = '';
	}
    const fd = new FormData();
    fd.append('EMAIL', email);
    fd.append('PRENOM', firstName);
    fd.append('email_address_check', '');
    fd.append('locale', 'fr');
	postContact(fd, url);
	return false;
}

function validateEmail(email) {
	return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

function postContact(fd, url) {
	const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onload = (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.querySelector('#error-message')?.classList?.add('hidden');
                document.querySelector('#success-message')?.classList?.remove('hidden');
                window.open('/confirmation.html', '_blank');
            } else if (xhr.status === 400) {
                document.querySelector('#success-message')?.classList?.add('hidden');
                document.querySelector('#error-message')?.classList?.add('hidden');
                const errors = JSON.parse(xhr.response)?.errors;
                if (errors?.EMAIL) {
                    document.querySelector('#EMAIL').nextElementSibling.innerHTML = errors?.EMAIL;
                }
                if (errors?.PRENOM) {
                    document.querySelector('#PRENOM').nextElementSibling.innerHTML = errors?.PRENOM;
                }
                if (errors?.captcha) {
                    document.querySelector('#sib-captcha').nextElementSibling.innerHTML = 'La vérification du captcha a échoué.';
                }
            } else {
                document.querySelector('#success-message')?.classList?.add('hidden');
                document.querySelector('#error-message')?.classList?.remove('hidden');
            }
        }
    };
    xhr.onerror = (e) => {
        document.querySelector('#success-message')?.classList?.add('hidden');
        document.querySelector('#error-message')?.classList?.remove('hidden');
    };
    xhr.send(fd);
	return false;
}
