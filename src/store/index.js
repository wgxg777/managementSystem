/*引用vue和vuex*/
import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex)

/*设置state参数*/
const state = {
    childText2: '',
    childText: "",
    txtArr: [],
    sidebar: [
        {
            icon: 'el-icon-lx-home',
            index: 'dashboard',
            title: '系统首页',

        },
        {
            icon: 'el-icon-lx-cascades',
            index: 'table',
            title: '基础表格',

        },
        {
            icon: 'el-icon-lx-copy',
            index: 'tabs',
            title: 'tab选项卡',

        },
        {
            icon: 'el-icon-lx-calendar',
            index: '3',
            title: '表单相关',
            
            children: [
                {
                    index: 'form',
                    title: '基本表单',
                    // notshow: true
                },
                {
                    index: '3-2',
                    title: '三级菜单',
                    children: [
                        {
                            index: 'editor',
                            title: '富文本编辑器',
                            notshow: true
                        },
                        {
                            index: 'markdown',
                            title: 'markdown编辑器',

                        }
                    ]
                },
                {
                    index: 'upload',
                    title: '文件上传',

                }
            ]
        },
        {
            icon: 'el-icon-lx-emoji',
            index: 'icon',
            title: '自定义图标',

        },
        {
            icon: 'el-icon-pie-chart',
            index: 'charts',
            title: 'schart图表',

        },
        {
            icon: 'el-icon-rank',
            index: '6',
            title: '拖拽组件',
            children: [
                {
                    index: 'drag',
                    title: '拖拽列表',

                },
                {
                    index: 'dialog',
                    title: '拖拽弹框',

                }
            ]
        },
        {
            icon: 'el-icon-lx-global',
            index: 'i18n',
            title: '国际化功能',

        },
        {
            icon: 'el-icon-lx-warn',
            index: '7',
            title: '错误处理',
            children: [
                {
                    index: 'permission',
                    title: '权限测试',

                },
                {
                    index: '404',
                    title: '404页面',

                }
            ]
        },
        {
            icon: 'el-icon-lx-redpacket_fill',
            index: 'donate',
            title: '支持作者',
            

        }
    ]
}

const mutations = {
    changeChildText(state, str) {
        state.childText = str;
        state.txtArr.push(str)
    }

}
const actions = {
    increment(context) {
        context.commit('increment')
    }
}
const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
})

export default store;    