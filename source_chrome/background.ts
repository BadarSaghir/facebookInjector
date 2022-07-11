import axios from "axios";
// import Browser from "webextension-polyfill";


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
