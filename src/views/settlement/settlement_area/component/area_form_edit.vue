<template>
  <DialogForm title="编辑区域" :columns="1" v-model="partition" :formItems="formItems" :visible="true"
    @close="emit('close')" @success="emit('success')" @positive-click="handleEditPartition"></DialogForm>
</template>

<script setup lang="tsx">
import DialogForm from '@/components/dialog-form';
import { FormItem } from '@/components/basic-form';
import { onMounted, render, watch } from 'vue';
import { ElButton, ElCheckbox, ElIcon, ElOption, ElPagination, ElSelect } from 'element-plus';
import { Minus, Plus } from "@element-plus/icons-vue"
import { queryPartitionDetailById, queryPartitionNoProvince, queryPartitionNoCity, queryProvinceConfigList, updatePartition } from '@/service/api/partition';
import { CountryConfig, Partition, PartitionType } from '../model';
import BusinessStore from '@/store/modules/business';
import { VirtList } from 'vue-virt-list'

const props = defineProps<{
  country: ICountryConfig,
  partition: IPartition,
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success'): void;
}>();

const countryStore = BusinessStore().country;

// 区划缓存
let country = countryStore.getCountry(props.country.id);

// 这个对象每次弹窗刷新, 不在store取
let partition = $ref<Partition>(new Partition(props.partition));

const formItems = $computed<FormItem[]>(() => {
  const items: FormItem[] = [];

  const partitionName = {
    label: '区域名称',
    name: 'partitionName',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入区域名称',
        trigger: 'blur'
      }
    ]
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
      modelValue: partition.partitionType,
      onChange: (value: PartitionType) => {
        partition.choosePartitionType(value);
      }
    },
    rules: [
      {
        required: true,
        message: '请选择区划维度',
        trigger: 'blur'
      }
    ]
  }

  const chooseProvince = partition.partitionProvinces.map((pp, index) => {
    const availableProvinces = partition.getAvailableProvinces();
    return {
      label: '选择区划',
      name: 'chooseProvince',
      component: 'Customer',
      render: () =>
        <div style={{ width: "100%" }} class="flex gap-2 items-center">
          <ElSelect props={{
            value: "provinceId",
            label: "provinceName",
          }}
            modelValue={partition.partitionProvinces[index].provinceId}
            onUpdate:modelValue={(value) => {
              const province = country!.getProvince(value);
              partition.editArea(index, {
                province: {
                  provinceId: province?.provinceId ?? value,
                  provinceName: province?.provinceName ?? '',
                  partitionCities: []
                },
                city: null
              })
            }}>
            {availableProvinces.map((p) => {
              return <ElOption disabled={partition.hasBeenSelected(p.provinceId!)} value={p.provinceId!} label={p.provinceName!} />
            })}
          </ElSelect>
          <ElButton style={{ width: "15px", height: "15px" }} type="primary" circle
            onClick={() => {
              partition.newArea();
            }}
          >
            <ElIcon>
              <Plus />
            </ElIcon>
          </ElButton>
          {index !== 0 && <ElButton style={{ width: "15px", height: "15px" }} type="primary" circle
            onClick={() => {
              partition.removeArea(index);
            }}
          >
            <ElIcon>
              <Minus />
            </ElIcon>
          </ElButton>}
          {index === 0 && <ElCheckbox
            onChange={(value: boolean) => {
              partition.handleSelectAll(value);
            }}
          >全部</ElCheckbox>}
        </div>,
      rules: [
        {
          required: true,
          message: '请选择区划',
          trigger: 'blur'
        }
      ]
    }
  })

  const availableCityProvinces = partition.getAvailableCityProvinces();

  const chooseCities = {
    label: '选择城市',
    name: 'chooseCity',
    component: 'Customer',
    render: () => {
      return <VirtList
        itemKey={'cityId'}
        list={partition.partitionCities}
        minSize={10}
      >
        {{
          default: ({ itemData, index }) => {
            return item(itemData, index);
          }
        }}
      </VirtList>
    }
  }

  const item = (city: City, index: number) => {
    const availableCities = partition.getAvailableCities(city.provinceId!);
    return <div class="flex gap-2 items-center w-full py-2.5">
      <ElSelect class="flex-1" modelValue={city.provinceId} onUpdate:modelValue={(value) => {
        let ifSame = value === city.provinceId;
        city.provinceId = value;
        if (!ifSame) {
          city.cityId = null;
          city.cityName = null;
        }
      }}>
        {availableCityProvinces.map((p) => {
          return <ElOption value={p.provinceId!} label={p.provinceName ?? ""} />
        })}
      </ElSelect>
      <ElSelect class="flex-1" v-model={city.cityId} onUpdate:modelValue={() => partition.editArea(index, {
        province: null,
        city: city
      })} disabled={city.provinceId === null}>
        {availableCities?.map((c) => {
          return <div>
            <ElOption value={c.cityId!} label={c.cityName!} disabled={partition.hasBeenSelected(c.provinceId!, c.cityId!)} />
          </div>
        })}
      </ElSelect>
      <ElButton style={{ width: "15px", height: "15px" }} type="primary" circle
        onClick={() => {
          partition.newArea();
        }}
      >
        <ElIcon>
          <Plus />
        </ElIcon>
      </ElButton>
      {index !== 0 && <ElButton style={{ width: "15px", height: "15px" }} type="primary" circle
        onClick={() => {
          partition.removeArea(index);
        }}
      >
        <ElIcon>
          <Minus />
        </ElIcon>
      </ElButton>}
      {index === 0 && <ElCheckbox
        onChange={(value: boolean) => {
          partition.handleSelectAll(value);
        }}
      >全部</ElCheckbox>}
    </div>
  }

  items.push(partitionName);
  items.push(partitionType);

  if (partition.partitionType === PartitionType.PROVINCE) {
    chooseProvince.forEach((item) => {
      items.push(item);
    })
  }

  if (partition.partitionType === PartitionType.CITY) {
    items.push(chooseCities);
  }

  return items;
});

// 提交表单
function handleEditPartition() {
  const model = partition.toUpdatePartitionDtoModel();
  updatePartition(model).then(() => {
    emit('success');
  })
}

const initPartition = () => {
  const partitionId = props.partition.id;
  partition = new Partition(props.partition);
  if (partitionId) {
    queryPartitionDetailById(partitionId).then((res) => {
			console.log(res);
      if (res.partitionType === PartitionType.PROVINCE) {
        partition.partitionProvincesBackend = (res.provinceViewModelList ?? []).map((item) => {
          const province = country!.getProvince(item.provinceId)
          return {
            provinceId: item.provinceId,
            provinceName: province!.provinceName!,
            partitionCities: []
          }
        })
      }

      if (res.partitionType === PartitionType.CITY) {
        partition.partitionCitiesBackend = (res.provinceViewModelList ?? []).map((item) => {
          return item.partitionCities.map((ct) => {
            const province = country!.getProvince(item.provinceId)
            return {
              provinceId: item.provinceId,
              provinceName: province!.provinceName!,
              cityId: ct.cityId,
              cityName: ct.cityName
            }
          })
        }).flat();
      }

      partition.choosePartitionType(res.partitionType);
    })
  }
}

onMounted(() => {
  if (!country) {
    country = new CountryConfig(props.country);
    countryStore.setCountry(country);
    // 查询country province信息
    queryProvinceConfigList(props.country.id).then((res) => {
      res.data.forEach((item) => {
        country!.addProvince({
          provinceId: item.id,
          provinceName: item.provinceName!,
          partitionCities: []
        });
      })
      initPartition();
    })
  } else {
    initPartition();
  }
})
</script>

<style></style>
