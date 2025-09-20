import { defineComponent, PropType, ref, watch } from 'vue';
import { NButton, NFormItem, NIcon, NInputNumber } from 'naive-ui';
import { Plus } from '@element-plus/icons-vue';
import { Minus } from '@element-plus/icons-vue';
import { positiveNumberRule } from '../model/rules';

export default defineComponent({
  name: 'WeightIntervalFixedPrice',
  props: {
    modelValue: {
      type: Array as PropType<PriceRelatePartition[]>,
      required: true
    },
    priceType: {
      type: String as PropType<'fixed' | 'p*w'>,
      required: true
    },
    label: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, expose }) {
    const partitions = $ref<PriceRelatePartition[]>(props.modelValue);
    if (partitions.length === 0) {
      partitions.push({} as any);
    }

    watch(partitions, (newVal) => {
      emit('update:modelValue', newVal);
    });

    const formItemRef = ref<InstanceType<typeof NFormItem>[][]>([]);
    const conflicts = ref<[number, number][]>([]);

    function validatePartitions() {
      const ranges = partitions.map((item) => [item.beginWeight, item.endWeight]);
      const conf: [number, number][] = [];

      for (let i = 0; i < ranges.length; i++) {
        const [start1, end1] = ranges[i];
        for (let j = i + 1; j < ranges.length; j++) {
          const [start2, end2] = ranges[j];
          // 判断是否有交集
          if (start1 < end2 && end1 > start2) {
            conf.push([i, j]);
          }
        }
      }

      conflicts.value = conf;
      return conf;
    }

    expose({
      validate: () => {
        const conflicts = validatePartitions();

        if (conflicts.length > 0) {
          return Promise.reject('区间和已有区间存在交集');
        }

        const tasks = formItemRef.value
          .flat(2)
          .filter((item) => item !== undefined && item !== null)
          .map((item) => item.validate());

        return Promise.all(tasks);
      }
    });
    return () => {
      return (
        <NFormItem label={props.label}>
          <div class='flex flex-wrap flex-col gap-1'>
            {partitions.map((item, index) => (
              <div>
                <div class='inline-flex  gap-2 items-center'>
                  <NFormItem
                    ref={(el) => {
                      if (!formItemRef.value[index]) formItemRef.value[index] = [];
                      formItemRef.value[index][0] = el as any;
                    }}
                    rule={[positiveNumberRule(item.beginWeight)]}
                  >
                    <NInputNumber
                      showButton={false}
                      clearable
                      placeholder='请输入开始重量'
                      v-model:value={item.beginWeight}
                    />
                  </NFormItem>
                  <NFormItem
                    ref={(el) => {
                      if (!formItemRef.value[index]) formItemRef.value[index] = [];
                      formItemRef.value[index][1] = el as any;
                    }}
                    rule={[
                      positiveNumberRule(item.endWeight),
                      {
                        trigger: 'blur',
                        validator: () => {
                          return new Promise((resolve, reject) => {
                            if (item.endWeight <= item.beginWeight) {
                              reject('结束重量不能小于开始重量');
                            }
                            resolve();
                          });
                        }
                      }
                    ]}
                  >
                    <NInputNumber
                      showButton={false}
                      clearable
                      placeholder='请输入结束重量'
                      v-model:value={item.endWeight}
                    />
                  </NFormItem>
                  <NFormItem
                    ref={(el) => {
                      if (!formItemRef.value[index]) formItemRef.value[index] = [];
                      formItemRef.value[index][2] = el as any;
                    }}
                    rule={[positiveNumberRule(item.firstWeightPrice)]}
                  >
                    <NInputNumber
                      showButton={false}
                      clearable
                      placeholder='请输入价格'
                      v-model:value={item.firstWeightPrice}
                    />
                  </NFormItem>
                  <NButton
                    type='primary'
                    size='small'
                    circle
                    onClick={() => {
                      partitions.push({} as any);
                    }}
                  >
                    {{
                      icon: () => (
                        <NIcon>
                          <Plus />
                        </NIcon>
                      )
                    }}
                  </NButton>
                  {partitions.length > 1 && (
                    <NButton
                      type='primary'
                      size='small'
                      ghost
                      circle
                      onClick={() => {
                        partitions.splice(index, 1);
                        formItemRef.value.splice(index, 1);
                      }}
                    >
                      {{
                        icon: () => (
                          <NIcon>
                            <Minus />
                          </NIcon>
                        )
                      }}
                    </NButton>
                  )}
                </div>
                {conflicts.value.flat().includes(index) && <span class='pl-2 text-red-500'>该区间和已有区间存在交集</span>}
              </div>
            ))}
          </div>
        </NFormItem>
      );
    };
  }
});
