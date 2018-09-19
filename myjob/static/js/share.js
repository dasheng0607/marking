import axios from 'axios'
import wx from 'weixin-js-sdk'
export default {
    wxShowMenu: function (obj,suc,err) {
        axios.get(process.env.SWISSE + '/swisseweixin/weixin/jsApiSign').then(function (res) {
            var getMsg = res.data;
            wx.config({
                debug: false,  //生产环境需要关闭debug模式
                appId: getMsg.appId, //appId通过微信服务号后台查看
                timestamp: getMsg.timestamp, //生成签名的时间戳
                nonceStr: getMsg.nonceStr, //生成签名的随机字符串
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
                    imgUrl: window.user.headimgurl, // 分享图标,
                    success() {
                        suc && suc();
                    },
                    cancel() {
                       err && err();
                    }
                });
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: obj.title2 , // 分享标题
                    desc: obj.desc2, // 分享描述
                    link: obj.link2, // 分享链接
                    imgUrl: window.user.headimgurl, // 分享图标
                    success() {
                        suc && suc();
                    },
                    cancel() {
                        err && err();
                    }
                });
            });
        })
    },
    getCustomer(suc,err){
        axios
            .post(
            process.env.SWISSE + '/swisseweixin/cust/getCustomer',
                {
                    "openId": window.openId,
                    "tsno": new Date().getTime()
                },
                { headers: { "Content-Type": "application/json" } }
            )
            .then(function (data) {
                if (data.data.code == 100) {
                    suc && suc(data.data.id);
                } else {
                    err && err(data.data);
                }
            })
            .catch(function (error) {
                err && err(error);
                console.log(error);
            });
    },
    getAccessToken(customerId,suc,err) {
        axios
            .post(
                process.env.SWISSE + '/swisse-store/accesstoken/getAccessToken',
                {
                    "openId": window.openId,
                    "customerId": customerId
                },
                { headers: { "Content-Type": "application/json" } }
            )
            .then(function (data) {
                if (data.data.code == 100) {
                    suc && suc(data.data);
                } else {
                    err && err(data.data);
                }
            })
            .catch(function (error) {

            });
    }
}