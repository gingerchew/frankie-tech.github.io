/** prettier-ignore */
const generate = (e => document.querySelectorAll("#Logo>circle").forEach(((e, t) => { requestAnimationFrame((r => e.style.setProperty("transform", `translate${t % 2 == 0 && 1 & new Date ? "X" : "Y"}(${((r, a) => { let o = +e[r][0][a], n = +e[r][1][a], l = +e[r][2][a]; return ((t % 2 == 0 ? Math.ceil(0 | o / l * n) : 0 | Math.ceil(n / l) * o) * (1 & new Date ? 1 : -1) * .025).toFixed(2) / 2 })("attributes", "value")}px)`))) })))
document.addEventListener("DOMContentLoaded", (generate(), Logo.classList.remove("hidden")), { once: true });
const setAngle = () => requestAnimationFrame(() => document.body.style.setProperty('--gradient-angle', Math.floor(Math.random() * 361) + 'deg'));
const wrapper = document.getElementById('wrapper');
addEventListener('pageshow', function () {
	setAngle();
	requestAnimationFrame(() => {
		document.documentElement.style.opacity = '';
		document.documentElement.classList.add('loaded');
	});
}, { once: true });

addEventListener('click', e => {
	var a = e.target;
	if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) return;
	while (a.localName !== 'a' && (a = a.parentNode));
	if (a && a.origin == location.origin && !a.target && a.getAttribute('href')[0] !== '#') {
		e.preventDefault();
		history.pushState(0, 0, a.href);
	}
});
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
		setAngle();
		generate();
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
