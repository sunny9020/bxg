// 添加讲师模块

define([
    "jquery",
    "text!tpls/teacherAdd.html",
    "template"
], function ($, teacherAddTpl, template) {
    return function (callback) {
        var html = template.render(teacherAddTpl, {});
        var $html = $(html);
        $html.appendTo("body")
            .modal()
            .on("hidden.bs.modal", function () {
                $html.find(".date-join").datetimepicker("remove");
                $(this).remove();
            })
            .on("submit", "form", function (e) {
                e.preventDefault();
                var formData = $(this).serialize();
                $.ajax({
                    url: "/api/teacher/add",
                    type: "post",
                    data: formData,
                    success: function (res) {
                        if (res.code != 200) throw new Error(res.msg);
                        $html.modal("hide");
                        callback();
                    }
                })
            });
        // 等到模态框渲染完成之后，渲染日期控件
        $html.find(".date-join").datetimepicker({
            format: "yyyy-mm-dd",
            weekStart: 1,
            daysOfWeekDisabled: [6, 0],
            minView: "month",
            language: "zh-CN",
            autoclose: "true",
            todayHighlight: "true"

        });
    }
})