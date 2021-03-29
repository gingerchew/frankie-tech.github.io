/*
const rand = (len) => +crypto.getRandomValues(new Uint8Array(len)).join('').slice(0, 2);
/** prettier-ignore 
const addChaos = (o, l, n, j, m, t) => Math.min(Math.max((t % 2 == 0 ? (Math.ceil(0 | +o / +l * +n) * j) : (0 | (Math.ceil(+n / +l) * +o) * m) * (1 & new Date ? 1 : -1) * .1).toFixed(2), -125), 125);
/** prettier-ignore 
const generate = e => document.querySelectorAll("#Logo>circle").forEach((e, t) => e.style.transform = `translate(${((r, a) => [addChaos(e[r][0][a], e[r][1][a], e[r][2][a], rand(Math.floor(e[r][0][a].length / 2)), rand(Math.floor(e[r][1][a].length / 2)), t), addChaos(e[r][0][a], e[r][1][a], e[r][2][a], rand(Math.floor(e[r][0][a].length / 2)), rand(Math.floor(e[r][1][a].length / 2)), t)].join('px,'))("attributes", "value")}px)`);
*/
let a = 'attributes',
	v = 'value';
const circles = [...Logo.querySelectorAll('circle')];
const data = circles.map(el => [el[a][0][v], el[a][1][v], el[a][2][v]]);

data.unshift('store');

const worker = new Worker('./static/worker.js');
// worker.postMessage([...data]);
document.addEventListener("DOMContentLoaded", _ => Logo.classList.remove("hidden"), { once: true });

const wrapper = document.getElementById('wrapper');

addEventListener('pageshow', function () {
	requestAnimationFrame(() => document.body.style.setProperty('--gradient-angle', Math.floor(Math.random() * 361) + 'deg'));
	requestAnimationFrame(() => {
		document.documentElement.style.opacity = '';
		document.documentElement.classList.add('loaded');
	});
}, { once: true });

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

const reset = () => requestAnimationFrame(() => circles.forEach(el => { el.style.setProperty('--x', '0'); el.style.setProperty('--y', '0') }));

worker.onmessage = ({ data }) => { requestAnimationFrame(() => circles.forEach((el, i) => { el.style.setProperty('--x', data[i][0]); el.style.setProperty('--y', data[i][1]) })); }

var c = 0;

function go(url) {
	document.body.classList.add('transitioning');
	// you can plug your own implementation in here!
	var id = ++c;
	fetch(url).then(r => r.text()).then(html => {
		var doc = new DOMParser().parseFromString(html, 'text/html');
		if (c !== id) return;
		document.title = doc.title;
		wrapper.innerHTML = doc.getElementById('wrapper').innerHTML;
		worker.postMessage(true);
	}).then(() => {
		document.body.classList.remove('transitioning')
	});
}

var ps = history.pushState;

history.pushState = (a, b, url) => {
	ps.call(history, a, b, url);
	go(url);
};

addEventListener('popstate', () => {
	go(location.href);
});
