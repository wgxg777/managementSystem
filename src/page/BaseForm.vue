<template>
    <div ref="imageWrapper">
        <el-button @click="screenShot">截图</el-button>
        <div class="waterfalls" ref="imageWrapper">
            <div class="box" v-for="it in waterfallData">
                <div class="pic">
                    <img :src="it.image_url" class="w" />
                    <!-- <div class="ttt">tttttttt</div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { belle } from '@/api/index';
import html2canvas from 'html2canvas';
export default {
    data() {
        return {
            newWaterfallData: '',
            waterfallDataNumber: '',
            waterfallData: [],
            img: ''
        };
    },
    methods: {
        screenShot() {
            html2canvas(this.$refs.imageWrapper,{useCORS: true}).then((canvas) => {
               
                const link = document.createElement('a');
                link.href = canvas.toDataURL();
                link.setAttribute('download', '好看的' + '.png');
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
            });
        }
    },
    created() {
        belle().then((res) => {
            this.waterfallData = res.items;
        });
    }
};
</script>
<style lang="scss">
@import './pull.scss';
</style>