<template>
    <div @click="doss">
        <codemirror v-model="code" :options="editorOption"></codemirror>
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite';
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');
require('codemirror/mode/vue/vue');

require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/show-hint.css');
require('codemirror/addon/hint/javascript-hint.js');
require('codemirror/theme/3024-night.css');
export default {
    data() {
        return {
            code: '',
            editorOption: {
                mode: 'python',
                lineNumbers: true,
                theme:'3024-night'
            }
        };
    },
    components: {
        codemirror
    },
    methods: {
        doss() {
            console.log(this.code)
        }
    },
};
</script>

<style lang="scss" scoped>
/deep/ .CodeMirror {
height:800px
}
</style>