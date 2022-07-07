export class Posts {
    contentHtml:String;
    name:string;
    time:string;
    img:string;
    link:string;
    constructor(contentHtml:string,name:string,time:string,img:string='',link) {
        this.contentHtml=contentHtml;
        this.name=name;
        this.time=time;
        this.img=img;
        this.link=link;
    }
    
    
}
