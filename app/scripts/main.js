;
(function($) {
    $(document).ready(function() {
        /*计算内容框的高度，适应浏览器高度变化*/
        function calcContentBox() {
            var colMainHeight = $(".col-main").height();
            var toolBarTopHeight = $(".toolbar-top").height();
            var marginHeight = $(".content-box").outerHeight(true) - $(".content-box").height();
            $(".content-box").height(colMainHeight - toolBarTopHeight - marginHeight - 2);
        };

        calcContentBox();
        $(window).on("resize", calcContentBox);



        /*新增预约弹出对话框*/
        $("#btn-new-reservation").on('click', function() {
            $("#dialog-new-reservation").find(".datetimepicker").datetimepicker({
                language: 'zh-CN'
            });

            var d = dialog({
                title: '新建预约',
                content: $("#dialog-new-reservation"),
                quickClose: false, // 点击空白处快速关闭
                skin: 'skin-popup',
                button: [{
                    value: '确定',
                    callback: function() {
                        return false;
                    },
                    autofocus: true
                }, {
                    value: '取消',
                    callback: function() {}
                }]
            });
            d.show(this);
        });

        /*在新增课程预约的弹出框中，添加用户的对话框*/
        $("#btn-add-member").on("click", function() {
            var d = dialog({
                title: '用户增加',
                content: $("#dialog-add-member"),
                quickClose: false, // 点击空白处快速关闭
                skin: 'skin-popup',
            });
            d.show(this);
        });

        /*在新增课程预约的弹出框中，选择课程的对话框*/
        $("#btn-add-course").on("click", function() {
            var d = dialog({
                title: '选择课程',
                content: $("#dialog-add-course"),
                quickClose: false, // 点击空白处快速关闭
                skin: 'skin-popup',
            });
            d.show(this);
        });


        /*
         **--------------------------
         ** 导入数据时添加更多输入框
         **--------------------------
         */
        $("#import-single").find(".add-more").on('click', function() {
            $(this).before('<br/>' + $("#tpl-add-more")[0].innerHTML);
        });

        /*
         **--------------------------
         ** 批量导入按钮触发数据处理中提示
         **--------------------------
         */
        $("#btn-import-batch").on("click", function(e) {
            e.preventDefault();
            var d = dialog({
                content: "数据存储中，请稍后...",
                padding: 0,
                skin: 'skin-processing',
            });
            d.showModal();
            //这里模拟2秒钟后处理完成，关闭显示,并触发处理结果的对话框
            setTimeout(function() {
                d.close().remove();
                var d2 = dialog({
                    title: ' ', 
                    content: $("#dialog-import-bath-result"),
                    skin: 'skin-result',
                });
                d2.showModal();
            }, 2000);
        });
    });
})(jQuery);
