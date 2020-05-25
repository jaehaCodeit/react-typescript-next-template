import App from 'next/app';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import NProgress from 'nprogress';
import { IApp } from '../interfaces/pages/app';
import { IE_CHECK_IN_GETINITALPROPS, IS_SERVER, initializeStore, CHECK_BROWSER } from 'utils';
// import { requestRefreshToken } from 'api';
import PopupStore from 'stores/PopupStore';
import { Provider } from 'mobx-react';
import Head from 'next/head';
import { META } from 'public/static/reference/metadata';
import 'public/static/styles/base.scss';
import 'public/static/styles/magic.scss';

Router.events.on('routeChangeStart', url => {
	console.log(`Loading: ${url}`)
	NProgress.start()
})
Router.events.on('routeChangeComplete', async(url) => {
	NProgress.done()
  await document.title // 지우지 말것!
  console.log('? : ', url)
});
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App<IApp> {
	mobxStore: any;

	static async getInitialProps(appContext: any) {
		const isIE = IE_CHECK_IN_GETINITALPROPS(appContext.ctx)
		if (isIE && appContext.ctx.pathname != "/") {
			if (IS_SERVER) {
				appContext.ctx.res.writeHead(302, { Location: '/' });
				appContext.ctx.res.end();
			} else {
				Router.push('/', '/')
			}
		}

		let mobxStore = await initializeStore();

		appContext.ctx.mobxStore = mobxStore;
		let appProps = await App.getInitialProps(appContext);

		const { cat } = nextCookie(appContext.ctx);
		if (IS_SERVER) {
			// const { userStore, apiStore } = await appContext.ctx.mobxStore;
			if (cat) {
				// await apiStore.setRenewRefreshToken(true);
				// const tokenChecker = await OWN_API.GRAPHQL(
				// 	`{ currentUser { id } }`,
				// 	cat
				// )
				// if (await typeof (tokenChecker) === 'number') {
				// 	appProps.pageProps.tokenStatus = 'error';
				// } else if (!tokenChecker.data.currentUser) {
				// 	appProps.pageProps.tokenStatus = 'dbUpdated';
				// } else {
				// 	appProps.pageProps.tokenStatus = 'valid'
				// 	await userStore.fetch(cat);
				// 	await apiStore.fetch(cat);
				// }
			} else {
				// apiStore.setRenewRefreshToken(false)
				// await userStore.logout(false);
				// apiStore.initApiStore(false);
			}
		} else {
			// const { userStore, apiStore } = appContext.ctx.mobxStore;
			// if (userStore.logged && !GET_COOKIE_BY_NAME('cat')) {
			// 	await userStore.logout(false);
			// 	apiStore.initApiStore(false);
			// }
		}

		return {
			...appProps,
			initialMobxState: mobxStore,
		};
	}

	componentDidMount() {
		this.mobxStore.sizeStore.setWindow();
		this.mobxStore.apiStore.setRenewRefreshToken(false);
		CHECK_BROWSER()
	}

	constructor(props: any) {
		super(props);
		if (IS_SERVER) {
			this.mobxStore = props.initialMobxState
		} else {
			this.mobxStore = initializeStore(props.initialMobxState);
		}
	}

	render(): JSX.Element {
		const { Component, pageProps } = this.props;
		const { err } = this.props
		const modifiedPageProps = { ...pageProps, err}
		PopupStore.getInstance().closePopup()
		PopupStore.getInstance().closeSecondPopup()
		if (!IS_SERVER) {
			setTimeout(() => {
				const imgTags = document.getElementsByTagName("img")
				for (let i=0; i<imgTags.length; i++) {
					imgTags[i].addEventListener("contextmenu", e => {
						e.preventDefault(); return false; })
				}
			},1000)
		}

		// if (!IS_SERVER && this.mobxStore.apiStore.renewRefreshToken && GET_COOKIE_BY_NAME('cat')) {
		// 	if (pageProps?.tokenStatus === "dbUpdated") {
		// 		this.mobxStore.userStore.logout(false)
		// 	} else {
		// 		requestRefreshToken()
		// 	}
		// }
		
		if ((pageProps.tokenStatus && pageProps.tokenStatus === 'error') || (pageProps.tokenStatus && pageProps.tokenStatus === 'dbUpdated')) {
			if (!IS_SERVER) setTimeout(() => window.location.reload(), 3000)
			return (<div></div>)
		} else {
			return (
				<Provider {...this.mobxStore}>
					<Head>
						<title>{META.DEFAULT_TITLE}</title>
					</Head>
					<Component {...modifiedPageProps} />
				</Provider>
			);
		}
	}
}

export default MyApp;
