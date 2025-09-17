import { NButton, NDataTable, NForm, NFormItem, NIcon, NInput, NInputNumber, NSpace } from 'naive-ui';
import { defineComponent, nextTick, PropType, ref, watch } from 'vue';
import { Minus, Plus } from '@element-plus/icons-vue';
import { PartitionWeightPrice } from '../model/price';
import PartitionSelect from '@/components/business/PartitionSelect.vue';
import { mode } from 'crypto-js';
import { endWeightRule, notNullRule, positiveNumberRule } from '../model/rules';

export default defineComponent({
  name: 'AreaWeightIntervalFixedPrice',
  props: {
    modelValue: {
      type: Array as PropType<PriceRelatePartition[]>,
      required: true
    },
    priceType: {
      type: String as PropType<'fixed' | 'p*w'>,
      required: true
    },
    customerId: {
      type: [Number, null] as PropType<number | null>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, expose }) {
    const model = $ref<PartitionWeightPrice[]>(
      PartitionWeightPrice.mappedInstance(props.modelValue ?? [], props.priceType === 'fixed')
    );

    if (model.length === 0) {
      model.push(
        new PartitionWeightPrice(
          [
            {
              beginWeight: 0,
              endWeight: 0,
              firstWeightPrice: 0,
              secondWeightPrice: 0
            } as any
          ],
          props.priceType === 'fixed'
        )
      );
    }

    watch(model, (newVal: PartitionWeightPrice[]) => {
      emit('update:modelValue', newVal.map((item) => item.transferToPriceRelatePartition()).flat());
    });

    const partitionFormItemRef = ref<InstanceType<typeof NForm>[]>([]);
    const weightFormItemRef = ref<InstanceType<typeof NForm>[][][]>([]);
    const priceFormItemRef = ref<InstanceType<typeof NForm>[][]>([]);

    const validate = () => {
      partitionFormItemRef.value.forEach((item) => {
        return item.validate().catch((err) => {});
      });
      weightFormItemRef.value.flat(2).forEach((item) => {
        return item.validate().catch((err) => {});
      });
      priceFormItemRef.value.flat(2).forEach((item) => {
        return item.validate().catch((err) => {});
      });
    };

    expose({
      validate
    });

    return () => (
      <div>
        <NDataTable
          bordered={true}
          singleLine={false}
          theme-overrides={{
            tdColorHover: '#fff',
            tdColor: '#fff',
            tdTextColor: '#000'
          }}
          columns={[
            {
              key: 'partitionName',
              title: '分区名称',
              width: 200,
              render: (row: PartitionWeightPrice, rowIndex: number) => {
                return (
                  <NFormItem
                    ref={(el) => {
                      if (!partitionFormItemRef.value[rowIndex]) partitionFormItemRef.value[rowIndex] = [] as any;
                      partitionFormItemRef.value[rowIndex] = el as any;
                    }}
                    rule={[notNullRule(row.partitionId, { name: '区域', trigger: 'blur' })]}
                  >
                    <PartitionSelect
                      disableValues={model.map((item) => item.partitionId)}
                      customerId={props.customerId}
                      v-model={row.partitionId}
                    />
                  </NFormItem>
                );
              }
            },
            {
              key: 'weightRange',
              title: '重量区间',
              render: (row: PartitionWeightPrice, rowIndex: number) => (
                <div class='flex flex-col gap-2'>
                  {row.weightPrice.map((wp, idx) => (
                    <NSpace wrap={false} class='items-center'>
                      <NFormItem
                        ref={(el) => {
                          if (!weightFormItemRef.value[rowIndex]) weightFormItemRef.value[rowIndex] = [];
                          if (!weightFormItemRef.value[rowIndex][idx]) weightFormItemRef.value[rowIndex][idx] = [];
                          weightFormItemRef.value[rowIndex][idx][0] = el as any;
                        }}
                        rule={[positiveNumberRule(wp.beginWeight)]}
                      >
                        <NInputNumber showButton={false} clearable v-model:value={wp.beginWeight} />
                      </NFormItem>
                      <NFormItem
                        ref={(el) => {
                          if (!weightFormItemRef.value[rowIndex]) weightFormItemRef.value[rowIndex] = [];
                          if (!weightFormItemRef.value[rowIndex][idx]) weightFormItemRef.value[rowIndex][idx] = [];
                          weightFormItemRef.value[rowIndex][idx][1] = el as any;
                        }}
                        rule={[positiveNumberRule(wp.endWeight), endWeightRule(wp.endWeight, wp.beginWeight)]}
                      >
                        <NInputNumber showButton={false} clearable v-model:value={wp.endWeight} />
                      </NFormItem>
                      <NButton
                        type='primary'
                        size='small'
                        circle
                        onClick={() => {
                          row.addWeightPrice({
                            partitionId: row.partitionId!,
                            beginWeight: isNaN(wp.endWeight) ? 0 : wp.endWeight,
                            endWeight: isNaN(wp.endWeight) ? 0 : wp.endWeight + 100,
                            firstWeightPrice: 0,
                            secondWeightPrice: 0
                          });
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
                      {row.weightPrice.length > 1 && (
                        <NButton
                          type='primary'
                          size='small'
                          circle
                          onClick={() => {
                            row.removeWeightPrice(idx);
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
                    </NSpace>
                  ))}
                </div>
              )
            },
            {
              key: 'billingMethod',
              title: '计价方式',
              render: (row: PartitionWeightPrice) => {
                return <div>{row.fixed ? '固定价' : '单价*重量'}</div>;
              }
            },
            {
              key: 'price',
              title: '运费',
              render: (row: PartitionWeightPrice, rowIndex: number) => {
                return (
                  <div class='flex flex-col gap-2'>
                    {row.weightPrice.map((wp, idx) => (
                      <NFormItem
                        ref={(el) => {
                          if (!priceFormItemRef.value[rowIndex]) priceFormItemRef.value[rowIndex] = [];
                          if (!priceFormItemRef.value[rowIndex][idx]) priceFormItemRef.value[rowIndex][idx] = [] as any;
                          priceFormItemRef.value[rowIndex][idx][0] = el as any;
                        }}
                        rule={[positiveNumberRule(wp.firstWeightPrice)]}
                      >
                        <NInputNumber showButton={false} clearable v-model:value={wp.firstWeightPrice} />
                      </NFormItem>
                    ))}
                  </div>
                );
              }
            },
            {
              key: 'action',
              title: '操作',
              render: (row, rowIndex) => {
                return (
                  <NSpace>
                    <NButton
                      type='primary'
                      size='small'
                      text
                      onClick={() => {
                        model.push(
                          new PartitionWeightPrice(
                            [
                              {
                                partitionId: null as any,
                                beginWeight: 0,
                                endWeight: 0,
                                firstWeightPrice: 0,
                                secondWeightPrice: 0
                              }
                            ],
                            props.priceType === 'fixed'
                          )
                        );
                      }}
                    >
                      添加阶梯
                    </NButton>

                    {model.length > 1 && (
                      <NButton
                        type='primary'
                        size='small'
                        text
                        onClick={() => {
                          model.splice(rowIndex, 1);
                        }}
                      >
                        删除
                      </NButton>
                    )}
                  </NSpace>
                );
              }
            }
          ]}
          data={model}
        ></NDataTable>
      </div>
    );
  }
});
