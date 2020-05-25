import { observer } from 'mobx-react';
import Link from 'next/link';
import './GeneralHeader.scss';
import GeneralNav from './GeneralNav';
import GeneralSideNav from './GeneralSideNav';

interface IGeneralHeader {
  onScroll: boolean
  transparent: boolean
  defaultWhite: boolean
  defaultWhiteMobile: boolean
  defaultLogoWhite: boolean
  isIE: boolean
}

const GeneralHeader = (props: IGeneralHeader) => {
  const { 
    onScroll, 
    transparent, 
    defaultWhite, 
    defaultWhiteMobile, 
    defaultLogoWhite,
    isIE 
  } = props

  return (
    <header
      className={`GeneralHeader ${!isIE && transparent ? "GeneralHeader--transparent" : ''} ${isIE || onScroll ? "scroll" : ''} ${!isIE && defaultWhite ? "defaultWhite" : ""} ${!isIE && defaultWhiteMobile ? "defaultWhiteMobile" : ""}`}
      id={"GeneralHeader"}
    >
      <div className="GeneralHeader__wrapper">
        <Link href={'/'} as={'/'} prefetch={false}>
          <a className="GeneralHeader__logo">
            <img src={`/static/images/brand/logo_${isIE || !defaultLogoWhite || onScroll ? 'original' : 'white'}.png`} alt={"Logo"} />
          </a>
        </Link>

        {!isIE && <>
          <GeneralNav />
          <GeneralSideNav />
        </>}
      </div>
    </header>
  )
}

export default observer(GeneralHeader)