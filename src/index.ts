import 'babel-polyfill';
import './focusHack';

const loading = document.createElement('p');
loading.innerText = 'Loading...';
document.body.appendChild(loading);

requestAnimationFrame(async () => {
	try {
		const { load } = await import('./loader');
		loading.remove();
		await load();
	} catch (err) {
		document.body.innerHTML = '<p>Something went wrong. Sorry :(</p>';
		console.error(err);
	}
});
