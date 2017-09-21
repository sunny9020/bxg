/**
 * 讲师列表模块
 * Author:Wilbert
 *   Date:2017/9/11
 */
define([
    "jquery",
    "text!tpls/teacherList.html",
    "template",
    "teacher/show",
    "teacher/add",
    "teacher/edit"
], function ($, teacherListTpl, template, teacherShow, teacherAdd, teacherEdit) {

    return function fn3() {
        $.ajax({
            url: "/api/teacher",
            type: "get",
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);

                var html = template.render(teacherListTpl, res);
                $(".main .content-container").html(html);

                // 给查看按钮添加事件
                $("div.panel")
                    .on("click", ".btn-show", function () {
                        var tc_id = $(this).parent().attr("tc_id");
                        teacherShow(tc_id);
                    })
                    // 添加讲师
                    .on("click", ".btn-add", function () {
                        teacherAdd(function () {
                            fn3();
                        });

                    })
                    // 点击注销讲师
                    .on("click", ".btn-status", function () {
                        var $btnStatus = $(this);
                        $.ajax({
                            url: "/api/teacher/handle",
                            tyep: "post",
                            data: {
                                tc_id: $(this).parent().attr("tc_id"),
                                tc_status: $(this).parent().attr("tc_status")
                            },
                            success: function (res) {
                                if (res.code != 200) throw new Error(res.msg);
                                var status = res.result.tc_status;
                                $btnStatus.parent().siblings(".td-status").text(status == 0 ? "启用" : "注销");
                                $btnStatus.text(status == 0 ? "注销" : "启用");
                                $btnStatus.parent().attr("tc_status", status);
                                console.log(status);

                            }
                        })
                    })

                    // 点击编辑按钮
                    .on("click", ".btn-edit", function () {
                        var tc_id = $(this).parent().attr("tc_id");
                        // console.log(tc_id);
                        teacherEdit(tc_id);
                    })

            }
        })

    }
})