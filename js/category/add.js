/**
 * 添加分类
 * Author:Wilbert
 *   Date:2017/9/14
 */
define([
    "jquery",
    "text!tpls/categoryAdd.html",
    "template"
], function ($, categoryAddTpl, template) {
    return function () {
        $.ajax({
            url: "/api/category/top",
            type: "post",
            success: function (res) {
                res.result.unshift({
                    cg_id: 0,
                    cg_name: "顶级分类"
                });
                // console.log(res.result);
                var html = template.render(categoryAddTpl, res);
                var $html = $(html)
                    .on("submit", "form", function (e) {
                        e.preventDefault();
                        var formData = $(this).serialize();
                        $.ajax({
                            url: "/api/category/add",
                            type: "post",
                            data: formData,
                            success: function (res) {
                                if (res.code != 200) throw new Error(res.msg);
                                $html.modal("hide");
                                $(".menu .list-group a[item=category]").trigger("click");
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