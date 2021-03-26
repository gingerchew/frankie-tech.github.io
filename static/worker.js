var IDX = 36, HEX = '';
while (IDX--) HEX += IDX.toString(36);

function uid(len) {
	var str = '', num = len || 11;
	while (num--) str += HEX[Math.random() * 36 | 0];
	return parseInt(str, 36);;
}
/** prettier-ignore */
const addChaos = (o, l, n, j, m, t) => Math.min(Math.max((Math.cos(t % 2 == 0 ? (Math.ceil(0 | +o / +l * +n) * j) : (0 | (Math.ceil(+n / +l) * +o) * m), 18) * 75).toFixed(2), -125), 125);

let values = false;
addEventListener('message', ({ data }) => {
	if (data[0] === undefined) return;
	if (data[0] === 'store') {
		data.shift();
		values = data;
		return;
	}
	const d = values.map(([cx, cy, rv], i) => [
		addChaos(cx, cy, rv, uid(Math.ceil(cx.length / 2)), uid(Math.ceil(cy.length / 2)), i),
		addChaos(cx, cy, rv, uid(Math.ceil(cx.length / 2)), +uid(Math.ceil(cy.length / 2)), i)
	]);
	self.postMessage(d);
})
