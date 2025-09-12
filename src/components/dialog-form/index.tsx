import BasicForm, { FormItem } from "@/components/basic-form";
import { NModal } from "naive-ui";
import { PropType, defineComponent } from "vue";

export default defineComponent({
	name: "DialogForm",
	props: {
		formItems: {
			type: Array as PropType<FormItem[]>,
			default: () => [],
		},
		modelValue: {
			type: Object as PropType<Record<string, any>>,
			required: true,
		},
		title: {
			type: String,
			default: "",
		},
		visible: {
			type: Boolean,
			default: false,
		},
		onClose: {
			type: Function as PropType<() => void>,
			required: false,
		},
		onPositiveClick: {
			type: Function as PropType<() => void>,
			required: false,
		},
		onNegativeClick: {
			type: Function as PropType<() => void>,
			required: false,
		},
		columns: {
			type: Number,
			default: 2,
		},
	},
  emits: ["update:modelValue"],
	setup(props, { emit }) {
		return () => (
			<NModal
				preset="dialog"
				show={props.visible}
				onClose={props.onClose}
				title={props.title}
				closable={true}
				onEsc={props.onClose}
				positiveText="确定"
				onPositiveClick={props.onPositiveClick}
				onNegativeClick={props.onNegativeClick}
			>
				<BasicForm
					formItems={props.formItems}
					columns={props.columns}
					modelValue={props.modelValue}
					onUpdate:modelValue={(value) => emit("update:modelValue", value)}
				/>
			</NModal>
		);
	},
});
