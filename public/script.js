
const expandButton = document.getElementById('expand-json');
const expandCloseButton = document.getElementById('expand-json-close');
const jsonInput = document.getElementById('jsonInput');
const inspectorInput = document.querySelector('.inspector-input');


/**
 * Format JSON input
 * @param {HTMLInputElement} inputElement
 * @returns {(e: Event) => void}
 */
function formatJson(inputElement) {
	return (e) => {
		e.preventDefault();
		inputElement.value = JSON.stringify(JSON.parse(inputElement.value), null, 2)
	};
}

expandButton.addEventListener('click', function(e) {
	e.preventDefault();
	inspectorInput.value = jsonInput.value;
	document.querySelector('.fullscreen-inspector-backdrop').style.display = 'block';
	document.body.style.overflow = 'hidden';
});

expandCloseButton.addEventListener('click', function(e) {
	e.preventDefault();
	jsonInput.value = inspectorInput.value;
	document.querySelector('.fullscreen-inspector-backdrop').style.display = 'none';
	document.body.style.overflow = 'auto';
});

document.getElementById('queryForm').addEventListener('submit', function(e) {
	e.preventDefault();

	const jqFilter = document.getElementById('jqFilter').value;
	const jsonInput = document.getElementById('jsonInput').value;

	fetch(`/?q=${encodeURIComponent(jqFilter)}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: jsonInput
	})
		.then(data => {
			data.text().then(text => {
				document.getElementById('output').innerText = text;
			});
		})
		.catch(error => {
			console.error(error)
			document.getElementById('output').innerText = text;
		});
});

document.getElementById('format-json-button').addEventListener(
	'click',
	formatJson(jsonInput)
);

document.getElementById('format-expanded-json').addEventListener(
	'click',
	formatJson(inspectorInput)
);


