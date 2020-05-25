import { observer } from 'mobx-react'
import React, { useState } from 'react'
import './GeneralSideNav.scss'
import SideMenu from './SideMenu'

const GeneralSideNav = () => {
  const [isSideOpen, setIsSideOpen] = useState(false)
  const [isSideClosed, setIsSideClosed] = useState(false)
  const toggleSideNav = () => {
    if (isSideOpen) {
      setIsSideClosed(true)
    } else {
      setIsSideClosed(false)
    }
    setIsSideOpen(!isSideOpen)
  }

  return (
    <>
      <div
        className={`GeneralSideNav--burgerMenuIcon ${isSideOpen ? "isOpen" : ""}`}
        onClick={toggleSideNav}
      >
        <div className={`GeneralSideNav__burgerLine GeneralSideNav__burgerLine--1 ${isSideOpen ? "isOpened" : ""} ${isSideClosed ? "isClosed" : ""}`}></div>
        <div className={`GeneralSideNav__burgerLine GeneralSideNav__burgerLine--2 ${isSideOpen ? "isOpened" : ""} ${isSideClosed ? "isClosed" : ""}`}></div>
        <div className={`GeneralSideNav__burgerLine GeneralSideNav__burgerLine--3 ${isSideOpen ? "isOpened" : ""} ${isSideClosed ? "isClosed" : ""}`}></div>
      </div>
      <SideMenu
        isOpen={isSideOpen}
        toggleSideNav={toggleSideNav}
      />
    </>
  )
}

export default observer(GeneralSideNav)