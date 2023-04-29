const issueUrl = 'https://api.github.com/repos/cphanvan/cphanvan/issues';
const xhr = new XMLHttpRequest();
let isRecaptchaValidated = false;

function onRecaptchaSuccess() {
	isRecaptchaValidated = true;
	form.querySelector('#comment-confirmation').classList.add('hidden');
	form.querySelector('#comment-confirmation').classList.remove('notice--danger');
}

function onRecaptchaError() {
	isRecaptchaValidated = false;
}

async function onSubmit(form) {
	if (!isRecaptchaValidated) {
		form.querySelector('.js-notice-text').innerHTML = 'Veuillez svp valider le reCAPTCHA.';
		form.querySelector('#comment-confirmation').classList.remove('hidden');
		form.querySelector('#comment-confirmation').classList.add('notice--danger');
		return;
	}
	xhr.open("POST", issueUrl, true);
	xhr.onload = (e) => {
		if (xhr.readyState === 4) {
			if (xhr.status === 201) {
				form.reset();
				form.querySelector('.js-notice-text').innerHTML = 'Merci pour votre commentaire, il sera visible sur le site une fois approuvé.';
				form.querySelector('#comment-confirmation').classList.remove('hidden');
				form.querySelector('#comment-confirmation').classList.add('notice--success');
			} else {
				form.reset();
				form.querySelector('.js-notice-text').innerHTML = 'Une erreur imprévue s\'est produite lors de la soumission de votre commentaire. Je vous invite à réessayer ultérieurement, ou à me contacter directement si le problème persiste.';
				form.querySelector('#comment-confirmation').classList.remove('hidden');
				form.querySelector('#comment-confirmation').classList.add('notice--danger');
			}
		}
	};
	xhr.onerror = (e) => {
		form.reset();
		form.querySelector('.js-notice-text').innerHTML = 'Une erreur imprévue s\'est produite lors de la soumission de votre commentaire. Je vous invite à réessayer ultérieurement, ou à me contacter directement si le problème persiste.';
		form.querySelector('#comment-confirmation').classList.remove('hidden');
		form.querySelector('#comment-confirmation').classList.add('notice--danger');
};

	const commentMessage = form.querySelector('#comment-form-message').value;
	const commentName = form.querySelector('#comment-form-name').value;
	const commentEmail = form.querySelector('#comment-form-email').value;
	const commentUrl = form.querySelector('#comment-form-url').value;
	const commentTimestamp= new Date();
	const pageIdForComment = form.querySelector('#pageIdForComment').innerText;

	xhr.setRequestHeader('Accept', 'application/vnd.github+json');
	xhr.setRequestHeader('Authorization', 'Bearer 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');
	xhr.setRequestHeader('X-GitHub-Api-Version', '2022-11-28');
	xhr.send(JSON.stringify({
		title: 'custom-static-comment => nouveau commentaire soumis',
		body: JSON.stringify({
			commentPageId: pageIdForComment,
			id: commentTimestamp.valueOf() + '-' + commentName,
			message: commentMessage,
			name: commentName,
			email: commentEmail,
			url: commentUrl,
			date: commentTimestamp.toLocaleString('fr-FR')
		})
	}));
}
