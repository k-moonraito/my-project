$.fn.Uisearch = function(){
    var ui = $(this);
    $(".ui-search-choose").on('click',function(){
        
        $(".ui-search-choose-list").toggle();
        return false;
    })
    $(".ui-search-choose-list a").on('click',function(){
        $(".ui-search-choose-text").text( $(this).text() )
        $(".ui-search-choose-list").hide();
        return false;
    })
    $("body").on('click',function(){
        $(".ui-search-choose-list").hide();
    })
}
// @param {string} header TAB组件所有选项卡
// @param {string} content TAB组件所有内容区域
// @param {string} active TAB组件的焦点样式
$.fn.UiTab = function(header,content,active){
    var header = $(header);
    var content = $(content);
    header.on('click',function(){
        var index = $(this).index()
        header.removeClass(active).eq(index).addClass(active);
        content.hide().eq( index ).show();
        return false;
    })
}
$(function(){
    $("ui-search").Uisearch();
    $(".content .tab").UiTab('.content .tab .caption > .item','.content-banner','active')
    $(".content .tab .content-banner").UiTab('.banner-item-caption-item','.banner-item-caption-item-wrap','banner-item-caption_active')
})