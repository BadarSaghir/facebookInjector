

import { fbCard } from "./card";

import { Posts } from "./models/post";
import { user } from "./users";


import axios from "axios"

const TWEET='https://tweet-recent.herokuapp.com/api/tweet'


// getTweet("DarrellMello")

export interface IRecentweet{
  tweetedByHtml:string;
  imgHtml:string;
  timeHtml:string;
  href:string;
  contentHtml:string;
}
async function init() {
	
		console.log(user);
		// setTimeout(function() {
		// 	//your code to be executed after 1 second

		// 	const roleFeed = document.querySelector('[role=feed]') as HTMLDivElement;
		// roleFeed.innerHTML='<p>Hi I am Injected In feeds</p>'+roleFeed.innerHTML
		//   }, 60000);
		// window.onload =  () =>{
		// setTimeout(async () => {
			for( const u in user){
			try {
				let res = await axios.get(`${TWEET}/${user[0]}`,{timeout:30000})
				// let res = wait axios.get('https://www.softwaretestinghelp.com/api-testing-tutorial/')
				
				let tweetData=res.data
				console.log(res.data)
				// tweetData["tweetedByHtml"]=""
				// tweetData["imgHtml"]=""
				// tweetData["timeHtml"]=""
				// tweetData["href"]=""
				// tweetData["contentHtml"]=""
				
				console.log("here is tweet data");
				console.log(
					tweetData.tweetedByHtml,
					tweetData.imgHtml,
					tweetData.timeHtml,
					tweetData.href,
					tweetData.contentHtml
				);
				const contentHtml = document.createElement("div");
				contentHtml.innerHTML=tweetData["contentHtml"];
				const post = new Posts(
					// tweetData["contentHtml"],
					contentHtml.outerHTML,
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
				roleFeed.insertBefore(div, roleFeed.firstChild);
			} catch (error) {
				console.log(error);
			}
		}
		// }, 1000);
		}
	
// }
setTimeout(init, 1000);

