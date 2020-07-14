<!-- 上传图片组件 -->
<template>
  <div class="update-image-module" @click.stop>
      <div class="image-wrapper">
          <div class="image-list" v-if="fileList.length">
              <div class="img-box" v-for="(item, index) of fileList" :key="index">
                  <img :src="item.base64" alt="item.name" title="item.name">
                  <div class="operation">
                      <span class="iconfont" title="删除图片" @click="delPic(index)">&#xe612;</span>
                  </div>
              </div>
          </div>
          <div class="add-wrapper" v-if="maxLength > fileList.length">
              <div class="icon"><svg t="1594001000354" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2949" width="128" height="128"><path d="M426.666667 426.666667H85.546667A85.418667 85.418667 0 0 0 0 512c0 47.445333 38.314667 85.333333 85.546667 85.333333H426.666667v341.12c0 47.274667 38.186667 85.546667 85.333333 85.546667 47.445333 0 85.333333-38.314667 85.333333-85.546667V597.333333h341.12A85.418667 85.418667 0 0 0 1024 512c0-47.445333-38.314667-85.333333-85.546667-85.333333H597.333333V85.546667A85.418667 85.418667 0 0 0 512 0c-47.445333 0-85.333333 38.314667-85.333333 85.546667V426.666667z" p-id="2950" fill="#dbdbdb"></path></svg></div>
              <input type="file" class="file" @change="updateFile" multiple="false">
          </div>
      </div>
  </div>
</template>
<script>
/**
 * @description 图片上传相关
 * @author jie
 * @date 2020/7/16
 * @version v1.0
 * @param { fileTypes }  String 文件类型 文件用逗号隔开 }
 * @param { toast }  Function 需要用到的提示方法 默认alert }
 * @param { fileZize }  Number 文件大小 单位MB 默认5MB }
 * @param { maxLength }  Number 文件数量 默认5个 }
 * @todo
 * @returns VOID
 * @example <UpdateImageModule :toast="errorToast" />
 */
export default {
    model: {
        prop: 'value',
        event: 'changeValue'
    },
    props: {
        fileTypes: {
            type: String,
            default: 'jpeg, png, gif'
        },
        toast: {
            type: Function,
            default: (tips) => { alert(tips) }
        },
        fileZize: {
            type: Number,
            default: 5
        },
        maxLength: {
            type: Number,
            default: 5
        }
    },
    data () {
        return {
            fileList: [] // 保存的文件列表
        }
    },
    mounted () {
    },
    methods: {
        // 删除图片
        delPic(index) {
            this.fileList.splice(index, 1)
        },
        // 上传文件
        updateFile(e) {
            let file = e.target.files[0];
            // let fileName = file.name;
            let fileSize = file.size;
            let fileType = file.type;
            if ((fileSize / 1024000) > this.fileZize) {
                this.toast("老铁，文件太大了！")
                return
            }
            if (!this.judgeFileType(fileType)) {
                this.toast("老铁，上传文件格式错误！")
                return
            }
            this.blobToDataURL(file, (url) => {
                file.base64 = url
                this.fileList.push(file)
                // 回收文件
                file = null
            })
        },
        // 判断文件类型
        judgeFileType(type) {
            return (this.fileTypes.indexOf(type.replace(/.*\//, "")) !== -1)
        },
        // 文件流转base64
        blobToDataURL(blob, cb) {
            let reader = new FileReader();
            reader.onload = function (evt) {
                let base64 = evt.target.result
                cb(base64)
            };
            reader.readAsDataURL(blob);
        }
    }
}
</script>
<style lang="scss">
.update-image-module {
    background: #fff;
    padding: 20px;
    .image-wrapper {
        display: flex;
        flex-wrap: wrap;
        .image-list {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 16px;
            .img-box {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    margin-right: 10px;
                    flex-flow: wrap;
                    &:hover {
                        .operation {
                            display: flex;
                        }
                    }
                    .operation {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        top: 0;
                        left: 0;
                        background: rgba(0,0,0, .5);
                        display: none;
                        cursor: pointer;
                        span {
                            color: #ddd;
                            font-size: 20px;
                        }
                        span:hover {
                            color: red;
                        }
                    }
                img {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
        .add-wrapper {
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
            &:hover {
            svg {
                filter: drop-shadow(#00a1d6 80px 0);
                transform: translateX(-80px);
            }
                &::after {
                    border: 1px dashed #00a1d6;
                }
            }
            &::after {
                content: "";
                position: absolute;
                width: 50px;
                height: 50px;
                display: flex;
                border: 1px dashed #ddd;
                transform: scale(1.6);
            }
            .icon {
                    width: 36px;
                    height: 36px;
                    overflow: hidden;
                svg {
                    width: 36px;
                    height: 36px;
                }
            }
            .file {
                width: 80px;
                height: 80px;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                opacity: 0;
                cursor: pointer;
            }
        }
    }
}
</style>
