function sliderCode(){
    var $slider = $("#slider");
    var $pic = $(".pic");
    var $nav = $(".nav")
    var $navs =$(".navs");
    var $button = $(".button");
    var index = 0;
    var timer = null;
    //绑定鼠标移入停止移出继续事件
    $slider.hover(function(){
        stopAnimate();
    },function(){
        continueAnimate();
    })

    //鼠标移入停止事件
    function stopAnimate(){
        if(timer){
            clearInterval(timer);
        }
    }
    
    //鼠标移出继续事件
    function continueAnimate(){
        //设定每2秒执行一次函数
        timer = setInterval(function(){
            index++;
            animate();
        },2000);
    }
    continueAnimate();
    
    //圆点点击切换图片
    $nav.click(function(){
        index = $(this).index();
        animate();
    })
    //左右按钮切换图片
    $button.click(function(){
        if($(this).index() == 0){
            index--;
            animate();
        }
        if($(this).index() == 1){
            index++;
            animate();
        }
    })
    //轮播动画函数
    function animate(){
        if(index == $pic.length){
            index = 0;
        }
        if(index == -1){
            index = $pic.length-1;
        }
        var $nav = $navs.children();
        $pic.hide().eq(index).show();
        $nav.removeClass('active').eq(index).addClass('active');
        
    }
}
sliderCode();