import BasicForm, { FormItem } from '@/components/basic-form';
import { NModal, NScrollbar } from 'naive-ui';
import { PropType, SlotsType, defineComponent } from 'vue';

export default defineComponent({
  name: 'DialogForm',
  props: {
    formItems: {
      type: Array as PropType<FormItem[]>,
      default: () => []
    },
    modelValue: {
      type: Object as PropType<Record<string, any>>,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function as PropType<() => void>,
      required: false
    },
    onPositiveClick: {
      type: Function as PropType<() => void>,
      required: false
    },
    onNegativeClick: {
      type: Function as PropType<() => void>,
      required: false
    },
    columns: {
      type: Number,
      default: 2
    },
    width: {
      type: String,
      default: '500px'
    },
    maxHeight: {
      type: String,
      default: '500px'
    },
    positiveText: {
      type: String,
      required: false,
      default: '确定'
    },
    negativeText: {
      type: String,
      required: false
    },
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  emits: ['onUpdate:modelValue'],
  slots: Object as SlotsType<{
    header: {};
    footer: {};
  }>,
  setup(props, { emit, slots }) {
    return () => (
      <NModal
        preset='dialog'
        show={props.visible}
        onClose={props.onClose}
        title={props.title}
        closable={true}
        onEsc={props.onClose}
        positiveText={props.positiveText}
        negativeText={props.negativeText}
        onPositiveClick={props.onPositiveClick}
        onNegativeClick={props.onNegativeClick}
        style={{
          width: props.width
        }}
      >
        {slots?.header?.({})}
        <div style={{ maxHeight: props.maxHeight, padding: '0 10px', overflow: 'auto' }}>
          <BasicForm
            formItems={props.formItems}
            columns={props.columns}
            showLabel={props.showLabel}
            modelValue={props.modelValue}
            onUpdate:modelValue={(value) => emit('onUpdate:modelValue', value)}
          />
        </div>
        {slots.footer?.({})}
      </NModal>
    );
  }
});
