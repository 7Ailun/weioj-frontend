<template>
  <div id="viewQuestion">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="题目描述">
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
          </a-tab-pane>
          <a-tab-pane key="2" title="评论"> 还没有评论哦</a-tab-pane>
          <a-tab-pane key="3" title="答案"> 暂时无法查看答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
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
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handle-change="onCodeChange"
        ></CodeEditor>
        <a-divider size="0" />
        <a-button type="primary" @click="onSubmit">提交代码</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, defineProps } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MarkdownViewer from "@/components/MarkdownViewer.vue";

interface Props {
  id: string;
}

const form = ref<QuestionSubmitAddRequest>({
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

const onCodeChange = (value: string) => {
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

#viewQuestion .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
