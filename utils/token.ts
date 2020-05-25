import { Cookies } from 'react-cookie';
import ApiStore from 'stores/ApiStore';
import UserStore from 'stores/UserStore';

export const setTokens = async (accessToken: string) => {
	const cookies = new Cookies();
	cookies.set(
		'cat',
		accessToken,
    {
      path: '/',
      secure: process.env.NODE_ENV === 'development' ? undefined : true,
      sameSite: process.env.NODE_ENV === 'development' ? undefined : 'none',
    } // cat = Codeit AccessToken
  );
  await ApiStore.getInstance().fetch(accessToken);
	await UserStore.getInstance().fetch(accessToken);
};
