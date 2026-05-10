

// 获取当前活动标签页
export function getCurrentTab() {
  return new Promise((resolve, reject) => {
    try {
      // Get active tabs in current window  
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs) => {
        if (!tabs || tabs.length < 1) {
          // throw new Error("No tab available");
        }
        // Validate protocol
        let activeTab = tabs[0];
        //let url = new URL(activeTab.url);
        //let supportedProtocols = ["https:", "http:", "ftp:", "file:"];

        //if (!supportedProtocols.includes(url.protocol)) {
        // throw new Error(`Unsupported protocol "${url.protocol}"`);
        //}

        // console.log(activeTab)
        if (activeTab == undefined) {
          reject()
        } else {
          resolve(activeTab);
        }

      });
    } catch (err) {
      reject(err);
    }
  });
}
