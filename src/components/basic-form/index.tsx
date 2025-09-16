import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElDatePicker,
  ElCheckbox,
  ElRadio,
  ElSwitch,
  ElRow,
  ElCol,
	FormItemRule
} from 'element-plus';
import { defineComponent, PropType } from 'vue';

export type ComponentType =
  | 'Input'
  | 'Select'
  | 'DatePicker'
  | 'Checkbox'
  | 'Radio'
  | 'Switch'
  | 'Textarea'
  | 'Customer';

export type FormItem = {
  label: string;
  name: string;
  component: any | 'Custom';
  attrs?: Record<string, any>; // 组件参数
  render?: () => JSX.Element;
  colSpan?: number;
  placeholder?: string;
  rules?: FormItemRule[];
};

function getComponent(type: ComponentType) {
  switch (type) {
    case 'Input':
      return ElInput;
    case 'Select':
      return ElSelect;
    case 'DatePicker':
      return ElDatePicker;
    case 'Checkbox':
      return ElCheckbox;
    case 'Radio':
      return ElRadio;
    case 'Switch':
      return ElSwitch;
  }
  return ElInput;
}

export type BasicFormProps = {
  formItems: FormItem[];
  modelValue: Record<string, any>;
  showLabel: boolean;
  columns: number;
  expand: boolean;
};

export default defineComponent({
  name: 'BasicForm',
  props: {
    formItems: {
      type: Array as PropType<FormItem[]>,
      default: () => [],
      required: true
    },
    modelValue: {
      type: Object as PropType<Record<string, any>>,
      required: true
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Number,
      default: 2 // 默认2列
    },
    expand: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  setup(props: BasicFormProps, { emit }) {
    const model = $ref(props.modelValue);

    const updateValue = (key: string, value: any) => {
      model[key] = value;
      emit('update:modelValue', model);
    };

    return () => {
      const span = Math.floor(24 / props.columns);

      // 通过数量控制显示的表单项
      const showingItems = $computed(() => {
        if (props.expand) {
          return props.formItems;
        }
        return props.formItems.slice(0, props.columns);
      });

      return (
        <div>
          <ElForm>
            <ElRow gutter={20}>
              {showingItems.map((item) => {
                const Comp = getComponent(item.component);
                return (
                  <ElCol span={item.colSpan ?? span}>
                    <ElFormItem label={props.showLabel ? item.label : ''} rules={item.rules} prop={item.name}>
                      {item.component === 'Customer' ? (
                        item.render!()
                      ) : (
                        <Comp
                          v-model={model[item.name]}
                          onUpdate:modelValue={(value) => updateValue(item.name, value)}
                          {...(item.attrs || {})}
                          placeholder={item.placeholder ?? item.label}
                        />
                      )}
                    </ElFormItem>
                  </ElCol>
                );
              })}
            </ElRow>
          </ElForm>
        </div>
      );
    };
  }
});
