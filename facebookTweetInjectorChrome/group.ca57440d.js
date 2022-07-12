// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8eYw7":[function(require,module,exports) {
var _getUsersPosts = require("./content/getUsersPosts");
// event listener that listen for element with class name "fbUser"
// and when it finds it, it injects the script into the page
window.onload = ()=>{
    setTimeout(()=>{
        (0, _getUsersPosts.init)(false);
    }, 2000);
};

},{"./content/getUsersPosts":"a1uHF"}],"a1uHF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "init", ()=>init) // }
;
// import axios from 'axios';
// import Browser from 'webextension-polyfill';
var _card = require("../card");
var _post = require("../models/post");
var _users = require("../users");
const TWEET = "https://tweet-recent.herokuapp.com/api/tweet";
async function init(random = true) {
    console.log((0, _users.user));
    // setTimeout(function() {
    // 	//your code to be executed after 1 second
    // 	const roleFeed = document.querySelector('[role=feed]') as HTMLDivElement;
    // roleFeed.innerHTML='<p>Hi I am Injected In feeds</p>'+roleFeed.innerHTML
    //   }, 60000);
    // window.onload =  () =>{
    // setTimeout(async () => {
    for(let i = 0; i < (0, _users.user).length; i++)try {
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
        const res = await chrome.runtime.sendMessage({
            contentScriptQuery: "getdata",
            url: `${TWEET}/${(0, _users.user)[i]}`
        });
        // 	Browser.runtime.sendMessage({url:`${TWEET}/${user[i]}`,q:"getdata"}).then((res)=>{
        // })
        // const res = await Browser.runtime.sendMessage({url:`${TWEET}/${user[i]}`})
        // 	// res.data.
        // let res = wait axios.get('https://www.softwaretestinghelp.com/api-testing-tutorial/')
        // let res = await fetch(`${TWEET}/${user[i]}`)
        // console.log(res.status)
        // let tweetData=res.data
        let tweetData = res;
        // tweetData["tweetedByHtml"]=""
        // tweetData["imgHtml"]=""
        // tweetData["timeHtml"]=""
        // tweetData["href"]=""
        // tweetData["contentHtml"]=""
        console.log("here is tweet data");
        console.log(tweetData["tweetedByHtml"], tweetData["imgHtml"], tweetData["timeHtml"], tweetData["href"], tweetData["contentHtml"]);
        // 	const contentHtml = document.createElement("div");
        // console.log("content Html",tweetData["contentHtml"])
        // 	contentHtml.innerHTML=tweetData["contentHtml"]
        const post = new (0, _post.Posts)(tweetData["contentHtml"], // contentHtml.outerHTML,
        tweetData["tweetedByHtml"], tweetData["timeHtml"], tweetData["imgHtml"], tweetData["href"]);
        const injected = (0, _card.fbCard)(post);
        var doc = new DOMParser().parseFromString(injected, "text/html");
        console.log(tweetData);
        // console.log(injected);
        // console.log(typeof(injected));
        const div = document.createElement("div");
        div.innerHTML = injected;
        const roleFeed = document.querySelector("[role=feed]");
        if (random) {
            const divs = roleFeed.children;
            var pos = Math.floor(Math.random() * (divs.length - 3));
            console.log(pos);
            if (pos <= 0) pos = 0;
            console.log(pos);
            roleFeed.insertBefore(div, roleFeed.children[pos]);
        } else roleFeed.insertBefore(div, roleFeed.firstChild);
    } catch (error) {
        console.log(error);
    }
// }, 1000);
}

},{"../card":"d61nj","../models/post":"c8QDY","../users":"fhJcL","@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"d61nj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "fbCard", ()=>fbCard);
const fbCard = (post)=>{
    let card = `
    <div>
	<!--$-->
	<div class="du4w35lb k4urcfbm l9j0dhe7 sjgh65i0">
		<div class="du4w35lb l9j0dhe7">
			<div class="">
				<div class="">
					<div
						aria-posinset="1"
						aria-describedby="jsc_c_2n jsc_c_2o jsc_c_2p jsc_c_2r jsc_c_2q"
						aria-labelledby="jsc_c_2m"
						class="lzcic4wl"
						role="article"
					>
						<div class="j83agx80 cbu4d94t">
							<div class="rq0escxv l9j0dhe7 du4w35lb">
								<div class="j83agx80 l9j0dhe7 k4urcfbm">
									<div
										style="
											border-radius: max(
													0px,
													min(8px, calc((100vw - 4px - 100%) * 9999))
												) / 8px;
										"
										class="rq0escxv l9j0dhe7 du4w35lb hybvsw6c io0zqebd m5lcvass fbipl8qg nwvqtn77 k4urcfbm ni8dbmo4 stjgntxs sbcfpzgs"
									>
										<div>
											<div></div>
											<div>
												<div>
													<div class=""></div>
													<div>
														<div
															class="ll8tlv6m j83agx80 btwxx1t3 n851cfcs hv4rvrfc dati1w0a pybr56ya"
														>
										
                                                                                                   
															<div class="oi9244e8 do00u71z j83agx80" >
																<span class="nc684nl6"
																	>
																	
																	<a
																	style="display:none"
																		aria-hidden="true"
																		class="oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gpro0wi8 oo9gr5id"
		
																		role="link"
																		tabindex="-1"
																		><div class="q676j6op qypqp5cg">
																			<object type="nested/pressable">
																				<a
																					aria-label="${post.name}"
																					class="oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql btwxx1t3 abiwlrkh p8dawk7l lzcic4wl oo9gr5id q9uorilb"
																																			role="link"
																					tabindex="0"
																					><div
																						class="q9uorilb l9j0dhe7 pzggbiyp du4w35lb"
																					>
																						<svg
																							aria-hidden="true"
																							class="pzggbiyp"
																							data-visualcompletion="ignore-dynamic"
																							role="none"
																							style="height: 40px; width: 40px"
																						>
																							<mask id="jsc_c_2s">
																								<circle
																									cx="20"
																									cy="20"
																									fill="white"
																									r="20"
																								></circle>
																								<circle
																									cx="34"
																									cy="34"
																									data-visualcompletion="ignore"
																									fill="black"
																									r="6.5"
																								></circle>
																							</mask>
																							<g mask="url(#jsc_c_2s)">
																								<img
																									style="
																										height: 40px;
																										width: 40px;
																									"
																																	height="100%"
																								
																									width="100%"
																									src=${post.img}
																								></img>
																								<circle
																									class="mlqo0dh0 georvekb s6kb5r3f"
																									cx="20"
																									cy="20"
																									r="20"
																								></circle>
																							</g>
																						</svg>
																						<div
																							class="i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																							data-visualcompletion="ignore"
																						></div>
																						<div
																							class="s45kfl79 emlxlaya bkmhp75w spb7xbtv pmk7jnqg kavbgo14"
																							data-visualcompletion="ignore"
																							style="
																								bottom: 6px;
																								right: 6px;
																								transform: translate(50%, 50%);
																							"
																						>
																							<div
																								class="l9j0dhe7 stjgntxs ni8dbmo4 j83agx80 spb7xbtv bkmhp75w emlxlaya s45kfl79"
																							>
																								<div
																									class="iyyx5f41 l9j0dhe7 cebpdrjk bipmatt0 k5wvi7nf a8s20v7p k77z8yql qs9ysxi8 arfg74bv n00je7tq a6sixzi8 tojvnm2t"
																								>
																									<span
																										class="pq6dq46d jllm4f4h fz6q6hdd sx90ovx5 qu0x051f esr5mh6w e9989ue4 r7d6kgcz s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																										data-visualcompletion="ignore"
																									></span>
																									<div
																										class="i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																										data-visualcompletion="ignore"
																									></div>
																								</div>
																								<div
																									class="rq0escxv du4w35lb q45zohi1 ema1e40h ay7djpcl ni8dbmo4 stjgntxs pmk7jnqg rfua0xdk"
																								>
																									Active
																								</div>
																							</div>
																						</div>
																					</div></a
																				>
																			</object>
																		</div></a
																	></span
																>
															</div>
															<div class="buofh1pr">
																<div
																	class="j83agx80 cbu4d94t ew0dbk1b irj2b8pg"
																>
																	<div class="qzhwtbm6 knvmm38d">
																		<span
																			class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql b0tq1wua a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d9wwppkn hrzyx87i jq4qci2q a3bd9o3v b1v8xokw m9osqain hzawbc8m"
																			dir="auto"
																			><h4
																				id="jsc_c_2m"
																				class="gmql0nx0 l94mrbxd p1ri9a11 lzcic4wl aahdfvyu hzawbc8m"
																			>
																				<span class="nc684nl6"
																					><a
																						class="oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gpro0wi8 oo9gr5id lrazzd5p"
																						href="${post.link}"
																						role="link"
																						tabindex="0"
																						><strong
																							><span> From ${post.name}</span></strong
																						></a
																					></span
																				>
																			</h4></span
																		>
																	</div>
																	<div class="qzhwtbm6 knvmm38d">
																		<span
																			class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql b0tq1wua a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 tia6h79c iv3no6db e9vueds3 j5wam9gi b1v8xokw m9osqain hzawbc8m"
																			dir="auto"
																			><span id="jsc_c_2n"
																				><span class="jpp8pzdo"
																					><span
																						><span
																							class="rfua0xdk pmk7jnqg stjgntxs ni8dbmo4 ay7djpcl q45zohi1"
																							>&nbsp;</span
																						><span aria-hidden="true">
																							·
																						</span></span
																					></span
																				><span
																					><span
																						class="tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41"
																						><a
																							class="oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gmql0nx0 gpro0wi8 b1v8xokw"
																							href="${post.link}"
																							role="link"
																							tabindex="0"
																							><span
																								><span
																									class="j1lvzwm4 stjgntxs ni8dbmo4 q9uorilb gpro0wi8"
																									>
																									<div
																									
																									class="t5a262vz nc684nl6 ihxqhq3m l94mrbxd aenfhxwr l9j0dhe7 sdhka5h4"
																									style="
																										display: flex;
																										order: 0;

																									"																								
																									>
																									${post.time}
	
																									</div>
																									<div
																									
																										class="t5a262vz nc684nl6 ihxqhq3m l94mrbxd aenfhxwr l9j0dhe7 sdhka5h4"
																										style="
																											display: none;
																											order: 0;

																										"
																									>
																										<div
																											class="myohyog2 l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 17;
																											"
																										>
																											
																										</div>
																										<div
																											class="t5a262vz l94mrbxd myohyog2 l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 25;
																											"
																										>
																											r
																										</div>
																										<div
																											class="myohyog2 l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 12;
																											"
																										>
																											o
																										</div>
																										<div
																											class="ihxqhq3m myohyog2 l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 7;
																											"
																										>
																											t
																										</div>
																										<div
																											class="b6zbclly l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 13;
																											"
																										>
																											n
																										</div>
																										<div
																											class="ihxqhq3m myohyog2 l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 30;
																											"
																										>
																											d
																										</div>
																										<div
																											class="nc684nl6 l94mrbxd l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 8;
																											"
																										>
																											S
																										</div>
																										<div
																											class="t5a262vz nc684nl6 ihxqhq3m l94mrbxd aenfhxwr l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 11;
																											"
																										>
																											p
																										</div>
																										<div
																											class="l94mrbxd aenfhxwr myohyog2 b6zbclly l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 26;
																											"
																										>
																											e
																										</div>
																										<div
																											class="nc684nl6 l94mrbxd l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 15;
																											"
																										>
																											s
																										</div>
																										<div
																											class="b6zbclly l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 5;
																											"
																										>
																											f
																										</div>
																										<div
																											class="b6zbclly l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 1;
																											"
																										>
																											6
																										</div>
																										<div
																											class="ihxqhq3m myohyog2 l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 3;
																											"
																										>
																											4
																										</div>
																										<div
																											class="nc684nl6 l94mrbxd l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 16;
																											"
																										>
																											c
																										</div>
																										<div
																											class="l94mrbxd aenfhxwr myohyog2 b6zbclly l9j0dhe7 sdhka5h4"
																											style="order: 18"
																										>
																											u
																										</div>
																										<div
																											class="b6zbclly l9j0dhe7 sdhka5h4"
																											style="order: 24"
																										>
																											n
																										</div>
																										<div
																											class="t5a262vz aenfhxwr b6zbclly l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 20;
																											"
																										>
																											1
																										</div>
																										<div
																											class="nc684nl6 l94mrbxd l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 6;
																											"
																										>
																											3
																										</div>
																										<div
																											class="nc684nl6 l94mrbxd l9j0dhe7 sdhka5h4"
																											style="order: 21"
																										>
																											s
																										</div>
																										<div
																											class="myohyog2 l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 4;
																											"
																										>
																											7
																										</div>
																										<div
																											class="ihxqhq3m myohyog2 l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 19;
																											"
																										>
																											t
																										</div>
																										<div
																											class="t5a262vz nc684nl6 ihxqhq3m l94mrbxd aenfhxwr l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 10;
																											"
																										>
																											8
																										</div>
																										<div
																											class="t5a262vz l94mrbxd myohyog2 l9j0dhe7 sdhka5h4"
																											style="order: 2"
																										>
																											J
																										</div>
																										<div
																											class="ihxqhq3m myohyog2 l9j0dhe7 sdhka5h4"
																											style="order: 22"
																										>
																											t
																										</div>
																										<div
																											class="t5a262vz aenfhxwr b6zbclly l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 14;
																											"
																										>
																											1
																										</div>
																										<div
																											class="nc684nl6 l94mrbxd l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 9;
																											"
																										>
																											c
																										</div>
																										<div
																											class="t5a262vz nc684nl6 ihxqhq3m l94mrbxd aenfhxwr l9j0dhe7 sdhka5h4 grhKlDkA cdGO"
																											style="
																												position: absolute;
																												top: 3em;
																												order: 28;
																											"
																										>
																											0
																										</div>
																										<div
																											class="t5a262vz nc684nl6 ihxqhq3m l94mrbxd aenfhxwr l9j0dhe7 sdhka5h4"
																											style="order: 23"
																										>
																											&nbsp;
																										</div>
																										<div
																											class="myohyog2 l9j0dhe7 sdhka5h4"
																											style="order: 29"
																										>
																											w
																										</div>
																										<div
																											class="myohyog2 l9j0dhe7 sdhka5h4"
																											style="order: 27"
																										>
																											o
																										</div>
																									</div></span
																								></span
																							></a
																						></span
																					><!--$--><!--/$--></span
																				><span class="jpp8pzdo"
																					><span
																						><span
																							class="rfua0xdk pmk7jnqg stjgntxs ni8dbmo4 ay7djpcl q45zohi1"
																							>&nbsp;</span
																						><span aria-hidden="true">
																							·
																						</span></span
																					></span
																				>
																				<div class="bp9cbjyn pq6dq46d taijpn5t">
																					<span
																						class="tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41"
																						><span class="l9j0dhe7"
																							><span
																								class="q45zohi1 g0aa4cga pmk7jnqg"
																								>Shared with Your friends</span
																							>
																							<div
																								class="oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of n00je7tq arfg74bv qs9ysxi8 k77z8yql abiwlrkh p8dawk7l lzcic4wl hwddc3l5"
																								role="button"
																								tabindex="0"
																							>
																								<div
																									aria-label="Edit Privacy"
																									class="bp9cbjyn j83agx80 taijpn5t"
																								>
																									<div
																										aria-hidden="false"
																										class="taijpn5t pq6dq46d bp9cbjyn cgat1ltu"
																									>
																										
																									</div>
																									<div class="rl04r1d5"></div>
																								</div>
																								<div
																									class="i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																									data-visualcompletion="ignore"
																									style="
																										bottom: -4px;
																										left: -4px;
																										right: -4px;
																										top: -4px;
																									"
																								></div></div></span></span
																					><!--$--><!--/$-->
																				</div></span
																			></span
																		>
																	</div>
																</div>
															</div>
															<div
																class="nqmvxvec j83agx80 jnigpg78 cxgpxx05 dflh9lhu sj5x9vvc scb9dxdr odw8uiq3"
															>
																<div>
																	<div
																		aria-expanded="false"
																		aria-haspopup="menu"
																		aria-label="Actions for this post"
																		class="oajrlxb2 gs1a9yip mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o tgvbjcpo hpfvmrgz i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql btwxx1t3 abiwlrkh p8dawk7l lzcic4wl dwo3fsh8 g5ia77u1 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 pq6dq46d kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 pzggbiyp pkj7ub1o bqnlxs5p kkg9azqs c24pa1uk ln9iyx3p fe6kdd0r ar1oviwq l10q8mi9 sq40qgkc s8quxz6p pdjglbur"
																		role="button"
																		tabindex="0"
																	>
																		<svg
																			fill="currentColor"
																			viewBox="0 0 20 20"
																			width="1em"
																			height="1em"
																			class="a8c37x1j ms05siws l3qrxjdp b7h9ocf4 py1f6qlh jnigpg78 odw8uiq3"
																		>
																			<g
																				fill-rule="evenodd"
																				transform="translate(-446 -350)"
																			>
																				<path
																					d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"
																				></path>
																			</g>
																		</svg>
																		<div
																			class="i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																			data-visualcompletion="ignore"
																			style="
																				bottom: -8px;
																				left: -8px;
																				right: -8px;
																				top: -8px;
																			"
																		></div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div>
														<div class="" dir="auto">
															<div
																class="hv4rvrfc dati1w0a jb3vyjys qt6c0cv9"
																id="jsc_c_2o"
															>
																<div
																	class="f530mmz5 b1v8xokw o0t2es00 oo9gr5id"
																>
																	<div
																		class="kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x c1et5uql"
																	>
																		<p>${post.contentHtml}</p>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div>
														<div
															class="stjgntxs ni8dbmo4 l82x9zwi uo3d90p7 h905i5nu monazrh9"
                                                            style="display: none;"									data-visualcompletion="ignore-dynamic"
														>
															<!--$-->
															<div>
																<div>
																	<div>
																		<div
																			class="tvfksri0 ozuftl9m jmbispl3 olo4ujb6"
																		>
																			<div
																				class="rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw i1fnvgqd gs1a9yip owycx6da btwxx1t3 ph5uu5jm b3onmgus e5nlhep0 ecm0bbzt nkwizq5d roh60bw9 mysgfdmx hddg9phg"
																			>
																				<div
																					class="rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t d2edcug0 hpfvmrgz rj1gh0hx buofh1pr g5gj957u n8tt0mok hyh9befq iuny7tx3 ipjc6fyt"
																				>
																					<div
																						aria-label="Like"
																						class="oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh p8dawk7l lzcic4wl gokke00a"
																						role="button"
																						tabindex="0"
																					>
																						<div
																							class="rq0escxv l9j0dhe7 du4w35lb j83agx80 rj1gh0hx buofh1pr g5gj957u hpfvmrgz taijpn5t bp9cbjyn owycx6da btwxx1t3 d1544ag0 tw6a2znq jb3vyjys dlv3wnog rl04r1d5 mysgfdmx hddg9phg qu8okrzs g0qnabr5"
																						>
																							<div
																								class="rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus iuny7tx3 ipjc6fyt"
																							>
																								<span class="pq6dq46d"
																									><i
																										data-visualcompletion="css-img"
																										class="hu5pjgll m6k467ps"
																										style="
																											background-image: url('');
																											background-position: 0 -297px;
																											background-size: auto;
																											width: 18px;
																											height: 18px;
																											background-repeat: no-repeat;
																											display: inline-block;
																										"
																									></i
																								></span>
																							</div>
																							<div
																								class="rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus iuny7tx3 ipjc6fyt"
																							>
																								<span
																									class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql b0tq1wua a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d9wwppkn hrzyx87i jq4qci2q a3bd9o3v lrazzd5p m9osqain"
																									dir="auto"
																									><span>Like</span></span
																								>
																							</div>
																						</div>
																						<div
																							class="n00je7tq arfg74bv qs9ysxi8 k77z8yql i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s rnr61an3"
																							data-visualcompletion="ignore"
																							style="border-radius: 4px"
																						></div>
																					</div>
																					<div
																						aria-label="React"
																						class="oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz i1ao9s8h esuyzwwr du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh p8dawk7l lzcic4wl pphx12oy b4ylihy8 rz4wbd8a b40mr0ww a8nywdso hmalg0qr q45zohi1 g0aa4cga pmk7jnqg gokke00a"
																						role="button"
																						tabindex="0"
																					>
																						<i
																							data-visualcompletion="css-img"
																							class="hu5pjgll m6k467ps"
																							style="
																								background-image: url('');
																								background-position: -102px -109px;
																								background-size: auto;
																								width: 16px;
																								height: 16px;
																								background-repeat: no-repeat;
																								display: inline-block;
																							"
																						></i>
																						<div
																							class="n00je7tq arfg74bv qs9ysxi8 k77z8yql i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s"
																							data-visualcompletion="ignore"
																						></div>
																					</div>
																				</div>
																				<div
																					class="rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t d2edcug0 hpfvmrgz rj1gh0hx buofh1pr g5gj957u n8tt0mok hyh9befq iuny7tx3 ipjc6fyt"
																				>
																					<div
																						aria-label="Leave a comment"
																						class="oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh p8dawk7l lzcic4wl"
																						role="button"
																						tabindex="0"
																					>
																						<div
																							class="rq0escxv l9j0dhe7 du4w35lb j83agx80 rj1gh0hx buofh1pr g5gj957u hpfvmrgz taijpn5t bp9cbjyn owycx6da btwxx1t3 d1544ag0 tw6a2znq jb3vyjys dlv3wnog rl04r1d5 mysgfdmx hddg9phg qu8okrzs g0qnabr5"
																						>
																							<div
																								class="rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus iuny7tx3 ipjc6fyt"
																							>
																								<i
																									data-visualcompletion="css-img"
																									class="hu5pjgll m6k467ps"
																									style="
																										background-image: url('${post.img}');
																										background-position: 0 -259px;
																										background-size: auto;
																										width: 18px;
																										height: 18px;
																										background-repeat: no-repeat;
																										display: inline-block;
																									"
																								></i>
																							</div>
																							<div
																								class="rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus iuny7tx3 ipjc6fyt"
																							>
																								<span
																									class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql b0tq1wua a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d9wwppkn hrzyx87i jq4qci2q a3bd9o3v lrazzd5p m9osqain"
																									dir="auto"
																									>Comment</span
																								>
																							</div>
																						</div>
																						<div
																							class="n00je7tq arfg74bv qs9ysxi8 k77z8yql i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s"
																							data-visualcompletion="ignore"
																							style="border-radius: 4px"
																						></div>
																					</div>
																				</div>
																				<div
																					class="rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t d2edcug0 hpfvmrgz rj1gh0hx buofh1pr g5gj957u n8tt0mok hyh9befq iuny7tx3 ipjc6fyt"
																				>
																					<div
																						aria-label="Send this to friends or post it on your Timeline."
																						class="oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh p8dawk7l lzcic4wl"
																						role="button"
																						tabindex="0"
																					>
																						<div
																							class="rq0escxv l9j0dhe7 du4w35lb j83agx80 rj1gh0hx buofh1pr g5gj957u hpfvmrgz taijpn5t bp9cbjyn owycx6da btwxx1t3 d1544ag0 tw6a2znq jb3vyjys dlv3wnog rl04r1d5 mysgfdmx hddg9phg qu8okrzs g0qnabr5"
																						>
																							<div
																								class="rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus iuny7tx3 ipjc6fyt"
																							>
																								<i
																									data-visualcompletion="css-img"
																									class="hu5pjgll m6k467ps"
																									style="
																										background-image: url('${post.img}');
																										background-position: 0 -316px;
																										background-size: auto;
																										width: 18px;
																										height: 18px;
																										background-repeat: no-repeat;
																										display: inline-block;
																									"
																								></i>
																							</div>
																							<div
																								class="rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus iuny7tx3 ipjc6fyt"
																							>
																								<span
																									class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql b0tq1wua a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d9wwppkn hrzyx87i jq4qci2q a3bd9o3v lrazzd5p m9osqain"
																									dir="auto"
																									>Share</span
																								>
																							</div>
																						</div>
																						<div
																							class="n00je7tq arfg74bv qs9ysxi8 k77z8yql i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s rnr61an3"
																							data-visualcompletion="ignore"
																							style="border-radius: 4px"
																						></div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
																<div class="cwj9ozl2 tvmbv18p">
																	<h5
																		class="gmql0nx0 l94mrbxd p1ri9a11 lzcic4wl q45zohi1 ema1e40h ay7djpcl ni8dbmo4 stjgntxs pmk7jnqg rfua0xdk"
																		dir="auto"
																	>
																		0 comments
																	</h5>
																	<div
																		class="l6v480f0 kvgmc6g5 wkznzc2l oygrvhab dhix69tm ecm0bbzt"
																	></div>
																	<div
																		class="j83agx80 bkfpd7mw jb3vyjys hv4rvrfc qt6c0cv9 dati1w0a l9j0dhe7"
																	></div>
																	<div
																		class="j83agx80 bkfpd7mw jb3vyjys hv4rvrfc qt6c0cv9 dati1w0a l9j0dhe7"
																	></div>
																	<div class="stjgntxs ni8dbmo4">
																		<div
																			class="bp9cbjyn j83agx80 k7cz35w2 jifvfom9 hv4rvrfc dati1w0a qvze9t23 tpo14512"
																		>
																			<div
																				class="ggphbty4 wkznzc2l taijpn5t j83agx80"
																			></div>
																		</div>
																	</div>
																	<div
																		class="hv4rvrfc e5nlhep0 dati1w0a ecm0bbzt" style="display: none;"
																	>
																		<div class="j83agx80 btwxx1t3 lzcic4wl">
																			<div
																				class="nqmvxvec s45kfl79 emlxlaya bkmhp75w spb7xbtv a8c37x1j fv0vnmcu rs0gx3tq l9j0dhe7"
																			>
																				<div
																					aria-hidden="true"
																					class="oajrlxb2 gs1a9yip g5ia77u1 mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x tgvbjcpo hpfvmrgz jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql pq6dq46d btwxx1t3 abiwlrkh p8dawk7l lzcic4wl"
																					role="button"
																					tabindex="-1"
																				>
																					<div
																						class="q9uorilb l9j0dhe7 pzggbiyp du4w35lb"
																					>
																						<svg
																							aria-hidden="true"
																							class="pzggbiyp"
																							data-visualcompletion="ignore-dynamic"
																							role="none"
																							style="height: 32px; width: 32px"
																						>
																							<mask id="jsc_c_4q">
																								<circle
																									cx="16"
																									cy="16"
																									fill="white"
																									r="16"
																								></circle>
																								<circle
																									cx="27"
																									cy="27"
																									data-visualcompletion="ignore"
																									fill="black"
																									r="6"
																								></circle>
																							</mask>
																							<g mask="url(#jsc_c_4q)">
																								<image
																									style="
																										height: 32px;
																										width: 32px;
																									"
																									x="0"
																									y="0"
																									height="100%"
																									preserveAspectRatio="xMidYMid slice"
																									width="100%"
																									xlink:href="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
																								></image>
																								<circle
																									class="mlqo0dh0 georvekb s6kb5r3f"
																									cx="16"
																									cy="16"
																									r="16"
																								></circle>
																							</g>
																						</svg>
																						<div
																							class="s45kfl79 emlxlaya bkmhp75w spb7xbtv pmk7jnqg kavbgo14"
																							data-visualcompletion="ignore"
																							style="
																								bottom: 5px;
																								right: 5px;
																								transform: translate(50%, 50%);
																							"
																						>
																							<div
																								class="l9j0dhe7 stjgntxs ni8dbmo4 j83agx80 spb7xbtv bkmhp75w emlxlaya s45kfl79"
												style="display:none"											>
																								<div
																									class="iyyx5f41 l9j0dhe7 cebpdrjk bipmatt0 k5wvi7nf a8s20v7p k77z8yql qs9ysxi8 arfg74bv n00je7tq a6sixzi8 tojvnm2t"
																								>
																									<span
																										class="pq6dq46d jllm4f4h t6na6p9t c9rrlmt1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																										data-visualcompletion="ignore"
																									></span>
																									<div
																										class="i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																										data-visualcompletion="ignore"
																									></div>
																								</div>
																								<div
																									class="rq0escxv du4w35lb q45zohi1 ema1e40h ay7djpcl ni8dbmo4 stjgntxs pmk7jnqg rfua0xdk"
																								>
																									Active
																								</div>
																							</div>
																						</div>
																					</div>
																					<div
																						class="i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																						data-visualcompletion="ignore"
																					></div>
																				</div>
																			</div>
																			<div
																				class="rj1gh0hx buofh1pr ni8dbmo4 stjgntxs rz4wbd8a"
																			>
																				<div class="j83agx80 btwxx1t3">
																					<form
																						class="o6r2urh6 l9j0dhe7 b3i9ofy5 e72ty7fz qlfml3jp inkptoze qmr60zad rt8b4zig n8ej3o3l agehan2d sk4xxmp2 j83agx80 buofh1pr bkfpd7mw"
																						role="presentation"
																					>
																						<div
																							class="m9osqain b1v8xokw ltmttdrg g0qnabr5 r2ndix9n o6r2urh6 mg4g778l buofh1pr g5gj957u jq4qci2q ni8dbmo4 stjgntxs cxgpxx05 d1544ag0 sj5x9vvc tw6a2znq"
																							data-visualcompletion="ignore"
																						>
																							<div class="l9j0dhe7">
																								<div
																									aria-label="Write a comment"
																									class="oo9gr5id lzcic4wl l9j0dhe7 gsox5hk5 notranslate"
																									spellcheck="true"
																									style="
																										user-select: text;
																										white-space: pre-wrap;
																										word-break: break-word;
																									"
																									data-lexical-editor="true"
																									role="textbox"
																									contenteditable="true"
																								>
																									<p
																										class="hcukyx3x oygrvhab cxmmr5t8 kvgmc6g5"
																									>
																										<br />
																									</p>
																								</div>
																								<div
																									class="m9osqain ni8dbmo4 stjgntxs hzruof5a pmk7jnqg j9ispegn ltmttdrg kr520xx4 abiwlrkh g0qnabr5 k4urcfbm"
																								>
																									Write a comment…
																								</div>
																							</div>
																						</div>
																						<div class="il7rb8sk r2dqequf">
																							<ul
																								class="fop5sh7t cgat1ltu tv7at329 j83agx80 c4hnarmi bp9cbjyn"
																							>
																								<li
																									class="ggphbty4 fv0vnmcu q9uorilb"
																								>
																									<span
																										class="tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41"
																										><div
																											aria-label="Comment with an avatar sticker"
																											class="oajrlxb2 gs1a9yip mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o tgvbjcpo hpfvmrgz i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql btwxx1t3 abiwlrkh p8dawk7l lzcic4wl dwo3fsh8 g5ia77u1 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 pq6dq46d kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 pzggbiyp pkj7ub1o bqnlxs5p kkg9azqs c24pa1uk ln9iyx3p fe6kdd0r ar1oviwq l10q8mi9 sq40qgkc s8quxz6p pdjglbur"
																											role="button"
																											tabindex="0"
																										>
																											<i
																												data-visualcompletion="css-img"
																												class="hu5pjgll m6k467ps"
																												style="
																												
																													background-position: 0px -335px;
																													background-size: auto;
																													width: 16px;
																													height: 16px;
																													background-repeat: no-repeat;
																													display: inline-block;
																												"
																											></i>
																											<div
																												class="i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																												data-visualcompletion="ignore"
																												style="inset: -8px"
																											></div></div
																									></span>
																								</li>
																								<li
																									class="ggphbty4 fv0vnmcu q9uorilb"
																								>
																									<span
																										class="tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41"
																										><div
																											aria-label="Insert an emoji"
																											class="oajrlxb2 gs1a9yip mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o tgvbjcpo hpfvmrgz i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql btwxx1t3 abiwlrkh p8dawk7l lzcic4wl dwo3fsh8 g5ia77u1 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 pq6dq46d kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 pzggbiyp pkj7ub1o bqnlxs5p kkg9azqs c24pa1uk ln9iyx3p fe6kdd0r ar1oviwq l10q8mi9 sq40qgkc s8quxz6p pdjglbur"
																											role="button"
																											tabindex="0"
																										>
																											<i
																												data-visualcompletion="css-img"
																												class="hu5pjgll m6k467ps"
																												style="
																													
																													background-position: 0px -471px;
																													background-size: auto;
																													width: 16px;
																													height: 16px;
																													background-repeat: no-repeat;
																													display: inline-block;
																												"
																											></i>
																											<div
																												class="i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																												data-visualcompletion="ignore"
																												style="inset: -8px"
																											></div></div
																									></span>
																								</li>
																								<li
																									class="ggphbty4 fv0vnmcu q9uorilb"
																								>
																									<span
																										class="tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41"
																										><div
																											aria-label="Attach a photo or video"
																											class="oajrlxb2 gs1a9yip mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o tgvbjcpo hpfvmrgz i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql btwxx1t3 abiwlrkh p8dawk7l lzcic4wl dwo3fsh8 g5ia77u1 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 pq6dq46d kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 pzggbiyp pkj7ub1o bqnlxs5p kkg9azqs c24pa1uk ln9iyx3p fe6kdd0r ar1oviwq l10q8mi9 sq40qgkc s8quxz6p pdjglbur"
																											role="button"
																											tabindex="0"
																										>
																											<i
																												data-visualcompletion="css-img"
																												class="hu5pjgll m6k467ps"
																												style="
																													
																													background-position: 0px -403px;
																													background-size: auto;
																													width: 16px;
																													height: 16px;
																													background-repeat: no-repeat;
																													display: inline-block;
																												"
																											></i>
																											<div
																												class="i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																												data-visualcompletion="ignore"
																												style="inset: -8px"
																											></div></div></span
																									><input
																										accept="video/*,  video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*, image/heic, image/heif"
																										class="mkhogb32"
																										type="file"
																									/>
																								</li>
																								<li
																									class="ggphbty4 fv0vnmcu q9uorilb"
																								>
																									<span
																										class="tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41"
																										><div
																											aria-label="Comment with a GIF"
																											class="oajrlxb2 gs1a9yip mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o tgvbjcpo hpfvmrgz i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql btwxx1t3 abiwlrkh p8dawk7l lzcic4wl dwo3fsh8 g5ia77u1 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 pq6dq46d kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 pzggbiyp pkj7ub1o bqnlxs5p kkg9azqs c24pa1uk ln9iyx3p fe6kdd0r ar1oviwq l10q8mi9 sq40qgkc s8quxz6p pdjglbur"
																											role="button"
																											tabindex="0"
																										>
																											<i
																												data-visualcompletion="css-img"
																												class="hu5pjgll m6k467ps"
																												style="
																													
																													background-position: 0px -505px;
																													background-size: auto;
																													width: 16px;
																													height: 16px;
																													background-repeat: no-repeat;
																													display: inline-block;
																												"
																											></i>
																											<div
																												class="i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																												data-visualcompletion="ignore"
																												style="inset: -8px"
																											></div></div
																									></span>
																								</li>
																								<li
																									class="ggphbty4 fv0vnmcu q9uorilb"
																								>
																									<span
																										class="tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41"
																										><div
																											aria-label="Comment with a sticker"
																											class="oajrlxb2 gs1a9yip mtkw9kbi tlpljxtp qensuy8j ppp5ayq2 rq0escxv nhd2j8a9 mg4g778l pfnyh3mw p7hjln8o tgvbjcpo hpfvmrgz i1ao9s8h esuyzwwr f1sip0of du4w35lb n00je7tq arfg74bv qs9ysxi8 k77z8yql btwxx1t3 abiwlrkh p8dawk7l lzcic4wl dwo3fsh8 g5ia77u1 goun2846 ccm00jje s44p3ltw mk2mc5f4 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 pq6dq46d kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 pzggbiyp pkj7ub1o bqnlxs5p kkg9azqs c24pa1uk ln9iyx3p fe6kdd0r ar1oviwq l10q8mi9 sq40qgkc s8quxz6p pdjglbur"
																											role="button"
																											tabindex="0"
																										>
																											<i
																												data-visualcompletion="css-img"
																												class="hu5pjgll m6k467ps"
																												style="
																												
																													background-position: 0px -607px;
																													background-size: auto;
																													width: 16px;
																													height: 16px;
																													background-repeat: no-repeat;
																													display: inline-block;
																												"
																											></i>
																											<div
																												class="i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s s45kfl79 emlxlaya bkmhp75w spb7xbtv"
																												data-visualcompletion="ignore"
																												style="inset: -8px"
																											></div></div
																									></span>
																								</li>
																							</ul>
																						</div>
																					</form>
																				</div>
																				<div class="buofh1pr"></div>
																				<div class="buofh1pr"></div>
																				<div class="buofh1pr"></div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<!--/$-->
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--/$-->
</div>




`;
    return card;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"8ISrk":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"c8QDY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Posts", ()=>Posts);
