(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {

            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    

// 授权逻辑
//权限相关

    var redirect = encodeURIComponent(window.location.href);
    var wechatGrantUrl = "http://www.mama100.com/weixin/bind/oauthBindingURL.json?bindingRequired=0&redirect=" + redirect + "&refusedUrl=" + redirect;
    //通过cookie.name 获取cookie.value
    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }

    console.log(process.env.SWISSE);
    //赋值给openId
    var openId = getCookie('openId');
    var accessToken = getCookie('token');
    var customerId = getCookie("customerId");
    var user = getCookie('user') || "{}";
    if (!openId || openId == "\"\"" || openId == '') {

        var redirect = window.location.href;
        redirect = encodeURIComponent(redirect);
        var refusedUrl = "";
        var authBindingApiUrl = process.env.SWISSE + '/swisseweixin/weixin/authorize?encodeTargetUrl=' + redirect+'&user=1';
        // window.location.href = authBindingApiUrl;
        // return false;
    }

    // if (!customerId || customerId == "\"\"" || customerId == '') {
    //     var redirect = window.location.href;
    //     redirect = encodeURIComponent(redirect);
    //     var authBindingApiUrl = _.wxUrl + '/weixin/bind/auth?token=' + openId + '&redirect=' + redirect;
    //     window.location.href = authBindingApiUrl;
    //     return false;
    // }

    window.openId = openId;
    window.accessToken = accessToken;
    window.customerId = customerId;
    window.user = JSON.parse(decodeURIComponent(user));
})(document, window);