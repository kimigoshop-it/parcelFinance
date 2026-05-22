import { mockRequest } from "../request";

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
	return mockRequest.post<boolean>("/getSmsCode", { phone });
}

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export function fetchLogin(userName: string, password: string) {
	return mockRequest.post("/api/Login/Login", { userName, password });
}

/** 获取用户信息 */
export function fetchUserInfo() {
	return mockRequest.get("/api/Login/QuerySystemUserEntity");
}
// 修改密码
export function UpdateParcelShopPassword(data) {
	return mockRequest({
		url: "/api/ParcelShop/UpdateParcelShopPassword",
		method: "post",
		data,
	});
}

/**
 * 查询客户订单
 */
export function QueryCustomerOrderAllList(data: any) {
	return mockRequest({
		url: "/api/CustomerOrder/QueryCustomerOrderAllList",
		method: "post",
		data,
	});
}
/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function QuerySystemMenuByUserId(data: any) {
	return mockRequest({
		url: "/api/Login/QuerySystemMenuByUserId",
		method: "get",
		params: data,
	});
}
/**
 * 查询系统字典服务
 */
export function QuerySystemDictionaryList(data: any) {
	return mockRequest({
		url: "/api/SystemDictionary/QuerySystemDictionaryList",
		method: "post",
		data,
	});
}
/**
 * 新增修改系统字典服务
 */
export function AddAndUpdateSystemDictionaryModel(data: any) {
	return mockRequest({
		url: "/api/SystemDictionary/AddAndUpdateSystemDictionaryModel",
		method: "post",
		data,
	});
}
/**
 * 新增修改字典详情
 */
export function AddAndUpdateSystemDictionaryDetailModel(data: any) {
	return mockRequest({
		url: "/api/SystemDictionary/AddAndUpdateSystemDictionaryDetailModel",
		method: "post",
		data,
	});
}

/**
 * 查询字典详情
 */
export function QuerySystemDictionaryDetailList(data: any) {
	return mockRequest({
		url: "/api/SystemDictionary/QuerySystemDictionaryDetailList",
		method: "post",
		data,
	});
}
/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(refreshToken: string) {
	return mockRequest.post<ApiAuth.Token>("/updateToken", { refreshToken });
}

/**
 * 查询字典详情
 */
export function UpdateCustomerOrder(data: any) {
	return mockRequest({
		url: "/api/CustomerOrder/UpdateCustomerOrder",
		method: "post",
		data,
	});
}
export function CustomerPutOnShelves(data: any) {
	return mockRequest({
		url: "/api/Warehouse/CustomerPutOnShelves",
		method: "post",
		data,
	});
}

//账单查询
export function QueryFinancialStatement(data: any) {
	return mockRequest({
		url: "/api/FinancialStatement/QueryFinancialStatement",
		method: "post",
		data,
	});
}

//账单查询详情
export function QueryFinancialStatementDetails(data: any) {
	return mockRequest({
		url: "/api/FinancialStatement/QueryFinancialStatementDetails",
		method: "post",
		data,
	});
}

//添加账单
export function UpdateFinancialStatementEntity(data: any) {
	return mockRequest({
		url: "/api/FinancialStatement/UpdateFinancialStatementEntity",
		method: "post",
		data,
	});
}

//新增查询是否有数据
export function SelectFinancialStatementDetails(data: any) {
	return mockRequest({
		url: "/api/FinancialStatement/SelectFinancialStatementDetails",
		method: "post",
		data,
	});
}

//新增账单详情
export function AddFinancialStatementDetails(data: any) {
	return mockRequest({
		url: "/api/FinancialStatement/AddFinancialStatementDetails",
		method: "post",
		data,
	});
}

//删除账单详情
export function DeleteFinancialStatementDetails(
	id: number,
	financialId: number
) {
	return mockRequest({
		url: `/api/FinancialStatement/DeleteFinancialStatementDetails?id=${id}&financialId=${financialId}`,
		method: "get",
	});
}

//服务费列表
export function QueryPriceList(data: any) {
	return mockRequest({
		url: "/api/FinancialStatement/QueryPriceList",
		method: "post",
		data,
	});
}

//价格表修改
export function UpdatePriceList(data: any) {
	return mockRequest({
		url: "/api/FinancialStatement/UpdatePriceList",
		method: "post",
		data,
	});
}

//查询账单历史记录
export function QueryHistoryPrice(data: any) {
	return mockRequest({
		url: "/api/FinancialStatement/QueryHistoryPrice",
		method: "post",
		data,
	});
}

//渲染价格数据，文件转列表
export function PriceListExcel(data: any) {
	return mockRequest({
		url: "/api/FinancialStatement/PriceListExcel",
		method: "post",
		data,
	});
}

//上传保存添加价格信息
export function AddPriceListExcel(data: any) {
	return mockRequest({
		url: "/api/FinancialStatement/AddPriceListExcel",
		method: "post",
		data,
	});
}

//上传保存添加价格信息
export function QueryFinancial(id: number) {
	return mockRequest({
		url: `/api/FinancialStatement/QueryFinancial?id=${id}`,
		method: "get",
	});
}

//中转站拒收列表数据
export function QueryParcelShopRejectList(data: any) {
	return mockRequest({
		url: "/api/ParcelShop/QueryParcelShopRejectList",
		method: "post",
		data,
	});
}
// 查询订单路由信息
export function QueryCustomerOrderRoutingEntities(data: any) {
	return mockRequest({
		url: "/api/CustomerOrder/QueryCustomerOrderRoutingEntities",
		method: "get",
		params: data,
	});
}
// 查询订单日志信息
export function QueryCustomerOrderStorageLogsEntities(data: any) {
	return mockRequest({
		url: "/api/CustomerOrder/QueryCustomerOrderStorageLogsEntities",
		method: "get",
		params: data,
	});
}
// 查询订单详情
export function QueryCustomerOrderDetail(data: any) {
	return mockRequest({
		url: "/api/CustomerOrder/QueryCustomerOrderDetail",
		method: "get",
		params: data,
	});
}

/**
 * 查询客户订单
 */
export function queryCustomerCombinedOrderList(data: any) {
	return mockRequest({
		url: "/api/Financial/QueryCustomerCombinedOrderList",
		method: "post",
		data,
	});
}

export function QueryCustomerBaseInfoList(data: any) {
	return mockRequest({
		url: "/api/CustomerBasicInfo/QueryCustomerBaseInfoList",
		method: "post",
		data
	});
}
