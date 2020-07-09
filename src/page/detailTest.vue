<template>
    <div>
        {{this.$store.state.childText}}
        {{txtArr}}
        <button @click="dododo">点我</button>
    </div>
</template>

<script>
import { fetchData } from '@/api/index';
import { mapState } from 'vuex';
export default {
    name:'test',
    computed: mapState({
        count: state => state.count,
        childText2:state => state.childText2,
        childText:state => state.childText,
        txtArr: state =>state.txtArr,
    }),
    methods: {
        getData() {
            fetchData().then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        dododo() {
            this.$store.commit('changeChildText', '111');
        }
    },
    created() {
        this.getData();
        console.log(this.$route)
    }
};
</script>

<style>
</style>