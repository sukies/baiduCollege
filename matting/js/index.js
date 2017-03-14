/**
 * Created by Administrator on 2017/3/10.
 */
(function () {
    var canvas,
        fileBtnId = 'inputFile',
        rangeId = 'range',
        rgbId = 'rgb',
        tolerance=20;//容差值
    /**
     * @param src 图片路径
     * **/
    var Canvas = function (src) {
        this.id = 'canvas';
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext('2d');
        this.src = src;
        this.imgWidth = this.image.naturalWidth;
        this.imgHeight = this.image.naturalHeight;
        this.scale = 1;
        this.canvasWidth = this.image.naturalWidth * this.scale;
        this.canvasHeight = this.image.naturalHeight * this.scale;
    };

    Canvas.prototype.drew = function (scale) {
        //绘制canvas
        var that = this;
        this.scale = scale || 1;
        this.canvas.setAttribute('width', this.canvasWidth);
        this.canvas.setAttribute('height', this.canvasHeight);
        var image = document.createElement('img');
        image.src = this.src;
        this.ctx.drawImage(image, 0, 0, this.imgWidth, this.imgHeight, 0, 0, this.canvasWidth, this.canvasHeight);
        // 点击事件
        this.canvas.addEventListener('click', function (e) {
            var event = e || window.event;
            var mouse = getMousePos(event);
            var rgb = that.ctx.getImageData(mouse.x, mouse.y, 1, 1);
            document.getElementById(rgbId).innerText = 'R:' + rgb.data[0] + '; G:' + rgb.data[1] + '; B:' + rgb.data[2];
            // this.judge(event);

            /**
             *获取数据&&判断
             * */
            var canvasData = that.ctx.getImageData(0, 0, that.canvasWidth, that.canvasHeight);
            //创建白色的点
            var white = that.ctx.createImageData(1, 1);
            white.data[0] = 255;
            white.data[1] = 255;
            white.data[2] = 255;
            white.data[3] = 255;
            //左边
            for (var i = 0, leg = mouse.x; i < leg; i++) {
                var left = newData(-i, 0);
                if (left == false) {
                    break;
                } else {
                    for (var j = 1; j < mouse.y; j++) {
                        var leftTop = newData(-i, -j);
                        if (leftTop == false) {
                            break;
                        }
                    }
                    for (j = 1; j < that.canvasHeight; j++) {
                        var leftBottom = newData(-i, j);
                        if (leftBottom == false) {
                            break;
                        }
                    }
                }
            }
            //右边
            for (var a = 0, leg = that.canvasWidth; a < leg; a++) {
                var right = newData(a, 0);
                if (right == false) {
                    break;
                } else {
                    for (var b = 1; b < mouse.y; b++) {
                        var rightTop = newData(a, -b);
                        if (rightTop == false) {
                            break;
                        }
                    }
                    for (var b2 = 1; b2 < that.canvasHeight; b2++) {
                        var rightBottom = newData(a, b2);
                        if (rightBottom == false) {
                            break;
                        }
                    }
                }
            }
            /**
             * @param x 为横坐标; y 为纵坐标; 原点为点击的点
             * @return false/true 是否在容差值内
             * */
            function newData(x, y) {
                x = x || 0;
                y = y || 0;
                var news = [
                    canvasData.data[((mouse.y + y) * that.canvasWidth + mouse.x + x) * 4],
                    canvasData.data[((mouse.y + y) * that.canvasWidth + mouse.x + x ) * 4 + 1],
                    canvasData.data[((mouse.y + y) * that.canvasWidth + mouse.x + x) * 4 + 2],
                    canvasData.data[((mouse.y + y) * that.canvasWidth + mouse.x + x) * 4 + 3]
                ];
                //色差
                var u1 = (rgb.data[0] + rgb.data[1] + rgb.data[2]) / 3,
                    u2 = (news[0] + news[1] + news[2]) / 3;
                var p1 = [(rgb.data[0] - u1), (rgb.data[1] - u1), (rgb.data[2] - u1), u1],
                    p2 = [(news[0] - u2), (news[1] - u2), (news[2] - u2), u2];
                var d= Math.acos((p1[0] * p2[0] + p1[1] * p2[1] + p1[2] * p2[2] + p1[3] * p2[3])/(Math.sqrt(Math.pow(p1[0], 2) + Math.pow(p1[1], 2) + Math.pow(p1[2], 2) + Math.pow(p1[3], 2)) * Math.sqrt(Math.pow(p2[0], 2) + Math.pow(p2[1], 2) + Math.pow(p2[2], 2) + Math.pow(p2[3], 2)))) * 255 / (Math.PI / 2);
                if (d > tolerance) {
                    return false;
                } else {
                    that.ctx.putImageData(white, mouse.x + x, mouse.y + y);
                    return true;
                }
            }
        });
    };
    /**
     *  获取鼠标点击点的坐标
     *  @param evt 鼠标点击时的点
     *  @return 点击坐标x,y
     * **/

    function getMousePos(evt) {
        var rect = canvas.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    //上传图片
    var btn = document.getElementById(fileBtnId);
    btn.addEventListener('change', function () {
        var file = this.files[0];
        if (window.FileReader) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            //监听文件读取结束后事件
            reader.onloadend = function () {
                Canvas.prototype.image = document.createElement('img');
                Canvas.prototype.image.src = reader.result;
                //绘制canvas画布
                canvas = new Canvas(reader.result);
                canvas.drew();
            };
        }
    });

    //改变图像大小
    var range = document.getElementById(rangeId);
    range.addEventListener('change', function () {
        canvas.drew(range.value);
        document.getElementById('scale').innerText = (range.value * 100).toFixed(0) + '%';
    })
})();


