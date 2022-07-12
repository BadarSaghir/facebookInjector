import browser from 'webextension-polyfill';
console.log('background.ts');


let previousUrl:string;	
//execute content script when url is equal to facebook.com in PWA mode
 const onHistoryStateUpdatedListener= browser.webNavigation.onHistoryStateUpdated.addListener((details) => {
    // if (details.url.includes('facebook.com')) {
    //     browser.tabs.executeScript(details.tabId, {
    //         file: 'content.js'
    //     });
    // }
    const re =/(https:\/\/.*facebook.com\/groups\/treatearly\/?.*)|(https:\/\/.*facebook.com\/groups\/984165912191143\/?.*)|((https:\/\/.*facebook.com\/?)(home.php)?(?:\s|$))/ig
    console.log(details.url.match(re));

    if (details.url.match(re)) {
        
    console.log("url changed",details.url);
    // browser.runtime.reload()
  // reload the current tab without infinite loop of reloading
  if(details.url!=previousUrl){
    console.log(details,previousUrl)
    browser.tabs.reload(details.tabId, {bypassCache: true});
    previousUrl=details.url;
  }
  
    }
}
);

// browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     if (changeInfo.status === 'complete') {
//         browser.tabs.executeScript(tabId, {
//             file: 'content.js'
//         });
//     }
// }
// );