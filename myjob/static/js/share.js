import axios from 'axios'
import wx from 'weixin-js-sdk'
export default {
    wxShowMenu: function (obj={},suc,err) {
        axios.get('http://www.swisse-china.com.cn/swisseweixin/weixin/jsApiSign').then(function (res) {
            var getMsg = res.data;
            console.log(res.data);
            wx.config({
                debug: true,  //生产环境需要关闭debug模式
                appId: getMsg.appId, //appId通过微信服务号后台查看
                timestamp: getMsg.timestamp, //生成签名的时间戳
                nonceStr: getMsg.noncestr, //生成签名的随机字符串
                signature: getMsg.signature, //签名
                jsApiList: [ //需要调用的JS接口列表
                    'onMenuShareTimeline', //分享给好友
                    'onMenuShareAppMessage', //分享到朋友圈
                ]
            });
            wx.ready(function () {
                // wx.checkJsApi({
                //     jsApiList: ["showMenuItems"],
                //     success: function (res) {
                //         wx.showMenuItems({
                //             menuList: [
                //                 'menuItem:share:appMessage', //发送给朋友
                //                 'menuItem:share:timeline' //分享到朋友圈
                //             ]
                //         });
                //     }
                // });
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: obj.title1, // 分享标题
                    desc: obj.desc1, //分享描述
                    link: obj.link1,// 分享链接
                    imgUrl: obj.imgUrl, // 分享图标,
                    success() {
                        suc && suc();
                    },
                    cancel() {
                       err && err();
                    }
                });
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: obj.title2 || obj.title1, // 分享标题
                    desc: obj.desc2, // 分享描述
                    link: obj.link2, // 分享链接
                    imgUrl: obj.imgUrl, // 分享图标
                    success() {
                        alert(1);
                        suc && suc();
                    },
                    cancel() {
                        alert(2);
                        err && err();
                    }
                });
            });
        })
    },
    getCustomer(suc,err){
        axios
            .post(
                process.env.SWISSE + '/cust/getCustomer',
                {
                    "openId": window.openId,
                    "tsno": new Date().getTime()
                },
                { headers: { "Content-Type": "application/json" } }
            )
            .then(data => {
                if (data.code == 100) {
                    suc && suc(data.id);
                } else {
                    err && err(data);
                }
            })
            .catch(error => {
                err && err(error);
                console.log(error);
            });
    },
    getAccessToken(customerId = '',suc,err) {
        axios
            .post(
                'http://swissewx.mama100.cn/swisse-store/accesstoken/getAccessToken',
                {
                    "openId": window.openId,
                    "customerId": customerId
                },
                { headers: { "Content-Type": "application/json" } }
            )
            .then(data => {
                if (data.code == 100) {
                    suc && suc(data);
                } else {
                    err && err(data);
                }
            })
            .catch(error => {

            });
    }
}