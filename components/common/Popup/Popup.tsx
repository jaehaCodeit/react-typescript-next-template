import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { useEffect } from "react";
import './Popup.scss';
import ReactDOM from 'react-dom';

interface IPopupProps {
  className?: string
  children?: any
  popupStore?: any
  popupTitle: string
  isBackClickAvailable?: boolean
  isEscAvailable?: boolean
  isEnterAvailable?: boolean
  backClickFunc?: any
  escFunc?: Function
  enterFunc?: any
  isShortMode?: boolean
  isSecond?: boolean
}

const Popup = (props: IPopupProps) => {
  const { children, className = "", popupTitle, popupStore, isBackClickAvailable = true,
    isEscAvailable = true, isEnterAvailable = false, enterFunc, isShortMode = false,
    escFunc, backClickFunc, isSecond=false } = props
  const { currentPopup, closePopup, secondPopup, closeSecondPopup } = popupStore

  const onClickWrapper = (e: any) => {
    e.stopPropagation()
  }

  const onKeyEnter = (e: any) => {
    if (isEscAvailable && !isShortMode && e.keyCode === 27) {
      isSecond ? closeSecondPopup() : closePopup()
      if (escFunc) {
        escFunc()
      }
    }
    if (isEnterAvailable && !isShortMode && e.keyCode === 13) {
      isSecond ? closeSecondPopup() : closePopup()
      if (enterFunc) {
        enterFunc()
      }
    }
  }

  const onClickBackground = (e: any) => {
    e.stopPropagation()
    if (isBackClickAvailable && !isShortMode) {
      isSecond ? closeSecondPopup() : closePopup()
      if (backClickFunc) {
        backClickFunc()
      }
    }
  }

  useEffect(() => {
    document.getElementById("Popup")
    if (popupTitle === currentPopup) {
      const popupWrapper = document.getElementById("Popup")
      if (popupWrapper && !isShortMode) {
        popupWrapper.focus()
      }
    }
  }, [currentPopup])

  useEffect(() => {
    document.getElementById("Popup")
    if (popupTitle === secondPopup) {
      const popupWrapper = document.getElementById("Popup")
      if (popupWrapper && !isShortMode) {
        popupWrapper.focus()
      }
    }
  }, [secondPopup])
  
  const container = React.useMemo(()=>{
    if (typeof window !== 'undefined') {
      return document.getElementById('modal-root');
    } else {
      return null;
    }
  }, [typeof window]);

  const component = React.useMemo(()=>{
    if (popupTitle !== "" && ((!isSecond && popupTitle === currentPopup) || (isSecond && popupTitle === secondPopup))) {
      return (
        <div
          className={`Popup__background ${className} ${isShortMode ? 'shortMode' : ""} ${isSecond ? "isSecond" : ""}`}
          id={"Popup"}
          tabIndex={-1}
          onKeyDown={(e: any) => onKeyEnter(e)}
          onClick={(e: any) => onClickBackground(e)}
        >
          <div
            className="Popup__contentWrapper"
            onClick={(e: any) => onClickWrapper(e)}
          >
            {children}
          </div>
        </div>
      )
    } else {
      return (
        <></>
      )
    }
  }, [isSecond, popupTitle, currentPopup, className, isShortMode, children, secondPopup]);

  return container ? ReactDOM.createPortal(component, container) : component;
}

export default inject('popupStore')(observer(Popup))