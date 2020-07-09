<template>
  <el-dialog :visible.sync="visibleDialog" v-bind="$attrs" v-on="$listeners">
    <!--内容区域的默认插槽-->
    <slot></slot>
    <!--使用弹框的footer插槽添加按钮-->
    <template #footer>
      <!--对外继续暴露footer插槽，有个别弹框按钮需要自定义-->
      <slot name="footer">
        <!--将取消与确定按钮集成到内部-->
        <span>
          <el-button @click="$_handleCancel">取 消</el-button>
          <el-button type="primary" @click="$_handleConfirm">
            确 定
          </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    // 对外暴露visible属性，用于显示隐藏弹框
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 通过计算属性，对.sync进行转换，外部也可以直接使用visible.sync
    visibleDialog: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible",val);
      }
    }
  },
  methods: {
    // 对外抛出cancel事件
    $_handleCancel() {
      console.log(this.$attrs)
     this.visibleDialog  = false
    },
    // 对外抛出 confirm事件
    $_handleConfirm() {
     this.visibleDialog  = false
    }
  }
};
</script>
