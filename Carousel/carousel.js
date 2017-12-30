 //创建构造函数~设置基本属性
 function Carousel(obj) {
    this.wrap = obj.wrap;
    this.wrapId = obj.wrap.id;             
    this.wrapWidth = this.wrap.offsetWidth; 
    this.activePage = 0;                  
    this.imgNumber = obj.urlArr.length;     
    this.settimeID;                         
    this.init(obj.urlArr);
}
//原型对象设置共有属性
Carousel.prototype = {
    constructor: Carousel,
    //初始化容器                  
    init: function(urlArr) {                
        this.wrap.style.position = "relative";
        this.wrap.style.overflow = "hidden";
        this.wrap.innerHTML = '<span id="' + this.wrapId + '_pre"><</span><span id="' + this.wrapId + '_next">></span><ul id="' + this.wrapId + '_page"></ul><div id="' + this.wrapId + '_container"></div>';
        let container = document.getElementById(this.wrapId + '_container');
        let page = document.getElementById(this.wrapId + "_page");
        for (let value of urlArr) {         
            container.innerHTML += '<div class="' + this.wrapId + '_img-item"><img src="' + value + '"></div>';
            page.innerHTML += '<li class="' + this.wrapId + '_pagination"></li>';
        }
        container.style.width = this.imgNumber + "00%";
        container.style.left = 0;
        for (let value of document.getElementsByClassName(this.wrapId + "_img-item")) {
            value.style.width = 100 / this.imgNumber + "%";
        }
        document.getElementsByClassName(this.wrapId + "_pagination")[this.activePage].id = this.wrapId + "_active";        
        this.pageActiveColor();
        this.setTime();
        this.bindEvent();
    },
    //构建圆点
    pageActiveColor: function() {           
        document.getElementById(this.wrapId + "_active").id = "";
        document.getElementsByClassName(this.wrapId + "_pagination")[this.activePage].id = this.wrapId + "_active";
    },
    //事件的绑定及监听
    bindEvent: function() {                 
        let preAngle = document.getElementById(this.wrapId + "_pre");
        let nextAngle = document.getElementById(this.wrapId + "_next");
        let pageUl = document.getElementById(this.wrapId + "_page");
        let pages = pageUl.getElementsByClassName(this.wrapId + "_pagination");
        for (let key = 0; key < pages.length; key++) {
            pages[key].addEventListener("click", this.selectPage.bind(this, key));
            console.log(key);
        }
        this.wrap.addEventListener("mouseenter", this.clearTime.bind(this));
        this.wrap.addEventListener("mouseleave", this.setTime.bind(this));
        preAngle.addEventListener("click", this.leftAngleclick.bind(this));
        nextAngle.addEventListener("click", this.rightAngleclick.bind(this));
    },
    //左右箭头的功能
    leftAngleclick: function() {            
        let container = document.getElementById(this.wrapId + "_container");
        if(this.activePage == 0) {          
            this.activePage = this.imgNumber - 1;
        } else {
            this.activePage--;
        }
        container.style.left = "-" + this.activePage + "00%";
        this.pageActiveColor();
    },
    rightAngleclick: function() {      
        let container = document.getElementById(this.wrapId + "_container");
        if (this.activePage == this.imgNumber - 1) {
            this.activePage = 0;
        } else {
            this.activePage++;
        }
        container.style.left = "-" + this.activePage + "00%";
        this.pageActiveColor();
    },
    //点击圆点切换图片
    selectPage: function(selectNum) {       
        this.activePage = selectNum;
        let container = document.getElementById(this.wrapId + "_container");
        container.style.left = "-" + this.activePage + "00%";
        this.pageActiveColor();
    },
    //自动播放
    setTime: function() {                   
        let wrapId = this.wrapId;               
        this.settimeID = setInterval(function() {
            document.getElementById(wrapId + "_next").click();
        } , 5000);
        console.log("set");
    },
    //鼠标悬浮取消自动播放
    clearTime: function() {                 
        let theId = this.settimeID;             
        console.log("clear");
        clearInterval(theId);        
    }

}
