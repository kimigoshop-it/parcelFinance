import { defineComponent, PropType, watch } from 'vue';
import { BillingMethod } from '../model/price';
import FixedPrice from './fixed_price';
import WeightIntervalPrice from './weight_interval_price';
import AreaIntervalPrice from './area_interval_price';
import AreaWeightIntervalPriceWeight from './area_weight_interval_price_weight';

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
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    let model = $ref<PriceRelatePartition[]>(props.modelValue);

    watch(
      model,
      (newVal) => {
        emit('update:modelValue', newVal);
      },
      {
        deep: true
      }
    );

    const formMap = {
      [BillingMethod.FIXED_PRICE]: FixedPrice,
      [BillingMethod.WEIGHT_INTERVAL_FIXED_PRICE]: WeightIntervalPrice,
      [BillingMethod.WEIGHT_INTERVAL_PRICE_WEIGHT]: WeightIntervalPrice,
      [BillingMethod.AREA_INTERVAL_PRICE_WEIGHT]: AreaIntervalPrice,
      [BillingMethod.AREA_INTERVAL_FIXED_PRICE]: AreaIntervalPrice,
      [BillingMethod.AREA_WEIGHT_INTERVAL_FIXED_PRICE]: AreaWeightIntervalPriceWeight,
      [BillingMethod.AREA_WEIGHT_INTERVAL_PRICE_WEIGHT]: AreaWeightIntervalPriceWeight
    };

    const form = $computed(() => {
      if (props.billingMethod === null) {
        return <div>请选择计价方式</div>;
      }

      const Comp = formMap[props.billingMethod];
      return isFixedPrice(props.billingMethod) ? (
        <div>
          <Comp
            modelValue={model}
            onUpdate:modelValue={(value) => {
              emit('update:modelValue', value);
              model = value;
            }}
            priceType='fixed'
          />
        </div>
      ) : (
        <div>
          <Comp
            modelValue={model}
            onUpdate:modelValue={(value) => {
              emit('update:modelValue', value);
              model = value;
            }}
            priceType='p*w'
          />
        </div>
      );
    });

    return () => <div>{form}</div>;
  }
});
