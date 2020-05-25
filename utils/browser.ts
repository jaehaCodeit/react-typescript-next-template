export const CHECK_BROWSER = () => {
  if (typeof window !== 'undefined') {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0) // If Internet Explorer, return version number
    {
      // PopupStore.getInstance().setCurrentPopup(GENERAL_POPUP.ieBrowser)
      console.log('ie broswer : ', parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
    }
    else  // If another browser, return 0
    {
      if (typeof window !== 'undefined') {
        let currentBrowser = window.localStorage.getItem("browser")
        if (!currentBrowser || currentBrowser == "undefined") {
          if (ua.includes("FireFox/") && !ua.includes("Seamonkey/")) { // FireFox
            currentBrowser = "FireFox"
          } else if (ua.includes("Seamonkey/")) {
            currentBrowser = "Seamonkey"
          } else if (ua.includes("Chrome/") && !ua.includes("Chromium/")) {
            currentBrowser = "Chrome"
          } else if (ua.includes("Chromium")) {
            currentBrowser = "Chromium"
          } else if (ua.includes("Safari/") && !ua.includes("Chrome/") && !ua.includes("Chrominum")) {
            currentBrowser = "Safari"
          } else if (ua.includes("OPR/") || ua.includes("Opera/")) {
            currentBrowser = "Opera"
          } else if (ua.includes("Edge")) {
            currentBrowser = "Edge"
          } else {
            currentBrowser = "undefined"
          }
          if (typeof window !== 'undefined') {
            window.localStorage.setItem("browser", currentBrowser ? currentBrowser : "undefined")
          }
        }
      }
    }
  }
}

export const IE_CHECK_IN_GETINITALPROPS = (ctx: any) => {
  var ua = (ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent);
  var isIE = /MSIE|Trident/.test(ua);
  return isIE
}