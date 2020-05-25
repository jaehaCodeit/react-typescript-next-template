import { observable, action } from 'mobx';
import nextCookie from 'next-cookies';
import OWN_API from 'api';
import { GET_COOKIE_BY_NAME } from 'utils';

const initData = {
  accessToken: '',
  renewRefreshToken: true
}

class ApiStore {
  static instance: ApiStore | null = null;

  static getInstance(initialData?: any) {
    if (ApiStore.instance === null) ApiStore.instance = new ApiStore(initialData);
    return ApiStore.instance;
  }

  @observable accessToken: string = ''
  @observable renewRefreshToken: boolean = false

  constructor(initialData: any) {
    console.log('GLOBAL STORES : ', initialData)
    this.initApiStore(initialData)
  }

  @action initApiStore = (initialData: any) => {
    this.accessToken = initialData ? initialData.apiStore.accessToken : initData.accessToken
    this.renewRefreshToken = initialData ? initialData.apiStore.renewRefreshToken : initData.renewRefreshToken
  }

  @action fetch = (accessToken: string) => {
    this.accessToken = accessToken
  }

  @action setRenewRefreshToken = (value: boolean) => {
    this.renewRefreshToken = value
  }

  apiGReq = (query: string, ctx?: any) => {
    const accessToken = ctx ? nextCookie(ctx).cat : GET_COOKIE_BY_NAME('cat')
    const result: any = OWN_API.GRAPHQL(query, accessToken ? accessToken : '')
    return result
  }
}

export default ApiStore;
