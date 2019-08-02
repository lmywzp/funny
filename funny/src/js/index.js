var setalert=(function(){
    function Oalert(options){
         this.opts=options;
    }

    Oalert.prototype.play=function(){
        this.createEle()
        this.alertplay()
    }

    Oalert.prototype.createEle=function(){
         if(this.opts.isMask){
            this.Mask=document.createElement("div")
            document.body.appendChild(this.Mask)
         }

         var alertdiv=document.createElement("div")
         alertdiv.classList.add("clsalert")
         alertdiv.innerHTML=`<div class="wrap-clsalert">
                                <h3>叫爸爸 <span>删除</span></h3><hr>
                                <p id="p">不叫爸爸  你删不了</p>
                                <div class="btndiv">
                                 
                                </div>
                             </div>`
        document.body.appendChild(alertdiv);

        var btndiv=document.getElementsByClassName("btndiv")[0]
        var btnarr=this.opts.btnArr.map(function(item){
             return `<button>${item}</button>`
        });
        btndiv.innerHTML=btnarr.join("");
        this.btnarr=document.getElementsByTagName("button");   
    }

    Oalert.prototype.alertplay=function(){
           var that=this;
           var ptxt=document.getElementById("p");
           var span=document.getElementsByTagName("span")[0];   //删除
           

            //点击叫
           this.btnarr[0].addEventListener("click",function(){
                     that.opts.isdrg=true;
                     ptxt.innerHTML="乖，下次还玩！";
                     if(that.opts.isdrg){
                         this.onclick=function(){
                          //点击叫，保证span的定位固定，删除整个弹框
                           alert(111)
                         }
                     }
                    

           });

            

            //点击不叫
           this.btnarr[1].onclick=function(){
                     ptxt.innerHTML="别挣扎了，叫爸爸";
                     this.addEventListener("click",function(){
                          ptxt.innerHTML="没用的，叫爸爸";
                          this.addEventListener("click",function(){
                                 ptxt.innerHTML="这么坚持？叫爸爸而已。";
                                 this.addEventListener("click",function(){
                                    ptxt.innerHTML="不叫爸爸，真的关不了，你试试！";
                                    var span=document.getElementsByTagName("span")[0]
                                 },false)
                          },false)
                     },false)
           };

           //点击删除
           (function Removespan(){
                span.onmousedown=function(e){
                    x=e.clientX-span.offsetLeft;
                    y=e.clientY-span.offsetTop;
                    document.onmousemove=function(event){
                        span.style.left=event.clientX-x+15+"px";
                        span.style.top=event.clientY-y+20+"px"; 
                        if(span.offsetLeft>290 || span.offsetLeft<250 || span.offsetTop>48 || span.offsetTop<13){
                            span.style.left=250+"px";
                            span.style.top=13+"px"
                        }
                    };
                };
           })()

           
    }

    var init=function(option){
        var defaults={
            title:"标题",
            text:"内容信息",
            btnArr:["YES"],
            isMask:true,
            isdrg:false
        };
        option=Object.assign({},defaults,option)
        return new Oalert(option).play()
    }

    return {
        init:init
    }
})()