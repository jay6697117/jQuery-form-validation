$(function() {
    'use strict';
    //这里val是input中的输入值是字符串，rule是一个定义验证规则的对象
    window.Validator = function(val, rule) {
        this.is_valid = function(new_val) {
            var key;
            if (new_val !== undefined) {
                val = new_val;
            }

            /*如果不是必填项且用户未填写任何内容则直接判定为合法*/
            if (!rule.required && val === '') {
                return true;
            }

            for (key in rule) {
                /*防止重复检查,这里要注意required里面定义了去除输入值的首尾空格的方法*/
                if (!rule.required && key === 'required') {
                    continue;
                }

                /*调用rule中相对应的方法*/
                var tmp_res = this['validate_' + key]();
                if (!tmp_res) {
                    return false;
                }
            }
            return true;
        };

        this.validate_max = function() {
            //只能转换val的类型不能改变值
            pre_max_min();
            return val <= rule.max;
        };

        this.validate_min = function() {
            //只能转换val的类型不能改变值
            pre_max_min();
            return val >= rule.min;
        };

        this.validate_maxlength = function() {
            //只能转换val的类型不能改变值
            pre_maxlength_minlength();
            return val.length <= rule.maxlength;
        };

        this.validate_minlength = function() {
            //只能转换val的类型不能改变值
            pre_maxlength_minlength();
            return val.length >= rule.minlength;
        };

        this.validate_numeric = function() {
            return $.isNumeric(val);
        };

        this.validate_required = function() {
            var realVal = $.trim(val);
            if (!realVal && realVal !== 0) {
                return false;
            }
            return true;
        };

        this.validate_pattern = function() {
            var reg = new RegExp(rule.pattern);
            return reg.test(val);
        };

        // 用于完成重复部分代码的封装
        function pre_max_min() {
            val = parseFloat(val);
        }
        function pre_maxlength_minlength() {
            val = val.toString();
        }
    };
});
