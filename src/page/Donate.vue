<template>
    <div class="box">
        <div id="container" style="width:100vw; height:calc(100vh - 120px);"></div>
    </div>
</template>

<script>
import AMap from 'AMap'; // 引入高德地图
export default {
    data() {
        return {
            marker: [
                [116.478935, 39.997761],
                [116.478939, 39.997825],
                [116.478912, 39.998549],
                [116.478912, 39.998549],
                [116.478998, 39.998555],
                [116.478998, 39.998555],
                [116.479282, 39.99856],
                [116.479658, 39.998528],
                [116.480151, 39.998453],
                [116.480784, 39.998302],
                [116.480784, 39.998302],
                [116.481149, 39.998184],
                [116.481573, 39.997997],
                [116.481863, 39.997846],
                [116.482072, 39.997718],
                [116.482362, 39.997718],
                [116.483633, 39.998935],
                [116.48367, 39.998968],
                [116.484648, 39.999861]
            ],
            map: {},
            markers: []
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.map = new AMap.Map('container', {
                resizeEnable: true,
                center: [116.478935, 39.997761],
                zoom: 17
            });
            let that = this;
            // this.marker.forEach(item => {
            //     let marker = new AMap.Marker({
            //         map: this.map,
            //         position: item,

            //         autoRotation: true
            //     });
            // });
            for (var i = 0; i < this.marker.length; i += 1) {
                this.markers.push(
                    new AMap.Marker({
                        position: this.marker[i]
                    })
                );
            }
            console.log(this.markers);
            this.map.plugin(['AMap.MarkerClusterer'], function() {
                let cluster = new AMap.MarkerClusterer(that.map, that.markers);
            });
        }
    }
};
</script>

