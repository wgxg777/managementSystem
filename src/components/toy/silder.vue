<template>
  <!-- 滑动条组件 -->
  <div class="sliderbar">
    <div style="position: relative;border-radius:10px">
      <input
        id="input1"
        type="range"
        @input="barChange"
        min="1"
        max="100"
        defaultValue="0"
        v-model="barValue"
      />
      <div :id="id" class="div1"></div>
      <!-- 此元素用于解决滑动条滑动后点击彩色位置没有反应的问题 -->
      <input type="range" class="input2" v-model="barValue" min="1" max="100" @input="input2Change" />
    </div>
    <input class="textinput" type="text" v-model="textValue" @input="textchange" />
  </div>
</template>

<script >
export default {
  // 此id值是为了实现组件在同页面复用
  props: {
    id: {
      type: [String, Number],
      default: "id1"
    },
    // 父组件传过来初始值
    value: {
      type: [Number],
      default: 0
    }
  },

  name: "",
  data() {
    return {
      textValue: 0,
      barValue: 0,
      barInput: null,
      max: null
    };
  },

  mounted() {
    this.initSliderBar();
  },
  components: {},
  methods: {
    // 初始化滑动条进度
    initSliderBar() {
      this.barValue = this.value;
      this.textValue = this.value;
      this.barInput = document.querySelector("#input1");
      console.log(this.barInput.Element);
      this.max = this.barInput.max;
      this.setTrack(this.value, this.max);
    },
    // 解决点击彩色位置滑动条没反应
    input2Change(e) {
      //   console.log(e);
      let value = e.target.value,
        // input的最大值
        max = e.target.max;
      this.textValue = value;
      this.setTrack(value, max);
    },
    // 滑动条事件
    barChange(e) {
      //   console.log(e);
      let value = e.target.value,
        // input的最大值
        max = e.target.max;
      this.textValue = value;
      this.setTrack(value, max);
    },
    // 输入框input事件
    textchange(e) {
      let value = e.target.value;

      if (value) {
        this.barValue = value;
        this.setTrack(value, this.max);
      }
    },
    // 设置滑块划过部分颜色
    setTrack(value, max) {
      let div1 = document.querySelector(`#${this.id}`);
      // input的实际宽度
      let width = this.barInput.offsetWidth;
      let number = max / width;
      // 填充色需要减去的像素可以进行微调,有时候会有几个像素的偏差
      let number2 = (value / width) * ((width / max) * 10) - 1;
      // 根据value的值动态改变div的宽度,达到滑动滑块填充颜色的效果
      div1.style.width = value / number - number2 + "px";
      // console.log("div-width", div1.style.width);
      // console.log("value", value);
    }
  }
};
</script>

<style scoped>
.sliderbar {
  position: relative;
  width: 200px;
}
/* 滑动条样式 */
input[type="range"] {
  -webkit-appearance: none;
  width: 150px;
  border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}
/* 设置轨道样式 */
input[type="range"]::-webkit-slider-runnable-track {
  height: 3px;
  border-radius: 5px; /*将轨道设为圆角的*/
  /* box-shadow: 0 1px 1px #def3f8, inset 0 0.125em 0.125em #0d1112; 轨道内置阴影效果 */
}
input[type="range"]:focus {
  outline: none;
}
/* 设置滑块样式 */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 8px;
  width: 8px;
  margin-top: -2.5px; /*使滑块超出轨道部分的偏移量相等*/
  background: #ffffff;
  border-radius: 50%; /*外观设置为圆形*/
  border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
  box-shadow: 0 0.125em 0.125em #3b4547; /*添加底部阴影*/
}
.div1 {
  height: 4px;
  border-radius: 30px;
  background: rgb(96, 133, 253);
  position: absolute;
  top: 0;
  left: 0;
}
#input1 {
  position: absolute;
  margin: 0;
  left: 0;
  top: 0;
}
.input2 {
  position: absolute;
  left: -2px;
  top: -2px;
  opacity: 0;
}

.textinput {
  width: 30px;
  height: 15px;
  background: rgb(55, 95, 148);
  color: #fff;
  position: absolute;
  top: -5px;
  right: 0;
  border: none;
}
</style>
