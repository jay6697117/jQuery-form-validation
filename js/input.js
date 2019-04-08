$(function() {
    'use strict';
    window.Input = function(seletor) {
        var $ele;
        var rule = { required: true };
        var me = this;
        var $error_ele;

        this.load_validator = function() {
            var val = this.get_val();
            /*
            测试input框在没输入情况下的值和值类型
            console.log('typeof this.get_val():', typeof this.get_val());
            */
            this.validator = new Validator(val, rule);
        };

        this.get_val = function() {
            return $ele.val();
        };

        //初始化
        function init() {
            find_ele();
            get_error_ele();
            parse_rule();
            me.load_validator();
            listen();
        }

        function listen() {
            $ele.on('blur', function() {
                var valid_res = me.validator.is_valid(me.get_val());
                if (valid_res) {
                    $error_ele.hide();
                } else {
                    $error_ele.show();
                }
                /*
                //测试input框输入的值和值类型
                console.log('me.get_val():', me.get_val());
                console.log('typeof me.get_val():', typeof me.get_val());
                console.log('valid_res:', valid_res);
                */
            });
        }

        function get_error_ele() {
            $error_ele = $(get_error_selector());
        }

        //要改成class试一试
        function get_error_selector() {
            return '.' + $ele.attr('name') + '-input-error';
        }

        //我是谁
        function find_ele() {
            if (seletor instanceof jQuery) {
                $ele = seletor;
            } else {
                $ele = $(seletor);
            }
        }

        //绑定验证规则
        function parse_rule() {
            var rule_string = $ele.data('rule');
            if (!rule_string) {
                return;
            }
            var rule_arr = rule_string.split('|');
            for (var i = 0; i < rule_arr.length; i++) {
                var item_str = rule_arr[i];
                var item_arr = item_str.split(':');
                rule[item_arr[0]] = JSON.parse(item_arr[1]);
            }
            /*
            打印在main.js里迭代的 $inputs里每个元素的data-rule属性的值，转换成的rule对象
            console.log(rule);
            */
        }

        init();
    };
});
