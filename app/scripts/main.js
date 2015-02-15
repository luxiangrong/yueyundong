;
(function($) {
    $(document).ready(function() {
        /*计算内容框的高度，适应浏览器高度变化*/
        function calcContentBox() {
            var colMainHeight = $(".col-main").height();
            var toolBarTopHeight = $(".toolbar-top").height();
            var marginHeight = $(".content-box").outerHeight(true) - $(".content-box").height();
            $(".content-box").height(colMainHeight - toolBarTopHeight - marginHeight - 2);
            $(".slide-box").height(colMainHeight - 2);
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
                align: 'bottom right',
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
                skin: 'skin-popup'
            });
            d.show(this);
        });

        /*在新增课程预约的弹出框中，选择课程的对话框*/
        $("#btn-add-course").on("click", function() {
            var d = dialog({
                title: '选择课程',
                content: $("#dialog-add-course"),
                quickClose: false, // 点击空白处快速关闭
                skin: 'skin-popup'
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
                skin: 'skin-processing'
            });
            d.showModal();
            //这里模拟2秒钟后处理完成，关闭显示,并触发处理结果的对话框
            setTimeout(function() {
                d.close().remove();
                var d2 = dialog({
                    title: ' ',
                    content: $("#dialog-import-bath-result"),
                    skin: 'skin-result'
                });
                d2.showModal();
            }, 2000);
        });

        /*
         **--------------------------
         ** 打开和关闭右侧的滑出框
         **--------------------------
         */
        function openSlideBox(slideBox) {
            $(slideBox).width(700);
        }

        function closeSlideBox(slideBox) {
                $(slideBox).width(0);
            }
            //打开右侧的滑出框，这里假设由点击表格内的行来触发，右侧弹出框的打开
        $("#reservation-data").find("tbody tr").on("click", function(e) {
            //找到相应的右侧滑出框，并打开它
            e.stopPropagation();
            var slideBox = $("#reservation-detail");
            openSlideBox(slideBox);
        });
        $(".btn-slide-close").on("click", function() {
            var slideBox = $(this).closest(".slide-box");
            closeSlideBox(slideBox);
        });
        $(window).on("click", function(e) {
            if ($(e.target).closest(".slide-box").length > 0) {
                //在slideBox内部单击时不关闭
            } else {
                //TODO: 在滑出窗口中弹出对话框时，有bug
                //closeSlideBox($(".slide-box"));
            }

        });

        /*
         **--------------------------
         ** 日历插件相关代码
         **--------------------------
         */
        var reservationCalendar = $('#reservation-calendar').fullCalendar({
                //控件部分已经自定义，这里不需要默认的头部控件
                header: {
                    left: '',
                    center: '',
                    right: ''
                },
                //用于显示预约事件数据，具体使用方法参考文档：http://fullcalendar.io/docs/
                eventSources: [{
                    events: [{
                        title: '张立彬预约',
                        start: '2015-02-16',
                        color: '#6dd749'
                    }, {
                        title: '张立彬预约',
                        start: '2015-02-16',
                        color: '#3ccf9d'
                    }, {
                        title: '张立彬预约',
                        start: '2015-02-16',
                        color: '#6dd749',
                        allDay: false
                    }],
                    textColor: '#ffffff'
                }]

            })
            //显示上一个月
        $(".reservation-calendar-control").find("#btn-prev").on("click", function() {
            $('#reservation-calendar').fullCalendar('prev');
            $(".reservation-calendar-control").find(".calendar-title").text($('#reservation-calendar').fullCalendar("getView").title);
        });
        //显示上一个星期
        $(".reservation-calendar-control").find("#btn-next").on("click", function() {
            $('#reservation-calendar').fullCalendar('next');
            $(".reservation-calendar-control").find(".calendar-title").text($('#reservation-calendar').fullCalendar("getView").title);
        });
        //切换成月视图
        $("#btn-month-view").on("click", function() {
            $('#reservation-calendar').fullCalendar('changeView', 'month');
            $(".reservation-calendar-control").find(".calendar-title").text($('#reservation-calendar').fullCalendar("getView").title);
        });
        //切换成星期视图
        $("#btn-week-view").on("click", function() {
            $('#reservation-calendar').fullCalendar('changeView', 'basicWeek');
            $(".reservation-calendar-control").find(".calendar-title").text($('#reservation-calendar').fullCalendar("getView").title);
        });

        //教练预约滑出框
        $(".coach-list li").on("click", function(e) {
            //找到相应的右侧滑出框，并打开它
            e.stopPropagation();
            var slideBox = $("#reservation-coach-detail");
            openSlideBox(slideBox);
        });

        //预约确认
        $("#btn-reservation-confirm").on("click", function() {
            var d = dialog({
                title: '预约确认',
                content: '确认全部会员预约时间！',
                align: 'bottom',
                skin: 'skin-popup skin-confirm',
                okValue: '确定',
                ok: function() {
                }
            });
            d.show(this).width(300);
        });
        //预约删除
        $("#btn-reservation-delete").on("click", function() {
            var d = dialog({
                title: '确认删除',
                content: '删除自后，数据不能恢复！',
                skin: 'skin-popup skin-confirm',
                okValue: '确定',
                ok: function() {
                }
            });
            d.show(this).width(300);
        });
    });
})(jQuery);
