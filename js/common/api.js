define([
    "jquery"
], function ($) {
    return {
        //  * @param url
        //          * @param type
        //          * @param data
        //          * @param callback 接受了匿名函数的内存地址

        ajax: function (url, type, data, callback) {
            $.ajax({
                url: "/api/" + url,
                type: type,
                data: data,
                success: function (result) {
                    if (result.code != 200) throw new Error(result.msg);
                    callback(result);
                },
                error: function (res) {
                    throw new Error(res);

                }
            });
        },
        get: function (url, data, callback) {
            this.ajax(url, "get", data, callback);
        },
        post: function (url, data, callback) {
            this.ajax(url, "post", data, callback);
        }
    };

});