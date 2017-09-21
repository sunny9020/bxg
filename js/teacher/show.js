/**
 * 查看讲师模块
 * Author:Wilbert
 *   Date:2017/9/12
 */
define([
    "text!tpls/teacherShow.html",
    "template",
    "jquery"
], function (teacherShowTpl, template, $) {
    return function (id) {
        $.ajax({
            url: "/api/teacher/view",
            type: "get",
            data: {
                tc_id: id
            },
            success: function (res) {
                var html = template.render(teacherShowTpl, res);

                $(html).appendTo("body").modal().on('hidden.bs.modal', function (e) {
                    $(this).remove();
                });
            }
        })

    }
})