import { describe, expect, it } from 'vitest';
import { isMonochrome } from '../src/icons';

describe('isMonochrome', () => {
	it.each(['000000', '181717', '412991', '4A154B'])('treats near-black #%s as monochrome', (hex) => {
		expect(isMonochrome(hex)).toBe(true);
	});

	it.each(['FF0000', '0866FF', '34A853', 'FBBC04', '1D9BF0'])('keeps the brand color #%s', (hex) => {
		expect(isMonochrome(hex)).toBe(false);
	});
});
