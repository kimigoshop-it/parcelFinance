<template>
	<div>
		<div>
			<n-form ref="formRef" label-placement="left" :model="model">
				<n-grid x-gap="12" :cols="5">
					<n-gi>
						<n-popconfirm class="box" :show-icon="false" v-model:show="show">
							<template #trigger>
								<n-input
									v-model:value="model.returnOrderNumber"
									clearable
									style="width: 97%; cursor: pointer"
									placeholder="订单号（PRO开头）综合搜索"
									@change="getSearch"
									@keydown="handleEnterKeyinput"
									@keyup="handleEnterKeyKeyupinput"
								>
									<template #suffix>
										<svg-icon local-icon="amplification" style="font-size: 14px"/>
									</template>
								</n-input>
							</template>
							<div class="popbox">
								<n-input
									type="textarea"
									v-model:value="textareaValue"
									ref="myInput"
									@change="getSearch"
									@keydown.enter="getSearch"
									@paste="handlePaste"
									:rows="5"
									show-count
									@keydown="handleEnterKey"
									@keyup="handleEnterKeyKeyup"
									:placeholder="`订单号（PRO开头）搜索，多个单号请用Enter键或者空格键分隔`"
								>
									<template #suffix>
										<svg-icon
											local-icon="packup"
											style="font-size: 18px; cursor: pointer; margin-bottom: 4px"
											@click="show = false"
										/>
									</template>
								</n-input>
							</div>
							<template #action>
								<div style="display: flex; justify-content: space-between; width: 100%">
									<n-button size="small" @click="handleNegativeClick"> 清空</n-button>
									<n-button size="small" type="error" color="#D04446" @click="getSearch"> 查询</n-button>
								</div>
							</template>
						</n-popconfirm>
					</n-gi>
					<n-gi>
						<n-popconfirm class="box" :show-icon="false" v-model:show="smallshow">
							<template #trigger>
								<n-input
									v-model:value="model.returnSmallShipment"
									clearable
									style="width: 97%; cursor: pointer"
									placeholder="运单号综合搜索"
									@change="getSearch"
									@keydown="returnSmallhandleEnterKeyinput"
									@keyup="returnSmallhandleEnterKeyKeyupinput"
								>
									<template #suffix>
										<svg-icon local-icon="amplification" style="font-size: 14px"/>
									</template>
								</n-input>
							</template>
							<div class="popbox">
								<n-input
									type="textarea"
									v-model:value="returnSmallTextareaValue"
									ref="myInput"
									@change="getSearch"
									@keydown.enter="getSearch"
									@paste="returnSmallhandlePaste"
									:rows="5"
									show-count
									@keydown="returnSmallhandleEnterKey"
									@keyup="returnSmallhandleEnterKeyKeyup"
									:placeholder="`运单号搜索，多个单号请用Enter键或者空格键分隔`"
								>
									<template #suffix>
										<svg-icon
											local-icon="packup"
											style="font-size: 18px; cursor: pointer; margin-bottom: 4px"
											@click="show = false"
										/>
									</template>
								</n-input>
							</div>
							<template #action>
								<div style="display: flex; justify-content: space-between; width: 100%">
									<n-button size="small" @click="returnSmallhandleNegativeClick"> 清空</n-button>
									<n-button size="small" type="error" color="#D04446" @click="getSearch"> 查询</n-button>
								</div>
							</template>
						</n-popconfirm>
					</n-gi>
					<n-gi>
						<n-form-item path="consignerMobile">
							<n-input
								v-model:value="model.consignerMobile"
								clearable
								@keydown.enter="getSearch"
								placeholder="寄件手机号"
							/>
						</n-form-item>
					</n-gi>
					<n-gi>
						<n-form-item path="cityId">
							<n-select
								placeholder="寄件城市"
								style="margin-right: 10px"
								label-field="cityName"
								value-field="id"
								clearable
								filterable
								:options="cityList"
								v-model:value="model.cityId"
							/>
						</n-form-item>
					</n-gi>
					<n-gi>
						<n-form-item path="range">
							<n-date-picker
								v-model:value="range"
								start-placeholder="下单开始时间"
								end-placeholder="下单结束时间"
								type="datetimerange"
								clearable
							/>
						</n-form-item>
					</n-gi>
				</n-grid>
				<n-grid x-gap="12" :cols="5">
					<n-gi>
						<n-form-item path="range">
							<n-date-picker
								v-model:value="dateRanges.pickDateRange"
								@change="fetchParcelTableData"
								type="daterange"
								update-value-on-close
								:actions="['clear']"
								start-placeholder="揽收开始日期"
								end-placeholder="揽收结束日期"
								clearable
								:is-date-disabled="disabledDate"
								style="width: 97%;"
							/>
						</n-form-item>
					</n-gi>
					<n-gi>
						<n-form-item path="range">
							<n-date-picker
								v-model:value="dateRanges.signDateRange"
								@change="fetchSignParcelTableData"
								type="daterange"
								update-value-on-close
								:actions="['clear']"
								start-placeholder="签收开始日期"
								end-placeholder="签收结束日期"
								clearable
								:is-date-disabled="disabledDate"
								style="width: 97%;"
							/>
						</n-form-item>
					</n-gi>
					<n-gi>
						<n-button type="error" color="#D04446" style="margin-left: 20px" @click="getSearch"> 查询</n-button>
						<n-button style="margin-left: 20px" @click="editemits"> 重置</n-button>
					</n-gi>
				</n-grid>
			</n-form>
		</div>
	</div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {QueryCityConfigList} from "@/service";
