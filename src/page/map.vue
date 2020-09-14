<template>
    <div class="box">
        <div id="container" style="width:100vw; height:calc(100vh - 120px);">
            <div style="z-index:999;position: absolute; top: 10px; left: 20px;width:80%"></div>
        </div>
    </div>
</template>

<script>
import icar from './map_vehicle_normal.png';
export default {
    data() {
        return {
            sliderVal: 0,
            markerd: [
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
            markers: [],
            polyline: {},
            mark: {},
            navgtrSpeed: 1,
            navgtr: {},
            pathSimplifierIns: {},
            infoWindow:null
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
            for (var i = 0; i < this.markerd.length; i++) {
                var point = this.markerd[i];
                var marker = new AMap.Marker({
                    position: point,
                    map: this.map
                });
                marker.p = this.markerd[i];
               
                // 将创建的点标记添加到已有的地图实例：
                marker.on('click', function (p) {
                    var content = '666';
                    that.infoWindow = new AMap.InfoWindow({
                        content:content
                    });
                    // 设置信息框内容
                    //将marker放到指定坐标
                    that.infoWindow.open(that.map, p.lnglat);
                });
            }
        },
        showInfoM(e) {
            console.log(e.target.content.name);
        },
    //      openInfo() {
    //     //构建信息窗体中显示的内容
    //     var info = [];
    //     info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
    //     info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
    //     info.push("电话 : 010-84107000   邮编 : 100102");
    //     info.push("地址 :北京市朝阳区望京阜荣街10号首开广场4层</div></div>");
    //     this.infoWindow = new AMap.InfoWindow({
    //         content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
    //     });
    //     this.infoWindow.open(this.map, this.map.getCenter());

    // }
    }
};
</script>

<style scoped>
* {
}
</style>