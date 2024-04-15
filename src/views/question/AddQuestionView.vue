<template>
  <div id="addQuestionView">
    <h2>新增题目</h2>
    <a-form :model="form.answer" label-align="left">
      <a-form-item field="answer" label="答案">
        <MarkdownEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MarkdownEditor
          :value="form.content"
          :handle-change="onContentChange"
        />
      </a-form-item>
      <a-form-item field="title" label="题目">
        <a-input
          style="width: 380px"
          v-model="form.title"
          placeholder="请输入题目"
        />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="form.tags"
          :style="{ width: '380px' }"
          placeholder="请输入题目标签"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 410px">
          <a-form-item field="memoryLimit" label="内存限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              :default-value="500"
              mode="embed"
              min="0"
            />
          </a-form-item>
          <a-form-item field="stackLimit" label="堆栈限制">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制"
              :default-value="500"
              mode="embed"
              min="0"
            />
          </a-form-item>

          <a-form-item field="timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              :default-value="500"
              mode="embed"
              min="0"
            />
          </a-form-item>
        </a-space>
      </a-form-item>

      <a-form-item label="测试用例" :content-flex="false" :merge-props="false">
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 480px">
            <a-form-item
              :field="`form.judgeCase[${index}]input`"
              :label="`输入用例-${index + 1}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入输入用例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}]input`"
              :label="`输入用例-${index + 1}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入输出用例"
              />
            </a-form-item>
            <a-button
              status="danger"
              @click="handleDelete(index)"
              :style="{ marginLeft: '0px' }"
              >删除
            </a-button>
          </a-space>
        </a-form-item>
        <div>
          <a-button
            style="margin-top: 20px"
            type="outline"
            status="success"
            @click="handleAdd"
            >新增测试用例
          </a-button>
        </div>
      </a-form-item>

      <a-form-item>
        <a-button
          size="large"
          style="margin-top: 20px; width: 150px"
          type="primary"
          @click="onSubmit"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import MarkdownEditor from "@/components/MarkdownEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const form = reactive({
  answer: "3",
  content: "求和",
  judgeCase: [
    {
      input: "1 2",
      output: "3",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  tags: ["简单", "数组"],
  title: "A + B",
});

const onSubmit = async () => {
  console.log(form);
  const res = await QuestionControllerService.addQuestionUsingPost(form);
  if (res.code === 0) {
    message.success("创建成功");
  } else {
    message.error("创建失败");
  }
};

const onAnswerChange = (value: string) => {
  form.answer = value;
};
const onContentChange = (value: string) => {
  form.content = value;
};
const handleAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.judgeCase.splice(index, 1);
};
</script>

<style scoped></style>
