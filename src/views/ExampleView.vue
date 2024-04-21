<template>
  <div id="exampleView">
    <CodeEditor :value="codeValue" :handle-change="onCodeChange"></CodeEditor>
    <MarkdownEditor
      :value="mdValue"
      :handle-change="onMarkdownChange"
    ></MarkdownEditor>
  </div>
</template>
<script setup lang="ts">
import MarkdownEditor from "@/components/MarkdownEditor.vue";
import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";

const mdValue = ref();
const codeValue = ref();
const onMarkdownChange = (v: string) => {
  mdValue.value = v;
  alert(v);
};
const onCodeChange = (v: string) => {
  codeValue.value = v;
  alert(v);
};
</script>
