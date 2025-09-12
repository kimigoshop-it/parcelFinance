<template>
  <div>
    <DialogForm :columns="1" v-model="partition" :formItems="formItems" :visible="visible" @close="emit('close')"
      @success="emit('success')"></DialogForm>
  </div>
</template>

<script setup lang="tsx">
import DialogForm from '@/components/dialog-form';
import { FormItem } from '@/components/basic-form';
import { onMounted, watch } from 'vue';
import { ElOption, ElSelect } from 'element-plus';
import { queryPartitionDetailById, queryPartitionNoProvince, queryPartitionNoCity, queryProvinceConfigList } from '@/service/api/partition';
import { CountryConfig, Partition, PartitionType } from '../model';
import BusinessStore from '@/store/modules/business';
import { range } from 'lodash';

const props = defineProps<{
  country: ICountryConfig,
  partition: IPartition,
  visible: boolean
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success'): void;
}>();

const countryStore = BusinessStore.country;

// 区划缓存
let country = countryStore.getCountry(props.country.id);

// 这个对象每次弹窗刷新, 不在store取
let partition = $ref<Partition>(new Partition(props.partition));

let chooseProvinceCounts = $ref(1);

const formItems = $computed<FormItem[]>(() => {
  const items: FormItem[] = [];

  const partitionName = {
    label: '区域名称',
    name: 'partitionName',
    component: 'Input',
    attrs: {
      modelValue: partition.partitionName,
    }
  }

  const partitionType = {
    label: '区划维度',
    name: 'partitionType',
    component: 'Select',
    attrs: {
      options: [
        {
          label: '省州',
          value: PartitionType.PROVINCE,
        },
        {
          label: '城市',
          value: PartitionType.CITY,
        }
      ],
      onChange: (value: PartitionType) => {
        partition.choosePartitionType(value);
        queryPartitionNoProvince(partition.countryConfigId!).then((res) => {
          partition.refreshAvailableProvinces(res);
        })
      }
    }
  }

  const chooseProvince = Array.from({ length: chooseProvinceCounts }).map((_, index) => {
    return {
      label: '选择区划',
      name: 'chooseProvince',
      component: 'Customer',
      render: () =>
        <div style={{ width: "100%" }}>
          <ElSelect props={{
            value: "provinceId",
            label: "provinceName",
          }}
            modelValue={partition.partitionProvinces[index].provinceId}
            onUpdate:modelValue={(value) => {
              const province = country!.getProvince(value);
              partition.editArea(index, {
                province: {
                  provinceId: province!.provinceId,
                  provinceName: province!.provinceName,
                  partitionCities: []
                },
                city: null
              })
            }}>
            {partition.getAvailableProvinces().map((p) => {
              return <ElOption value={p.provinceId!} label={p.provinceName!} />
            })}
          </ElSelect>
        </div>
    }
  })

  items.push(partitionName);
  items.push(partitionType);
  items.push(...chooseProvince);
  console.log(items)

  return items;
});

watch(() => props.partition.id, (newVal) => {
  partition = new Partition(props.partition);
  if (newVal) {
    queryPartitionDetailById(newVal).then((res) => {
      if (res.provinceViewModelList) {
        chooseProvinceCounts = res.provinceViewModelList.length;
      }
    })
  }
})

watch(() => props.country.id, (newVal) => {
  if (!country) {
    country = new CountryConfig(props.country);
    // 查询country province信息
    queryProvinceConfigList(newVal).then((res) => {
      res.data.forEach((item) => {
        country!.addProvince({
          provinceId: item.id,
          provinceName: item.provinceName!,
          partitionCities: []
        });
      })
    })
    countryStore.setCountry(country);
  }
})
</script>

<style></style>