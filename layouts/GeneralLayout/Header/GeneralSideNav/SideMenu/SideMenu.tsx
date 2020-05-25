import { observer } from 'mobx-react';
import Link from 'next/link';
import './SideMenu.scss';

interface IGeneralSideMenuProps {
  isOpen: boolean
  toggleSideNav: Function
}

const SideMenu = (props: IGeneralSideMenuProps) => {
  const { isOpen, toggleSideNav } = props

  return (
    <div className={`"SideMenu" ${isOpen ? "isOpen" : ''}`}>
      <div className={`SideMenu__background`} onClick={isOpen ? () => toggleSideNav() : () => { }} />
      <div className={`SideMenu__container`}>
        <div className="SideMenu__head">
          <p>사이드 메뉴 상단입니다.</p>
        </div>
        <div className="SideMenu__menuWrapper">
          <Link href={"/"} as={"/"} prefetch={false}>
            <a onClick={() => toggleSideNav()} className={"SideMenu__menuEach"}>
              메뉴1
            </a>
          </Link>
          <Link href={"/"} as={"/"} prefetch={false}>
            <a onClick={() => toggleSideNav()} className={"SideMenu__menuEach"}>
              메뉴2
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default observer(SideMenu)