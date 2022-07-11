// import axios from 'axios';
// import Browser from 'webextension-polyfill';


import { fbCard } from "../card";
import { Posts } from "../models/post";
import { user } from "../users";


const TWEET='https://tweet-recent.herokuapp.com/api/tweet'


// getTweet("DarrellMello")

export interface IRecentweet{
  tweetedByHtml:string;
  imgHtml:string;
  timeHtml:string;
  href:string;
  contentHtml:string;
}
export async function init(random=true) {
	
		console.log(user);
		// setTimeout(function() {
		// 	//your code to be executed after 1 second

		// 	const roleFeed = document.querySelector('[role=feed]') as HTMLDivElement;
		// roleFeed.innerHTML='<p>Hi I am Injected In feeds</p>'+roleFeed.innerHTML
		//   }, 60000);
		// window.onload =  () =>{
		// setTimeout(async () => {
		 for(let i=0; i<user.length;i++){
			try {
				
				
				// const headers={
				// 'Access-Control-Allow-Origin': '*'
				// }
			// 	const res:AxiosResponse<any, any> =await browser.runtime.sendMessage({id:"get",user:user[i]});
			// 	let res = await axios.get<IRecentweet>(`${TWEET}/${user[i]}`,{
			// 		timeout:30000,
			// 		headers:{
			// 			'Access-Control-Allow-Origin': '*',
			// 		}
			// })
			
		const res=	await chrome.runtime.sendMessage(
				{
					contentScriptQuery: "getdata"
				
					, url: `${TWEET}/${user[i]}`
				})
		// 	Browser.runtime.sendMessage({url:`${TWEET}/${user[i]}`,q:"getdata"}).then((res)=>{


		// })
				// const res = await Browser.runtime.sendMessage({url:`${TWEET}/${user[i]}`})
				// 	// res.data.
				// let res = wait axios.get('https://www.softwaretestinghelp.com/api-testing-tutorial/')
				// let res = await fetch(`${TWEET}/${user[i]}`)

				// console.log(res.status)
				// let tweetData=res.data
				let tweetData=res
				// tweetData["tweetedByHtml"]=""
				// tweetData["imgHtml"]=""
				// tweetData["timeHtml"]=""
				// tweetData["href"]=""
				// tweetData["contentHtml"]=""
				
				console.log("here is tweet data");
				console.log(
					tweetData["tweetedByHtml"],
					tweetData["imgHtml"],
					tweetData["timeHtml"],
					tweetData["href"],
					tweetData["contentHtml"]
				);
			// 	const contentHtml = document.createElement("div");
			// console.log("content Html",tweetData["contentHtml"])
			// 	contentHtml.innerHTML=tweetData["contentHtml"]
				const post = new Posts(
					tweetData["contentHtml"],
					// contentHtml.outerHTML,
					tweetData["tweetedByHtml"],
					tweetData["timeHtml"],
					tweetData["imgHtml"],
			
					tweetData["href"],
					
				);
				const injected = fbCard(post);
				var doc = new DOMParser().parseFromString(injected, "text/html");
				console.log(tweetData);
				// console.log(injected);
				// console.log(typeof(injected));
				const div = document.createElement("div");
				div.innerHTML = injected;
				const roleFeed = document.querySelector(
					"[role=feed]"
					) as HTMLDivElement;
					if(random){
				const divs=roleFeed.children
				var pos = Math.floor((Math.random() * (divs.length-3)))
			console.log(pos)
				if(pos<=0)
				pos=0
				console.log(pos)
				roleFeed.insertBefore(div, roleFeed.children[pos]);
				}else{
					roleFeed.insertBefore(div, roleFeed.firstChild);
				}
			} catch (error) {
				console.log(error);
			}
		}
		// }, 1000);
		}
	
// }


