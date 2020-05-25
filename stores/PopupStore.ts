import { observable, action } from "mobx";
import { SHARED_POPUP } from "public/static/reference/popup";

class PopupStore {

  static instance: PopupStore | null = null;

  static getInstance() {
    if (PopupStore.instance === null) PopupStore.instance = new PopupStore();
    return PopupStore.instance;
  }

  @observable userId: string = ''
  @observable currentPopup: string = ''
  @observable secondPopup: string = ''
  @observable message: string = ''
  @observable icon: "alert" | "coupon" | "trash" | "lock" | "user" = 'alert'
  @observable isSmall: boolean = false

  // has an template
  @action setShortPopup = (msg: string) => {
    this.message = msg
    this.setCurrentPopupShort(SHARED_POPUP.shortPopup)
  }

  @action setShortPopupSecond = (msg: string) => {
    this.message = msg
    this.setCurrentSecondPopupShort(SHARED_POPUP.shortPopup)
    console.log(this.currentPopup, this.secondPopup)
  }

  @action setAlertPopup = (msg: string, iconType: "alert" | "coupon" | "trash" | "lock" | "user" = 'alert', isSmall: boolean = false) => {
    this.message = msg
    this.icon = iconType
    this.isSmall = isSmall
    this.setCurrentPopup(SHARED_POPUP.alertPopup)
  }

  // general function
  @action setCurrentPopup = (popupTitle: string) => {
    this.currentPopup = popupTitle
  }

  @action setSecondPopup = (popupTitle: string) => {
    this.secondPopup = popupTitle
  }

  @action setCurrentPopupShort = (popupTitle: string) => {
    this.currentPopup = popupTitle
    window.setTimeout(() => {
      this.closePopup()
    }, 3000)
  }

  @action setCurrentSecondPopupShort = (popupTitle: string, milliSeconds: number=3000) => {
    this.secondPopup = popupTitle
    window.setTimeout(() => {
      this.closeSecondPopup()
    }, milliSeconds)
  }

  @action closePopup = () => {
    this.currentPopup = ""
  }

  @action closeSecondPopup = () => {
    this.secondPopup = ""
  }

  @action
  setUserId = (id: string) => {
    this.userId = id;
  }
}

export default PopupStore