<template>
  <div>
    <DialogForm :columns="1" @close="handleClose" @positiveClick="add" title="新增区域" :visible="visible"
      :formItems="formItems" v-model="model" />
  </div>
</template>

<script setup lang="tsx">
import DialogForm from "@/components/dialog-form";
import { queryCountryConfigList, addPartition, findCustomerBasicInfoByCountryId } from "@/service/api/partition";
import { onMounted, watch } from "vue";
import { ElButton, ElIcon, ElInput } from 'element-plus';
import { Minus, Plus } from "@element-plus/icons-vue";

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "success"): void;
}>();

const add = () => {
  const names = model.partitionNames?.filter((name) => name && name.trim() !== "") || [];
  if (names.length === 0) {
    return;
  }

  addPartition({
    countryConfigId: model.countryConfigId,
    customerId: model.customerId,
    partitionName: names.join(","),
  } as any).then((res) => {
    if (res.code === 200) {
      emit('success');
    }
  });
}

const countryOptions = $ref<{ label: string; value: number }[]>([]);
const customerOptions = $ref<{ label: string; value: number }[]>([]);

const handleCountryChange = (countryId: number) => {
  model.customerId = [];
  customerOptions.length = 0;
  if (!countryId) return;

  findCustomerBasicInfoByCountryId(countryId).then((res: any) => {

    if (res&&res.data) {
			let data=res.data;
      customerOptions.push(...data.map((item: any) => ({
        label: item.customerName,
        value: item.id,
      })));
    }
  });
};

onMounted(() => {
  queryCountryConfigList({}).then((res) => {
    countryOptions.push(...res.data.map((item: ICountryConfig) => ({
      label: item.countryName,
      value: item.id,
    })));
  });
});

const handleClose = () => {
  emit('close');
}

watch(() => props.visible, (val) => {
  if (val) {
    model.countryConfigId = undefined;
    model.customerId = [];
    model.partitionNames = [""];
    customerOptions.length = 0;
  }
});


// 表单定义
const formItems = $computed(() => [
  {
    label: "选择国家",
    name: "countryConfigId",
    component: "Select" as const,
    attrs: {
      options: countryOptions,
      onChange: (value: number) => {
        handleCountryChange(value);
      }
    },
  },
	{
    label: "适用项目",
    name: "customerId",
    component: "Select" as const,
    attrs: {
      multiple: true,
      options: customerOptions,
    },
  },
  {
    label: "区域名称",
    name: "partitionNames",
    component: "Customer" as const,
    render: () => (ss
      <div class="flex flex-col gap-2 w-full">
        {model.partitionNames.maps((name,事实上 index) => (
          <div key={index} class="flex gap-2 items-center w-full">
            <ElInput
              modelValue={model.partitionNames[index]}
              onUpdate:modelValue={(val) => {
                model.partitionNames[index] = val;
              }}
              placeholder={`请输入区域名称`}
            />
            <ElButton
              style={{ width: "24px", height: "24px", minHeight: "24px", padding: 0 }}
              type="primary"
              circle
              onClick={() => {
                model.partitionNames.push("");
              }}
            >
              <ElIcon><Plus /></ElIcon>
            </ElButton>
            {index > 0 && (
              <ElButton
                style={{ width: "24px", height: "24px", minHeight: "24px", padding: 0 }}
                type="danger"
                circle
                onClick={() => {
                  model.partitionNames.splice(index, 1);
                }}
              >
                <ElIcon><Minus /></ElIcon>
              </ElButton>
            )}
          </div>
        ))}
      </div>
    )
  }
])

const model = $ref({
  countryConfigId: undefined as number | undefined,
  customerId: [] as number[],
  partitionNames: [""] as string[],
});

</script>

<style scoped lang="scss"></style>

