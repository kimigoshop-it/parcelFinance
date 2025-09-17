import { defineComponent, PropType } from 'vue';
import { NButton, NFormItem, NIcon, NInput, NSelect } from 'naive-ui';
import { watch } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { Minus } from '@element-plus/icons-vue';
import { notNullRule, positiveNumberRule } from '../model/rules';
import { ref } from 'vue';

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

    expose({
      validate: () => {
        return formItemRef.value.flat(2).forEach((item) => {
          return item.validate().catch((err) => {});
        });
      }
    });

    return () => {
      return (
        <NFormItem label='重量区间固定价'>
          <div class='flex flex-wrap w-lg flex-col gap-1'>
            {partitions.map((item, index) => (
              <div class='inline-flex  gap-2 items-center'>
                <NFormItem
                  class='w-50'
                  ref={(el) => {
                    if (!formItemRef.value[index]) formItemRef.value[index] = [];
                    formItemRef.value[index][0] = el as any;
                  }}
                  rule={[notNullRule(item.partitionId, { name: '区域', trigger: 'blur' })]}
                >
                  <NSelect placeholder='请选择区域' v-model:value={item.partitionId} />
                </NFormItem>
                <NFormItem
                  class='w-50'
                  ref={(el) => {
                    if (!formItemRef.value[index]) formItemRef.value[index] = [];
                    formItemRef.value[index][1] = el as any;
                  }}
                  rule={[positiveNumberRule(item.firstWeightPrice)]}
                >
                  <NInput placeholder='请输入价格' v-model:value={item.firstWeightPrice} />
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
            ))}
          </div>
        </NFormItem>
      );
    };
  }
});
