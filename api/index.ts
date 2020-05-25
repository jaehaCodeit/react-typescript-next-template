import Axios from "axios";
import nextCookie from 'next-cookies';
import ApiStore from "stores/ApiStore";
import UserStore from "stores/UserStore";
import { GET_COOKIE_BY_NAME, IS_SERVER, REMOVE_COOKIE, setTokens } from 'utils';

interface ISignin {
  email: string,
  password: string,
}

const requestGRAPHQL = async (
  query: string,
  accessToken: any
) => {
  try {
    const result = await Axios({
      method: 'post',
      url: process.env.API_GRAPHQL,
      headers: {
        'Content-Type': 'application/graphql',
        'Authorization': `Bearer ${accessToken}`
      },
      data: query,
    })
    return result.data;
  } catch (err) {
    await console.log("finally Err status: ", err.response && err.response.status)
    return err.response && parseInt(err.response.status)
  }
}

const requestRefreshToken = async () => {
  try {
    const res = await Axios({
      method: 'post',
      url: process.env.API_REFRESH_TOKEN,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
    await setTokens(res.data.token)
    return res.data.token
  } catch (err) {
    console.log("api requestRefreshToken err", err)
    REMOVE_COOKIE('cat')
    REMOVE_COOKIE('refreshToken')
    OWN_API.LOGOUT()
    UserStore.getInstance().logout(false)
    ApiStore.getInstance().initApiStore(false)
    return 'error'
  }
}
export { requestRefreshToken };

export default class OWN_API {
  static GENERAL = (
    method: any,
    url: string,
    data: any = null,
    headers: any = null
  ) => (Axios({
    method: method,
    url: url,
    data: data,
    headers: headers,
    timeout: 60000
  }))

  static GRAPHQL = async (
    query: string,
    accessToken: any
  ) => {
    const firstRequest = await requestGRAPHQL(query, accessToken)
    if (typeof (firstRequest) !== 'number') {
      return firstRequest
    } else {
      if (!IS_SERVER && accessToken) {
        const newAccessToken = await requestRefreshToken()
        const secondRequest = await requestGRAPHQL(query, newAccessToken)
        return secondRequest
      } else {
        return firstRequest
      }
    }
  }

  static apiGReq = async (
    query: string,
    ctx?: any
  ) => {
    const accessToken = ctx ? nextCookie(ctx).cat : GET_COOKIE_BY_NAME('cat')
    const firstRequest = await requestGRAPHQL(query, accessToken ? accessToken : '')
    if (typeof (firstRequest) !== 'number') {
      return firstRequest
    } else {
      if (!IS_SERVER && accessToken) {
        const newAccessToken = await requestRefreshToken()
        const secondRequest = await requestGRAPHQL(query, newAccessToken)
        return secondRequest
      } else {
        return firstRequest
      }
    }
  }

  static LOGIN = (
    data: ISignin
  ) => (Axios({
    method: 'POST',
    url: process.env.API_LOGIN,
    data: data,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 60000,
    withCredentials: true
  }))

  static LOGOUT = async() => {
    await Axios({
      method: 'DELETE',
      url: process.env.API_REFRESH_TOKEN,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  }
}