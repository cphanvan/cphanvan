const user = 'ineditDuMois';
const repo = 'bonus';
const branch = 'main';
const downloadLinks = document.querySelectorAll('.bonusDownloadLink');
const linksNb = downloadLinks.length;
const maxRetryNb = 2;
let assets = {};
let token = null;

function onSubmit(form) {
	token = form.querySelector('#bonusCredentialsToken').value;
	initAssets();
	return false;
}

function initAssets() {
	const assetsUrl = `https://api.github.com/repos/${user}/${repo}/contents/assets?ref=${branch}`;

	const request = new Request(
		assetsUrl,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `token ${token}`
			},
	});

	fetch(request)
		.then(response => {
			if (response.status !== 200) {
				alert("Le mot de passe que vous avez renseigné est incorrect.");
			} else {
				response.json()
					.then(json => {
						for (let i = 0; i < linksNb; i++) {
							downloadLinks[i].classList.remove("bonusDownloadLink");
							for (let k = 0; k < json.length; k++) {
								if (downloadLinks[i].id + '.pdf' === json[k].name) {
									assets[downloadLinks[i].id] = {
										'url': json[k].url,
										'filename': json[k].name
									};
								}
							}
						}
					});
			}
		});
}

function downloadFile(form, retryNb) {
	const downloadUrl = assets[form.id] ? assets[form.id].url : null;
	if (downloadUrl === null) {
		alert("Une erreur imprévue s'est produite lors du téléchargement, j'en suis désolée. N'hésitez pas à me contacter par email, je vous transmettrai en retour le fichier qui pose problème.");
		return false;
	}
	const request = new Request(
		downloadUrl,
		{
			method: 'GET',
			headers: {
				Accept: 'application/vnd.github.v3.raw',
				Authorization: `token ${token}`
			},
	});

	fetch(request)
		.then(response => {
			if (response.status !== 200) {
				if (token === null) {
					alert('Votre session semble avoir expiré, veuillez saisir à nouveau le mot de passe.');
				} else if (retryNb < maxRetryNb) {
					retryNb++;
					initAssets();
					downloadFile(form, retryNb);
				} else {
					alert("Une erreur imprévue s'est produite lors du téléchargement, j'en suis désolée. N'hésitez pas à me contacter par email, je vous transmettrai en retour le fichier qui pose problème.");
				}
			} else {
				response.blob()
					.then(data => {
						const url = window.URL.createObjectURL(data);
						const file = document.createElement('a');
						file.style.display = 'none';
						file.href = url;
						file.download = assets[form.id].filename;
						file.click();
					})
			}
		})
		.catch(function(error) {
			alert("Une erreur s'est produite lors du téléchargement. Je vous suggère d'utiliser le navigateur Chrome. Si le problème persiste, n'hésitez pas à me contacter par email.");
		});

	return false;
}
