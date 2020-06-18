<template>
    <div>sss</div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'detailTest',
    methods: {
        getData() {
            fetchData().then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        }
    },
    created() {
        this.getData();
    }
};
</script>

<style>
</style>