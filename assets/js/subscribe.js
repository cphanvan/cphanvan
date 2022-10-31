function subscribe(form) {
	let email = form.querySelector('#email')?.value;
	if (!validateEmail(email)) {
		alert("adresse mail invalide");
		return false;
	}
	let firstName = form.querySelector('#firstName')?.value || '';
	form.querySelector('#ack')?.classList?.remove("hidden");
	form.querySelector('#email').value = '';
	if (firstName !== '') {
		form.querySelector('#firstName').value = '';
	}
	postContact(email, firstName);
	return false;
}

function validateEmail(email) {
	return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

function postContact(email, firstName) {
	const apiUrl = `https://sfyyfdj2go4pngumrojdy4nyfy0mwdyu.lambda-url.eu-west-3.on.aws/`;
	const request = new Request(
		apiUrl,
		{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"email": email,
				"firstName": firstName
			})
	});
	fetch(request)
	.then(response => {
		if (response.status !== 200) {
			alert("Une erreur s'est produite lors de votre inscription. Je vous suggère d'utiliser le navigateur Chrome. Si le problème persiste, n'hésitez pas à me contacter par email.")
		} else {
			alert("Votre demande d'inscription a bien été prise en compte. Pour la confirmer, veuillez cliquer sur le lien dans le mail que vous allez recevoir.")
		}
	}).
	catch(error => {
		alert("Une erreur s'est produite lors de votre inscription. Je vous suggère d'utiliser le navigateur Chrome. Si le problème persiste, n'hésitez pas à me contacter par email.")
	});
	return false;
}