import moment from "moment";

const emit = defineEmits(["getSearch"]);
const range = ref(null) as any;
const textareaValue = ref("");
const returnSmallTextareaValue = ref("");
const show = ref(false);
const smallshow = ref(false);

const model = reactive<any>({
	cityId: null,
	returnOrderNumber: null,
	consignerMobile: null,
	startTime: null,
	endTime: null,
	returnSmallShipment: null,
	beginPickUpTime: null,
	endPickUpTime: null
});

const cityList = ref([]);
const getCityAll = async () => {
	const {data} = await QueryCityConfigList({
		pageSize: 1000,
		pageIndex: 1
	});
	console.log("data: ", data);
	cityList.value = data.data;
};
getCityAll();

const editemits = () => {
	Object.assign(model, {
		cityId: null,
		returnOrderNumber: null,
		consignerMobile: null,
		startTime: null,
		endTime: null
	});
	range.value = null;
	emit("getSearch", model);
};

const getSearch = () => {
	range.value ? (model.startTime = moment(range.value[0]).format("YYYY-MM-DD HH:mm:ss")) : (model.startTime = null);
	range.value ? (model.endTime = moment(range.value[1]).format("YYYY-MM-DD HH:mm:ss")) : (model.endTime = null);
	emit("getSearch", model);
};

const handleEnterKeyinput = (event: any) => {
	if (event.code === "Comma" || event.code === "Semicolon" || event.code === "Backslash" || event.code === "Space") {
		event.preventDefault();
	}
	if (event.code === "Enter") {
		getSearch();
	}
};
const handleEnterKeyKeyupinput = () => {
	if (model.returnOrderNumber) {
		model.returnOrderNumber = model.returnOrderNumber.replace(/[,;，；、]/g, ",").replace(/,+/g, ",");
		textareaValue.value = model.returnOrderNumber.replace(/,/g, "\n");
	}
};

const handleNegativeClick = () => {
	model.returnOrderNumber = null;
	textareaValue.value = "";
	getSearch();
	show.value = true;
};

const handlePaste = (event: any) => {
	const selectionStart = event.target.selectionStart;
	const selectionEnd = event.target.selectionEnd;
	event.preventDefault();

	if (selectionStart !== selectionEnd) {
		textareaValue.value = textareaValue.value.slice(0, selectionStart) + textareaValue.value.slice(selectionEnd);
		if (textareaValue.value) {
			const pastedData = `${textareaValue.value},${event.clipboardData.getData("text")}`;
			textareaValue.value = pastedData.replace(/[\s,;]/g, "\n");
		} else {
			const pastedData = event.clipboardData.getData("text");
			textareaValue.value = pastedData.replace(/[\s,;]/g, "\n");
		}
	} else {
		if (textareaValue.value) {
			const pastedData = `${textareaValue.value},${event.clipboardData.getData("text")}`;
			textareaValue.value = pastedData.replace(/[\s,;]/g, "\n");
		} else {
			const pastedData = event.clipboardData.getData("text");
			textareaValue.value = pastedData.replace(/[\s,;]/g, "\n");
		}
	}
};

const handleEnterKey = (event: any) => {
	if (
		event.code === "Comma" ||
		event.code === "Semicolon" ||
		event.code === "Backslash" ||
		event.code === "Enter" ||
		event.code === "Space"
	) {
		event.preventDefault();
		textareaValue.value += "\n";
	}
};

const handleEnterKeyKeyup = () => {
	textareaValue.value = textareaValue.value.replace(/\n\s*\n/g, "\n").replace(/[,;，；、]/g, "");
	model.returnOrderNumber = textareaValue.value.replace(/\n/g, ",").replace(/\s/g, "").replace(/,$/, "");
};

