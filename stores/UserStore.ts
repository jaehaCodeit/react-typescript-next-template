import { observable, action, runInAction } from 'mobx';
import { REMOVE_COOKIE } from 'utils';
import OWN_API from 'api';
import ApiStore from './ApiStore';
import PopupStore from './PopupStore';
import { User } from 'interfaces/objects/User';
import QUERY_USER from 'api/query/user';

class UserStore {
  static instance: UserStore | null = null;

  static getInstance(initialData?: any) {
    if (UserStore.instance === null) UserStore.instance = new UserStore(initialData);
    return UserStore.instance;
  }

  @observable state: string = "ok"  // "error", "pending", "ok"
  @observable lastUpdate: number = 0
  @observable logged: boolean = false
  @observable currentUser: User  = {};

  constructor(initialData: any) {
    this.initUserStore(initialData)
  }

  @action initUserStore = (initialData: any) => {
    this.lastUpdate = initialData ? initialData.userStore.lastUpdate : Date.now();
    this.currentUser = initialData ? initialData.userStore.currentUser : {}
    this.logged = initialData ? initialData.userStore.logged : false
  }

  @action fetch = async (accessToken: any) => {
    if (accessToken != '') {
      const result = await OWN_API.GRAPHQL(QUERY_USER.CURRENT_USER(), accessToken)
      const { currentUser } = result.data
      runInAction(() => {
        this.currentUser = currentUser;
        this.logged = true
        console.log('currentUser in UserStore:: ', currentUser)
      })
    } else {
      this.initUserStore(false)
    }
  }

  @action logout = async (goHome: boolean = true) => {
    REMOVE_COOKIE("cat");
    REMOVE_COOKIE('refreshToken')
    await OWN_API.LOGOUT();
    runInAction(() => {
      this.logged = false;
      this.currentUser = {};
      ApiStore.getInstance().initApiStore(false);
    })
    if (goHome && typeof window !== 'undefined') {
      window.location.href = '/'
    }
    PopupStore.getInstance().closePopup()
  }
}

export default UserStore;
