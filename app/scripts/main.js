'use strict';
(function($) {
    $(document).ready(function() {
        /*计算内容框的高度，适应浏览器高度变化*/
        function calcContentBox() {
            var colMainHeight = $('.col-main').height();
            var toolBarTopHeight = $('.toolbar-top').height();
            var marginHeight = $('.content-box').outerHeight(true) - $('.content-box').height();
            $('.content-box').height(colMainHeight - toolBarTopHeight - marginHeight - 2);
            $('.slide-box').height(colMainHeight - 2);
        }

        calcContentBox();
        $(window).on('resize', calcContentBox);



        /*新增预约弹出对话框*/
        $('#btn-new-reservation').on('click', function() {
            $('#dialog-new-reservation').find('.datetimepicker').datetimepicker({
                language: 'zh-CN'
            });

            var d = dialog({
                title: '新建预约',
                content: $('#dialog-new-reservation'),
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
        $('#btn-add-member').on('click', function() {
            var d = dialog({
                title: '用户增加',
                content: $('#dialog-add-member'),
                quickClose: false, // 点击空白处快速关闭
                skin: 'skin-popup'
            });
            d.show(this);
        });

        //在新增课程预约的弹出框中，选择课程的对话框
        //如果这里的按钮是动态生成的，需要绑定委托事件
        //$(document).on('click', '#btn-add-course', function(){...});
        $('#btn-add-course').on('click', function() {
            var d = dialog({
                title: '选择课程',
                content: $('#dialog-add-course'), //将id为dialog-add-course元素的内容作为弹出框中的内容
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
        $('#import-single').find('.add-more').on('click', function() {
            $(this).before('<br/>' + $('#tpl-add-more')[0].innerHTML);
        });

        /*
         **--------------------------
         ** 批量导入按钮触发数据处理中提示
         **--------------------------
         */
        $('#btn-import-batch').on('click', function(e) {
            e.preventDefault();
            var d = dialog({
                content: '数据存储中，请稍后...',
                padding: 0,
                skin: 'skin-processing'
            });
            d.showModal();
            //这里模拟2秒钟后处理完成，关闭显示,并触发处理结果的对话框
            setTimeout(function() {
                d.close().remove();
                var d2 = dialog({
                    title: ' ',
                    content: $('#dialog-import-bath-result'),
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
        $('#reservation-data').find('tbody tr').on('click', function(e) {
            //找到相应的右侧滑出框，并打开它
            e.stopPropagation();
            var slideBox = $('#reservation-detail');
            openSlideBox(slideBox);
        });
        $('.btn-slide-close').on('click', function() {
            var slideBox = $(this).closest('.slide-box');
            closeSlideBox(slideBox);
        });
        $(window).on('click', function(e) {
            if ($(e.target).closest('.slide-box').length > 0) {
                //在slideBox内部单击时不关闭
            } else {
                //TODO: 在滑出窗口中弹出对话框时，有bug
                //closeSlideBox($('.slide-box'));
            }

        });

        /*
         **--------------------------
         ** 预约日历插件相关代码
         **--------------------------
         */
        $('#reservation-calendar').fullCalendar({
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
        });
        //显示上一个月
        $('.reservation-calendar-control').find('#btn-prev').on('click', function() {
            $('#reservation-calendar').fullCalendar('prev');
            $('.reservation-calendar-control').find('.calendar-title').text($('#reservation-calendar').fullCalendar('getView').title);
        });
        //显示上一个星期
        $('.reservation-calendar-control').find('#btn-next').on('click', function() {
            $('#reservation-calendar').fullCalendar('next');
            $('.reservation-calendar-control').find('.calendar-title').text($('#reservation-calendar').fullCalendar('getView').title);
        });
        //切换成月视图
        $('#btn-month-view').on('click', function() {
            $('#reservation-calendar').fullCalendar('changeView', 'month');
            $('.reservation-calendar-control').find('.calendar-title').text($('#reservation-calendar').fullCalendar('getView').title);
        });
        //切换成星期视图
        $('#btn-week-view').on('click', function() {
            $('#reservation-calendar').fullCalendar('changeView', 'basicWeek');
            $('.reservation-calendar-control').find('.calendar-title').text($('#reservation-calendar').fullCalendar('getView').title);
        });

        $('.reservation-calendar-control').find('.calendar-title').text($('#reservation-calendar').fullCalendar('getView').title);

        //教练预约滑出框
        $('.coach-list li').on('click', function(e) {
            //找到相应的右侧滑出框，并打开它
            e.stopPropagation();
            var slideBox = $('#reservation-coach-detail');
            openSlideBox(slideBox);
        });

        //预约确认
        $('#btn-reservation-confirm').on('click', function() {
            var d = dialog({
                title: '预约确认',
                content: '确认全部会员预约时间！',
                align: 'bottom',
                skin: 'skin-popup skin-confirm',
                okValue: '确定',
                ok: function() {}
            });
            d.show(this).width(300);
        });
        //预约删除
        $('#btn-reservation-delete').on('click', function() {
            var d = dialog({
                title: '确认删除',
                content: '删除自后，数据不能恢复！',
                skin: 'skin-popup skin-confirm',
                okValue: '确定',
                ok: function() {}
            });
            d.show(this).width(300);
        });


        /*
         **--------------------------
         ** 会员管理
         **--------------------------
         */
        //激活高级搜索表单中的日期选择控件
        $('#advance-search').find('.datetimepicker').datetimepicker({
            language: 'zh-CN',
            minView: 2,
            format: 'yyyy-mm-dd',
            autoclose: true
        });

        //弹出短信邀请对话框
        $('#talbe-member-list .btn-invite-by-sms').on('click', function(e) {
            e.stopImmediatePropagation();
            var align = 'bottom left';
            //对于页面底部的弹出框，设置弹出位置为按钮上方
            if ($(this).offset().top - $(this).scrollTop() >= $(window).height() - 200) {
                align = 'top right';
            };
            var d = dialog({
                title: '短信邀请',
                content: '确认再次邀请该用户！',
                skin: 'skin-popup skin-confirm',
                //align: align,
                button: [{
                    value: '确定',
                    callback: function() {
                        return false;
                    },
                    autofocus: true
                }, {
                    value: '取消',
                    callback: function() {}
                }],
                statusbar: '<p class="help">不收取任何短信费用！</p>'
            });
            d.show(this).width(300);
        });

        //滑出新增会员框
        $('#btn-add-new-member').on('click', function() {
            openSlideBox($('#slide-box-edit-member'));
        });

        //在滑出的新增会员框中的课程按钮上绑定点击事件，弹出选择课程对话框
        //这里采用的是jQuery中委托代理事件绑定，可以为动态生成的dom元素绑定事件
        $('#slide-box-edit-member').on('click', '.btn-add-course', function() {
            var d = dialog({
                title: '选择课程',
                content: $('#dialog-add-course'),
                quickClose: true, // 点击空白处快速关闭
                skin: 'skin-popup'
            });
            d.show(this);
        });

        $('#slide-box-edit-member').on('click', '.btn-add-coach', function() {
            var d = dialog({
                title: '选择教练',
                content: $('#dialog-add-coach'),
                quickClose: true, // 点击空白处快速关闭
                skin: 'skin-popup'
            });
            d.show(this);
        });

        //滑出会员详情框
        $('#talbe-member-list tbody tr').on('click', function() {
            openSlideBox($('#slide-box-member-detail'));
        });

        //滑出导流用户编辑框
        $('#talbe-member-list .btn-edit-diversion-member').on('click', function(e) {
            e.stopImmediatePropagation();
            openSlideBox($('#slide-box-edit-diversion-member'));
        });

        //根据会员类型显示相应的编辑项
        $('#slide-box-edit-diversion-member [name="membertype"]').on('change', function() {
            $(".action-new-member, .action-old-member").hide();
            var type = $(this).val();
            if (type == 'new') {
                $(".action-new-member").show();
            }
            if (type == 'old') {
                $(".action-old-member").show();
            }
        });


        /*
         **--------------------------
         ** 课程日历插件相关代码
         **--------------------------
         */
        $('#course-calendar').fullCalendar({
            //控件部分已经自定义，这里不需要默认的头部控件
            header: {
                left: '',
                center: '',
                right: ''
            },
            //用于显示预约事件数据，具体使用方法参考文档：http://fullcalendar.io/docs/
            eventSources: [{
                events: [{
                    title: '高温瑜伽课程',
                    start: '2015-02-16',
                    color: '#6dd749'
                }, {
                    title: '高温瑜伽是打发我课程',
                    start: '2015-02-16',
                    color: '#3ccf9d'
                }, {
                    title: '高温瑜伽啊搜房网课程',
                    start: '2015-02-16',
                    color: '#6dd749',
                    allDay: false
                }, {
                    title: '高温瑜伽课程',
                    start: '2015-02-19',
                    color: '#6dd749'
                }, {
                    title: '高温瑜伽是打发我课程',
                    start: '2015-02-19',
                    color: '#3ccf9d'
                }, {
                    title: '高温瑜伽课程',
                    start: '2015-02-21',
                    color: '#6dd749'
                }, {
                    title: '高温瑜伽是打发我课程',
                    start: '2015-02-21',
                    color: '#3ccf9d'
                }, {
                    title: '高温瑜伽课程',
                    start: '2015-02-26',
                    color: '#6dd749'
                }, {
                    title: '高温瑜伽是打发我课程',
                    start: '2015-02-27',
                    color: '#3ccf9d'
                }],
                textColor: '#ffffff'
            }]
        });
        //显示上一个月
        $('.course-calendar-control').find('#btn-prev').on('click', function() {
            $('#course-calendar').fullCalendar('prev');
            $('.course-calendar-control').find('.calendar-title').text($('#course-calendar').fullCalendar('getView').title);
        });
        //显示上一个星期
        $('.course-calendar-control').find('#btn-next').on('click', function() {
            $('#course-calendar').fullCalendar('next');
            $('.course-calendar-control').find('.calendar-title').text($('#course-calendar').fullCalendar('getView').title);
        });
        //切换成月视图
        $('#btn-month-view').on('click', function() {
            $('#course-calendar').fullCalendar('changeView', 'month');
            $('.course-calendar-control').find('.calendar-title').text($('#course-calendar').fullCalendar('getView').title);
        });
        //切换成星期视图
        $('#btn-week-view').on('click', function() {
            $('#course-calendar').fullCalendar('changeView', 'basicWeek');
            $('.course-calendar-control').find('.calendar-title').text($('#course-calendar').fullCalendar('getView').title);
        });

        $('.course-calendar-control').find('.calendar-title').text($('#course-calendar').fullCalendar('getView').title);

        //新增课程页面，选择教练
        $('#form-add-course #btn-select-coach').on('click', function() {
            var d = dialog({
                title: '选择教练',
                content: $('#dialog-add-coach'),
                quickClose: true, // 点击空白处快速关闭
                skin: 'skin-popup'
            });
            d.show(this);
        });
        //新增课程页面，选择时长
        $('#form-add-course #btn-select-duration').on('click', function() {
            var d = dialog({
                title: '选择时长',
                content: $('#dialog-select-duration'),
                quickClose: true, // 点击空白处快速关闭
                skin: 'skin-popup'
            });
            d.show(this);
        });
        //新增课程页面，设置时间
        $('#form-add-course #btn-set-workinghour').on('click', function() {
            $('.datetimepicker').datetimepicker({
                language: 'zh-CN',
                minView: 2,
                format: 'yyyy-mm-dd',
                autoclose: true
            });
            var d = dialog({
                title: '设置时间',
                content: $('#dialog-set-workinghour'),
                quickClose: true, // 点击空白处快速关闭
                skin: 'skin-popup'
            });
            d.show(this).width(665);
            $('#dialog-set-workinghour').on('click', '#btn-add-hour-range', function() {
                //var range = $(this).closest('.form-group').find('.date-range');
                //$(this).closest('.form-group').append('<br/>').append(range.eq(0).clone());
            });
            $('#dialog-set-workinghour').on('click', '#btn-delete-hour-range', function() {
                //if($(this).closest('.form-group').find('.date-range').length > 1) {
                //    $(this).closest('.form-group').find('.date-range').last().remove();
                //    $(this).closest('.form-group').find('br').last().remove();
                //}
            });
        });

        $('#form-add-coach #btn-select-course').on('click', function(e){
            e.preventDefault();
            var d = dialog({
                title: '选择课程',
                content: $('#dialog-add-course'), //将id为dialog-add-course元素的内容作为弹出框中的内容
                quickClose: false, // 点击空白处快速关闭
                skin: 'skin-popup'
            });
            d.show(this);
        });

        //微体验列表页面删除确认框
        $('.table-weitiyan-list .btn-delete').on('click', function(e){
            var d = dialog({
                title: '确认删除',
                content: '确认删除该条信息',
                skin: 'skin-popup skin-confirm',
                okValue: '确定',
                align: 'bottom',
                ok: function() {}
            });
            d.show(this).width(300);
        });
        //微体验列表页面，二维码显示
        $('.table-weitiyan-list .show-qr').on('click', function(e){
            var d = dialog({
                content: '<img src="images/qr_01.jpg" />',
                skin: 'skin-popup',
                align: 'bottom',
                quickClose: true, 
            });
            d.show(this).width(133);
        });

        //文件上传按钮美化
        $('[role="file"]').on('click', function(){
            var _this = this;
            var toggleTarget = $('#' + $(this).attr("data-toggle"));
            toggleTarget.on('change', function(){
                if($(this).val()) {
                    $(_this).val($(this).val());
                }
            });
            toggleTarget.trigger('click');
        });

        $('#form-weitiyan-edit').find('.datetimepicker').datetimepicker({
            language: 'zh-CN',
            minView: 2,
            format: 'yyyy-mm-dd',
            autoclose: true
        });
    });
})(jQuery);