//退运单的运单号
const returnSmallhandlePaste = (event: any) => {
	const selectionStart = event.target.selectionStart;
	const selectionEnd = event.target.selectionEnd;
	event.preventDefault();

	if (selectionStart !== selectionEnd) {
		returnSmallTextareaValue.value = returnSmallTextareaValue.value.slice(0, selectionStart) + textareaValue.value.slice(selectionEnd);
		if (returnSmallTextareaValue.value) {
			const pastedData = `${returnSmallTextareaValue.value},${event.clipboardData.getData("text")}`;
			returnSmallTextareaValue.value = pastedData.replace(/[\s,;]/g, "\n");
		} else {
			const pastedData = event.clipboardData.getData("text");
			returnSmallTextareaValue.value = pastedData.replace(/[\s,;]/g, "\n");
		}
	} else {
		if (returnSmallTextareaValue.value) {
			const pastedData = `${returnSmallTextareaValue.value},${event.clipboardData.getData("text")}`;
			returnSmallTextareaValue.value = pastedData.replace(/[\s,;]/g, "\n");
		} else {
			const pastedData = event.clipboardData.getData("text");
			returnSmallTextareaValue.value = pastedData.replace(/[\s,;]/g, "\n");
		}
	}
};

const returnSmallhandleEnterKey = (event: any) => {
	if (
		event.code === "Comma" ||
		event.code === "Semicolon" ||
		event.code === "Backslash" ||
		event.code === "Enter" ||
		event.code === "Space"
	) {
		event.preventDefault();
		returnSmallTextareaValue.value += "\n";
	}
};

const returnSmallhandleEnterKeyKeyup = () => {
	returnSmallTextareaValue.value = returnSmallTextareaValue.value.replace(/\n\s*\n/g, "\n").replace(/[,;，；、]/g, "");
	model.returnSmallShipment = returnSmallTextareaValue.value.replace(/\n/g, ",").replace(/\s/g, "").replace(/,$/, "");
};

const returnSmallhandleEnterKeyinput = (event: any) => {
	if (event.code === "Comma" || event.code === "Semicolon" || event.code === "Backslash" || event.code === "Space") {
		event.preventDefault();
	}
	if (event.code === "Enter") {
		getSearch();
	}
};

const returnSmallhandleEnterKeyKeyupinput = () => {
	if (model.returnSmallShipment) {
		model.returnSmallShipment = model.returnSmallShipment.replace(/[,;，；、]/g, ",").replace(/,+/g, ",");
		returnSmallTextareaValue.value = model.returnSmallShipment.replace(/,/g, "\n");
	}
};

const returnSmallhandleNegativeClick = () => {
	model.returnSmallShipment = null;
	returnSmallTextareaValue.value = "";
	getSearch();
	smallshow.value = true;
};

type DateRange = [number, number] | null;
const dateRanges = reactive({
	pickDateRange: null as DateRange,
	signDateRange: null as DateRange
});


const fetchParcelTableData = async () => {
	const [startTime, endTime] = dateRanges.pickDateRange || [];
	model.beginPickUpTime = startTime ? formatDateTime(startTime) : null;
	model.endPickUpTime = endTime ? formatDateTime(endTime) : null;
	console.log(model)
	getSearch();
};

const fetchSignParcelTableData = async () => {
	const [startTime, endTime] = dateRanges.signDateRange || [];
	model.beginSignTime = startTime ? formatDateTime(startTime) : null;
	model.endSignTime = endTime ? formatDateTime(endTime) : null;
	console.log(model)
	getSearch();
};

const formatDateTime = (dateTime: any) => moment(dateTime).format("YYYY-MM-DD");

const disabledDate = (ts: number, type: "start" | "end", range: [number, number] | null) => {
	const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

	// 辅助函数：检查日期范围是否超过一个月
	const isRangeExceedOneMonth = (start, end) => {
		const startOfStart = start.clone().startOf("day");
		const startOfEnd = end.clone().startOf("day");
		const duration = moment.duration(startOfEnd.diff(startOfStart));
		const oneMonthInMs = moment(startOfStart).add(1, "months").diff(startOfStart, "milliseconds");
		return duration.asMilliseconds() >= oneMonthInMs;
	};

	if (type === "start" && range !== null) {
		const startMoment = moment(ts);
		const endMoment = moment(range[1]);
		// 检查范围是否超过一个月
		if (isRangeExceedOneMonth(startMoment, endMoment)) {
			return true;
		}
		return false;
	}

	if (type === "end" && range !== null) {
		const startMoment = moment(range[0]);
		const endMoment = moment(ts);
		// 检查范围是否超过一个月
		if (isRangeExceedOneMonth(startMoment, endMoment)) {
			return true;
		}
		return false;
	}

	return false;
};

</script>

<style scoped>
.popbox {
	width: 17vw;

	::v-deep(.n-input-wrapper) {
		flex-direction: column !important;
	}

	::v-deep(.n-input__suffix) {
		justify-content: flex-end;
	}
}
</style>
