<template>
    <div v-if="item.children">
        <template v-if="item.children.length == 0">
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
                <sidebar-item
                    v-if="child.children&&child.children.length>0"
                    :item="child"
                    :key="child.index"
                />
                <el-menu-item v-else :key="child.index" :index="child.index">
                    <i :class="child.icon"></i>
                    <span slot="title">{{ child.title }}</span>
                </el-menu-item>
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
</style>