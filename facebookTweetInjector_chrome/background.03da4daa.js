console.log("background"), chrome.runtime.onMessage.addListener(((request, sender, sendResponse) => {
  console.log("getting req");
  var url = request.url;
  return fetch(url).then((res => (console.log(res), res.json()))).then((json => {
    console.log("getting json :", json), sendResponse(json);
  })).catch((e => {
    console.log("error due to ", e);
  })), console.log("finish req"), !0;
}));