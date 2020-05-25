import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import GeneralFooter from './Footer';
import './GeneralLayout.scss';
import GeneralHeader from './Header';
import GeneralPopup from './Popup';

interface ILGeneralProps {
  children?: any
  disableFooter?: boolean
  transparent?: boolean
  defaultLogoWhite?: boolean
  defaultWhite?: boolean
  defaultWhiteMobile?: boolean
  className?: string
  isIE?: boolean
  hasGeneralHeader?: boolean
}

const LGeneral = (props: ILGeneralProps) => {
  const { 
    children, 
    disableFooter, 
    transparent = false, 
    defaultLogoWhite = false,
    defaultWhite = false, 
    defaultWhiteMobile = false, 
    className = '',
    isIE = false,
    hasGeneralHeader = true
  } = props
  
  const [onScroll, setOnScroll] = useState(false)

  useEffect(() => {
    if (onScroll == false && window.scrollY >= 100) {
      setOnScroll(true)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', changeHeader);
    return () => {
      window.removeEventListener('scroll', changeHeader);
    };
  })

  const changeHeader = () => {
    if (window.scrollY >= 35 && onScroll == false) {
      setOnScroll(true)
    } else if (window.scrollY < 35 && onScroll == true) {
      setOnScroll(false)
    }
  }

  return (
    <>
      <GeneralPopup />
      <div
        className={`General ${transparent ? "CSC__padding--0" : ""} ${className}`}
      >
        {
          hasGeneralHeader
          ? <GeneralHeader
              transparent={transparent}
              onScroll={onScroll}
              defaultWhite={defaultWhite}
              defaultWhiteMobile={defaultWhiteMobile}
              defaultLogoWhite={defaultLogoWhite}
              isIE={isIE}
            />
          : ""
        }
        <div className="General__content">
          {children}
        </div>
        {!(isIE || disableFooter) && <GeneralFooter />}
      </div>
    </>
  )
}

export default observer(LGeneral)