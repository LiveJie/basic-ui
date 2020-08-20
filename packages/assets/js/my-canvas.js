/* eslint-disable */
/**
     * @description 图片上传插件
     * @author jie
     * @export
     * @param {*}  
     * @returns 
     */
    ;(function () {
        "use strict"
        dynamicLoadCss("http://oss.humorjie.vip/my-canvas.css")
        function dynamicLoadCss(url) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.type='text/css';
            link.rel = 'stylesheet';
            link.href = url;
            head.appendChild(link);
        }
        let _myCanvasThis = null
        function MyCanvas (opt, callBack = null) {
            this._initial(opt)
            this.callBack = callBack
        }
        MyCanvas.prototype = {
            constructor: this,
            _initial: function(opt={}) {
                _myCanvasThis = this
                var defParams = {
                    l: 42, // 滑块边长
                    r: 9, // 滑块半径
                    PI: Math.PI,
                    w: 350, // 背景画布宽度
                    h: 200, // 背景画布高度
                    sw: 38, // 滑块宽度
                    sX: "", // 鼠标按下X轴距离
                    sY: "", // 鼠标按下Y轴距离
                    imgArr: [], // 图片数组
                    refreshLock: false, // 刷新冒泡锁
                }
                let countParams = Object.assign(defParams, opt)
                for(var key in countParams){
                    if(countParams.hasOwnProperty(key)){
                        this[key] = countParams[key];
                    }
                }
                // 获取最外层盒子
                this.canvasCodeDom = document.querySelector("#canvasCodeDom")
                // 创建滑动验证码外层盒子
                this.imgBox = document.createElement("div")
                this.imgBox.className = "canvas-wrapper"
                // 创建底部滑块外层盒子
                this.swiperBox = document.createElement("div")
                // 创建刷新元素
                this.refreshDom = document.createElement("div")
                this.refreshDom.innerHTML = `<svg t="1597890859552" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4698" width="200" height="200"><path d="M19.2 428.8C25.6 428.8 25.6 428.8 19.2 428.8c19.2 0 25.6-6.4 32-19.2C102.4 198.4 294.4 51.2 512 51.2c140.8 0 275.2 64 364.8 172.8l-89.6 44.8L960 384c12.8 12.8 38.4 0 38.4-19.2l12.8-204.8-89.6 44.8C825.6 76.8 672 0 512 0 268.8 0 57.6 166.4 0 396.8 0 416 6.4 428.8 19.2 428.8z" p-id="4699" fill="#ffffff"></path><path d="M1004.8 595.2c-12.8-6.4-25.6 6.4-32 19.2-51.2 211.2-243.2 364.8-460.8 364.8-140.8 0-275.2-64-364.8-172.8l89.6-44.8L64 640c-12.8-12.8-38.4 0-38.4 19.2l-12.8 204.8 89.6-44.8C198.4 947.2 352 1024 512 1024c243.2 0 454.4-166.4 512-396.8C1024 608 1017.6 595.2 1004.8 595.2z" p-id="4700" fill="#ffffff"></path></svg>`
                this.refreshDom.className = "refresh"
                // 滑块盒子背景
                this.swiperBoxDom = null
                // 滑块盒子
                this.swiperDom = null
                // 图片背景滑块
                this.bCanvas = null
                // 图片背景剪切滑块
                this.sCanvas = null

                this.L =  this.l + this.r * 2 + 3, // 滑块实际边长
                this.imgBox.style.width = this.w + "px"
                this.imgBox.style.height = this.h + "px"
                this.canvasCodeDom.appendChild(this.imgBox)
                this.imgBox.appendChild(this.refreshDom)
                this._initSwiperBox()
                this._createDom()
            },
            // 底部滑块盒子初始化
            _initSwiperBox: function() {
                let str = `向右滑动填充拼图
                    <div class="swiper-box">
                        <div class="swiper">
                            <svg t="1597111862342" class="icon " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4600" width="200" height="200"><path d="M338.281412 1002.646588L791.311059 563.501176a71.619765 71.619765 0 0 0 0-103.03247L338.281412 21.353412a76.167529 76.167529 0 0 0-105.411765-0.210824 71.047529 71.047529 0 0 0-0.210823 102.4l400.112941 388.818824L232.568471 900.367059a71.047529 71.047529 0 0 0 0.210823 102.4 76.167529 76.167529 0 0 0 105.411765-0.210824z" p-id="4601" fill="#bfbfbf"></path></svg>
                        </div>
                    </div>
                `
                _myCanvasThis.swiperBox.className = "swiper-wrapper"
                _myCanvasThis.swiperBox.innerHTML = str
                _myCanvasThis.swiperBox.style.width = this.w + "px";
                this.canvasCodeDom.appendChild(_myCanvasThis.swiperBox)
                _myCanvasThis.swiperBoxDom = document.querySelector(".swiper-box")
                _myCanvasThis.swiperDom = document.querySelector(".swiper")
            },
            // 创建滑块
            _createDom: function() {
                _myCanvasThis.bCanvas = this._createCanvasDom(this.w, this.h)
                _myCanvasThis.sCanvas = this._createCanvasDom(this.w, this.h)
                _myCanvasThis.sCanvas.className = "swiper-canvas"
                _myCanvasThis.imgBox.appendChild(_myCanvasThis.bCanvas)
                _myCanvasThis.imgBox.appendChild(_myCanvasThis.sCanvas)
                // 启用2d
                let bCtx = _myCanvasThis.bCanvas.getContext('2d')
                let sCtx = _myCanvasThis.sCanvas.getContext('2d')
                // 随机位置创建拼图形状
                // orgX 拼图滑块距离左侧距离
                // orgY 拼图滑块距离顶部距离
                this.orgX = this._getRandomNumberByRange(this.L + 10, this.w - (this.L + 10))
                this.orgY = this._getRandomNumberByRange(10 + this.r * 2, this.h - (this.L + 10))
                this._drawPath(bCtx, this.orgX, this.orgY, this.l, this.r, this.PI, 'fill')
                this._drawPath(sCtx, this.orgX, this.orgY, this.l, this.r, this.PI, 'clip')
                const imgModule = this._createImg(()=> {
                    bCtx.drawImage(imgModule, 0, 0, this.w, this.h)
                    sCtx.drawImage(imgModule, 0, 0, this.w, this.h)
                    // 提取滑块并放到最左边
                    const y = this.orgY - this.r * 2 - 1
                    const ImageData = sCtx.getImageData(this.orgX - 3, y, this.L, this.L)
                    _myCanvasThis.sCanvas.width = this.L
                    sCtx.putImageData(ImageData, 0, y)
                })
                _myCanvasThis.sCanvas.addEventListener('mousedown', this._imgSwiperStart)
                _myCanvasThis.swiperDom.addEventListener('mousedown', this._imgSwiperStart)
                document.addEventListener('mouseup', this._imgSwiperEnd)
                _myCanvasThis.refreshDom.addEventListener('mousedown', _myCanvasThis._initCanvas)
            },
            // 刷新组件状态
            _initCanvas: function(){
                _myCanvasThis.refreshLock = true
                _myCanvasThis.refreshDom.style.cssText = "transform: rotate(360deg); transition: 1s;"
                setTimeout(()=> {
                    _myCanvasThis.refreshDom.style.cssText = ""
                }, 1000)
                _myCanvasThis.imgBox.removeChild(_myCanvasThis.bCanvas)
                _myCanvasThis.imgBox.removeChild(_myCanvasThis.sCanvas)
                _myCanvasThis._initComponentStatus()
                _myCanvasThis._createDom()
                setTimeout(()=>{
                    _myCanvasThis.refreshLock = false
                }, 1000)
                return
            },
            // 初始化组件状态
            _initComponentStatus: function(status) {
                _myCanvasThis.swiperDom.style.transition = '1s all';
                _myCanvasThis.swiperBoxDom.style.transition = '1s all';
                _myCanvasThis.swiperDom.style.left = 0 + 'px'
                _myCanvasThis.swiperBoxDom.style.width = _myCanvasThis.sw + 'px'
                if(status) {
                    _myCanvasThis.sCanvas.style.transition = '1s all';
                    _myCanvasThis.sCanvas.style.left = 0 + 'px'
                }
                setTimeout(()=> {
                    if(status) {
                        _myCanvasThis.sCanvas.style.transition = '';
                    }
                    _myCanvasThis.swiperDom.style.transition = '';
                    _myCanvasThis.swiperBoxDom.style.transition = '';
                    _myCanvasThis.swiperDom.innerHTML = `<svg t="1597111862342" class="icon " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4600" width="200" height="200"><path d="M338.281412 1002.646588L791.311059 563.501176a71.619765 71.619765 0 0 0 0-103.03247L338.281412 21.353412a76.167529 76.167529 0 0 0-105.411765-0.210824 71.047529 71.047529 0 0 0-0.210823 102.4l400.112941 388.818824L232.568471 900.367059a71.047529 71.047529 0 0 0 0.210823 102.4 76.167529 76.167529 0 0 0 105.411765-0.210824z" p-id="4601" fill="#bfbfbf"></path></svg>`
                    _myCanvasThis.swiperBoxDom.className = "swiper-box"
                }, 1000)
            },
            _imgSwiperStart: function (e) {
                if(_myCanvasThis.refreshLock) {
                    return
                }
                _myCanvasThis.sX = e.clientX
                _myCanvasThis.sY = e.clientY
                document.addEventListener('mousemove', _myCanvasThis._domMove)
            },
            // 判断范围
            _checkedRange: function(e) {
                let status = true
                // 点击距离浏览器左边以及上边距离
                let winL = e.clientX
                let winT = e.clientY

                // 盒子距离浏览器左边以及上边距离
                let domL = this.canvasCodeDom.offsetLeft
                let domT = this.canvasCodeDom.offsetTop

                // 盒子自身的宽高
                let domW = this.canvasCodeDom.offsetWidth
                let domH = this.canvasCodeDom.offsetHeight
                
                // 最大边界距离
                let domMaxW = domW + domL
                let domMaxH = domH + domT

                // 判断数值是否越界
                if((winL < domL) || (winL > domMaxW)) {
                    status = false
                }
                if((winT < domT) || (winT > domMaxH)) {
                    status = false
                }
                return status
            },
            _imgSwiperEnd: function (e) {
                // 判断是否数值越界
                if(!_myCanvasThis._checkedRange(e)) {
                    return
                }

                if(e.target.tagName === "HTML") {
                    return
                }
                if(_myCanvasThis.refreshLock) {
                    return
                }
                _myCanvasThis.sX = e.clientX
                _myCanvasThis.sY = e.clientY
                document.removeEventListener('mousemove', _myCanvasThis._domMove)
                if(Math.abs(_myCanvasThis.sCanvas.style.left.split("px")[0] - (_myCanvasThis.orgX - 2)) <= 8 ) {
                    _myCanvasThis.callBack && _myCanvasThis.callBack(true)
                    _myCanvasThis.swiperBoxDom.className = "swiper-box success"
                    _myCanvasThis.swiperDom.innerHTML = `<svg t="1597889072422" class="icon" viewBox="0 0 1397 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1994" width="200" height="200"><path d="M1396.363636 121.018182c0 0-223.418182 74.472727-484.072727 372.363636-242.036364 269.963636-297.890909 381.672727-390.981818 530.618182C512 1014.690909 372.363636 744.727273 0 549.236364l195.490909-186.181818c0 0 176.872727 121.018182 297.890909 344.436364 0 0 307.2-474.763636 902.981818-707.490909L1396.363636 121.018182 1396.363636 121.018182zM1396.363636 121.018182" p-id="1995" fill="#ffffff"></path></svg>`
                }else {
                    _myCanvasThis.callBack && _myCanvasThis.callBack(false)
                    _myCanvasThis.swiperBoxDom.className = "swiper-box error"
                    _myCanvasThis.swiperDom.innerHTML = `<svg t="1597889154055" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3719" width="200" height="200"><path d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z" p-id="3720" fill="#ffffff"></path></svg>`
                    setTimeout(()=> {
                        _myCanvasThis._initComponentStatus(true)
                    },300)
                }
            },
            _domMove: function (e) {
                const moveX = e.clientX - _myCanvasThis.sX
                if(moveX < 0 || moveX + _myCanvasThis.L >= _myCanvasThis.w ) return false
                let sL = ((_myCanvasThis.w - _myCanvasThis.sw) / (_myCanvasThis.w - _myCanvasThis.L)) * moveX
                _myCanvasThis.sCanvas.style.left = moveX + 'px'
                _myCanvasThis.swiperDom.style.left = sL + 'px'
                _myCanvasThis.swiperBoxDom.style.width = sL + _myCanvasThis.sw + 'px'
            },
            _createImg: function (onload) {
                let imgModule = new Image()
                imgModule.crossOrigin ='anonymous';
                let imgArr = [
                    "https://user-gold-cdn.xitu.io/2020/7/30/1739d4c9dadbaf23?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1", 
                    "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3131646502,2497317700&fm=26&gp=0.jpg", 
                    "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1020991060,2624181941&fm=26&gp=0.jpg", 
                    "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1246978004,1907045826&fm=26&gp=0.jpg", 
                    "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1723207229,4280043443&fm=26&gp=0.jpg"
                ]
                if(_myCanvasThis.imgArr.length) {
                    imgArr = _myCanvasThis.imgArr
                }
                imgModule.src = imgArr[Math.round(Math.random() * (imgArr.length - 1))]
                imgModule.onload = onload
                return imgModule
            },
            // 创建DOm
            _createCanvasDom: function (w, h) {
                let canvasDom = document.createElement('canvas');
                canvasDom.width = w;
                canvasDom.height = h;
                return canvasDom
            },
            // 创建DOm
            _drawPath: function (ctx, x, y, l, r, PI, operation) {
                ctx.beginPath()
                ctx.moveTo(x, y)
                ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
                ctx.lineTo(x + l, y)
                ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
                ctx.lineTo(x + l, y + l)
                ctx.lineTo(x, y + l)
                ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
                ctx.lineTo(x, y)
                ctx.lineWidth = 2
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
                ctx.stroke()
                ctx.globalCompositeOperation = 'destination-over'
                operation === 'fill'? ctx.fill() : ctx.clip()
            },
            _getRandomNumberByRange: function(start, end){
                return Math.round(Math.random() * (end - start) + start)
            }
        }
        // CommonJS/Node.js
        if (typeof require === "function" && typeof exports === "object" && typeof module === "object")
        {
            module.exports = MyCanvas;
        }
        else if (typeof define === "function")  // AMD/CMD/Sea.js
        {
            if (define.amd) {
                define(["exports"], MyCanvas);
            } else {
                define(function() {
                   return MyCanvas;
                });
            }
        }
        else
        {
            !(window.MyCanvas) && (window.MyCanvas = MyCanvas);
        }
    })();
