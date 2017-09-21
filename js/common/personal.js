// 个人中心

define([
    "jquery",
    "text!tpls/personal.html",
    "template",
    "common/api"
], function ($, personalTpl, template, api) {
    function getName(formData) {
        var result;
        var datas = formData.split("&");
        datas.forEach(function (v) {
            var keyValues = v.split("=");
            var key = keyValues[0];
            var value = keyValues[1];
            if (key == "tc_name") {
                result = decodeURI(value);
            }

        });
        return result;
    }
    return function () {
        api.get("teacher/profile", {}, function (res) {
            var html = template.render(personalTpl, res.result);
            $(html).on("sumbit", "form", function (e) {
                    e.preventDefault();
                    var formData = $(this).serialize();
                    api.post("teacher/modify", formData, function (res) {
                        var tc_name = getName(formData);
                        var userInfoStr = $.cookie("userInfo");
                        var userInfoObj = JSON.parse(userInfoStr);
                        userInfoObj.tc_name = tc_name;
                        userInfoStr = JSON.stringify(userInfoObj);
                        $.cookie("userInfo", userInfoStr);
                        location.reload();
                    })
                })
                .myModal();
            var ue = UE.getEditor("introduceContainer");
            ue.ready(function () {
                ue.setContent(res.result.tc_introduce);
            })
        })

    }
})

// 提交表单
// 	-把表单变成异步的表单
// 	    --给表单绑定submit事件，e.preventDefault();
// 	-获取表单数据
// 		-- var formData=$(this).serialize(); 表单name值-->接口文档找到提交表单的接口地址，看接口参数，接
// 口的每一个参数就是每一个name值
// 	--通过ajax方法提交表单