<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 400px; height: 60vh"
  />
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>
<script setup lang="ts">
import { onMounted, ref, toRaw, withDefaults, defineProps } from "vue";
import * as monaco from "monaco-editor";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();

// watch(
//   () => props.language,
//   () => {
//     codeEditor.value = monaco.editor.create(codeEditorRef.value, {
//       value: props.value,
//       language: props.language,
//       automaticLayout: true,
//       colorDecorators: true,
//       minimap: {
//         enabled: true,
//       },
//       readOnly: false,
//       theme: "vs-dark",
//     });
//   }
// );

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
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
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>
<style scoped></style>
