
const jqFilterInput = document.getElementById('jqFilter');
const expandButton = document.getElementById('expand-json');
const expandCloseButton = document.getElementById('expand-json-close');
const jsonInput = document.getElementById('jsonInput');
const inspectorBackdrop = document.querySelector('.fullscreen-inspector-backdrop');
const inspector = document.querySelector('.fullscreen-inspector');
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
	inspectorBackdrop.style.display = 'block';
	requestAnimationFrame(() => {
		inspectorBackdrop.classList.add('open');
		inspector.classList.add('open');
		inspectorInput.focus();
		document.body.style.overflow = 'hidden';
	});
});

expandCloseButton.addEventListener('click', function(e) {
	e.preventDefault();
	jsonInput.value = inspectorInput.value;
	inspector.classList.remove('open');
	inspector.classList.add('close');
	inspectorBackdrop.classList.remove('open');
	inspectorBackdrop.classList.add('close');
	setTimeout(() => {
		inspectorBackdrop.style.display = 'none';
		document.body.style.overflow = 'auto';
		inspector.classList.remove('close');
		inspectorBackdrop.classList.remove('close');
	}, 100);
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


