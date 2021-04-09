window.onload = function() {
    //设置bannerImg的宽度
    var bannerImg = document.querySelector(".panel");
    var imgArr = bannerImg.getElementsByTagName("img");

    bannerImg.style.width = 1700 * imgArr.length + "px";

    //默认显示图片的索引
    var index = 1;
    bannerImg.style.left = -1700 * index + "px";

    //开启自动切换图片
    autoChange();

    //点击 a.arrow接切换到指定的图片，为所有的 a.arrow绑定单击响应函数
    var allA = document.querySelectorAll(".arrow");
    for (var i = 0; i < allA.length; i++) {
        allA[i].num = i;
        allA[i].onclick = function() {
            clearInterval(timer);
            if (this.num == 0) {
                index--;
                move(bannerImg, "left", -1700 * index, 20, function() {
                    if (index == 0) {
                        //则将index的值设置为1
                        index = imgArr.length - 2;
                        //此时显示的最后一张图片，而最后一张,而最后一张图片和第一张是一模一样的
                        //通过 css将最后一张切换成第一张
                        bannerImg.style.left = -1700 * index + "px";
                    }
                }, 10);
            } else if (this.num == 1) {
                index++;
                move(bannerImg, "left", -1700 * index, 20, function() {
                    if (index == imgArr.length - 1) {
                        index = 1;
                        bannerImg.style.left = -1700 + "px";
                    }
                }, 10);
            }
            autoChange();
        }

    }


    //定义一个自动切换的定时器标识
    var timer;
    //创建一个函数，用来开启自动切换图片
    function autoChange() {
        //开启一个定时器定时去切换图片
        timer = setInterval(function() {
            //索引自增
            index++;
            //执行动画，切换图片
            move(bannerImg, "left", -1700 * index, 20, function() {
                //判断index的值
                if (index >= imgArr.length - 1) {
                    //则将index的值设置为1
                    index = 1;
                    //此时显示的最后一张图片，而最后一张,而最后一张图片和第一张是一模一样的
                    //通过 css将最后一张切换成第一张
                    bannerImg.style.left = -1700 + "px";
                }
            }, 10);

        }, 5000);
    }





    function move(obj, attr, target, speed, callback, interval) {
        //关闭上一个定时器
        clearInterval(obj.timer);
        //获取元素目前的位置
        var current = parseInt(getStyle(obj, attr));
        //判断速度的正负值
        if (current > target) {
            //此时速度为负值
            speed = -speed;
        }

        // 开启一个定时器，用来执行动画效果
        // 向执行动画的对象中添加一个timer属性 用来保存自己的定时器的标识
        obj.timer = setInterval(function() {
            //获取box1 原来的left值
            var oldValue = parseInt(getStyle(obj, attr));

            //在旧值的基础上添加
            var newValue = oldValue + speed;

            if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
                newValue = target;

            }

            //将新值设置给box1
            obj.style[attr] = newValue + "px";

            // 当元素移动到0px时，将其停止执行动画
            if (newValue == target) {
                //达到目标，关闭定时器
                clearInterval(obj.timer);

                //动画执行完毕，调用回调函数
                callback && callback();
            }
        }, interval);
    }

    function getStyle(obj, name) {
        if (window.getComputedStyle) {
            //正常浏览器的方式，具有getComputedStyle()方法
            return getComputedStyle(obj, null)[name];
        } else {
            //IE8的方式，没有getComputedStyle() 方法
            return obj.currentStyle[name];
        }
    }


    var destination = document.querySelector('.destination');
    focusBlur(destination);
    var date = document.querySelector('.date');
    focusBlur(date);
    // 这个类名不奏效？
    // var subscribe = document.querySelector('.subscribe');
    var subscribe = document.querySelector('.subscrib');
    focusBlur(subscribe);


    // 创建选择地点、时间的input获得焦点的时候的响应
    function focusBlur(obj) {
        var originValue = obj.value;
        obj.addEventListener('focus', function() {
            if (this.value = originValue) {
                this.value = '';
                this.style.color = '#424242';
            }

        });
        // obj.addEventListener('blur', function() {
        //     if (this.value = '') {
        //         this.value = originValue;
        //         this.style.color = '#999999';
        //     }

        // });
        obj.onblur = function() {
            if (this.value == '') {
                this.value = originValue;
                this.style.color = '#999';
            }
        };
    }
    /*
        参数: obj    要获取样式的元素
              name   要获取的样式   
    */




}