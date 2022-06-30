import { fbCard } from './card';
import optionsStorage from './options-storage';
import { Posts } from './models/post';

async function init() {
	// setTimeout(function() {
	// 	//your code to be executed after 1 second

	// 	const roleFeed = document.querySelector('[role=feed]') as HTMLDivElement;
	// roleFeed.innerHTML='<p>Hi I am Injected In feeds</p>'+roleFeed.innerHTML
	//   }, 60000);
	window.onload = function () {
		const post = new Posts('<p>Hi I am Injected In feeds</p>', 'Dr Ah', 'Injected');
		const injected=fbCard(post);
		console.log(injected);
		const roleFeed = document.querySelector('[role=feed]') as HTMLDivElement;
		roleFeed.innerHTML=injected+roleFeed.innerHTML;

	}

	
	
}

init();
