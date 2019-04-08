$(function() {
    'use strict';

    // 1.选择页面中所有的input[data-rule]
    var $inputs = $('input[data-rule]');
    var $form = $('#signup');
    var inputs_arr = [];

    //2-1.迭代$inputs每一个元素
    $inputs.each(function(index, node) {
        //2-2.解析每一个input的验证规则
        var tmp_obj = new Input(node);
        inputs_arr.push(tmp_obj);
    });

    /*
    // 同下: 去 on 的写法
    $form.submit(function(event) {
        event.preventDefault();
    });
    */
    $form.on('submit', function(event) {
        event.preventDefault();
        //通过触发所有input的 blur 来显示错误信息
        $inputs.trigger('blur');
        //通过循环迭代知道具体哪一个input出现了错误
        for (var i = 0; i < inputs_arr.length; i++) {
            var item = inputs_arr[i];
            var result = item.validator.is_valid();
            if (!result) {
                alert('提交内容不合法!');
                return;
            }
        }
        // signup();//执行提交数据
        alert('注册成功!');
    });

    /*
    提交数据到服务器
    function signup() {
        //1.直接用post方法
        $.post('url', { username: 'whh', password: 'asdf' });

        //2.ajax方法，post方法也是ajax方法的简写
        $.ajax({
            url: 'https://api.github.com/users/biaoyansu',
            method: 'get',
            data: {
                username: '',
                password: ''
            },
            success: function(data) {
                console.log('请求成功!');
                console.log('结果为:', data);
            },
            error: function() {
                console.log('请求失败!');
            }
        });
    }
    */
});
