import { Cookies } from 'react-cookie';
import nextCookie from 'next-cookies';

const cookies = new Cookies();

export const SET_COOKIE = ( name: string, value: string, option?: any ) => {
  const CValue = window.btoa(value)
  return cookies.set(name, CValue, {...option})
}

export const REMOVE_COOKIE = ( name: string ) => {
  return cookies.remove(name, {path: '/'})
}

export const GET_COOKIE_BY_NAME = (name: string) => {
  return cookies.get(name)
}

export const GET_COOKIE_BY_REQ = ( req : any ) => {
  return nextCookie(req)
}