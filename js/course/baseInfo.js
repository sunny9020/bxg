define([
    "jquery",
    "text!tpls/courseBaseInfo.html",
    "template"
], function ($, courseBaseInfo, template) {
    return function (id) {
        $.get("/api/course/basic", {
            cs_id: id
        }, function (res) {
            var html = template.render(courseBaseInfo, res.result);
            var $html = $(html);
            $html
                .on("change", ".select-top", function () {
                    var val = $(this).val();
                    $.get("/api/category/child", {
                        cs_id: id
                    }, function (res) {
                        if (!res) return $html.find(".select-child").html("");
                        if (res.code != 200) throw new Error(res.msg);
                        var str = "";
                        res.result.forEach(function (v) {
                            str += "<option value='" + v.cg_id + "'>" + v.cg_name + "</option>";
                        });
                        $html.find(".select-child").html(str);

                    })
                })
            $(".main .content-container").html($html);
        })


    }
})