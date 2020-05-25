import { useStaticRendering } from 'mobx-react';

/* Server-Side-Render할 store 파일들을 import 합니다 */
import ApiStore from 'stores/ApiStore';
import UserStore from 'stores/UserStore';
import WindowSizeStore from 'stores/WindowSizeStore';
import PopupStore from 'stores/PopupStore'

/* mobx strict mode 설정 - observable이 변화 하는 함수에는 @action 달아주기 강제 */
import { configure } from 'mobx'
import { IS_SERVER } from 'utils';

configure({ enforceActions: "always" });
useStaticRendering(IS_SERVER);

let stores: any = null;

const initializeStore = (initialData?: any) => {
	if (IS_SERVER) {
		stores = {
			apiStore: ApiStore.getInstance(initialData),
			userStore: UserStore.getInstance(initialData),
			sizeStore: new WindowSizeStore(),
      popupStore: PopupStore.getInstance(),
		};
	}
	if (stores === null) {
		stores = {
			apiStore: ApiStore.getInstance(initialData),
			userStore: UserStore.getInstance(initialData),
			sizeStore: new WindowSizeStore(),
      popupStore: PopupStore.getInstance(),
		};
	}

	return stores;
};

export { initializeStore };
