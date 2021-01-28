// try to auto-focus and make sure the game can be focused with a click if run from an iframe
window.focus();
document.addEventListener('mousedown', function (event) {
	window.focus();
});
