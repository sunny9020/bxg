// 编辑讲师模块
define([
    "jquery",
    "text!tpls/teacherEdit.html",
    "template"
], function ($, teacherEditTpl, template) {
    return function (id) {
        $.ajax({
            url: "/api/teacher/edit",
            type: "get",
            data: {
                tc_id: id
            },
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                var html = template.render(teacherEditTpl, res.result);
                var $html = $(html)
                    .on("submit", "form", function (e) {
                        e.preventDefault();
                        var formData = $(this).serialize();
                        $.ajax({
                            url: "/api/teacher/update",
                            type: "post",
                            data: formData,
                            success: function (res) {
                                if (res.code != 200) throw new Error(res.msg);
                                $html.modal("hide");
                                $(".menu .list-group a[item=teacher]").trigger("click");
                            }
                        })

                    })
                    .appendTo("body").modal()
                    .on("hidden.bs.modal", function () {
                        $html.remove();

                    });
            }
        })
    }
})