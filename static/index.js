// TODO: Test for performance on other browsers
// TODO: Accessibility
// TODO: Progressive enhancement
// @GLOBAL Root: document.documentElement html element
// @GLOBAL wrapper: #wrapper section element
// @GLOBAL Logo: #Logo svg element
const circles = [...Logo.querySelectorAll('circle')];
/* [][cx, cy, r] */
const data = ((a = 'attributes', v = 'value') => circles.map(el => [el[a][0][v], el[a][1][v], el[a][2][v]]))();

data.unshift('store');

const worker = new Worker('./static/worker.js');

addEventListener('pageshow',
	() => requestAnimationFrame(() => {
		Root.classList.add('loaded');
		Logo.classList.remove("hidden")
	})
	, { once: true }
);

worker.postMessage(data);

data.shift();

addEventListener('click', e => {
	var a = e.target;
	if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) return;
	while (a.localName !== 'a' && (a = a.parentNode));
	if (a && a.origin == location.origin && !a.target && a.getAttribute('href')[0] !== '#') {
		e.preventDefault();
		history.pushState(0, 0, a.href);
	}
});

const setCoords = async (coords = {}) => {
	const hasData = 'data' in coords;
	return new Promise(res => {
		requestAnimationFrame(() =>
			circles.forEach((el, i) => {
				let [x, y] = hasData ? coords.data[i] : ['0', '0'];
				el.style.setProperty('--x', x);
				el.style.setProperty('--y', y);
			})
		);
		res();
	});
};

circles[0].addEventListener('transitionend', () => Root.classList.remove('transitioning'));

worker.onmessage = (eventDetails) => setCoords(eventDetails);

var c = 0;
let lastUrl = '';
function go(url) {
	if (url === lastUrl) {
		worker.postMessage(true);
		return;
	}

	if (url !== lastUrl) {
		Root.classList.add('transitioning');
		lastUrl = url;
	}

	// you can plug your own implementation in here!
	var id = ++c;
	// TODO when going home, reset, otherwise, make logo more chaotic
	fetch(url).then(r => r.text()).then(html => {
		var doc = new DOMParser().parseFromString(html, 'text/html');
		if (c !== id) return;
		document.title = doc.title;
		wrapper.innerHTML = doc.getElementById('wrapper').innerHTML;
	})
		.then(() => worker.postMessage(true))
		.then(() => Root.classList.remove('transitioning'));
}

var ps = history.pushState;

history.pushState = (a, b, url) => {
	ps.call(history, a, b, url);
	go(url);
};

addEventListener('popstate', () => go(location.href));
