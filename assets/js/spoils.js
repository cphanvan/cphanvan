function toggle(button) {
	let targetId = button.getAttribute("target-id");
	let target = document.querySelector(targetId);
	let currentValue = button.innerText;
	if (currentValue === "Voir") {
		button.innerText = "Masquer";
		target.classList.remove("hidden");
	} else {
		button.innerText = "Voir";
		target.classList.add("hidden");
	}
	return false;
}
