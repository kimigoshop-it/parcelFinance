import { defineComponent, PropType, ref, watch } from 'vue';
import { BillingMethod, getPriceEnumLabel } from '../model/price';
import FixedPrice from './fixed_price';
import WeightIntervalPrice from './weight_interval_price';
import AreaIntervalPrice from './area_interval_price';
import AreaWeightIntervalPriceWeight from './area_weight_interval_price_weight';
import AreaWeightIntervalFirstAndForemost from './area_weight_interval_first_and_foremost';

function isFixedPrice(billingMethod: BillingMethod) {
  return [
    BillingMethod.FIXED_PRICE,
    BillingMethod.AREA_INTERVAL_FIXED_PRICE,
    BillingMethod.AREA_WEIGHT_INTERVAL_FIXED_PRICE
  ].includes(billingMethod);
}

export interface PricePartition {
  partitionId: number;
  partitions: PriceRelatePartition[];
}

export type BillingExpose = {
  validate: () => Promise<boolean>;
};

export default defineComponent({
  name: 'Billing',
  props: {
    billingMethod: {
      type: [Number, null] as PropType<BillingMethod | null>,
      required: true
    },
    modelValue: {
      type: Array as PropType<PriceRelatePartition[]>,
      required: true
    },
    customerId: {
      type: [Number, null] as PropType<number | null>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, expose }) {
    // let model = $ref<PriceRelatePartition[]>(props.modelValue);
    let model = $computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val)
    });

    const formMap = {
      [BillingMethod.FIXED_PRICE]: FixedPrice,
      [BillingMethod.WEIGHT_INTERVAL_FIXED_PRICE]: WeightIntervalPrice,
      [BillingMethod.WEIGHT_INTERVAL_PRICE_WEIGHT]: WeightIntervalPrice,
      [BillingMethod.AREA_INTERVAL_PRICE_WEIGHT]: AreaIntervalPrice,
      [BillingMethod.AREA_INTERVAL_FIXED_PRICE]: AreaIntervalPrice,
      [BillingMethod.AREA_WEIGHT_INTERVAL_FIXED_PRICE]: AreaWeightIntervalPriceWeight,
      [BillingMethod.AREA_WEIGHT_INTERVAL_PRICE_WEIGHT]: AreaWeightIntervalPriceWeight,
			[BillingMethod.AREA_WEIGHT_INTERVAL_FIRST_AND_FOREMOST]: AreaWeightIntervalFirstAndForemost
    };

    const compRef = ref<{ validate: () => Promise<boolean> }>();

    expose({
      validate: () => {
        return compRef.value?.validate();
      }
    });

    const form = $computed(() => {
      if (props.billingMethod === null) {
        return <div>请选择计价方式</div>;
      }

      const Comp = formMap[props.billingMethod];
      return (
        <div>
          <Comp
            modelValue={model}
            onUpdate:modelValue={(value) => {
              model = value;
            }}
            customerId={props.customerId}
            ref={compRef}
            priceType={isFixedPrice(props.billingMethod) ? 'fixed' : 'p*w'}
            label={getPriceEnumLabel('billingMethod', props.billingMethod)}
          />
        </div>
      );
    });

    return () => <div>{form}</div>;
  }
});
