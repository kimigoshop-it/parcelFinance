<template>
	<div class="h-full">
		<n-card class="shadow-sm rounded-16px" style="margin-bottom: 12px;">
			<SearchFrom @getSearch="getSearch"/>
			<tabs :tablist="tablist" @tabsemit="getTable" :tabindex="activeTabs" :tabname="'分类'"/>
		</n-card>
		<n-card class="shadow-sm rounded-16px">
			<div class="flex justify-end">
				<n-button @click="cliderive" ghost style="margin-bottom: 10px;">
					<template #icon>
						<svg-icon local-icon="uploadblue" style="color: #333;"/>
					</template>
					导出
				</n-button>
			</div>
			<KYTable ref="table" style="height: calc(100vh - 380px)" :colums="tableColums.cl" :table-data="tableColums.data"
			         :total="FromSearch.total" :selection="false" :serial-number="false" :pagination-show="true"
			         class="current"
			         @rowClick="rowClick" @page-change="pageChange($event)" @size-change="sizeChange($event)"
			         :operationWidth="180">
				<template #orderNumber="scope">
					<span class="oprationp" @click="getClick(scope.row)">{{ scope.row.platformCombinedOrderNumber }} </span>
				</template>
				<template #customsStatus="scope">
					<div @click.stop="">
						<n-tag :type="statusObjs[scope.row.combinedStatus].type">
							{{ statusObjs[scope.row.combinedStatus].value }}
						</n-tag>
					</div>
				</template>
			</KYTable>
		</n-card>
	</div>
</template>

