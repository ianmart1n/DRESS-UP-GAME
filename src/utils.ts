// linear interpolation
export function lerp(from, to, t) {
	if (Math.abs(to - from) < 0.0000001) {
		return to;
	}
	return from + (to - from) * t;
}

// returns v, clamped between min and max
export function clamp(min, v, max) {
	return Math.max(min, Math.min(v, max));
}
