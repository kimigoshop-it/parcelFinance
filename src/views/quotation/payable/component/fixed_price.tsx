import { defineComponent, PropType, ref } from 'vue';
import { NFormItem, NInput, NInputNumber } from 'naive-ui';

export default defineComponent({
  name: 'FixedPrice',
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
    let value = $ref(props.modelValue[0]);
    value = {} as any;

    const inputRef = ref<InstanceType<typeof NFormItem> | undefined>(undefined);

    expose({
      validate: () => {
        return inputRef.value?.validate();
      }
    });

    return () => {
      return (
        <NFormItem
          ref={inputRef}
          rule={[
            {
              required: true,
              validator: () => {
                return new Promise((resolve, reject) => {
                  if (value.firstWeightPrice === undefined || value.firstWeightPrice === null) {
                    reject('请输入一口价');
                  }

                  if (value.firstWeightPrice < 0) {
                    reject('一口价不能小于0');
                  }

                  resolve();
                });
              }
            }
          ]}
          label='请输入一口价'
          class='py-10'
        >
          <NInputNumber
            v-model:value={value.firstWeightPrice}
            onUpdate:value={() => {
              emit('update:modelValue', [value]);
            }}
          />
        </NFormItem>
      );
    };
  }
});
