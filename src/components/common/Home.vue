<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="hang-on-wall">   <ball></ball></div>
     
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import ball from '../toy/Ball';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            nokeepAlive:[
                'detailTest'
            ]
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags,
        ball
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    }
};
</script>

<style scoped>
.hang-on-wall{
    position: absolute;
    bottom: 100px;
    right: 50px;
    width: 300px;
    height: 300px;
    z-index: 9999;
}
</style>