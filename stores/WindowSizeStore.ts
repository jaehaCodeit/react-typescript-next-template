import { observable, computed, action } from 'mobx';
import debounce from 'lodash/debounce';
import inRange from 'lodash/inRange';
import reduce from 'lodash/reduce';
import { IS_SERVER } from 'utils';

export default class WindowSizeStore {
	@observable windowWidth: any;
	@observable screenWindow: any;

	@action setWindow = () => {
		if (!IS_SERVER) {
			this.screenWindow = window;
			this.handleWindowWidthChange();
			this.screenWindow.addEventListener('resize', this.handleWindowWidthChange);
		}
	};

	handleWindowWidthChange = debounce(() => {
		const width = this.screenWindow.innerWidth;
		this.setWindowWidth(width);
	}, 100);

	@action setWindowWidth = (width: any) => {
		this.windowWidth = width;
		return this.windowWidth;
	};

	@computed get windowSizes() {
		const SIZES = {
			XS: inRange(this.windowWidth, 0, 320),
			S: inRange(this.windowWidth, 320, 768),
			M: inRange(this.windowWidth, 768, 992),
			L: inRange(this.windowWidth, 992, 1200),
			XL: inRange(this.windowWidth, 1200, 1400),
			XXL: inRange(this.windowWidth, 1400, Number.POSITIVE_INFINITY),
		};

		return reduce(
			SIZES,
			(result: any, value, key) => {
				if (value) {
					result = [...result, key];
				}
				return result;
			},
			[],
		)[0];
	}
	@computed get numberedWindowSizes() {
		const SIZES = {
			1: inRange(this.windowWidth, 0, 320),
			2: inRange(this.windowWidth, 320, 768),
			3: inRange(this.windowWidth, 768, 992),
			4: inRange(this.windowWidth, 992, 1400),
			5: inRange(this.windowWidth, 1200, 1400),
			6: inRange(this.windowWidth, 1400, Number.POSITIVE_INFINITY),
		};

		return reduce(
			SIZES,
			(result: any, value, key) => {
				if (value) {
					result = [...result, key];
				}
				return result;
			},
			[],
		)[0];
	}
}
