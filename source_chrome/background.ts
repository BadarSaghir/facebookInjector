import axios from "axios";
// import Browser from "webextension-polyfill";
import browser from 'webextension-polyfill';
console.log('background.ts');


let previousUrl:string="https://web.facebook.com";	
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
    previousUrl=details.url;
    browser.tabs.reload(details.tabId);
   
  }
  
    }
}
);


// import { IRecentweet } from "./content";
console.log('background')
// Browser.tabs.sendMessage(tabId, "get-ids").then(results => {
//     processResults(results);
//   });

// Browser.runtime.onMessage.addListener(async(message, sender) => {
//     const { type, data } = message;
//   	let res = await axios.get<IRecentweet>(message.url,{
// 					timeout:30000,
// 			})
//     console.log(data,res)
//     return res
//   });
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) =>{   
let is_async=true;
  console.log("getting req")
        var url = request.url;
         fetch(url).then((res)=>{
            console.log(res)
      return   res.json()
      
      }

         
         ).then((json)=>{ 
            console.log('getting json :',json)
            sendResponse(json)}).catch((e)=>{
            console.log('error due to ',e)
         })

         console.log("finish req")
   return is_async
   
    
});
