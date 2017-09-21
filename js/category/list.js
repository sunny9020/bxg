/**
 * 分类列表
 * Author:Wilbert
 *   Date:2017/9/14
 */

// 分类列表
define([
    "jquery",
    "text!tpls/categoryList.html",
    "template",
    "category/add",
    "category/edit"

], function ($, categoryListTpl, template, categoryAdd, categoryEdit) {
    return function () {
        $.ajax({
            url: "/api/category",
            type: "get",
            success: function (res) {
                if (res.code != 200) throw new Error(res.mgs);
                var html = template.render(categoryListTpl, res);
                $html = $(html);
                $html
                    .on("click", ".btn-add", function () {
                        categoryAdd();
                    })
                    .on("click", ".btn-edit", function () {
                        alert(11111);
                    })



                $(".main .content-container").html($html);
            }
        })
    }

})