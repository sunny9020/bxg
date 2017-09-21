define([
    "jquery",
    "text!tpls/courseImage.html",
    "template"
], function ($, courseImageTpl, template) {
    return function (id) {
        $.get("/api/course/picture", {
            cs_id: id
        }, function (res) {
            var html = template.render(courseImageTpl, res.result);
            var $html = $(html)
            $(".main .content-container").html($html);
            $("#fileCourse").uploadify({
                formData: {
                    cs_id: id
                },
                fileObjName: "cs_cover_original", //作为装载文件内容的name值
                swf: '../assets/uploadify/uploadify.swf', //flash文件
                uploader: '/api/uploader/cover', //服务器地址  /api/teacher
                fileTypeExts: '*.gif; *.jpg; *.png; *.jpeg', //指定上传文件的扩展名
                multi: false,
                onUploadSuccess: function (file, data, response) {
                    $(".menu .list-group a[item=course]").trigger("click");
                }
            });
        })
    }
})