import Popup from '../Popup'
import './PopupGeneral.scss'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'

interface IPopupGeneralProps {
  className?: string
  popupStore?: any
  popupTitle: string
  // contents
  title?: string | any
  content?: string | any
  // icon
  hasIcon?: boolean
  iconType?: "alert" | "coupon" | "trash" | "lock" | "user" | "trophy"
  iconPosition?: "top" | "title"
  // btn
  btnLink?: string
  btnFunc?: Function
  btnText?: string
  hasBtn2?: boolean
  btn2Link?: string
  btn2Func?: Function
  btn2Text?: string
  btnType?: "2d" | "3d"
  hasCloseBtn?: boolean
  // click
  isEscAvailable?: boolean
  isEnterAvailable?: boolean
  isBackClickAvailable?: boolean
  enterFunc?: Function
  escFunc?: Function
  backClickFunc?: Function
  // extra
  isSecond?: boolean
  notClosedWithBtn1?: boolean
  notClosedWithBtn2?: boolean
  strictMode?: boolean
  isSmall?: boolean
  isContentMarkdown?: boolean
}

const PopupGeneral = (props: IPopupGeneralProps) => {
  const { closePopup, closeSecondPopup } = props.popupStore 
  const { 
    className = "",
    popupTitle,
    // contents
    title = "",
    content = "",
    // icon
    hasIcon = false,
    iconType = "alert",
    iconPosition = "title",
    // btn
    btnLink = "",
    btnFunc = ()=>{},
    btnText = "확인",
    hasBtn2 = false,
    btn2Link = "",
    btn2Func = ()=>{},
    btn2Text = "취소하기",
    btnType = "2d",
    hasCloseBtn = false,
    // click
    isEscAvailable = true,
    isEnterAvailable = true,
    isBackClickAvailable = true,
    enterFunc = ()=>{},
    escFunc = ()=>{},
    backClickFunc = ()=>{},
    // extra
    isSecond = false,
    notClosedWithBtn1 = false,
    notClosedWithBtn2 = false,
    strictMode = false,
    isSmall = false,
    isContentMarkdown = false,
  } = props

  const offPopup = () => {
    isSecond ? closeSecondPopup() : closePopup()
  }

  const onClickBtn1 = () => {
    if (strictMode) strictGoBack()
    if (!notClosedWithBtn1) offPopup()
    if (!btnLink) btnFunc()
  }

  const onClickBtn2 = () => {
    if (strictMode) strictGoBack()
    if (!notClosedWithBtn2) offPopup()
    if (!btn2Link) btn2Func()
  }

  const strictGoBack = () => {
    offPopup()
    if (!btnLink) {
      Router.push('/', '/')
    } else {
      Router.push(btnLink, btnLink)
    }
  }

  const PopupGeneralBtn = observer(({isFirst}: any) => {
    return (
      <div 
        className={`
          PopupGeneral__btns--each 
          PopupGeneral__btns--${isFirst ? "btn1" : "btn2"} 
          PopupGeneral__btns--${isFirst ? "btn1" : "btn2"}--${btnType}
        `}
        onClick={isFirst ? () => onClickBtn1() : () => onClickBtn2()}
      >
        <span>{isFirst ? btnText : btn2Text}</span>
      </div>
    )
  })

  return (
    <Popup 
      isSecond={isSecond}
      className={className} 
      popupTitle={popupTitle} 
      isBackClickAvailable={isBackClickAvailable}
      isEscAvailable={isEscAvailable}
      isEnterAvailable={isEnterAvailable}
      enterFunc={strictMode ? () => strictGoBack() : enterFunc}
      escFunc={strictMode ? () => strictGoBack() : escFunc}
      backClickFunc={strictMode ? () => strictGoBack() : backClickFunc}
    >
      <div 
        className={`PopupGeneral 
          ${hasIcon ? `PopupGeneral__iconPosition--${iconPosition}` : ""} 
          ${title ? `PopupGeneral__hasTitle` : ""}
          ${isSmall ? "PopupGeneral__isSmall" : ""}
        `}
      >
        {hasCloseBtn && 
          <img 
            src="/static/images/popup/closeBtn.png" 
            className="PopupGeneral__closeBtn"
            onClick={() => onClickBtn2()}
          />
        }

        <div className="PopupGeneral__contents">
          {(hasIcon && iconPosition === "top") &&
            <img 
              className="PopupGeneral__contents--iconTop"
              src={`/static/images/popup/icon__${iconType}.svg`}
            />
          }

          {title &&
            <div className="PopupGeneral__contents--title">
              {(hasIcon && iconPosition === "title") &&
                <img src={`/static/images/popup/icon__${iconType}.svg`}/>
              }
              <p>{title}</p>
            </div>
          }

          <div>
            {isContentMarkdown 
              ? <ReactMarkdown source={content}/>
              : content
            }
          </div>
        </div>
        
        <div className="PopupGeneral__btns">
          {hasBtn2 
          ? btn2Link
            ?
              <Link href={btn2Link} as={btn2Link} prefetch={false}>
                <a>
                  <PopupGeneralBtn isFirst={false}/>
                </a>
              </Link>
            : <PopupGeneralBtn isFirst={false}/>
          : <></>}

          {btnLink
            ?
              <Link href={btnLink} as={btnLink} prefetch={false}>
                <a>
                  <PopupGeneralBtn isFirst={true}/>
                </a>
              </Link>
            : <PopupGeneralBtn isFirst={true}/>
          }
        </div>
      </div>
    </Popup>
  )
}

export default inject('popupStore')(observer(PopupGeneral))