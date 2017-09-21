// 添加课程模块
define([
    "jquery",
    "text!tpls/courseAdd.html",
    "template"
], function ($, courseAdd, template) {
    return function () {
        var html = template.render(courseAdd, {});
        var $html = $(html)
            .on("submit", "form", function (e) {
                e.preventDefault();
                var formData = $(this).serialize();
                $.post("/api/course/create", formData, function (res) {
                    if (res.code != 200) throw new Error(res.msg);
                    $html.modal("hide");
                    $(".menu .list-group a[item=course]").trigger("click");
                })

            })
            .modal();
    }
})