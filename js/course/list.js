// 课程列表
define([
    "jquery",
    "text!tpls/courseList.html",
    "template",
    "course/image",
    "course/baseInfo"
], function ($, courseListTpl, template, courseImage, courseBaseInfo) {
    return function () {
        $.ajax({
            url: "/api/course",
            type: "get",
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                var html = template.render(courseListTpl, res);
                var $html = $(html);

                $html
                    // 点击图片
                    .on("click", "a", function () {
                        var cs_id = $(this).parent().parent().attr("cs_id");
                        courseImage(cs_id);

                    })
                    .on("click", ".btn-baseinfo", function () {
                        var $media = $(this).parents(".media");
                        var cs_id = $media.attr("cs_id");
                        courseBaseInfo(cs_id);
                    })
                $(".main .content-container").html($html);

            }

        })

    }
})