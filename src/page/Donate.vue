<template>
    <div class="box">
        <div id="container" style="width:100vw; height:calc(100vh - 120px);">
            <div style="z-index:999;position: absolute; top: 10px; left: 20px;width:80%">
                <el-slider v-model="sliderVal" :max="marker.length-1" :step="0.00001"></el-slider>
                <el-button @click="navStart">开始回放</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import icar from './map_vehicle_normal.png';
export default {
    data() {
        return {
            sliderVal: 0,
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
            navgtr:{},
            pathSimplifierIns:{}
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
            this.initPathSimplifier();
        },

        initPathSimplifier() {
            let that = this;
            AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier) => {
                if (!PathSimplifier.supportCanvas) {
                    alert('当前环境不支持 Canvas！');
                    return;
                }
                //创建一个巡航轨迹路线
                that.pathSimplifierIns = new PathSimplifier({
                    zIndex: 100, //地图层级，
                    map: this.map, //所属的地图实例
                    //巡航路线轨迹列表
                    getPath: (pathData, pathIndex) => {
                        return pathData.path;
                    },
                    //hover每一个轨迹点，展示内容
                    getHoverTitle: function (pathData, pathIndex, pointIndex) {
                        if (pointIndex >= 0) {
                            return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length;
                        }
                        return pathData.name + '，点数量' + pathData.path.length;
                    },
                    //自定义样式，可设置巡航器样式，巡航轨迹样式，巡航轨迹点击、hover等不同状态下的样式，不设置则用默认样式，详情请参考api文档 renderOptions:{}
                    //绘制路线节点
                    renderOptions: {
                        renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
                    }
                });

                //设置数据
                that.pathSimplifierIns.setData([
                    {
                        name: '路线0',
                        path: that.marker
                    }
                ]);
                //对第一条线路（即索引 0）创建一个巡航器
                that.navgtr = that.pathSimplifierIns.createPathNavigator(0, {
                    loop: false, //循环播放
                    speed: 100, //巡航速度，单位千米/小时
                    content: PathSimplifier.Render.Canvas.getImageContent(icar)
                });
                that.navgtr.on('move',(e)=>{
                    console.log(e.target.cursor.tail)
                    this.sliderVal = e.target.cursor.idx + e.target.cursor.tail
                })
                
            });
        },
        sliderChange(val) {
            this.navgtr.pause()
           
             let point = Math.floor(val);
             let where = val % 1 
            this.navgtr.moveToPoint(point,where);
            this.pathSimplifierIns.renderLater();
            this.navgtr.resume() 
        },
        navStart(){
            this.navgtr.start()
        }
    },
    watch: {
        sliderVal(newVal) {
            
            this.sliderChange(newVal);
        }
    }
};
</script>

<style scoped>
* {
}
</style>