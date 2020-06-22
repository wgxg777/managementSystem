<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            @select="onselect"
        >
            <sidebar-item v-for="menu in items" :key="menu.index" :item="menu" />
            <!-- <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>-->
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import sidebarItem from './sidebarItem';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页',
                    children: []
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'table',
                    title: '基础表格',
                    children: []
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'tabs',
                    title: 'tab选项卡',
                    children: []
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '表单相关',
                    children: [
                        {
                            index: 'form',
                            title: '基本表单',
                            children: []
                        },
                        {
                            index: '3-2',
                            title: '三级菜单',
                            children: [
                                {
                                    index: 'editor',
                                    title: '富文本编辑器',
                                    children: []
                                },
                                {
                                    index: 'markdown',
                                    title: 'markdown编辑器',
                                    children: []
                                }
                            ]
                        },
                        {
                            index: 'upload',
                            title: '文件上传',
                            children: []
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'icon',
                    title: '自定义图标',
                    children: []
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'charts',
                    title: 'schart图表',
                    children: []
                },
                {
                    icon: 'el-icon-rank',
                    index: '6',
                    title: '拖拽组件',
                    children: [
                        {
                            index: 'drag',
                            title: '拖拽列表',
                            children: []
                        },
                        {
                            index: 'dialog',
                            title: '拖拽弹框',
                            children: []
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-global',
                    index: 'i18n',
                    title: '国际化功能',
                    children: []
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '错误处理',
                    children: [
                        {
                            index: 'permission',
                            title: '权限测试',
                            children: []
                        },
                        {
                            index: '404',
                            title: '404页面',
                            children: []
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-redpacket_fill',
                    index: 'donate',
                    title: '支持作者',
                    children: []
                }
            ]
        };
    },
    methods: {
        onselect(index, indexPath) {
            console.log(`/${index}`)
            if (this.$route.fullPath !== `/${index}`) {
                this.$router.push({ path: `/${index}` });
            }
        }
    },
    components: {
        sidebarItem
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style lang="scss" scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
.el-menu--collapse .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}

/deep/ .el-menu--collapse .el-submenu__icon-arrow {
    display: none;
}
</style>
