<template>
  <div id="showQuestion">
    <a-form :model="searchParams" layout="inline">
      <a-space>
        <a-form-item field="title" label="题目名称" validate-trigger="input">
          <a-input
            style="min-width: 240px"
            v-model="searchParams.title"
            placeholder="请输入题目名称"
          />
        </a-form-item>
        <a-form-item field="tags" label="标签" validate-trigger="input">
          <a-input-tag
            style="min-width: 240px"
            v-model="searchParams.tags"
            placeholder="请输入标签"
          />
        </a-form-item>
        <a-button
          style="width: 100px; float: right"
          type="primary"
          @click="doSearch"
          >搜索
        </a-button>
      </a-space>
    </a-form>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of record.tags"
            :key="index"
            color="#ffb400"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptRate="{ record }">
        {{
          `${record.submitNum ? record.acceptedNum / record.submitNum : "0"}
          %(${record.acceptedNum}/${record.submitNum})`
        }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)"
            >做题
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment/moment";

const dataList = ref([]);
const router = useRouter();

const total = ref(0);
const searchParams = ref({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
} as QuestionQueryRequest);

/**
 * 分页改变
 */
const onPageChange = (page: number) => {
  {
    searchParams.value = {
      ...searchParams.value,
      current: page,
    };
  }
};

/**
 * 数据加载
 */
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  console.log(res.data);
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("数据加载失败.");
  }
};

/**
 * 监听数据变化
 */
watchEffect(() => {
  // 当 loadData 中的变量，发生变化时，会重新执行
  loadData();
});

/**
 * 跳转做题页面
 * @param data
 */
const toQuestionPage = (question: any) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

/**
 * 确认搜索
 */
const doSearch = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
  loadData();
};

onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "题目编号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    dataIndex: "tags",
    slotName: "tags",
  },
  {
    title: "通过率",
    dataIndex: "acceptRate",
    slotName: "acceptRate",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
  },
  {
    slotName: "optional",
  },
];
</script>

<style scoped>
#showQuestion {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
