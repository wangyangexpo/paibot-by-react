var utils = {
    /**************** debug ****************/
    /**
     * window.jUtils.isDebug = true  启用debug模式
     * window.jUtils.useDebug(true)
     */
    'isDebug': false,
    'useDebug': function(use) {
        this.isDebug = !!use;
    },
    /**
     * debug模式下会弹出alert
     */
    'debugAlert': function(content, delay) {
        if (this.isDebug) {
            setTimeout(function(msg) {
                window.alert(msg);
            }, delay || 0, content);
        }
    },

    /**************** trim ****************/
    'trim': function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    'ltrim': function(str) {
        return str.replace(/(^\s*)/g, '');
    },
    'rtrim': function(str) {
        return str.replace(/(\s*$)/g, '');
    },

    /**************** clone ****************/
    /**
     * from raphealjs 深度拷贝
     */
    'clone': function(obj) {
        if (typeof obj == 'function' || Object(obj) !== obj) {
            return obj;
        }
        var res = new obj.constructor;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                res[key] = this.clone(obj[key]);
            }
        }
        return res;
    },

    /**************** time ****************/
    /**
     * 将毫秒转换为[天，小时，分，秒]
     */
    'transTime': function(time) {
        var timeArr = [];
        var day = parseInt(time / 36E5 / 24, 10);
        var hour = parseInt((time - day * 24 * 36E5) / 36E5 % 24, 10);
        var minute = parseInt((time - day * 24 * 36E5 - hour * 36E5) / 6E4 % 60, 10);
        var second = parseInt((time - day * 24 * 36E5 - hour * 36E5 - minute * 6E4) / 1E3, 10);
        timeArr.push(day > 0 ? day : '');
        timeArr.push(hour > 0 ? hour : '');
        timeArr.push(minute > 0 ? minute : '');
        timeArr.push(second > 0 ? second : '');
        return timeArr;
    },

    /**************** apptype ****************/
    /**
     * 根据ua获取当前环境类型
     */
    'appTypeEnum': {},
    'getAppType': function() {
        var ua = window.navigator.userAgent.toLowerCase();
        var match = ua.match(/MicroMessenger/i);
        if (match && match[0] === 'micromessenger') {
            return 'weixin';
        } else {
            for (var s in this.appTypeEnum) {
                match = ua.match(new RegExp(s, 'i'));
                if (match && match[0] === s.toLowerCase()) {
                    return this.appTypeEnum[s];
                }
            }
        }
        return 'app';
    },

    /**************** class ****************/
    /**
     * 继承类
     */
    'extendClass': function(child, parent) {
        if (typeof child !== 'function')
            throw new TypeError('extendClass child must be function type');
        if (typeof parent !== 'function')
            throw new TypeError('extendClass parent must be function type');

        if (child === parent)
            return;
        var Transitive = new Function();
        Transitive.prototype = parent.prototype;
        child.prototype = new Transitive();
        return child.prototype.constructor = child;
    },

    /**************** object ****************/
    /**
     * 装饰对象
     */
    'decorate': function(target, source) {
        for (var s in source) {
            target[s] = source[s];
        }
        return target;
    },


    /**************** css class ****************/
    'css': function(dom, attr, value) {
        switch (arguments.length) {
            case 2:
                if (typeof arguments[1] === 'object') {
                    for (var name in attr) {
                        dom.style[name] = attr[name];
                    }
                } else {
                    return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, null)[attr]
                }
                break;
            case 3:
                dom.style[attr] = value;
                break;
            default:
                return '';
        }
    },
    'hasClass': function(dom, cls) {
        return dom.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },
    'addClass': function(dom, cls) {
        if (!this.hasClass(dom, cls)) {
            dom.className = dom.className.split(/\s+/).push(cls + '').join(' ');
        }
    },
    'removeClass': function(dom, cls) {
        if (this.hasClass(dom, cls)) {
            var reg = new RegExp('(\\s+|^)' + cls + '(\\s+|$)');
            dom.className = dom.className.replace(reg, ' ');
        }
    },

    /**************** GUID ****************/
    /**
     * GUID静态属性
     * Added by maelon 2015-07-24 14:37
     */
    'jGUID': {
        '__version': '0.1.0',
        'callCount': 0
    },
    /**
     * GUID(hex):
     *    xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     */
    'makeSimpleGUID': function() {
        var guid = '00000000000000000000000000000000';
        var count = Math.abs(this.jGUID['callCount']++);
        var count16 = count.toString(16);
        guid = (guid + count16).slice(count16.length);
        return guid.slice(0, 8) + '-' + guid.slice(8, 12) + '-' + guid.slice(12, 16) + '-' + guid.slice(16, 20) + '-' + guid.slice(20);
    },

    /**************** url ****************/
    /**
     * 对于url的search部分进行处理
     * http://test.com?a=123&b=&c&a=222
     * queryList = {
     *   a: ['123', '222'],
     *   b: [''],
     *   c: []
     * }
     */
    'queryList': undefined,
    'parseURL': function(url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            href: url,
            protocol: a.protocol,
            host: a.host,
            hostname: a.hostname,
            port: a.port,
            search: a.search,
            hash: a.hash,
            pathname: a.pathname
        };
    },
    'getQueryList': function(url) {
        if (url === undefined && this.queryList !== undefined) {
            return this.queryList;
        }
        var search = url ? this.parseURL(url).search : window.location.search;
        var result = search.match(new RegExp('[?&][^?&]+=?[^?&]*', 'g'));
        if (result === null) {
            if (url) {
                return [];
            }!this.queryList && (this.queryList = {});
            return this.queryList;
        }
        var retObj = {};
        var name;
        var qs;
        for (var i = 0; i < result.length; i++) {
            result[i] = result[i].substring(1);
            qs = result[i].split('=');
            name = qs[0];
            if (retObj[name] !== undefined) {
                qs.length > 1 && retObj[name].push(qs[1]);
            } else {
                retObj[name] = qs.length > 1 ? [qs[1]] : [];
            }
        }
        if (url)
            return retObj;
        !this.queryList && (this.queryList = retObj);
        return this.queryList;
    },
    /**
     * 要据参数名获取参数值 a -> ['123', '222']
     */
    'getQueryString': function(name, url, ignore) {
        var qsList = this.getQueryList(url);
        var ig = !!ignore;
        if (ig) {
            var queryName = name.toLowerCase();
            var arr = [];
            for (var name in qsList) {
                if (name.toLowerCase() === queryName) {
                    arr = arr.concat(qsList[name]);
                }
            }
            return arr;
        } else {
            return qsList[name];
        }
    },
    /**
     * 将参数对象转换为url search
     * 例如 http://test.com?a=123&b=12
     *    设置参数  {
     *                  a: 222, 改变值
     *                  b: null, 删除
     *                  c: haha 新增
     *              }
     *       转换为 ?a=222&c=haha
     */
    'setQueryString': function(query, url, ignore, needtidy) {
        var qsList = url ? this.getQueryList(url) : this.clone(this.queryList);
        //var qName;
        var hasQS = function(name, list, ignore) {
            if (ignore) {
                for (var s in list) {
                    if (s.toLowerCase() === name.toLowerCase()) {
                        return true;
                    }
                }
                return false;
            } else {
                return list[name] !== undefined;
            }
        };
        for (var name in query) {
            if (hasQS(name, qsList, ignore)) {
                if (ignore) {
                    for (var qname in qsList) {
                        if (qname.toLowerCase() === name.toLowerCase()) {
                            if (query[name] !== null) {
                                qsList[qname] = qsList[qname].concat(query[name] instanceof Array ? query[name] : [query[name]]);
                            } else {
                                delete qsList[qname];
                            }
                        }
                    }
                } else {
                    if (query[name] !== null) {
                        qsList[name] = qsList[name].concat(query[name] instanceof Array ? query[name] : [query[name]]);
                    } else {
                        delete qsList[name];
                    }
                }
            } else {
                if (query[name] !== null) {
                    qsList[name] = query[name] instanceof Array ? query[name] : [query[name]];
                }
            }
        }
        var qs = [];
        var qv;
        for (name in qsList) {
            if (!!needtidy) {
                if (qsList[name].length > 0) {
                    qv = qsList[name].pop();
                    qv !== null && qs.push(name + '=' + qv);
                } else {
                    qs.push(name);
                }
            } else {
                if (qsList[name].length > 0) {
                    if (qsList[name].indexOf(null) < 0) {
                        for (var i = 0; i < qsList[name].length; i++) {
                            qv = qsList[name][i];
                            qs.push(name + '=' + qv);
                        }
                    }
                } else {
                    qs.push(name);
                }
            }
        }
        return '?' + qs.join('&');
    },
    /**
     * 输出结果为完整url
     */
    'setQueryStringURL': function(query, url, ignore, needtidy) {
        var urlLoc = url ? this.parseURL(url) : window.location;
        return urlLoc.protocol + '//' + urlLoc.host + urlLoc.pathname + this.setQueryString(query, url, ignore, needtidy) + urlLoc.hash;
    },
    'setQueryStringURL1': function(query, url, ignore, needtidy) {
        var urlLoc = url ? this.parseURL(url) : window.location;
        return urlLoc.protocol + '//' + urlLoc.host + urlLoc.pathname + this.setQueryString(query, url, ignore, needtidy);
    },

    /**************** cookie ****************/
    'setCookie': function(name, value, expires) {
        var exp = new Date();
        exp.setTime(exp.getTime() + expires);
        document.cookie = name + '=' + escape(value) + '; path=/; expires=' + exp.toGMTString();
    },
    'getCookie': function(name) {
        var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        var arr;
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    'removeCookie': function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval !== null) {
            document.cookie = name + '=' + cval + '; path=/; expires=' + exp.toGMTString();
        }
    },

    /**************** validate ****************/
    'validatePhoneNumberFormat': function(phoneNumber) {
        var phoneReg = /^(1((3[0-9])|(5[0-3|5-9])|(8[0-9])|(45|47|7[6-8]|70))\d{8})$/;
        if (phoneReg.test(phoneNumber)) {
            return true;
        } else {
            return false;
        }
    },
    'validatePhoneCodeFormat': function(code) {
        var codeReg = /^[\d]{4}$/;
        if (codeReg.test(code)) {
            return true;
        } else {
            return false;
        }
    },
    'validatePhoneCode6Format': function(code) {
        var codeReg = /^[\d]{6}$/;
        if (codeReg.test(code)) {
            return true;
        } else {
            return false;
        }
    },
    'validatePasswordFormat': function(password) {
        var passReg = /^[\w]{6,16}$/;
        if (passReg.test(password)) {
            return true;
        } else {
            return false;
        }
    }
};

export default utils;
