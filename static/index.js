window.addEventListener('pageshow', function () {
	requestAnimationFrame(() => {
		document.documentElement.style.opacity = '';
		document.documentElement.classList.add('loaded');
	});
}, { once: true });
