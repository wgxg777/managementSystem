<template>
    <div v-if="!item.notshow">
        <template v-if=" !this.item.hasOwnProperty('children')">
            <el-menu-item :index="item.index">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </template>

        <el-submenu v-else :index="item.index">
            <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </template>

            <template v-for="child in item.children">
                <template v-if="!child.notshow">
                    <sidebar-item
                        v-if="child.children&&child.children.length>0 &&!item.notshow"
                        :item="child"
                        :key="child.index"
                    />
                    <el-menu-item v-else :key="child.index" :index="child.index">
                        <i :class="child.icon"></i>
                        <span slot="title">{{ child.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-submenu>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    created() {
        console.log(this.item);
    }
};
</script>
<style lang="scss" scoped>
.el-menu--collapse .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}

.el-menu--collapse .el-submenu__icon-arrow {
    display: none;
}
/deep/ .is-active > .el-submenu__title {
    color: rgb(32, 160, 255) !important;
}
/deep/ .is-active > .el-submenu__title .el-icon-lx-calendar {
    color: rgb(32, 160, 255) !important;
}
</style>