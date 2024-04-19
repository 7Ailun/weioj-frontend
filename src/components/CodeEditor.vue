<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px"></div>
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw } from "vue";
import * as monaco from "monaco-editor";

const codeEditorRef = ref();
const codeEditor = ref();
const value = ref("");
const fillValue = () => {
  if (!codeEditor.value) {
    return;
  }
};

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

onMounted(() => {
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: value.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    console.log("目前内容为：", toRaw(codeEditor.value).getValue());
  });
});
</script>
<style scoped></style>
