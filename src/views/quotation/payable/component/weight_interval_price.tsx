import { defineComponent, PropType, watch } from 'vue';
import { NButton, NFormItem, NIcon, NInput } from 'naive-ui';
import { Plus } from '@element-plus/icons-vue';
import { Minus } from '@element-plus/icons-vue';

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
  setup(props, { emit }) {
    const partitions = $ref<PriceRelatePartition[]>(props.modelValue);
    if (partitions.length === 0) {
      partitions.push({} as any);
    }

    watch(partitions, (newVal) => {
      emit('update:modelValue', newVal);
    });

    return () => {
      return (
        <NFormItem label='重量区间固定价'>
          <div class='flex flex-wrap flex-col gap-1'>
            {partitions.map((item, index) => (
              <div class='inline-flex  gap-2 items-center'>
                <NInput placeholder='请输入开始重量' v-model:value={item.beginWeight} />
                <NInput placeholder='请输入结束重量' v-model:value={item.endWeight} />
                <NInput placeholder='请输入价格' v-model:value={item.firstWeightPrice} />
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
