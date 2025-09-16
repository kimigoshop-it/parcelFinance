import { NButton, NDataTable, NIcon, NInput, NSpace } from 'naive-ui';
import { defineComponent, PropType, watch } from 'vue';
import { Minus, Plus } from '@element-plus/icons-vue';
import { PartitionWeightPrice } from '../model/price';

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
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = $ref<PartitionWeightPrice[]>(
      PartitionWeightPrice.mappedInstance(props.modelValue ?? [], props.priceType === 'fixed')
    );
    if (model.length === 0) {
      model.push(new PartitionWeightPrice([{} as any], props.priceType === 'fixed'));
    }

    watch(model, (newVal: PartitionWeightPrice[]) => {
      emit('update:modelValue', newVal.map((item) => item.transferToPriceRelatePartition()).flat());
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
              title: '分区名称'
            },
            {
              key: 'weightRange',
              title: '重量区间',
              render: (row: PartitionWeightPrice) => (
                <div class='flex flex-col gap-2'>
                  {row.weightPrice.map((wp, idx) => (
                    <NSpace wrap={false} class='items-center'>
                      <NInput v-model:value={wp.beginWeight} />
                      <NInput v-model:value={wp.endWeight} />
                      <NButton
                        type='primary'
                        size='small'
                        circle
                        onClick={() => {
                          row.addWeightPrice({
                            partitionId: row.partitionId,
                            beginWeight: wp.endWeight,
                            endWeight: wp.endWeight + 100,
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
              render: (row: PartitionWeightPrice) => {
                return (
                  <div class='flex flex-col gap-2'>
                    {row.weightPrice.map((wp) => (
                      <NInput v-model={wp.firstWeightPrice} />
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
                                partitionId: row.partitionId + 1,
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