class Posts {
    constructor(contentHtml, name, time, img = "", link){
        this.contentHtml = contentHtml;
        this.name = name;
        this.time = time;
        this.img = img;
        this.link = link;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}],"fhJcL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "user", ()=>user);
const user = [
    "DarrellMello", 
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8ISrk"}]},["8eYw7"], "8eYw7", "parcelRequire94c2")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUErQztBQUcvQyxrRUFBa0U7QUFDbEUsNERBQTREO0FBRTVELE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBTTtJQUN0QixVQUFVLENBQUMsSUFBSTtRQUFDLENBQUEsR0FBQSxtQkFBSSxDQUFBLENBQUMsS0FBSyxDQUFDO0tBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNuQzs7O0FDSkQ7O0FBaUJBLDBDQUFzQixJQUFJLENBaUd2QixDQUVILElBQUk7O0FBeEhKLDZCQUE2QjtBQUM3QiwrQ0FBK0M7QUFHL0MsOEJBQWlDO0FBQ2pDLHFDQUF1QztBQUN2QyxnQ0FBZ0M7QUFHaEMsTUFBTSxLQUFLLEdBQUMsOENBQThDO0FBWW5ELGVBQWUsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLEVBQUU7SUFFdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUEsV0FBSSxDQUFBLENBQUMsQ0FBQztJQUNsQiwwQkFBMEI7SUFDMUIsNkNBQTZDO0lBRTdDLDZFQUE2RTtJQUM3RSwyRUFBMkU7SUFDM0UsZUFBZTtJQUNmLDBCQUEwQjtJQUMxQiwyQkFBMkI7SUFDMUIsSUFBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUEsR0FBQSxXQUFJLENBQUEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLENBQzlCLElBQUk7UUFHSCxrQkFBa0I7UUFDbEIscUNBQXFDO1FBQ3JDLElBQUk7UUFDTCxrR0FBa0c7UUFDbEcsa0VBQWtFO1FBQ2xFLG1CQUFtQjtRQUNuQixjQUFjO1FBQ2QseUNBQXlDO1FBQ3pDLE1BQU07UUFDTixLQUFLO1FBRU4sTUFBTSxHQUFHLEdBQUUsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FDekM7WUFDQyxrQkFBa0IsRUFBRSxTQUFTO1lBRTNCLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFBLEdBQUEsV0FBSSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QixDQUFDO1FBQ0osc0ZBQXNGO1FBR3RGLEtBQUs7UUFDSCw2RUFBNkU7UUFDN0UsZ0JBQWdCO1FBQ2hCLHdGQUF3RjtRQUN4RiwrQ0FBK0M7UUFFL0MsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6QixJQUFJLFNBQVMsR0FBQyxHQUFHO1FBQ2pCLGdDQUFnQztRQUNoQywwQkFBMEI7UUFDMUIsMkJBQTJCO1FBQzNCLHVCQUF1QjtRQUN2Qiw4QkFBOEI7UUFFOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQ1YsU0FBUyxDQUFDLGVBQWUsQ0FBQyxFQUMxQixTQUFTLENBQUMsU0FBUyxDQUFDLEVBQ3BCLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFDckIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUNqQixTQUFTLENBQUMsYUFBYSxDQUFDLENBQ3hCLENBQUM7UUFDSCxzREFBc0Q7UUFDdEQsdURBQXVEO1FBQ3ZELGtEQUFrRDtRQUNqRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUEsR0FBQSxXQUFLLENBQUEsQ0FDckIsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUN4Qix5QkFBeUI7UUFDekIsU0FBUyxDQUFDLGVBQWUsQ0FBQyxFQUMxQixTQUFTLENBQUMsVUFBVSxDQUFDLEVBQ3JCLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFFcEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUVqQixBQUFDO1FBQ0YsTUFBTSxRQUFRLEdBQUcsQ0FBQSxHQUFBLFlBQU0sQ0FBQSxDQUFDLElBQUksQ0FBQyxBQUFDO1FBQzlCLElBQUksR0FBRyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQUFBQztRQUNqRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLHlCQUF5QjtRQUN6QixpQ0FBaUM7UUFDakMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQUFBQztRQUMxQyxHQUFHLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUN6QixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN0QyxhQUFhLENBQ1osQUFBa0IsQUFBQztRQUNwQixJQUFHLE1BQU0sRUFBQztZQUNYLE1BQU0sSUFBSSxHQUFDLFFBQVEsQ0FBQyxRQUFRO1lBQzVCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFJLENBQUEsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFFO1lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQ2YsSUFBRyxHQUFHLElBQUUsQ0FBQyxFQUNULEdBQUcsR0FBQyxDQUFDO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDaEIsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2xELE1BQ0EsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBRWpELENBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25CO0FBRUYsWUFBWTtDQUNYOzs7QUN0SEg7OzRDQUVhLE1BQU07QUFBWixNQUFNLE1BQU0sR0FBRyxDQUFDLElBQVUsR0FBWTtJQUM1QyxJQUFJLElBQUksR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBbURvQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQXNDaEIsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQW1FWixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7b0NBSUosRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkEwQm5CLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFnQmhCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBd1loQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aURBZ0hTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpREE4Q1gsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb1k1RCxDQUFDLEFBQUM7SUFFRixPQUFPLElBQUksQ0FBQztDQUNYLEFBQUM7OztBQzFuQ0YsT0FBTyxDQUFDLGNBQWMsR0FBRyxTQUFVLENBQUMsRUFBRTtJQUNwQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRztRQUFDLE9BQU8sRUFBRSxDQUFDO0tBQUMsQ0FBQztDQUM3QyxDQUFDO0FBRUYsT0FBTyxDQUFDLGlCQUFpQixHQUFHLFNBQVUsQ0FBQyxFQUFFO0lBQ3ZDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRTtRQUFDLEtBQUssRUFBRSxJQUFJO0tBQUMsQ0FBQyxDQUFDO0NBQ3ZELENBQUM7QUFFRixPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVUsTUFBTSxFQUFFLElBQUksRUFBRTtJQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFVLEdBQUcsRUFBRTtRQUN6QyxJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLFlBQVksSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUN2RSxPQUFPO1FBR1QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQy9CLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLEdBQUcsRUFBRSxXQUFZO2dCQUNmLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3BCO1NBQ0YsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7Q0FDYixDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sR0FBRyxTQUFVLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBQzlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtRQUNwQyxVQUFVLEVBQUUsSUFBSTtRQUNoQixHQUFHLEVBQUUsR0FBRztLQUNULENBQUMsQ0FBQztDQUNKLENBQUM7OztBQzlCRjs7QUFBQSwyQ0FBYSxLQUFLLENBZWpCO0FBZk0sTUFBTSxLQUFLO0lBTWQsWUFBWSxXQUFrQixFQUFDLElBQVcsRUFBQyxJQUFXLEVBQUMsR0FBVSxHQUFDLEVBQUUsRUFBQyxJQUFJLENBQUU7UUFDdkUsSUFBSSxDQUFDLFdBQVcsR0FBQyxXQUFXLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUM7S0FDbEI7Q0FHSjs7O0FDZkQ7OzBDQUFhLElBQUk7QUFBVixNQUFNLElBQUksR0FBRTtJQUNmLGNBQWM7Q0FHakIiLCJzb3VyY2VzIjpbInNvdXJjZV9jaHJvbWUvZ3JvdXAudHMiLCJzb3VyY2VfY2hyb21lL2NvbnRlbnQvZ2V0VXNlcnNQb3N0cy50cyIsInNvdXJjZV9jaHJvbWUvY2FyZC50cyIsIm5vZGVfbW9kdWxlcy9AcGFyY2VsL3RyYW5zZm9ybWVyLWpzL3NyYy9lc21vZHVsZS1oZWxwZXJzLmpzIiwic291cmNlX2Nocm9tZS9tb2RlbHMvcG9zdC50cyIsInNvdXJjZV9jaHJvbWUvdXNlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdCB9IGZyb20gXCIuL2NvbnRlbnQvZ2V0VXNlcnNQb3N0c1wiO1xuXG5cbi8vIGV2ZW50IGxpc3RlbmVyIHRoYXQgbGlzdGVuIGZvciBlbGVtZW50IHdpdGggY2xhc3MgbmFtZSBcImZiVXNlclwiXG4vLyBhbmQgd2hlbiBpdCBmaW5kcyBpdCwgaXQgaW5qZWN0cyB0aGUgc2NyaXB0IGludG8gdGhlIHBhZ2Vcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbnNldFRpbWVvdXQoKCk9Pntpbml0KGZhbHNlKX0sIDIwMDApO1xufVxuIiwiLy8gaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbi8vIGltcG9ydCBCcm93c2VyIGZyb20gJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCc7XG5cblxuaW1wb3J0IHsgZmJDYXJkIH0gZnJvbSBcIi4uL2NhcmRcIjtcbmltcG9ydCB7IFBvc3RzIH0gZnJvbSBcIi4uL21vZGVscy9wb3N0XCI7XG5pbXBvcnQgeyB1c2VyIH0gZnJvbSBcIi4uL3VzZXJzXCI7XG5cblxuY29uc3QgVFdFRVQ9J2h0dHBzOi8vdHdlZXQtcmVjZW50Lmhlcm9rdWFwcC5jb20vYXBpL3R3ZWV0J1xuXG5cbi8vIGdldFR3ZWV0KFwiRGFycmVsbE1lbGxvXCIpXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlY2VudHdlZXR7XG4gIHR3ZWV0ZWRCeUh0bWw6c3RyaW5nO1xuICBpbWdIdG1sOnN0cmluZztcbiAgdGltZUh0bWw6c3RyaW5nO1xuICBocmVmOnN0cmluZztcbiAgY29udGVudEh0bWw6c3RyaW5nO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQocmFuZG9tPXRydWUpIHtcblx0XG5cdFx0Y29uc29sZS5sb2codXNlcik7XG5cdFx0Ly8gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHQvLyBcdC8veW91ciBjb2RlIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIDEgc2Vjb25kXG5cblx0XHQvLyBcdGNvbnN0IHJvbGVGZWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3JvbGU9ZmVlZF0nKSBhcyBIVE1MRGl2RWxlbWVudDtcblx0XHQvLyByb2xlRmVlZC5pbm5lckhUTUw9JzxwPkhpIEkgYW0gSW5qZWN0ZWQgSW4gZmVlZHM8L3A+Jytyb2xlRmVlZC5pbm5lckhUTUxcblx0XHQvLyAgIH0sIDYwMDAwKTtcblx0XHQvLyB3aW5kb3cub25sb2FkID0gICgpID0+e1xuXHRcdC8vIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuXHRcdCBmb3IobGV0IGk9MDsgaTx1c2VyLmxlbmd0aDtpKyspe1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBjb25zdCBoZWFkZXJzPXtcblx0XHRcdFx0Ly8gJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJ1xuXHRcdFx0XHQvLyB9XG5cdFx0XHQvLyBcdGNvbnN0IHJlczpBeGlvc1Jlc3BvbnNlPGFueSwgYW55PiA9YXdhaXQgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtpZDpcImdldFwiLHVzZXI6dXNlcltpXX0pO1xuXHRcdFx0Ly8gXHRsZXQgcmVzID0gYXdhaXQgYXhpb3MuZ2V0PElSZWNlbnR3ZWV0PihgJHtUV0VFVH0vJHt1c2VyW2ldfWAse1xuXHRcdFx0Ly8gXHRcdHRpbWVvdXQ6MzAwMDAsXG5cdFx0XHQvLyBcdFx0aGVhZGVyczp7XG5cdFx0XHQvLyBcdFx0XHQnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuXHRcdFx0Ly8gXHRcdH1cblx0XHRcdC8vIH0pXG5cdFx0XHRcblx0XHRjb25zdCByZXM9XHRhd2FpdCBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnRlbnRTY3JpcHRRdWVyeTogXCJnZXRkYXRhXCJcblx0XHRcdFx0XG5cdFx0XHRcdFx0LCB1cmw6IGAke1RXRUVUfS8ke3VzZXJbaV19YFxuXHRcdFx0XHR9KVxuXHRcdC8vIFx0QnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHt1cmw6YCR7VFdFRVR9LyR7dXNlcltpXX1gLHE6XCJnZXRkYXRhXCJ9KS50aGVuKChyZXMpPT57XG5cblxuXHRcdC8vIH0pXG5cdFx0XHRcdC8vIGNvbnN0IHJlcyA9IGF3YWl0IEJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZSh7dXJsOmAke1RXRUVUfS8ke3VzZXJbaV19YH0pXG5cdFx0XHRcdC8vIFx0Ly8gcmVzLmRhdGEuXG5cdFx0XHRcdC8vIGxldCByZXMgPSB3YWl0IGF4aW9zLmdldCgnaHR0cHM6Ly93d3cuc29mdHdhcmV0ZXN0aW5naGVscC5jb20vYXBpLXRlc3RpbmctdHV0b3JpYWwvJylcblx0XHRcdFx0Ly8gbGV0IHJlcyA9IGF3YWl0IGZldGNoKGAke1RXRUVUfS8ke3VzZXJbaV19YClcblxuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhyZXMuc3RhdHVzKVxuXHRcdFx0XHQvLyBsZXQgdHdlZXREYXRhPXJlcy5kYXRhXG5cdFx0XHRcdGxldCB0d2VldERhdGE9cmVzXG5cdFx0XHRcdC8vIHR3ZWV0RGF0YVtcInR3ZWV0ZWRCeUh0bWxcIl09XCJcIlxuXHRcdFx0XHQvLyB0d2VldERhdGFbXCJpbWdIdG1sXCJdPVwiXCJcblx0XHRcdFx0Ly8gdHdlZXREYXRhW1widGltZUh0bWxcIl09XCJcIlxuXHRcdFx0XHQvLyB0d2VldERhdGFbXCJocmVmXCJdPVwiXCJcblx0XHRcdFx0Ly8gdHdlZXREYXRhW1wiY29udGVudEh0bWxcIl09XCJcIlxuXHRcdFx0XHRcblx0XHRcdFx0Y29uc29sZS5sb2coXCJoZXJlIGlzIHR3ZWV0IGRhdGFcIik7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0XHRcdHR3ZWV0RGF0YVtcInR3ZWV0ZWRCeUh0bWxcIl0sXG5cdFx0XHRcdFx0dHdlZXREYXRhW1wiaW1nSHRtbFwiXSxcblx0XHRcdFx0XHR0d2VldERhdGFbXCJ0aW1lSHRtbFwiXSxcblx0XHRcdFx0XHR0d2VldERhdGFbXCJocmVmXCJdLFxuXHRcdFx0XHRcdHR3ZWV0RGF0YVtcImNvbnRlbnRIdG1sXCJdXG5cdFx0XHRcdCk7XG5cdFx0XHQvLyBcdGNvbnN0IGNvbnRlbnRIdG1sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKFwiY29udGVudCBIdG1sXCIsdHdlZXREYXRhW1wiY29udGVudEh0bWxcIl0pXG5cdFx0XHQvLyBcdGNvbnRlbnRIdG1sLmlubmVySFRNTD10d2VldERhdGFbXCJjb250ZW50SHRtbFwiXVxuXHRcdFx0XHRjb25zdCBwb3N0ID0gbmV3IFBvc3RzKFxuXHRcdFx0XHRcdHR3ZWV0RGF0YVtcImNvbnRlbnRIdG1sXCJdLFxuXHRcdFx0XHRcdC8vIGNvbnRlbnRIdG1sLm91dGVySFRNTCxcblx0XHRcdFx0XHR0d2VldERhdGFbXCJ0d2VldGVkQnlIdG1sXCJdLFxuXHRcdFx0XHRcdHR3ZWV0RGF0YVtcInRpbWVIdG1sXCJdLFxuXHRcdFx0XHRcdHR3ZWV0RGF0YVtcImltZ0h0bWxcIl0sXG5cdFx0XHRcblx0XHRcdFx0XHR0d2VldERhdGFbXCJocmVmXCJdLFxuXHRcdFx0XHRcdFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRjb25zdCBpbmplY3RlZCA9IGZiQ2FyZChwb3N0KTtcblx0XHRcdFx0dmFyIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaW5qZWN0ZWQsIFwidGV4dC9odG1sXCIpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyh0d2VldERhdGEpO1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhpbmplY3RlZCk7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKHR5cGVvZihpbmplY3RlZCkpO1xuXHRcdFx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRkaXYuaW5uZXJIVE1MID0gaW5qZWN0ZWQ7XG5cdFx0XHRcdGNvbnN0IHJvbGVGZWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcdFx0XHRcIltyb2xlPWZlZWRdXCJcblx0XHRcdFx0XHQpIGFzIEhUTUxEaXZFbGVtZW50O1xuXHRcdFx0XHRcdGlmKHJhbmRvbSl7XG5cdFx0XHRcdGNvbnN0IGRpdnM9cm9sZUZlZWQuY2hpbGRyZW5cblx0XHRcdFx0dmFyIHBvcyA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAoZGl2cy5sZW5ndGgtMykpKVxuXHRcdFx0Y29uc29sZS5sb2cocG9zKVxuXHRcdFx0XHRpZihwb3M8PTApXG5cdFx0XHRcdHBvcz0wXG5cdFx0XHRcdGNvbnNvbGUubG9nKHBvcylcblx0XHRcdFx0cm9sZUZlZWQuaW5zZXJ0QmVmb3JlKGRpdiwgcm9sZUZlZWQuY2hpbGRyZW5bcG9zXSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJvbGVGZWVkLmluc2VydEJlZm9yZShkaXYsIHJvbGVGZWVkLmZpcnN0Q2hpbGQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIH0sIDEwMDApO1xuXHRcdH1cblx0XG4vLyB9XG5cblxuIiwiaW1wb3J0IHsgUG9zdHMgfSBmcm9tIFwiLi9tb2RlbHMvcG9zdFwiO1xuXG5leHBvcnQgY29uc3QgZmJDYXJkID0gKHBvc3Q6UG9zdHMpOnN0cmluZyA9PiB7XG5cdGxldCBjYXJkID0gYFxuICAgIDxkaXY+XG5cdDwhLS0kLS0+XG5cdDxkaXYgY2xhc3M9XCJkdTR3MzVsYiBrNHVyY2ZibSBsOWowZGhlNyBzamdoNjVpMFwiPlxuXHRcdDxkaXYgY2xhc3M9XCJkdTR3MzVsYiBsOWowZGhlN1wiPlxuXHRcdFx0PGRpdiBjbGFzcz1cIlwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiXCI+XG5cdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0YXJpYS1wb3NpbnNldD1cIjFcIlxuXHRcdFx0XHRcdFx0YXJpYS1kZXNjcmliZWRieT1cImpzY19jXzJuIGpzY19jXzJvIGpzY19jXzJwIGpzY19jXzJyIGpzY19jXzJxXCJcblx0XHRcdFx0XHRcdGFyaWEtbGFiZWxsZWRieT1cImpzY19jXzJtXCJcblx0XHRcdFx0XHRcdGNsYXNzPVwibHpjaWM0d2xcIlxuXHRcdFx0XHRcdFx0cm9sZT1cImFydGljbGVcIlxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJqODNhZ3g4MCBjYnU0ZDk0dFwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicnEwZXNjeHYgbDlqMGRoZTcgZHU0dzM1bGJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiajgzYWd4ODAgbDlqMGRoZTcgazR1cmNmYm1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRib3JkZXItcmFkaXVzOiBtYXgoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDBweCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bWluKDhweCwgY2FsYygoMTAwdncgLSA0cHggLSAxMDAlKSAqIDk5OTkpKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KSAvIDhweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJycTBlc2N4diBsOWowZGhlNyBkdTR3MzVsYiBoeWJ2c3c2YyBpbzB6cWViZCBtNWxjdmFzcyBmYmlwbDhxZyBud3ZxdG43NyBrNHVyY2ZibSBuaThkYm1vNCBzdGpnbnR4cyBzYmNmcHpnc1wiXG5cdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdj48L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIlwiPjwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwibGw4dGx2Nm0gajgzYWd4ODAgYnR3eHgxdDMgbjg1MWNmY3MgaHY0cnZyZmMgZGF0aTF3MGEgcHlicjU2eWFcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJvaTkyNDRlOCBkbzAwdTcxeiBqODNhZ3g4MFwiID5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJuYzY4NG5sNlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxhXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJkaXNwbGF5Om5vbmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwib2Fqcmx4YjIgZzVpYTc3dTEgcXUweDA1MWYgZXNyNW1oNncgZTk5ODl1ZTQgcjdkNmtnY3ogcnEwZXNjeHYgbmhkMmo4YTkgbmM2ODRubDYgcDdoamxuOG8ga3ZnbWM2ZzUgY3htbXI1dDggb3lncnZoYWIgaGN1a3l4M3ggamIzdnlqeXMgcno0d2JkOGEgcXQ2YzBjdjkgYThueXdkc28gaTFhbzlzOGggZXN1eXp3d3IgZjFzaXAwb2YgbHpjaWM0d2wgZ3BybzB3aTggb285Z3I1aWRcIlxuXHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cm9sZT1cImxpbmtcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFiaW5kZXg9XCItMVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PGRpdiBjbGFzcz1cInE2NzZqNm9wIHF5cHFwNWNnXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxvYmplY3QgdHlwZT1cIm5lc3RlZC9wcmVzc2FibGVcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1sYWJlbD1cIiR7cG9zdC5uYW1lfVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm9hanJseGIyIGdzMWE5eWlwIGc1aWE3N3UxIG10a3c5a2JpIHRscGxqeHRwIHFlbnN1eThqIHBwcDVheXEyIGdvdW4yODQ2IGNjbTAwamplIHM0NHAzbHR3IG1rMm1jNWY0IHJ0OGI0emlnIG44ZWozbzNsIGFnZWhhbjJkIHNrNHh4bXAyIHJxMGVzY3h2IG5oZDJqOGE5IG1nNGc3NzhsIHBmbnloM213IHA3aGpsbjhvIGt2Z21jNmc1IGN4bW1yNXQ4IG95Z3J2aGFiIGhjdWt5eDN4IHRndmJqY3BvIGhwZnZtcmd6IGpiM3Z5anlzIHJ6NHdiZDhhIHF0NmMwY3Y5IGE4bnl3ZHNvIGw5ajBkaGU3IGkxYW85czhoIGVzdXl6d3dyIGYxc2lwMG9mIGR1NHczNWxiIG4wMGplN3RxIGFyZmc3NGJ2IHFzOXlzeGk4IGs3N3o4eXFsIGJ0d3h4MXQzIGFiaXdscmtoIHA4ZGF3azdsIGx6Y2ljNHdsIG9vOWdyNWlkIHE5dW9yaWxiXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyb2xlPVwibGlua1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YWJpbmRleD1cIjBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJxOXVvcmlsYiBsOWowZGhlNyBwemdnYml5cCBkdTR3MzVsYlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzdmdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhcmlhLWhpZGRlbj1cInRydWVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwicHpnZ2JpeXBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtdmlzdWFsY29tcGxldGlvbj1cImlnbm9yZS1keW5hbWljXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyb2xlPVwibm9uZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJoZWlnaHQ6IDQwcHg7IHdpZHRoOiA0MHB4XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxtYXNrIGlkPVwianNjX2NfMnNcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxjaXJjbGVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y3g9XCIyMFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGN5PVwiMjBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmaWxsPVwid2hpdGVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyPVwiMjBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvY2lyY2xlPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGNpcmNsZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjeD1cIjM0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y3k9XCIzNFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtdmlzdWFsY29tcGxldGlvbj1cImlnbm9yZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZpbGw9XCJibGFja1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHI9XCI2LjVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvY2lyY2xlPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvbWFzaz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZyBtYXNrPVwidXJsKCNqc2NfY18ycylcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRoZWlnaHQ6IDQwcHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0d2lkdGg6IDQwcHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRoZWlnaHQ9XCIxMDAlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3aWR0aD1cIjEwMCVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzcmM9JHtwb3N0LmltZ31cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2ltZz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxjaXJjbGVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJtbHFvMGRoMCBnZW9ydmVrYiBzNmtiNXIzZlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGN4PVwiMjBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjeT1cIjIwXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cj1cIjIwXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2NpcmNsZT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJpMDlxdHp3YiBuN2ZpMXF4MyBiNXdtaWZkbCBoenJ1b2Y1YSBwbWs3am5xZyBqOWlzcGVnbiBrcjUyMHh4NCBjNW5kYXZwaCBhcnQxb21rdCBvdDlmZ2wzcyBzNDVrZmw3OSBlbWx4bGF5YSBia21ocDc1dyBzcGI3eGJ0dlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS12aXN1YWxjb21wbGV0aW9uPVwiaWdub3JlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJzNDVrZmw3OSBlbWx4bGF5YSBia21ocDc1dyBzcGI3eGJ0diBwbWs3am5xZyBrYXZiZ28xNFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS12aXN1YWxjb21wbGV0aW9uPVwiaWdub3JlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ym90dG9tOiA2cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyaWdodDogNnB4O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoNTAlLCA1MCUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImw5ajBkaGU3IHN0amdudHhzIG5pOGRibW80IGo4M2FneDgwIHNwYjd4YnR2IGJrbWhwNzV3IGVtbHhsYXlhIHM0NWtmbDc5XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiaXl5eDVmNDEgbDlqMGRoZTcgY2VicGRyamsgYmlwbWF0dDAgazV3dmk3bmYgYThzMjB2N3Agazc3ejh5cWwgcXM5eXN4aTggYXJmZzc0YnYgbjAwamU3dHEgYTZzaXh6aTggdG9qdm5tMnRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwicHE2ZHE0NmQgamxsbTRmNGggZno2cTZoZGQgc3g5MG92eDUgcXUweDA1MWYgZXNyNW1oNncgZTk5ODl1ZTQgcjdkNmtnY3ogczQ1a2ZsNzkgZW1seGxheWEgYmttaHA3NXcgc3BiN3hidHZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtdmlzdWFsY29tcGxldGlvbj1cImlnbm9yZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImkwOXF0endiIG43ZmkxcXgzIGI1d21pZmRsIGh6cnVvZjVhIHBtazdqbnFnIGo5aXNwZWduIGtyNTIweHg0IGM1bmRhdnBoIGFydDFvbWt0IG90OWZnbDNzIHM0NWtmbDc5IGVtbHhsYXlhIGJrbWhwNzV3IHNwYjd4YnR2XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJpZ25vcmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJycTBlc2N4diBkdTR3MzVsYiBxNDV6b2hpMSBlbWExZTQwaCBheTdkanBjbCBuaThkYm1vNCBzdGpnbnR4cyBwbWs3am5xZyByZnVhMHhka1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdEFjdGl2ZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+PC9hXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L29iamVjdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PjwvYVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L3NwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYnVvZmgxcHJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiajgzYWd4ODAgY2J1NGQ5NHQgZXcwZGJrMWIgaXJqMmI4cGdcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInF6aHd0Ym02IGtudm1tMzhkXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImQyZWRjdWcwIGhwZnZtcmd6IHF2NjZzdzFiIGMxZXQ1dXFsIGIwdHExd3VhIGE4YzM3eDFqIGZlNmtkZDByIG1hdTU1Zzl3IGM4YjI4MnliIGtlb2Q1Z3cwIG54aG9hZm5tIGFpZ3NoOXM5IGQ5d3dwcGtuIGhyenl4ODdpIGpxNHFjaTJxIGEzYmQ5bzN2IGIxdjh4b2t3IG05b3NxYWluIGh6YXdiYzhtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlyPVwiYXV0b1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48aDRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZD1cImpzY19jXzJtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImdtcWwwbngwIGw5NG1yYnhkIHAxcmk5YTExIGx6Y2ljNHdsIGFhaGRmdnl1IGh6YXdiYzhtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwibmM2ODRubDZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjxhXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwib2Fqcmx4YjIgZzVpYTc3dTEgcXUweDA1MWYgZXNyNW1oNncgZTk5ODl1ZTQgcjdkNmtnY3ogcnEwZXNjeHYgbmhkMmo4YTkgbmM2ODRubDYgcDdoamxuOG8ga3ZnbWM2ZzUgY3htbXI1dDggb3lncnZoYWIgaGN1a3l4M3ggamIzdnlqeXMgcno0d2JkOGEgcXQ2YzBjdjkgYThueXdkc28gaTFhbzlzOGggZXN1eXp3d3IgZjFzaXAwb2YgbHpjaWM0d2wgZ3BybzB3aTggb285Z3I1aWQgbHJhenpkNXBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRocmVmPVwiJHtwb3N0Lmxpbmt9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cm9sZT1cImxpbmtcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YWJpbmRleD1cIjBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PHN0cm9uZ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48c3Bhbj4gRnJvbSAke3Bvc3QubmFtZX08L3NwYW4+PC9zdHJvbmdcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvYVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Pjwvc3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9oND48L3NwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicXpod3RibTYga252bW0zOGRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiZDJlZGN1ZzAgaHBmdm1yZ3ogcXY2NnN3MWIgYzFldDV1cWwgYjB0cTF3dWEgYThjMzd4MWogZmU2a2RkMHIgbWF1NTVnOXcgYzhiMjgyeWIga2VvZDVndzAgbnhob2Fmbm0gYWlnc2g5czkgdGlhNmg3OWMgaXYzbm82ZGIgZTl2dWVkczMgajV3YW05Z2kgYjF2OHhva3cgbTlvc3FhaW4gaHphd2JjOG1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkaXI9XCJhdXRvXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjxzcGFuIGlkPVwianNjX2NfMm5cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48c3BhbiBjbGFzcz1cImpwcDhwemRvXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48c3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PHNwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInJmdWEweGRrIHBtazdqbnFnIHN0amdudHhzIG5pOGRibW80IGF5N2RqcGNsIHE0NXpvaGkxXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+Jm5ic3A7PC9zcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHTCt1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3NwYW4+PC9zcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9zcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjxzcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PHNwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJ0b2p2bm0ydCBhNnNpeHppOCBhYnMyano0cSBhOHMyMHY3cCB0MXA4aWFxaCBrNXd2aTduZiBxM2xmZDVqdiBwazRzOTk3YSBiaXBtYXR0MCBjZWJwZHJqayBxb3dzbXY2MyBvd3doZW1odSBkcDFodTByYiBkaHA2MWM2eSBpeXl4NWY0MVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48YVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwib2Fqcmx4YjIgZzVpYTc3dTEgcXUweDA1MWYgZXNyNW1oNncgZTk5ODl1ZTQgcjdkNmtnY3ogcnEwZXNjeHYgbmhkMmo4YTkgbmM2ODRubDYgcDdoamxuOG8ga3ZnbWM2ZzUgY3htbXI1dDggb3lncnZoYWIgaGN1a3l4M3ggamIzdnlqeXMgcno0d2JkOGEgcXQ2YzBjdjkgYThueXdkc28gaTFhbzlzOGggZXN1eXp3d3IgZjFzaXAwb2YgbHpjaWM0d2wgZ21xbDBueDAgZ3BybzB3aTggYjF2OHhva3dcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGhyZWY9XCIke3Bvc3QubGlua31cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJvbGU9XCJsaW5rXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YWJpbmRleD1cIjBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48c3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjxzcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiajFsdnp3bTQgc3RqZ250eHMgbmk4ZGJtbzQgcTl1b3JpbGIgZ3BybzB3aThcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwidDVhMjYydnogbmM2ODRubDYgaWh4cWhxM20gbDk0bXJieGQgYWVuZmh4d3IgbDlqMGRoZTcgc2Roa2E1aDRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JkZXI6IDA7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQke3Bvc3QudGltZX1cblx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwidDVhMjYydnogbmM2ODRubDYgaWh4cWhxM20gbDk0bXJieGQgYWVuZmh4d3IgbDlqMGRoZTcgc2Roa2E1aDRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiBub25lO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JkZXI6IDA7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJteW9oeW9nMiBsOWowZGhlNyBzZGhrYTVoNCBncmhLbERrQSBjZEdPXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG9wOiAzZW07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yZGVyOiAxNztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJ0NWEyNjJ2eiBsOTRtcmJ4ZCBteW9oeW9nMiBsOWowZGhlNyBzZGhrYTVoNCBncmhLbERrQSBjZEdPXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG9wOiAzZW07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yZGVyOiAyNTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0clxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwibXlvaHlvZzIgbDlqMGRoZTcgc2Roa2E1aDQgZ3JoS2xEa0EgY2RHT1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvcDogM2VtO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmRlcjogMTI7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImloeHFocTNtIG15b2h5b2cyIGw5ajBkaGU3IHNkaGthNWg0IGdyaEtsRGtBIGNkR09cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0b3A6IDNlbTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JkZXI6IDc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImI2emJjbGx5IGw5ajBkaGU3IHNkaGthNWg0IGdyaEtsRGtBIGNkR09cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0b3A6IDNlbTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JkZXI6IDEzO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJpaHhxaHEzbSBteW9oeW9nMiBsOWowZGhlNyBzZGhrYTVoNCBncmhLbERrQSBjZEdPXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG9wOiAzZW07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yZGVyOiAzMDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwibmM2ODRubDYgbDk0bXJieGQgbDlqMGRoZTcgc2Roa2E1aDQgZ3JoS2xEa0EgY2RHT1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvcDogM2VtO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmRlcjogODtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0U1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwidDVhMjYydnogbmM2ODRubDYgaWh4cWhxM20gbDk0bXJieGQgYWVuZmh4d3IgbDlqMGRoZTcgc2Roa2E1aDQgZ3JoS2xEa0EgY2RHT1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvcDogM2VtO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmRlcjogMTE7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImw5NG1yYnhkIGFlbmZoeHdyIG15b2h5b2cyIGI2emJjbGx5IGw5ajBkaGU3IHNkaGthNWg0IGdyaEtsRGtBIGNkR09cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0b3A6IDNlbTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JkZXI6IDI2O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJuYzY4NG5sNiBsOTRtcmJ4ZCBsOWowZGhlNyBzZGhrYTVoNCBncmhLbERrQSBjZEdPXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG9wOiAzZW07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yZGVyOiAxNTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiYjZ6YmNsbHkgbDlqMGRoZTcgc2Roa2E1aDQgZ3JoS2xEa0EgY2RHT1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvcDogM2VtO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmRlcjogNTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiYjZ6YmNsbHkgbDlqMGRoZTcgc2Roa2E1aDQgZ3JoS2xEa0EgY2RHT1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvcDogM2VtO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmRlcjogMTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0NlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiaWh4cWhxM20gbXlvaHlvZzIgbDlqMGRoZTcgc2Roa2E1aDQgZ3JoS2xEa0EgY2RHT1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvcDogM2VtO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmRlcjogMztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0NFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwibmM2ODRubDYgbDk0bXJieGQgbDlqMGRoZTcgc2Roa2E1aDQgZ3JoS2xEa0EgY2RHT1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvcDogM2VtO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmRlcjogMTY7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImw5NG1yYnhkIGFlbmZoeHdyIG15b2h5b2cyIGI2emJjbGx5IGw5ajBkaGU3IHNkaGthNWg0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwib3JkZXI6IDE4XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJiNnpiY2xseSBsOWowZGhlNyBzZGhrYTVoNFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIm9yZGVyOiAyNFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0blxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwidDVhMjYydnogYWVuZmh4d3IgYjZ6YmNsbHkgbDlqMGRoZTcgc2Roa2E1aDQgZ3JoS2xEa0EgY2RHT1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvcDogM2VtO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmRlcjogMjA7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDFcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm5jNjg0bmw2IGw5NG1yYnhkIGw5ajBkaGU3IHNkaGthNWg0IGdyaEtsRGtBIGNkR09cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0b3A6IDNlbTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JkZXI6IDY7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDNcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm5jNjg0bmw2IGw5NG1yYnhkIGw5ajBkaGU3IHNkaGthNWg0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwib3JkZXI6IDIxXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJteW9oeW9nMiBsOWowZGhlNyBzZGhrYTVoNCBncmhLbERrQSBjZEdPXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG9wOiAzZW07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yZGVyOiA0O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ3XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJpaHhxaHEzbSBteW9oeW9nMiBsOWowZGhlNyBzZGhrYTVoNCBncmhLbERrQSBjZEdPXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG9wOiAzZW07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yZGVyOiAxOTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwidDVhMjYydnogbmM2ODRubDYgaWh4cWhxM20gbDk0bXJieGQgYWVuZmh4d3IgbDlqMGRoZTcgc2Roa2E1aDQgZ3JoS2xEa0EgY2RHT1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvcDogM2VtO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmRlcjogMTA7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDhcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInQ1YTI2MnZ6IGw5NG1yYnhkIG15b2h5b2cyIGw5ajBkaGU3IHNkaGthNWg0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwib3JkZXI6IDJcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdEpcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImloeHFocTNtIG15b2h5b2cyIGw5ajBkaGU3IHNkaGthNWg0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwib3JkZXI6IDIyXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJ0NWEyNjJ2eiBhZW5maHh3ciBiNnpiY2xseSBsOWowZGhlNyBzZGhrYTVoNCBncmhLbERrQSBjZEdPXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG9wOiAzZW07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yZGVyOiAxNDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwibmM2ODRubDYgbDk0bXJieGQgbDlqMGRoZTcgc2Roa2E1aDQgZ3JoS2xEa0EgY2RHT1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvcDogM2VtO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmRlcjogOTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwidDVhMjYydnogbmM2ODRubDYgaWh4cWhxM20gbDk0bXJieGQgYWVuZmh4d3IgbDlqMGRoZTcgc2Roa2E1aDQgZ3JoS2xEa0EgY2RHT1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRvcDogM2VtO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmRlcjogMjg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInQ1YTI2MnZ6IG5jNjg0bmw2IGloeHFocTNtIGw5NG1yYnhkIGFlbmZoeHdyIGw5ajBkaGU3IHNkaGthNWg0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwib3JkZXI6IDIzXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQmbmJzcDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm15b2h5b2cyIGw5ajBkaGU3IHNkaGthNWg0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwib3JkZXI6IDI5XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJteW9oeW9nMiBsOWowZGhlNyBzZGhrYTVoNFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIm9yZGVyOiAyN1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj48L3NwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L3NwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9hXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L3NwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48IS0tJC0tPjwhLS0vJC0tPjwvc3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48c3BhbiBjbGFzcz1cImpwcDhwemRvXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48c3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PHNwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInJmdWEweGRrIHBtazdqbnFnIHN0amdudHhzIG5pOGRibW80IGF5N2RqcGNsIHE0NXpvaGkxXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+Jm5ic3A7PC9zcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHTCt1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3NwYW4+PC9zcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9zcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJicDljYmp5biBwcTZkcTQ2ZCB0YWlqcG41dFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJ0b2p2bm0ydCBhNnNpeHppOCBhYnMyano0cSBhOHMyMHY3cCB0MXA4aWFxaCBrNXd2aTduZiBxM2xmZDVqdiBwazRzOTk3YSBiaXBtYXR0MCBjZWJwZHJqayBxb3dzbXY2MyBvd3doZW1odSBkcDFodTByYiBkaHA2MWM2eSBpeXl4NWY0MVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48c3BhbiBjbGFzcz1cImw5ajBkaGU3XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PHNwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwicTQ1em9oaTEgZzBhYTRjZ2EgcG1rN2pucWdcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlNoYXJlZCB3aXRoIFlvdXIgZnJpZW5kczwvc3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm9hanJseGIyIGc1aWE3N3UxIHF1MHgwNTFmIGVzcjVtaDZ3IGU5OTg5dWU0IHI3ZDZrZ2N6IHJxMGVzY3h2IG5oZDJqOGE5IG5jNjg0bmw2IHA3aGpsbjhvIGt2Z21jNmc1IGN4bW1yNXQ4IG95Z3J2aGFiIGhjdWt5eDN4IGpiM3Z5anlzIHJ6NHdiZDhhIHF0NmMwY3Y5IGE4bnl3ZHNvIGkxYW85czhoIGVzdXl6d3dyIGYxc2lwMG9mIG4wMGplN3RxIGFyZmc3NGJ2IHFzOXlzeGk4IGs3N3o4eXFsIGFiaXdscmtoIHA4ZGF3azdsIGx6Y2ljNHdsIGh3ZGRjM2w1XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJvbGU9XCJidXR0b25cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFiaW5kZXg9XCIwXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJFZGl0IFByaXZhY3lcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImJwOWNianluIGo4M2FneDgwIHRhaWpwbjV0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFyaWEtaGlkZGVuPVwiZmFsc2VcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwidGFpanBuNXQgcHE2ZHE0NmQgYnA5Y2JqeW4gY2dhdDFsdHVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmwwNHIxZDVcIj48L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImkwOXF0endiIG43ZmkxcXgzIGI1d21pZmRsIGh6cnVvZjVhIHBtazdqbnFnIGo5aXNwZWduIGtyNTIweHg0IGM1bmRhdnBoIGFydDFvbWt0IG90OWZnbDNzIHM0NWtmbDc5IGVtbHhsYXlhIGJrbWhwNzV3IHNwYjd4YnR2XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS12aXN1YWxjb21wbGV0aW9uPVwiaWdub3JlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRib3R0b206IC00cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGVmdDogLTRweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyaWdodDogLTRweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0b3A6IC00cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9kaXY+PC9kaXY+PC9zcGFuPjwvc3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwhLS0kLS0+PCEtLS8kLS0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+PC9zcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L3NwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJucW12eHZlYyBqODNhZ3g4MCBqbmlncGc3OCBjeGdweHgwNSBkZmxoOWxodSBzajV4OXZ2YyBzY2I5ZHhkciBvZHc4dWlxM1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1leHBhbmRlZD1cImZhbHNlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFyaWEtaGFzcG9wdXA9XCJtZW51XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJBY3Rpb25zIGZvciB0aGlzIHBvc3RcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJvYWpybHhiMiBnczFhOXlpcCBtdGt3OWtiaSB0bHBsanh0cCBxZW5zdXk4aiBwcHA1YXlxMiBycTBlc2N4diBuaGQyajhhOSBtZzRnNzc4bCBwZm55aDNtdyBwN2hqbG44byB0Z3ZiamNwbyBocGZ2bXJneiBpMWFvOXM4aCBlc3V5end3ciBmMXNpcDBvZiBkdTR3MzVsYiBuMDBqZTd0cSBhcmZnNzRidiBxczl5c3hpOCBrNzd6OHlxbCBidHd4eDF0MyBhYml3bHJraCBwOGRhd2s3bCBsemNpYzR3bCBkd28zZnNoOCBnNWlhNzd1MSBnb3VuMjg0NiBjY20wMGpqZSBzNDRwM2x0dyBtazJtYzVmNCBydDhiNHppZyBuOGVqM28zbCBhZ2VoYW4yZCBzazR4eG1wMiBwcTZkcTQ2ZCBrdmdtYzZnNSBjeG1tcjV0OCBveWdydmhhYiBoY3VreXgzeCBqYjN2eWp5cyByejR3YmQ4YSBxdDZjMGN2OSBhOG55d2RzbyBsOWowZGhlNyBwemdnYml5cCBwa2o3dWIxbyBicW5seHM1cCBra2c5YXpxcyBjMjRwYTF1ayBsbjlpeXgzcCBmZTZrZGQwciBhcjFvdml3cSBsMTBxOG1pOSBzcTQwcWdrYyBzOHF1eHo2cCBwZGpnbGJ1clwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyb2xlPVwiYnV0dG9uXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhYmluZGV4PVwiMFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHN2Z1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmaWxsPVwiY3VycmVudENvbG9yXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmlld0JveD1cIjAgMCAyMCAyMFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdpZHRoPVwiMWVtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aGVpZ2h0PVwiMWVtXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJhOGMzN3gxaiBtczA1c2l3cyBsM3FyeGpkcCBiN2g5b2NmNCBweTFmNnFsaCBqbmlncGc3OCBvZHc4dWlxM1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZmlsbC1ydWxlPVwiZXZlbm9kZFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHJhbnNmb3JtPVwidHJhbnNsYXRlKC00NDYgLTM1MClcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHBhdGhcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGQ9XCJNNDU4IDM2MGEyIDIgMCAxIDEtNCAwIDIgMiAwIDAgMSA0IDBtNiAwYTIgMiAwIDEgMS00IDAgMiAyIDAgMCAxIDQgMG0tMTIgMGEyIDIgMCAxIDEtNCAwIDIgMiAwIDAgMSA0IDBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvc3ZnPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImkwOXF0endiIG43ZmkxcXgzIGI1d21pZmRsIGh6cnVvZjVhIHBtazdqbnFnIGo5aXNwZWduIGtyNTIweHg0IGM1bmRhdnBoIGFydDFvbWt0IG90OWZnbDNzIHM0NWtmbDc5IGVtbHhsYXlhIGJrbWhwNzV3IHNwYjd4YnR2XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS12aXN1YWxjb21wbGV0aW9uPVwiaWdub3JlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRib3R0b206IC04cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGVmdDogLThweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyaWdodDogLThweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0b3A6IC04cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJcIiBkaXI9XCJhdXRvXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiaHY0cnZyZmMgZGF0aTF3MGEgamIzdnlqeXMgcXQ2YzBjdjlcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZD1cImpzY19jXzJvXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiZjUzMG1tejUgYjF2OHhva3cgbzB0MmVzMDAgb285Z3I1aWRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJrdmdtYzZnNSBjeG1tcjV0OCBveWdydmhhYiBoY3VreXgzeCBjMWV0NXVxbFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHA+JHtwb3N0LmNvbnRlbnRIdG1sfTwvcD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJzdGpnbnR4cyBuaThkYm1vNCBsODJ4OXp3aSB1bzNkOTBwNyBoOTA1aTVudSBtb25henJoOVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCJcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJpZ25vcmUtZHluYW1pY1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PCEtLSQtLT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJ0dmZrc3JpMCBvenVmdGw5bSBqbWJpc3BsMyBvbG80dWpiNlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInJxMGVzY3h2IGw5ajBkaGU3IGR1NHczNWxiIGo4M2FneDgwIHBmbnloM213IGkxZm52Z3FkIGdzMWE5eWlwIG93eWN4NmRhIGJ0d3h4MXQzIHBoNXV1NWptIGIzb25tZ3VzIGU1bmxoZXAwIGVjbTBiYnp0IG5rd2l6cTVkIHJvaDYwYnc5IG15c2dmZG14IGhkZGc5cGhnXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwicnEwZXNjeHYgbDlqMGRoZTcgZHU0dzM1bGIgajgzYWd4ODAgY2J1NGQ5NHQgZDJlZGN1ZzAgaHBmdm1yZ3ogcmoxZ2gwaHggYnVvZmgxcHIgZzVnajk1N3Ugbjh0dDBtb2sgaHloOWJlZnEgaXVueTd0eDMgaXBqYzZmeXRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1sYWJlbD1cIkxpa2VcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm9hanJseGIyIGdzMWE5eWlwIGc1aWE3N3UxIG10a3c5a2JpIHRscGxqeHRwIHFlbnN1eThqIHBwcDVheXEyIGdvdW4yODQ2IGNjbTAwamplIHM0NHAzbHR3IG1rMm1jNWY0IHJ0OGI0emlnIG44ZWozbzNsIGFnZWhhbjJkIHNrNHh4bXAyIHJxMGVzY3h2IG5oZDJqOGE5IG1nNGc3NzhsIHBmbnloM213IHA3aGpsbjhvIGt2Z21jNmc1IGN4bW1yNXQ4IG95Z3J2aGFiIGhjdWt5eDN4IHRndmJqY3BvIGhwZnZtcmd6IGpiM3Z5anlzIHJ6NHdiZDhhIHF0NmMwY3Y5IGE4bnl3ZHNvIGw5ajBkaGU3IGkxYW85czhoIGVzdXl6d3dyIGR1NHczNWxiIG4wMGplN3RxIGFyZmc3NGJ2IHFzOXlzeGk4IGs3N3o4eXFsIHBxNmRxNDZkIGJ0d3h4MXQzIGFiaXdscmtoIHA4ZGF3azdsIGx6Y2ljNHdsIGdva2tlMDBhXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cm9sZT1cImJ1dHRvblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhYmluZGV4PVwiMFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInJxMGVzY3h2IGw5ajBkaGU3IGR1NHczNWxiIGo4M2FneDgwIHJqMWdoMGh4IGJ1b2ZoMXByIGc1Z2o5NTd1IGhwZnZtcmd6IHRhaWpwbjV0IGJwOWNianluIG93eWN4NmRhIGJ0d3h4MXQzIGQxNTQ0YWcwIHR3NmEyem5xIGpiM3Z5anlzIGRsdjN3bm9nIHJsMDRyMWQ1IG15c2dmZG14IGhkZGc5cGhnIHF1OG9rcnpzIGcwcW5hYnI1XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwicnEwZXNjeHYgbDlqMGRoZTcgZHU0dzM1bGIgajgzYWd4ODAgY2J1NGQ5NHQgcGZueWgzbXcgZDJlZGN1ZzAgaHBmdm1yZ3ogcGg1dXU1am0gYjNvbm1ndXMgaXVueTd0eDMgaXBqYzZmeXRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicHE2ZHE0NmRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PGlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJjc3MtaW1nXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImh1NXBqZ2xsIG02azQ2N3BzXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZC1pbWFnZTogdXJsKCcnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtcG9zaXRpb246IDAgLTI5N3B4O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZC1zaXplOiBhdXRvO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0d2lkdGg6IDE4cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRoZWlnaHQ6IDE4cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2lcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJycTBlc2N4diBsOWowZGhlNyBkdTR3MzVsYiBqODNhZ3g4MCBjYnU0ZDk0dCBwZm55aDNtdyBkMmVkY3VnMCBocGZ2bXJneiBwaDV1dTVqbSBiM29ubWd1cyBpdW55N3R4MyBpcGpjNmZ5dFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJkMmVkY3VnMCBocGZ2bXJneiBxdjY2c3cxYiBjMWV0NXVxbCBiMHRxMXd1YSBhOGMzN3gxaiBmZTZrZGQwciBtYXU1NWc5dyBjOGIyODJ5YiBrZW9kNWd3MCBueGhvYWZubSBhaWdzaDlzOSBkOXd3cHBrbiBocnp5eDg3aSBqcTRxY2kycSBhM2JkOW8zdiBscmF6emQ1cCBtOW9zcWFpblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRpcj1cImF1dG9cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PHNwYW4+TGlrZTwvc3Bhbj48L3NwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm4wMGplN3RxIGFyZmc3NGJ2IHFzOXlzeGk4IGs3N3o4eXFsIGkwOXF0endiIG43ZmkxcXgzIGI1d21pZmRsIGh6cnVvZjVhIHBtazdqbnFnIGo5aXNwZWduIGtyNTIweHg0IGM1bmRhdnBoIGFydDFvbWt0IG90OWZnbDNzIHJucjYxYW4zXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJpZ25vcmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiYm9yZGVyLXJhZGl1czogNHB4XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJSZWFjdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwib2Fqcmx4YjIgZ3MxYTl5aXAgZzVpYTc3dTEgbXRrdzlrYmkgdGxwbGp4dHAgcWVuc3V5OGogcHBwNWF5cTIgZ291bjI4NDYgY2NtMDBqamUgczQ0cDNsdHcgbWsybWM1ZjQgcnQ4YjR6aWcgbjhlajNvM2wgYWdlaGFuMmQgc2s0eHhtcDIgcnEwZXNjeHYgbmhkMmo4YTkgbWc0Zzc3OGwgcGZueWgzbXcgcDdoamxuOG8ga3ZnbWM2ZzUgY3htbXI1dDggb3lncnZoYWIgaGN1a3l4M3ggdGd2YmpjcG8gaHBmdm1yZ3ogaTFhbzlzOGggZXN1eXp3d3IgZHU0dzM1bGIgbjAwamU3dHEgYXJmZzc0YnYgcXM5eXN4aTggazc3ejh5cWwgcHE2ZHE0NmQgYnR3eHgxdDMgYWJpd2xya2ggcDhkYXdrN2wgbHpjaWM0d2wgcHBoeDEyb3kgYjR5bGloeTggcno0d2JkOGEgYjQwbXIwd3cgYThueXdkc28gaG1hbGcwcXIgcTQ1em9oaTEgZzBhYTRjZ2EgcG1rN2pucWcgZ29ra2UwMGFcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyb2xlPVwiYnV0dG9uXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFiaW5kZXg9XCIwXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJjc3MtaW1nXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImh1NXBqZ2xsIG02azQ2N3BzXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZC1pbWFnZTogdXJsKCcnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtcG9zaXRpb246IC0xMDJweCAtMTA5cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXNpemU6IGF1dG87XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3aWR0aDogMTZweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGhlaWdodDogMTZweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvaT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwibjAwamU3dHEgYXJmZzc0YnYgcXM5eXN4aTggazc3ejh5cWwgaTA5cXR6d2IgbjdmaTFxeDMgYjV3bWlmZGwgaHpydW9mNWEgcG1rN2pucWcgajlpc3BlZ24ga3I1MjB4eDQgYzVuZGF2cGggYXJ0MW9ta3Qgb3Q5ZmdsM3NcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtdmlzdWFsY29tcGxldGlvbj1cImlnbm9yZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwicnEwZXNjeHYgbDlqMGRoZTcgZHU0dzM1bGIgajgzYWd4ODAgY2J1NGQ5NHQgZDJlZGN1ZzAgaHBmdm1yZ3ogcmoxZ2gwaHggYnVvZmgxcHIgZzVnajk1N3Ugbjh0dDBtb2sgaHloOWJlZnEgaXVueTd0eDMgaXBqYzZmeXRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1sYWJlbD1cIkxlYXZlIGEgY29tbWVudFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwib2Fqcmx4YjIgZ3MxYTl5aXAgZzVpYTc3dTEgbXRrdzlrYmkgdGxwbGp4dHAgcWVuc3V5OGogcHBwNWF5cTIgZ291bjI4NDYgY2NtMDBqamUgczQ0cDNsdHcgbWsybWM1ZjQgcnQ4YjR6aWcgbjhlajNvM2wgYWdlaGFuMmQgc2s0eHhtcDIgcnEwZXNjeHYgbmhkMmo4YTkgbWc0Zzc3OGwgcGZueWgzbXcgcDdoamxuOG8ga3ZnbWM2ZzUgY3htbXI1dDggb3lncnZoYWIgaGN1a3l4M3ggdGd2YmpjcG8gaHBmdm1yZ3ogamIzdnlqeXMgcno0d2JkOGEgcXQ2YzBjdjkgYThueXdkc28gbDlqMGRoZTcgaTFhbzlzOGggZXN1eXp3d3IgZjFzaXAwb2YgZHU0dzM1bGIgbjAwamU3dHEgYXJmZzc0YnYgcXM5eXN4aTggazc3ejh5cWwgcHE2ZHE0NmQgYnR3eHgxdDMgYWJpd2xya2ggcDhkYXdrN2wgbHpjaWM0d2xcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyb2xlPVwiYnV0dG9uXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFiaW5kZXg9XCIwXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwicnEwZXNjeHYgbDlqMGRoZTcgZHU0dzM1bGIgajgzYWd4ODAgcmoxZ2gwaHggYnVvZmgxcHIgZzVnajk1N3UgaHBmdm1yZ3ogdGFpanBuNXQgYnA5Y2JqeW4gb3d5Y3g2ZGEgYnR3eHgxdDMgZDE1NDRhZzAgdHc2YTJ6bnEgamIzdnlqeXMgZGx2M3dub2cgcmwwNHIxZDUgbXlzZ2ZkbXggaGRkZzlwaGcgcXU4b2tyenMgZzBxbmFicjVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJycTBlc2N4diBsOWowZGhlNyBkdTR3MzVsYiBqODNhZ3g4MCBjYnU0ZDk0dCBwZm55aDNtdyBkMmVkY3VnMCBocGZ2bXJneiBwaDV1dTVqbSBiM29ubWd1cyBpdW55N3R4MyBpcGpjNmZ5dFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS12aXN1YWxjb21wbGV0aW9uPVwiY3NzLWltZ1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiaHU1cGpnbGwgbTZrNDY3cHNcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtaW1hZ2U6IHVybCgnJHtwb3N0LmltZ30nKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIC0yNTlweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXNpemU6IGF1dG87XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0d2lkdGg6IDE4cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aGVpZ2h0OiAxOHB4O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvaT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInJxMGVzY3h2IGw5ajBkaGU3IGR1NHczNWxiIGo4M2FneDgwIGNidTRkOTR0IHBmbnloM213IGQyZWRjdWcwIGhwZnZtcmd6IHBoNXV1NWptIGIzb25tZ3VzIGl1bnk3dHgzIGlwamM2Znl0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImQyZWRjdWcwIGhwZnZtcmd6IHF2NjZzdzFiIGMxZXQ1dXFsIGIwdHExd3VhIGE4YzM3eDFqIGZlNmtkZDByIG1hdTU1Zzl3IGM4YjI4MnliIGtlb2Q1Z3cwIG54aG9hZm5tIGFpZ3NoOXM5IGQ5d3dwcGtuIGhyenl4ODdpIGpxNHFjaTJxIGEzYmQ5bzN2IGxyYXp6ZDVwIG05b3NxYWluXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlyPVwiYXV0b1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5Db21tZW50PC9zcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJuMDBqZTd0cSBhcmZnNzRidiBxczl5c3hpOCBrNzd6OHlxbCBpMDlxdHp3YiBuN2ZpMXF4MyBiNXdtaWZkbCBoenJ1b2Y1YSBwbWs3am5xZyBqOWlzcGVnbiBrcjUyMHh4NCBjNW5kYXZwaCBhcnQxb21rdCBvdDlmZ2wzc1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS12aXN1YWxjb21wbGV0aW9uPVwiaWdub3JlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cImJvcmRlci1yYWRpdXM6IDRweFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwicnEwZXNjeHYgbDlqMGRoZTcgZHU0dzM1bGIgajgzYWd4ODAgY2J1NGQ5NHQgZDJlZGN1ZzAgaHBmdm1yZ3ogcmoxZ2gwaHggYnVvZmgxcHIgZzVnajk1N3Ugbjh0dDBtb2sgaHloOWJlZnEgaXVueTd0eDMgaXBqYzZmeXRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1sYWJlbD1cIlNlbmQgdGhpcyB0byBmcmllbmRzIG9yIHBvc3QgaXQgb24geW91ciBUaW1lbGluZS5cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm9hanJseGIyIGdzMWE5eWlwIGc1aWE3N3UxIG10a3c5a2JpIHRscGxqeHRwIHFlbnN1eThqIHBwcDVheXEyIGdvdW4yODQ2IGNjbTAwamplIHM0NHAzbHR3IG1rMm1jNWY0IHJ0OGI0emlnIG44ZWozbzNsIGFnZWhhbjJkIHNrNHh4bXAyIHJxMGVzY3h2IG5oZDJqOGE5IG1nNGc3NzhsIHBmbnloM213IHA3aGpsbjhvIGt2Z21jNmc1IGN4bW1yNXQ4IG95Z3J2aGFiIGhjdWt5eDN4IHRndmJqY3BvIGhwZnZtcmd6IGpiM3Z5anlzIHJ6NHdiZDhhIHF0NmMwY3Y5IGE4bnl3ZHNvIGw5ajBkaGU3IGkxYW85czhoIGVzdXl6d3dyIGYxc2lwMG9mIGR1NHczNWxiIG4wMGplN3RxIGFyZmc3NGJ2IHFzOXlzeGk4IGs3N3o4eXFsIHBxNmRxNDZkIGJ0d3h4MXQzIGFiaXdscmtoIHA4ZGF3azdsIGx6Y2ljNHdsXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cm9sZT1cImJ1dHRvblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhYmluZGV4PVwiMFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInJxMGVzY3h2IGw5ajBkaGU3IGR1NHczNWxiIGo4M2FneDgwIHJqMWdoMGh4IGJ1b2ZoMXByIGc1Z2o5NTd1IGhwZnZtcmd6IHRhaWpwbjV0IGJwOWNianluIG93eWN4NmRhIGJ0d3h4MXQzIGQxNTQ0YWcwIHR3NmEyem5xIGpiM3Z5anlzIGRsdjN3bm9nIHJsMDRyMWQ1IG15c2dmZG14IGhkZGc5cGhnIHF1OG9rcnpzIGcwcW5hYnI1XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwicnEwZXNjeHYgbDlqMGRoZTcgZHU0dzM1bGIgajgzYWd4ODAgY2J1NGQ5NHQgcGZueWgzbXcgZDJlZGN1ZzAgaHBmdm1yZ3ogcGg1dXU1am0gYjNvbm1ndXMgaXVueTd0eDMgaXBqYzZmeXRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtdmlzdWFsY29tcGxldGlvbj1cImNzcy1pbWdcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImh1NXBqZ2xsIG02azQ2N3BzXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJyR7cG9zdC5pbWd9Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZC1wb3NpdGlvbjogMCAtMzE2cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZC1zaXplOiBhdXRvO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdpZHRoOiAxOHB4O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGhlaWdodDogMThweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2k+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJycTBlc2N4diBsOWowZGhlNyBkdTR3MzVsYiBqODNhZ3g4MCBjYnU0ZDk0dCBwZm55aDNtdyBkMmVkY3VnMCBocGZ2bXJneiBwaDV1dTVqbSBiM29ubWd1cyBpdW55N3R4MyBpcGpjNmZ5dFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJkMmVkY3VnMCBocGZ2bXJneiBxdjY2c3cxYiBjMWV0NXVxbCBiMHRxMXd1YSBhOGMzN3gxaiBmZTZrZGQwciBtYXU1NWc5dyBjOGIyODJ5YiBrZW9kNWd3MCBueGhvYWZubSBhaWdzaDlzOSBkOXd3cHBrbiBocnp5eDg3aSBqcTRxY2kycSBhM2JkOW8zdiBscmF6emQ1cCBtOW9zcWFpblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRpcj1cImF1dG9cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+U2hhcmU8L3NwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm4wMGplN3RxIGFyZmc3NGJ2IHFzOXlzeGk4IGs3N3o4eXFsIGkwOXF0endiIG43ZmkxcXgzIGI1d21pZmRsIGh6cnVvZjVhIHBtazdqbnFnIGo5aXNwZWduIGtyNTIweHg0IGM1bmRhdnBoIGFydDFvbWt0IG90OWZnbDNzIHJucjYxYW4zXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJpZ25vcmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiYm9yZGVyLXJhZGl1czogNHB4XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY3dqOW96bDIgdHZtYnYxOHBcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aDVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiZ21xbDBueDAgbDk0bXJieGQgcDFyaTlhMTEgbHpjaWM0d2wgcTQ1em9oaTEgZW1hMWU0MGggYXk3ZGpwY2wgbmk4ZGJtbzQgc3RqZ250eHMgcG1rN2pucWcgcmZ1YTB4ZGtcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlyPVwiYXV0b1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MCBjb21tZW50c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvaDU+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJsNnY0ODBmMCBrdmdtYzZnNSB3a3puemMybCBveWdydmhhYiBkaGl4Njl0bSBlY20wYmJ6dFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiajgzYWd4ODAgYmtmcGQ3bXcgamIzdnlqeXMgaHY0cnZyZmMgcXQ2YzBjdjkgZGF0aTF3MGEgbDlqMGRoZTdcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImo4M2FneDgwIGJrZnBkN213IGpiM3Z5anlzIGh2NHJ2cmZjIHF0NmMwY3Y5IGRhdGkxdzBhIGw5ajBkaGU3XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInN0amdudHhzIG5pOGRibW80XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiYnA5Y2JqeW4gajgzYWd4ODAgazdjejM1dzIgamlmdmZvbTkgaHY0cnZyZmMgZGF0aTF3MGEgcXZ6ZTl0MjMgdHBvMTQ1MTJcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJnZ3BoYnR5NCB3a3puemMybCB0YWlqcG41dCBqODNhZ3g4MFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiaHY0cnZyZmMgZTVubGhlcDAgZGF0aTF3MGEgZWNtMGJienRcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiajgzYWd4ODAgYnR3eHgxdDMgbHpjaWM0d2xcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwibnFtdnh2ZWMgczQ1a2ZsNzkgZW1seGxheWEgYmttaHA3NXcgc3BiN3hidHYgYThjMzd4MWogZnYwdm5tY3UgcnMwZ3gzdHEgbDlqMGRoZTdcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwib2Fqcmx4YjIgZ3MxYTl5aXAgZzVpYTc3dTEgbXRrdzlrYmkgdGxwbGp4dHAgcWVuc3V5OGogcHBwNWF5cTIgZ291bjI4NDYgY2NtMDBqamUgczQ0cDNsdHcgbWsybWM1ZjQgcnQ4YjR6aWcgbjhlajNvM2wgYWdlaGFuMmQgc2s0eHhtcDIgcnEwZXNjeHYgbmhkMmo4YTkgbWc0Zzc3OGwgcGZueWgzbXcgcDdoamxuOG8ga3ZnbWM2ZzUgY3htbXI1dDggb3lncnZoYWIgaGN1a3l4M3ggdGd2YmpjcG8gaHBmdm1yZ3ogamIzdnlqeXMgcno0d2JkOGEgcXQ2YzBjdjkgYThueXdkc28gbDlqMGRoZTcgaTFhbzlzOGggZXN1eXp3d3IgZjFzaXAwb2YgZHU0dzM1bGIgbjAwamU3dHEgYXJmZzc0YnYgcXM5eXN4aTggazc3ejh5cWwgcHE2ZHE0NmQgYnR3eHgxdDMgYWJpd2xya2ggcDhkYXdrN2wgbHpjaWM0d2xcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cm9sZT1cImJ1dHRvblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YWJpbmRleD1cIi0xXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwicTl1b3JpbGIgbDlqMGRoZTcgcHpnZ2JpeXAgZHU0dzM1bGJcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3ZnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1oaWRkZW49XCJ0cnVlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInB6Z2diaXlwXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJpZ25vcmUtZHluYW1pY1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cm9sZT1cIm5vbmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiaGVpZ2h0OiAzMnB4OyB3aWR0aDogMzJweFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bWFzayBpZD1cImpzY19jXzRxXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8Y2lyY2xlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGN4PVwiMTZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjeT1cIjE2XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZmlsbD1cIndoaXRlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cj1cIjE2XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2NpcmNsZT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxjaXJjbGVcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y3g9XCIyN1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGN5PVwiMjdcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJpZ25vcmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmaWxsPVwiYmxhY2tcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyPVwiNlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9jaXJjbGU+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9tYXNrPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxnIG1hc2s9XCJ1cmwoI2pzY19jXzRxKVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGltYWdlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aGVpZ2h0OiAzMnB4O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdpZHRoOiAzMnB4O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR4PVwiMFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHk9XCIwXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aGVpZ2h0PVwiMTAwJVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHByZXNlcnZlQXNwZWN0UmF0aW89XCJ4TWlkWU1pZCBzbGljZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdpZHRoPVwiMTAwJVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHhsaW5rOmhyZWY9XCJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL3RodW1iL2IvYjYvSW1hZ2VfY3JlYXRlZF93aXRoX2FfbW9iaWxlX3Bob25lLnBuZy84MDBweC1JbWFnZV9jcmVhdGVkX3dpdGhfYV9tb2JpbGVfcGhvbmUucG5nXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2ltYWdlPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGNpcmNsZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm1scW8wZGgwIGdlb3J2ZWtiIHM2a2I1cjNmXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y3g9XCIxNlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGN5PVwiMTZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyPVwiMTZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvY2lyY2xlPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9zdmc+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInM0NWtmbDc5IGVtbHhsYXlhIGJrbWhwNzV3IHNwYjd4YnR2IHBtazdqbnFnIGthdmJnbzE0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJpZ25vcmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRib3R0b206IDVweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJpZ2h0OiA1cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZSg1MCUsIDUwJSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwibDlqMGRoZTcgc3RqZ250eHMgbmk4ZGJtbzQgajgzYWd4ODAgc3BiN3hidHYgYmttaHA3NXcgZW1seGxheWEgczQ1a2ZsNzlcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJkaXNwbGF5Om5vbmVcIlx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiaXl5eDVmNDEgbDlqMGRoZTcgY2VicGRyamsgYmlwbWF0dDAgazV3dmk3bmYgYThzMjB2N3Agazc3ejh5cWwgcXM5eXN4aTggYXJmZzc0YnYgbjAwamU3dHEgYTZzaXh6aTggdG9qdm5tMnRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwicHE2ZHE0NmQgamxsbTRmNGggdDZuYTZwOXQgYzlycmxtdDEgcXUweDA1MWYgZXNyNW1oNncgZTk5ODl1ZTQgcjdkNmtnY3ogczQ1a2ZsNzkgZW1seGxheWEgYmttaHA3NXcgc3BiN3hidHZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtdmlzdWFsY29tcGxldGlvbj1cImlnbm9yZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImkwOXF0endiIG43ZmkxcXgzIGI1d21pZmRsIGh6cnVvZjVhIHBtazdqbnFnIGo5aXNwZWduIGtyNTIweHg0IGM1bmRhdnBoIGFydDFvbWt0IG90OWZnbDNzIHM0NWtmbDc5IGVtbHhsYXlhIGJrbWhwNzV3IHNwYjd4YnR2XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJpZ25vcmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJycTBlc2N4diBkdTR3MzVsYiBxNDV6b2hpMSBlbWExZTQwaCBheTdkanBjbCBuaThkYm1vNCBzdGpnbnR4cyBwbWs3am5xZyByZnVhMHhka1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdEFjdGl2ZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiaTA5cXR6d2IgbjdmaTFxeDMgYjV3bWlmZGwgaHpydW9mNWEgcG1rN2pucWcgajlpc3BlZ24ga3I1MjB4eDQgYzVuZGF2cGggYXJ0MW9ta3Qgb3Q5ZmdsM3MgczQ1a2ZsNzkgZW1seGxheWEgYmttaHA3NXcgc3BiN3hidHZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJpZ25vcmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwicmoxZ2gwaHggYnVvZmgxcHIgbmk4ZGJtbzQgc3RqZ250eHMgcno0d2JkOGFcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImo4M2FneDgwIGJ0d3h4MXQzXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8Zm9ybVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm82cjJ1cmg2IGw5ajBkaGU3IGIzaTlvZnk1IGU3MnR5N2Z6IHFsZm1sM2pwIGlua3B0b3plIHFtcjYwemFkIHJ0OGI0emlnIG44ZWozbzNsIGFnZWhhbjJkIHNrNHh4bXAyIGo4M2FneDgwIGJ1b2ZoMXByIGJrZnBkN213XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cm9sZT1cInByZXNlbnRhdGlvblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm05b3NxYWluIGIxdjh4b2t3IGx0bXR0ZHJnIGcwcW5hYnI1IHIybmRpeDluIG82cjJ1cmg2IG1nNGc3NzhsIGJ1b2ZoMXByIGc1Z2o5NTd1IGpxNHFjaTJxIG5pOGRibW80IHN0amdudHhzIGN4Z3B4eDA1IGQxNTQ0YWcwIHNqNXg5dnZjIHR3NmEyem5xXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJpZ25vcmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImw5ajBkaGU3XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJXcml0ZSBhIGNvbW1lbnRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm9vOWdyNWlkIGx6Y2ljNHdsIGw5ajBkaGU3IGdzb3g1aGs1IG5vdHJhbnNsYXRlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3BlbGxjaGVjaz1cInRydWVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVzZXItc2VsZWN0OiB0ZXh0O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3b3JkLWJyZWFrOiBicmVhay13b3JkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLWxleGljYWwtZWRpdG9yPVwidHJ1ZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJvbGU9XCJ0ZXh0Ym94XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxwXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJoY3VreXgzeCBveWdydmhhYiBjeG1tcjV0OCBrdmdtYzZnNVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YnIgLz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwibTlvc3FhaW4gbmk4ZGJtbzQgc3RqZ250eHMgaHpydW9mNWEgcG1rN2pucWcgajlpc3BlZ24gbHRtdHRkcmcga3I1MjB4eDQgYWJpd2xya2ggZzBxbmFicjUgazR1cmNmYm1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRXcml0ZSBhIGNvbW1lbnTigKZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlsN3JiOHNrIHIyZHFlcXVmXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHVsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImZvcDVzaDd0IGNnYXQxbHR1IHR2N2F0MzI5IGo4M2FneDgwIGM0aG5hcm1pIGJwOWNianluXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJnZ3BoYnR5NCBmdjB2bm1jdSBxOXVvcmlsYlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJ0b2p2bm0ydCBhNnNpeHppOCBhYnMyano0cSBhOHMyMHY3cCB0MXA4aWFxaCBrNXd2aTduZiBxM2xmZDVqdiBwazRzOTk3YSBiaXBtYXR0MCBjZWJwZHJqayBxb3dzbXY2MyBvd3doZW1odSBkcDFodTByYiBkaHA2MWM2eSBpeXl4NWY0MVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJDb21tZW50IHdpdGggYW4gYXZhdGFyIHN0aWNrZXJcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJvYWpybHhiMiBnczFhOXlpcCBtdGt3OWtiaSB0bHBsanh0cCBxZW5zdXk4aiBwcHA1YXlxMiBycTBlc2N4diBuaGQyajhhOSBtZzRnNzc4bCBwZm55aDNtdyBwN2hqbG44byB0Z3ZiamNwbyBocGZ2bXJneiBpMWFvOXM4aCBlc3V5end3ciBmMXNpcDBvZiBkdTR3MzVsYiBuMDBqZTd0cSBhcmZnNzRidiBxczl5c3hpOCBrNzd6OHlxbCBidHd4eDF0MyBhYml3bHJraCBwOGRhd2s3bCBsemNpYzR3bCBkd28zZnNoOCBnNWlhNzd1MSBnb3VuMjg0NiBjY20wMGpqZSBzNDRwM2x0dyBtazJtYzVmNCBydDhiNHppZyBuOGVqM28zbCBhZ2VoYW4yZCBzazR4eG1wMiBwcTZkcTQ2ZCBrdmdtYzZnNSBjeG1tcjV0OCBveWdydmhhYiBoY3VreXgzeCBqYjN2eWp5cyByejR3YmQ4YSBxdDZjMGN2OSBhOG55d2RzbyBsOWowZGhlNyBwemdnYml5cCBwa2o3dWIxbyBicW5seHM1cCBra2c5YXpxcyBjMjRwYTF1ayBsbjlpeXgzcCBmZTZrZGQwciBhcjFvdml3cSBsMTBxOG1pOSBzcTQwcWdrYyBzOHF1eHo2cCBwZGpnbGJ1clwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyb2xlPVwiYnV0dG9uXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhYmluZGV4PVwiMFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS12aXN1YWxjb21wbGV0aW9uPVwiY3NzLWltZ1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiaHU1cGpnbGwgbTZrNDY3cHNcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggLTMzNXB4O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtc2l6ZTogYXV0bztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3aWR0aDogMTZweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRoZWlnaHQ6IDE2cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9pPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImkwOXF0endiIG43ZmkxcXgzIGI1d21pZmRsIGh6cnVvZjVhIHBtazdqbnFnIGo5aXNwZWduIGtyNTIweHg0IGM1bmRhdnBoIGFydDFvbWt0IG90OWZnbDNzIHM0NWtmbDc5IGVtbHhsYXlhIGJrbWhwNzV3IHNwYjd4YnR2XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS12aXN1YWxjb21wbGV0aW9uPVwiaWdub3JlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJpbnNldDogLThweFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9kaXY+PC9kaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Pjwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJnZ3BoYnR5NCBmdjB2bm1jdSBxOXVvcmlsYlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJ0b2p2bm0ydCBhNnNpeHppOCBhYnMyano0cSBhOHMyMHY3cCB0MXA4aWFxaCBrNXd2aTduZiBxM2xmZDVqdiBwazRzOTk3YSBiaXBtYXR0MCBjZWJwZHJqayBxb3dzbXY2MyBvd3doZW1odSBkcDFodTByYiBkaHA2MWM2eSBpeXl4NWY0MVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFyaWEtbGFiZWw9XCJJbnNlcnQgYW4gZW1vamlcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJvYWpybHhiMiBnczFhOXlpcCBtdGt3OWtiaSB0bHBsanh0cCBxZW5zdXk4aiBwcHA1YXlxMiBycTBlc2N4diBuaGQyajhhOSBtZzRnNzc4bCBwZm55aDNtdyBwN2hqbG44byB0Z3ZiamNwbyBocGZ2bXJneiBpMWFvOXM4aCBlc3V5end3ciBmMXNpcDBvZiBkdTR3MzVsYiBuMDBqZTd0cSBhcmZnNzRidiBxczl5c3hpOCBrNzd6OHlxbCBidHd4eDF0MyBhYml3bHJraCBwOGRhd2s3bCBsemNpYzR3bCBkd28zZnNoOCBnNWlhNzd1MSBnb3VuMjg0NiBjY20wMGpqZSBzNDRwM2x0dyBtazJtYzVmNCBydDhiNHppZyBuOGVqM28zbCBhZ2VoYW4yZCBzazR4eG1wMiBwcTZkcTQ2ZCBrdmdtYzZnNSBjeG1tcjV0OCBveWdydmhhYiBoY3VreXgzeCBqYjN2eWp5cyByejR3YmQ4YSBxdDZjMGN2OSBhOG55d2RzbyBsOWowZGhlNyBwemdnYml5cCBwa2o3dWIxbyBicW5seHM1cCBra2c5YXpxcyBjMjRwYTF1ayBsbjlpeXgzcCBmZTZrZGQwciBhcjFvdml3cSBsMTBxOG1pOSBzcTQwcWdrYyBzOHF1eHo2cCBwZGpnbGJ1clwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyb2xlPVwiYnV0dG9uXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRhYmluZGV4PVwiMFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS12aXN1YWxjb21wbGV0aW9uPVwiY3NzLWltZ1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiaHU1cGpnbGwgbTZrNDY3cHNcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtcG9zaXRpb246IDBweCAtNDcxcHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZC1zaXplOiBhdXRvO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdpZHRoOiAxNnB4O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGhlaWdodDogMTZweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2k+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiaTA5cXR6d2IgbjdmaTFxeDMgYjV3bWlmZGwgaHpydW9mNWEgcG1rN2pucWcgajlpc3BlZ24ga3I1MjB4eDQgYzVuZGF2cGggYXJ0MW9ta3Qgb3Q5ZmdsM3MgczQ1a2ZsNzkgZW1seGxheWEgYmttaHA3NXcgc3BiN3hidHZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJpZ25vcmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cImluc2V0OiAtOHB4XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2Rpdj48L2RpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsaVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImdncGhidHk0IGZ2MHZubWN1IHE5dW9yaWxiXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInRvanZubTJ0IGE2c2l4emk4IGFiczJqejRxIGE4czIwdjdwIHQxcDhpYXFoIGs1d3ZpN25mIHEzbGZkNWp2IHBrNHM5OTdhIGJpcG1hdHQwIGNlYnBkcmprIHFvd3NtdjYzIG93d2hlbWh1IGRwMWh1MHJiIGRocDYxYzZ5IGl5eXg1ZjQxXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1sYWJlbD1cIkF0dGFjaCBhIHBob3RvIG9yIHZpZGVvXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwib2Fqcmx4YjIgZ3MxYTl5aXAgbXRrdzlrYmkgdGxwbGp4dHAgcWVuc3V5OGogcHBwNWF5cTIgcnEwZXNjeHYgbmhkMmo4YTkgbWc0Zzc3OGwgcGZueWgzbXcgcDdoamxuOG8gdGd2YmpjcG8gaHBmdm1yZ3ogaTFhbzlzOGggZXN1eXp3d3IgZjFzaXAwb2YgZHU0dzM1bGIgbjAwamU3dHEgYXJmZzc0YnYgcXM5eXN4aTggazc3ejh5cWwgYnR3eHgxdDMgYWJpd2xya2ggcDhkYXdrN2wgbHpjaWM0d2wgZHdvM2ZzaDggZzVpYTc3dTEgZ291bjI4NDYgY2NtMDBqamUgczQ0cDNsdHcgbWsybWM1ZjQgcnQ4YjR6aWcgbjhlajNvM2wgYWdlaGFuMmQgc2s0eHhtcDIgcHE2ZHE0NmQga3ZnbWM2ZzUgY3htbXI1dDggb3lncnZoYWIgaGN1a3l4M3ggamIzdnlqeXMgcno0d2JkOGEgcXQ2YzBjdjkgYThueXdkc28gbDlqMGRoZTcgcHpnZ2JpeXAgcGtqN3ViMW8gYnFubHhzNXAga2tnOWF6cXMgYzI0cGExdWsgbG45aXl4M3AgZmU2a2RkMHIgYXIxb3Zpd3EgbDEwcThtaTkgc3E0MHFna2MgczhxdXh6NnAgcGRqZ2xidXJcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cm9sZT1cImJ1dHRvblwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0YWJpbmRleD1cIjBcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtdmlzdWFsY29tcGxldGlvbj1cImNzcy1pbWdcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImh1NXBqZ2xsIG02azQ2N3BzXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggLTQwM3B4O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtc2l6ZTogYXV0bztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3aWR0aDogMTZweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRoZWlnaHQ6IDE2cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9pPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImkwOXF0endiIG43ZmkxcXgzIGI1d21pZmRsIGh6cnVvZjVhIHBtazdqbnFnIGo5aXNwZWduIGtyNTIweHg0IGM1bmRhdnBoIGFydDFvbWt0IG90OWZnbDNzIHM0NWtmbDc5IGVtbHhsYXlhIGJrbWhwNzV3IHNwYjd4YnR2XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS12aXN1YWxjb21wbGV0aW9uPVwiaWdub3JlXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3R5bGU9XCJpbnNldDogLThweFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9kaXY+PC9kaXY+PC9zcGFuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48aW5wdXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhY2NlcHQ9XCJ2aWRlby8qLCAgdmlkZW8veC1tNHYsIHZpZGVvL3dlYm0sIHZpZGVvL3gtbXMtd212LCB2aWRlby94LW1zdmlkZW8sIHZpZGVvLzNncHAsIHZpZGVvL2ZsdiwgdmlkZW8veC1mbHYsIHZpZGVvL21wNCwgdmlkZW8vcXVpY2t0aW1lLCB2aWRlby9tcGVnLCB2aWRlby9vZ3YsIC50cywgLm1rdiwgaW1hZ2UvKiwgaW1hZ2UvaGVpYywgaW1hZ2UvaGVpZlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJta2hvZ2IzMlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cImZpbGVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsaVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cImdncGhidHk0IGZ2MHZubWN1IHE5dW9yaWxiXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cInRvanZubTJ0IGE2c2l4emk4IGFiczJqejRxIGE4czIwdjdwIHQxcDhpYXFoIGs1d3ZpN25mIHEzbGZkNWp2IHBrNHM5OTdhIGJpcG1hdHQwIGNlYnBkcmprIHFvd3NtdjYzIG93d2hlbWh1IGRwMWh1MHJiIGRocDYxYzZ5IGl5eXg1ZjQxXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PGRpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YXJpYS1sYWJlbD1cIkNvbW1lbnQgd2l0aCBhIEdJRlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm9hanJseGIyIGdzMWE5eWlwIG10a3c5a2JpIHRscGxqeHRwIHFlbnN1eThqIHBwcDVheXEyIHJxMGVzY3h2IG5oZDJqOGE5IG1nNGc3NzhsIHBmbnloM213IHA3aGpsbjhvIHRndmJqY3BvIGhwZnZtcmd6IGkxYW85czhoIGVzdXl6d3dyIGYxc2lwMG9mIGR1NHczNWxiIG4wMGplN3RxIGFyZmc3NGJ2IHFzOXlzeGk4IGs3N3o4eXFsIGJ0d3h4MXQzIGFiaXdscmtoIHA4ZGF3azdsIGx6Y2ljNHdsIGR3bzNmc2g4IGc1aWE3N3UxIGdvdW4yODQ2IGNjbTAwamplIHM0NHAzbHR3IG1rMm1jNWY0IHJ0OGI0emlnIG44ZWozbzNsIGFnZWhhbjJkIHNrNHh4bXAyIHBxNmRxNDZkIGt2Z21jNmc1IGN4bW1yNXQ4IG95Z3J2aGFiIGhjdWt5eDN4IGpiM3Z5anlzIHJ6NHdiZDhhIHF0NmMwY3Y5IGE4bnl3ZHNvIGw5ajBkaGU3IHB6Z2diaXlwIHBrajd1YjFvIGJxbmx4czVwIGtrZzlhenFzIGMyNHBhMXVrIGxuOWl5eDNwIGZlNmtkZDByIGFyMW92aXdxIGwxMHE4bWk5IHNxNDBxZ2tjIHM4cXV4ejZwIHBkamdsYnVyXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJvbGU9XCJidXR0b25cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFiaW5kZXg9XCIwXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJjc3MtaW1nXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJodTVwamdsbCBtNms0Njdwc1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZC1wb3NpdGlvbjogMHB4IC01MDVweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXNpemU6IGF1dG87XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0d2lkdGg6IDE2cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aGVpZ2h0OiAxNnB4O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvaT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJpMDlxdHp3YiBuN2ZpMXF4MyBiNXdtaWZkbCBoenJ1b2Y1YSBwbWs3am5xZyBqOWlzcGVnbiBrcjUyMHh4NCBjNW5kYXZwaCBhcnQxb21rdCBvdDlmZ2wzcyBzNDVrZmw3OSBlbWx4bGF5YSBia21ocDc1dyBzcGI3eGJ0dlwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGEtdmlzdWFsY29tcGxldGlvbj1cImlnbm9yZVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiaW5zZXQ6IC04cHhcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PjwvZGl2PjwvZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiZ2dwaGJ0eTQgZnYwdm5tY3UgcTl1b3JpbGJcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwidG9qdm5tMnQgYTZzaXh6aTggYWJzMmp6NHEgYThzMjB2N3AgdDFwOGlhcWggazV3dmk3bmYgcTNsZmQ1anYgcGs0czk5N2EgYmlwbWF0dDAgY2VicGRyamsgcW93c212NjMgb3d3aGVtaHUgZHAxaHUwcmIgZGhwNjFjNnkgaXl5eDVmNDFcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhcmlhLWxhYmVsPVwiQ29tbWVudCB3aXRoIGEgc3RpY2tlclwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzcz1cIm9hanJseGIyIGdzMWE5eWlwIG10a3c5a2JpIHRscGxqeHRwIHFlbnN1eThqIHBwcDVheXEyIHJxMGVzY3h2IG5oZDJqOGE5IG1nNGc3NzhsIHBmbnloM213IHA3aGpsbjhvIHRndmJqY3BvIGhwZnZtcmd6IGkxYW85czhoIGVzdXl6d3dyIGYxc2lwMG9mIGR1NHczNWxiIG4wMGplN3RxIGFyZmc3NGJ2IHFzOXlzeGk4IGs3N3o4eXFsIGJ0d3h4MXQzIGFiaXdscmtoIHA4ZGF3azdsIGx6Y2ljNHdsIGR3bzNmc2g4IGc1aWE3N3UxIGdvdW4yODQ2IGNjbTAwamplIHM0NHAzbHR3IG1rMm1jNWY0IHJ0OGI0emlnIG44ZWozbzNsIGFnZWhhbjJkIHNrNHh4bXAyIHBxNmRxNDZkIGt2Z21jNmc1IGN4bW1yNXQ4IG95Z3J2aGFiIGhjdWt5eDN4IGpiM3Z5anlzIHJ6NHdiZDhhIHF0NmMwY3Y5IGE4bnl3ZHNvIGw5ajBkaGU3IHB6Z2diaXlwIHBrajd1YjFvIGJxbmx4czVwIGtrZzlhenFzIGMyNHBhMXVrIGxuOWl5eDNwIGZlNmtkZDByIGFyMW92aXdxIGwxMHE4bWk5IHNxNDBxZ2tjIHM4cXV4ejZwIHBkamdsYnVyXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJvbGU9XCJidXR0b25cIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGFiaW5kZXg9XCIwXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJjc3MtaW1nXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3M9XCJodTVwamdsbCBtNms0Njdwc1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN0eWxlPVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtcG9zaXRpb246IDBweCAtNjA3cHg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZC1zaXplOiBhdXRvO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdpZHRoOiAxNnB4O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGhlaWdodDogMTZweDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2k+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzPVwiaTA5cXR6d2IgbjdmaTFxeDMgYjV3bWlmZGwgaHpydW9mNWEgcG1rN2pucWcgajlpc3BlZ24ga3I1MjB4eDQgYzVuZGF2cGggYXJ0MW9ta3Qgb3Q5ZmdsM3MgczQ1a2ZsNzkgZW1seGxheWEgYmttaHA3NXcgc3BiN3hidHZcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLXZpc3VhbGNvbXBsZXRpb249XCJpZ25vcmVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT1cImluc2V0OiAtOHB4XCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdD48L2Rpdj48L2RpdlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ+PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZm9ybT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYnVvZmgxcHJcIj48L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYnVvZmgxcHJcIj48L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYnVvZmgxcHJcIj48L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwhLS0vJC0tPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5cblx0PCEtLS8kLS0+XG48L2Rpdj5cblxuXG5cblxuYDtcblxucmV0dXJuIGNhcmQ7XG59O1xuIiwiZXhwb3J0cy5pbnRlcm9wRGVmYXVsdCA9IGZ1bmN0aW9uIChhKSB7XG4gIHJldHVybiBhICYmIGEuX19lc01vZHVsZSA/IGEgOiB7ZGVmYXVsdDogYX07XG59O1xuXG5leHBvcnRzLmRlZmluZUludGVyb3BGbGFnID0gZnVuY3Rpb24gKGEpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSk7XG59O1xuXG5leHBvcnRzLmV4cG9ydEFsbCA9IGZ1bmN0aW9uIChzb3VyY2UsIGRlc3QpIHtcbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcgfHwga2V5ID09PSAnX19lc01vZHVsZScgfHwgZGVzdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGtleSwge1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc291cmNlW2tleV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZGVzdDtcbn07XG5cbmV4cG9ydHMuZXhwb3J0ID0gZnVuY3Rpb24gKGRlc3QsIGRlc3ROYW1lLCBnZXQpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3QsIGRlc3ROYW1lLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGdldCxcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGNsYXNzIFBvc3RzIHtcbiAgICBjb250ZW50SHRtbDpTdHJpbmc7XG4gICAgbmFtZTpzdHJpbmc7XG4gICAgdGltZTpzdHJpbmc7XG4gICAgaW1nOnN0cmluZztcbiAgICBsaW5rOnN0cmluZztcbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50SHRtbDpzdHJpbmcsbmFtZTpzdHJpbmcsdGltZTpzdHJpbmcsaW1nOnN0cmluZz0nJyxsaW5rKSB7XG4gICAgICAgIHRoaXMuY29udGVudEh0bWw9Y29udGVudEh0bWw7XG4gICAgICAgIHRoaXMubmFtZT1uYW1lO1xuICAgICAgICB0aGlzLnRpbWU9dGltZTtcbiAgICAgICAgdGhpcy5pbWc9aW1nO1xuICAgICAgICB0aGlzLmxpbms9bGluaztcbiAgICB9XG4gICAgXG4gICAgXG59XG4iLCJleHBvcnQgY29uc3QgdXNlciA9W1xuICAgIFwiRGFycmVsbE1lbGxvXCIsXG4gICAgXG5cbl0iXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuY2E1NzQ0MGQuanMubWFwIn0=
