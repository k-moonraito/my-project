function byid(id){
    var getid = (typeof(id) === "string")?document.getElementById(id):id;
    return getid;
}

var index = 0;
var timer = null;
//轮播图函数
function slideImg(){
    var picbac = byid('banner');
    var pics = byid('pic').getElementsByTagName('div');
    var navs = byid('nav').getElementsByTagName('li');
    var len = pics.length;
    //设置鼠标移除后图片轮播
    picbac.onmouseout = function(){
        //鼠标移除的轮播函数
        timer = setInterval(function(){
            animate();
        },1000)
        
    }
    picbac.onmouseout();
    //设置鼠标移入图片后停播
    picbac.onmouseover = function(){
        //停播函数
        if(timer){
            clearInterval(timer);
        }
    }
    //播放图片的函数
    function animate(){
        for(i = 0; i < len; i++){
            pics[i].style.display = "none";
            navs[i].className = "";
        }
        pics[index].style.display = "block";
        navs[index].className = "active";
        index++;
        if(index == len){
            index = 0;
        }
    }
    for(i = 0; i < len; i++){
        navs[i].onclick = (function(j){
            return function(){
                index = j;
                animate();
            };
            
        })(i)
    }
}
slideImg();