import Popup from 'components/common/Popup';
import { SHARED_POPUP } from 'public/static/reference/popup'
import PopupGeneral from 'components/common/Popup/General';
import PopupStore from 'stores/PopupStore';
import { observer } from 'mobx-react';

const GeneralPopup = () => {
  return (
    <>
      {/* shared popup */}
      <PopupGeneral 
        popupTitle={SHARED_POPUP.alertPopup} 
        title={PopupStore.getInstance().message} 
        hasIcon={true} 
        iconType={PopupStore.getInstance().icon} 
        iconPosition={"top"}
        isSmall={PopupStore.getInstance().isSmall}
      />
      <Popup popupTitle={SHARED_POPUP.shortPopup} isShortMode={true}>{PopupStore.getInstance().message}</Popup>
      <Popup popupTitle={SHARED_POPUP.shortPopup} isSecond={true} isShortMode={true}>{PopupStore.getInstance().message}</Popup>
      
    </>
  )
}

export default observer(GeneralPopup)