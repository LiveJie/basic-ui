<template>
    <div class="page-wrapper">
        <div class="page-comment">
            <div :class="(currentPage === 1) ? 'pre-wrapper off': 'pre-wrapper'" @click="prePage" title="上一页">&lt;</div>
            <div class="page-list">
                <div
                    :class="item === currentPage ? 'list on': 'list'"
                    v-for="(item, index) of showPage"
                    :key="index"
                    @click="changeCurrentPage(item)"
                >{{item}}</div>
            </div>
            <div :class="currentPage === totalPage ? 'next-wrapper off': 'next-wrapper'"  @click="nextPage"  title="下一页">&gt;</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BasicPage',
    props: {
        change: {
            type: Function,
            default: () => {}
        },
        page: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 10
        },
        // 展示的页数  必须为奇数 呈两边对称
        showPageSize: {
            type: Number,
            validator: function (value) {
                if (value % 2 === 0) {
                    throw Error("value cannot be even!")
                }
                if (value <= 1) {
                    throw Error("value must >= 1 !")
                }
                return true
            },
            default: 5
        }
    },
    components: {
    },
    data() {
        return {
            showPage: [], // 展示的页数
            currentPage: 1, // 当前页数
            totalPage: 10 // 总页数
        }
    },
    mounted() {
        this.currentPage = this.page
        this.totalPage = this.total
        this.judgePage();
    },
    methods: {
        // 判断页数类型
        judgePage() {
            let centerN = Math.floor(this.showPageSize / 2)
            if (this.currentPage <= centerN) {
                this.setStartPage()
            } else if (this.currentPage >= (this.totalPage - centerN)) {
                this.setEndPage()
            } else {
                this.setPage()
            }
        },
        // 设置page为1的暂时页数
        setStartPage() {
            let arr = []
            for (let i = 1; i <= this.showPageSize; i++) {
                arr.push(i)
            }
            this.showPage = arr;
        },
        // 设置page为total的暂时页数
        setEndPage() {
            let arr = []
            for (let i = this.totalPage; i > this.totalPage - this.showPageSize; i--) {
                arr.push(i)
            }
            this.showPage = arr.reverse();
        },
        // 设置页数
        setPage() {
            let diffN = ~~(this.showPageSize / 2);
            let sn = this.currentPage - diffN
            let en = this.currentPage + diffN
            let arr = [];
            for (let i = sn; i <= en; i++) {
                arr.push(i);
            }
            this.showPage = arr;
        },
        // 上一页
        prePage() {
            let page = this.currentPage
            if (page > 1) {
                this.changeCurrentPage(--page)
            }
        },
        // 下一页
        nextPage() {
            let page = this.currentPage
            if (page < this.totalPage) {
                this.changeCurrentPage(++page)
            }
        },
        // 改变当前页
        changeCurrentPage(item) {
            if (item === this.currentPage) { return }
            this.currentPage = item
            this.judgePage()
            this.$emit('change', this.currentPage);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page-wrapper {
    width: 100%;
    height: 100px;
    background: #fff;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    .page-comment {
        display: flex;
        justify-content: center;
        .page-list {
            display: flex;
            .list {
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
                background: #fff;
                color: #666;
                border: 1px solid #ddd;
                border-radius: 2px;
                margin: 0 6px;
                user-select: none;
                &.on {
                    color: #fff;
                    background: #ef5924;
                    border: 1px solid  #ef5924;
                }
                &:hover {
                    color: #fff;
                    background: #ef5924;
                    border: 1px solid  #ef5924;
                }
            }
        }
        .pre-wrapper {
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            background: #fff;
            border: 1px solid #ddd;
            font-family: cursive;
            user-select: none;
            border-radius: 2px;
            &.off {
                cursor: no-drop;
            }
        }
        .next-wrapper {
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            background: #fff;
            border: 1px solid #ddd;
            user-select: none;
            font-family: cursive;
            border-radius: 2px;
            &.off {
                cursor: no-drop;
            }
        }
    }
}
</style>
