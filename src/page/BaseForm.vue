<template>
    <div>
        
        <div class="waterfalls">
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
export default {
    data() {
        return {
            newWaterfallData: '',
            waterfallDataNumber: '',
            waterfallData: [
           
            ]
        };
    },
    created() {
        belle().then((res) => {
         
            this.waterfallData = res.items
        });
    }
};
</script>
<style lang="scss">
@import './pull.scss';
</style>