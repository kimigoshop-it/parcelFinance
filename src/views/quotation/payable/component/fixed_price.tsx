import { defineComponent, PropType } from 'vue';
import { NInput } from 'naive-ui';

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
  setup(props, { emit }) {
    let value = $ref(props.modelValue[0]);
    value = {} as any;
    return () => {
      return (
        <NInput
          v-model:value={value.firstWeightPrice}
          onUpdate:value={() => {
            emit('update:modelValue', value);
          }}
        />
      );
    };
  }
});
