import { init } from "./content/getUsersPosts";


// event listener that listen for element with class name "fbUser"
// and when it finds it, it injects the script into the page

window.onload = () => {
setTimeout(()=>{init(false)}, 2000);
}