<script setup lang="ts">
import {reactive, getCurrentInstance, nextTick, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import tabs from '@/components/tabs/index.vue';
import moment from "moment";
import {
	QueryCustomerOrderAllList,
	QuerySystemDictionaryDetailList,
	UpdateCustomerOrder,
	CustomerPutOnShelves, queryCustomerCombinedOrderList
} from '@/service';
import KYTable from '@/components/KY-table/KY-table.vue';
import useMousePosition from '@/hooks/common/validation';
import SearchFrom from './components/searchFrom.vue';

const route = useRoute();
const router = useRouter();

// 获取Component实例
const proxy = getCurrentInstance()?.proxy as any;
// ref
const instance = getCurrentInstance() as any;
const activeTabs = ref<undefined | number>(-1);

// 分页查询参数
const FromSearch = reactive({
	pageSize: 10,
	pageIndex: 1,
	total: null
});
const tablist = ref([
	{name: "全部", id: -1},
	{name: "待拣货", id: 0},
	{name: "待出库", id: 4},
	{name: "已出库", id: 5},
	{name: "已集包", id: 6},
	{name: "转运中", id: 7},
	{name: "清关中", id: 8},
	{name: "派送中", id: 9},
	{name: "已签收", id: 10},
	{name: "派送失败", id: 11},
	{name: "拒收", id: 12},
	{name: "取消", id: 13}
]);
const statusObjs = {
	0: {value: "待拣货", type: "warning"},
	1: {value: "开始拣货", type: "success"},
	2: {value: "拆包完成", type: "warning"},
	3: {value: "已合单", type: "warning"},
	4: {value: "待出库", type: "info"},
	5: {value: "已出库", type: "default"},
	6: {value: "已集包", type: "success"},
	7: {value: "转运中", type: "warning"},
	8: {value: "清关中", type: "error"},
	9: {value: "派送中", type: "info"},
	10: {value: "已签收", type: "default"},
	11: {value: "派送失败", type: "success"},
	12: {value: "拒收", type: "warning"},
	13: {value: "取消", type: "error"}
};
let model = reactive({
	platformCombinedOrderNumber: null,
	tmsCombinedOrderNumber: null,
	lastMileCombinedOrderNumber: null,
	customerId: null,
	orderBeginDateTime: null,
	orderEndDateTime: null,
	goodsType: null,
	combinedStatus: null,
});
// 表格参数
const tableColums = reactive({
	cl: [
		{
			minWidth: '180',
			prop: 'platformCombinedOrderNumber',
			label: '平台合包单号',
			fixed: 'fixed'
		},
		{
			minWidth: '180',
			prop: 'tmsCombinedOrderNumber',
			label: 'tms合包单号'
		},
		{
			minWidth: '180',
			prop: 'lastMileCombinedOrderNumber',
			label: '尾程合包单号'
		},
		{
			prop: 'billLadingNo',
			minWidth: '180',
			label: '提单号'
		},
		{
			prop: 'pnCode',
			minWidth: '180',
			label: '逆向单号'
		},
		{
			prop: 'pnCode',
			minWidth: '180',
			label: '合批提单号'
		},
		{
			prop: 'realityCrossWeight',
			minWidth: '180',
			label: '实际过线重量（kg）'
		},
		{
			minWidth: '180',
			prop: 'realityCrossVolume',
			label: '体积重量（Kg）'
		},
		{
			minWidth: '180',
			prop: 'customsStatus',
			label: '订单状态',
			slot: 'customsStatus'
		},
		{
			prop: 'customerName',
			minWidth: '180',
			label: '所属项目',
		},
		{
			prop: 'customsCompletedFailedDatetime',
			minWidth: '180',
			label: '进口清关完成/清关失败时间'
		},
		{
			minWidth: '180',
			prop: 'pickUpDateTime',
			label: '签收时间'
		},
		{
			minWidth: '180',
			prop: 'parcelPutOnShelvesDateTime',
			label: '包裹店上架时间'
		},
		{
			minWidth: '180',
			prop: 'goodsType',
			label: '货物类型'
		},
		{
			minWidth: '180',
			prop: 'createTime',
			label: '下单时间'
		}
	],
	data: [] as any
});

// 判断参数
const is = reactive({
	inputShow: ''
});
// 判断是否显示输入框
const inputShow = (key, index) => {
	return key + index === is.inputShow;
};
// 显示输入框
const inputShowClick = async (key, index) => {
	tableColums.data[index][key] = tableColums.data[index][key] === '--' ? null : tableColums.data[index][key];
	is.inputShow = key + index;
	nextTick(() => {
		instance.refs[key].focus();
	});
};
// 获取表格数据
const getTable = async (val?: any) => {
	const loading = proxy?.$loading({
		lock: true,
		text: '查询中...',
		background: 'rgba(0, 0, 0, 0.7)'
	});
	if (typeof val === "number") {
		activeTabs.value = val;
	}
	console.log(activeTabs.value);
	const {data} = await queryCustomerCombinedOrderList({
			...FromSearch, ...model,
			combinedStatus: activeTabs.value !== -1 ? [activeTabs.value] : []
		}
	);
	tableColums.data = proxy?.$Utils.placeholder(data.data);
	FromSearch.total = data.total;
	loading.close();
};
const cliderive = async () => {
	proxy?.$Utils.exportsWithoutDownload("/api/Financial/ExportCustomerCombinedOrderList", {
		...FromSearch,
		...model,
		combinedStatus: activeTabs.value !== -1 ? [activeTabs.value] : []
	});
};
// 隐藏输入框
const inputNoShow = async index => {
	const {data} = await UpdateCustomerOrder({
		realityCrossWeight:
			tableColums.data[index].realityCrossWeight === '--' ? null : tableColums.data[index].realityCrossWeight,
		realityCrossLength:
			tableColums.data[index].realityCrossLength === '--' ? null : tableColums.data[index].realityCrossLength,
		realityCrossWidth:
			tableColums.data[index].realityCrossWidth === '--' ? null : tableColums.data[index].realityCrossWidth,
		realityCrossHeight:
			tableColums.data[index].realityCrossHeight === '--' ? null : tableColums.data[index].realityCrossHeight,
		id: tableColums.data[index].id
	});
	if (data.code === 200) {
		window.$notification?.success({
			title: '成功',
			content: `${data.message}`,
			duration: 3000
		});
		is.inputShow = '';
		getTable(activeTabs.value);
	} else {
		window.$notification?.error({
			title: '失败',
			content: `${data.message}`,
			duration: 3000
		});
	}
};

const codeAllSelect = reactive({
	categoryAll: []
});
const rowClickNum = ref(0);

const getClick = (row: any) => {
	router.push({
		path: '/orderforgoods/detail',
		query: {
			id: row.id, activeTabs: activeTabs.value[0]
		}
	});
};
const rowClick = (row: any) => {
	rowClickNum.value += 1;
	console.log(row);
	setTimeout(() => {
		rowClickNum.value = 0;
	}, 200);
	if (rowClickNum.value >= 2) {
		router.push({
			path: '/orderforgoods/detail',
			query: {
				id: row.id
			}
		});
	}
};
// 获取所有品类
const getCategoryAll = async () => {
	const res = await QuerySystemDictionaryDetailList({
		dictionaryTypeCode: 'PL'
	});
	codeAllSelect.categoryAll = res.data.data;
};
getCategoryAll();

// 上架
const upLoading = async row => {
	const loading = proxy?.$loading({
		lock: true,
		text: '上架中...',
		background: 'rgba(0, 0, 0, 0.7)'
	});
	const {data} = await CustomerPutOnShelves({
		kySmallShipment: row.kySmallShipment
	});
	if (data.code === 200) {
		window.$notification?.success({
			title: '成功',
			content: `${data.message}`,
			duration: 3000
		});
		getTable(activeTabs.value);
		loading.close();
	} else {
		row!.customerGoodsCategory = '--';
		window.$notification?.error({
			title: '失败',
			content: `${data.message}`,
			duration: 3000
		});
		loading.close();
	}
};
const updatValue = async row => {
	const {data} = await UpdateCustomerOrder({
		id: row.id,
		customerGoodsCategory: row.customerGoodsCategory
	});
	if (data.code === 200) {
		window.$notification?.success({
			title: '成功',
			content: `${data.message}`,
			duration: 3000
		});
		getTable(activeTabs.value);
	} else {
		row!.customerGoodsCategory = '--';
		window.$notification?.error({
			title: '失败',
			content: `${data.message}`,
			duration: 3000
		});
		// window.$dialog!.error({
		//   title: '错误',
		//   content: data.message
		// });
	}
};
const updatValueIsProhibited = async row => {
	const {data} = await UpdateCustomerOrder({
		id: row.id,
		isProhibited: row.isProhibited
	});
	if (data.code === 200) {
		window.$notification?.success({
			title: '成功',
			content: `${data.message}`,
			duration: 3000
		});
		getTable(activeTabs.value);
	} else {
		row!.customerGoodsCategory = '--';
		window.$notification?.error({
			title: '失败',
			content: `${data.message}`,
			duration: 3000
		});
		// window.$dialog!.error({
		//   title: '错误',
		//   content: data.message
		// });
	}
};
// 查询
const getSearch = models => {
	model = {...models};
	getTable(activeTabs.value);
};
// 页码调整
const pageChange = pageIndex => {
	FromSearch.pageIndex = pageIndex.pageIndex;
	getTable(activeTabs.value);
};
const sizeChange = pageSize => {
	FromSearch.pageSize = pageSize.pageSize;
	getTable(activeTabs.value);
};
getTable(activeTabs.value);
</script>

<style scoped lang="scss">
.stybox {
	display: flex;
	align-items: center;
	justify-content: space-between;

	.n-button {
		height: 30px;
	}
}

.btn {
	margin-top: 20px;
	display: flex;
	justify-content: flex-end;
	margin-bottom: 10px;
}

.customerNames {
	display: flex;
	align-items: center;

	svg {
		color: red;
	}
}
</style>
