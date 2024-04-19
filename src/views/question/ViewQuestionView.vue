<template>
  <div id="viewQuestion">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="题目描述">
        <a-row :gutter="[24, 24]">
          <a-col :md="12" :xs="24">
            <a-card v-if="question" :title="question.title">
              <a-descriptions title="判题条件">
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit }}
                </a-descriptions-item>
              </a-descriptions>
              <MarkdownViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                  >
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-col>
          <a-col :md="12" :xs="24">
            <a-select
              :style="{ width: '200px' }"
              placeholder="选择编程语言"
              v-model="form.language"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>python</a-option>
            </a-select>
            <CodeEditor
              style="min-height: 580px; max-height: initial; margin-top: 10px"
              :value="form.code"
              :language="form.language"
              :handle-change="onChange"
            />
            <a-divider />
            <a-button type="primary" @click="onSubmit">提交代码</a-button>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" title="评论"> Content of Tab Panel 2</a-tab-pane>
      <a-tab-pane key="3">
        <template #title>答案</template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, defineProps } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MarkdownViewer from "@/components/MarkdownViewer.vue";

interface Props {
  id: string;
}

const form = ref({
  code: "",
  language: "java",
});
const question = ref<QuestionVO>();
const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

/**
 * 数据加载
 */
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code == 0) {
    question.value = res.data;
  } else {
    message.error("题目加载失败," + res.message);
  }
};

const onChange = (value: string) => {
  form.value.code = value;
};

/**
 * 代码提交
 */
const onSubmit = async () => {
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value?.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }
};

/**
 * 监听数据变化
 */
watchEffect(() => {
  // 当 loadData 中的变量，发生变化时，会重新执行
  loadData();
});

onMounted(() => {
  loadData();
});
</script>

<style scoped>
#viewQuestion {
  margin: 0 auto;
}

#viewQuestion
  .arco-space
  .arco-space-horizontal
  .arco-space-align-center
  .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
