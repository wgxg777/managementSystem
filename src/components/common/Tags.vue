<template>
    <div class="tags" v-if="showTags">
          <el-tabs
                v-model="activePath"
                type="card"
                @tab-click="tabClick"
                v-if="tagsList.length"
                @tab-remove="tabRemove">
          <el-tab-pane
                  v-for="(item,index) in tagsList"
                  :key="item.path"
                  :label="item.title"
                  :closable="item.title !== '系统首页' "
                  :name="item.path">
          </el-tab-pane>
          </el-tabs>
        <!-- <ul>
            <li
                class="tags-li"
                v-for="(item,index) in tagsList"
                :class="{'active': isActive(item.path)}"
                :key="index"
            >
                <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
                <span
                    class="tags-li-icon"
                    v-if="item.path != '/dashboard'"
                    @click="closeTags(index)"
                >
                    <i class="el-icon-close"></i>
                </span>
            </li>
        </ul> -->
        <!-- <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>-->
    </div>
</template>

<script>
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            activePath:'/table'
        };
    },
    methods: {
        isActive(path) {
            return path === this.$route.fullPath;
        },
        tabClick(e){
            console.log()
            if(this.$route.path !== e.name){
               this.$router.push(e.name)
            }
           
        },
        tabRemove(e){
           let index = this.tagsList.findIndex(i =>{
                return i.path == e
            })
            this.closeTags(index)
        },
        // 关闭单个标签
        closeTags(index) {
            const delItem = this.tagsList.splice(index, 1)[0];
            const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
            if (item) {
                delItem.path === this.$route.fullPath && this.$router.push(item.path);
            } else {
                this.$router.push('/');
            }
        },
        // 关闭全部标签
        closeAll() {
            this.tagsList = [];
            this.$router.push('/');
        },
        // 关闭其他标签
        closeOther() {
            const curItem = this.tagsList.filter(item => {
                return item.path === this.$route.fullPath;
            });
            this.tagsList = curItem;
        },
        // 设置标签
        setTags(route) {
            this.activePath = route.fullPath
            const isExist = this.tagsList.some(item => {
                return item.path === route.fullPath;
            });
            if (!isExist) {
                // if (this.tagsList.length >= 8) {
                //     this.tagsList.splice(1,1);
                // }

                this.tagsList.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.matched[1].components.default.name
                });
            }

            if (
                !this.tagsList.some(item => {
                    return item.path === '/dashboard';
                })
            ) {
                this.tagsList.unshift({
                    title: '系统首页',
                    path: '/dashboard',
                    name: 'dashboard'
                });
            }

            bus.$emit('tags', this.tagsList);
        },
        handleTags(command) {
            command === 'other' ? this.closeOther() : this.closeAll();
        }
    },
    computed: {
        showTags() {
            return this.tagsList.length > 0;
        }
    },
    watch: {
        $route(newValue, oldValue) {
            this.setTags(newValue);
        }
    },
    created() {
        this.setTags(this.$route);
        // 监听关闭当前页面的标签页
        bus.$on('close_current_tags', () => {
            for (let i = 0, len = this.tagsList.length; i < len; i++) {
                const item = this.tagsList[i];
                if (item.path === this.$route.fullPath) {
                    if (i < len - 1) {
                        this.$router.push(this.tagsList[i + 1].path);
                    } else if (i > 0) {
                        this.$router.push(this.tagsList[i - 1].path);
                    } else {
                        this.$router.push('/');
                    }
                    this.tagsList.splice(i, 1);
                    break;
                }
            }
        });
    }
};
</script>


<style>
.tags {
    position: relative;
    height: 40px;

    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
}

.tags ul {
    box-sizing: border-box;
    overflow-y: hidden;
    width: 100%;
    height: 100%;
}

.tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
    background: #f8f8f8;
}

.tags-li.active {
    color: #fff;
}

.tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tags-li.active .tags-li-title {
    color: #fff;
}

.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
}
</style>
