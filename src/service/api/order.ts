import { mockRequest } from "../request";

//退运订单列表
export function QueryReturnOrderList(data: any) {
  return mockRequest({
    url: '/api/CustomerReturnOrder/QueryReturnOrderList',
    method: 'post',
    data
  });
}

//退运订单详情
export function QueryReturnOrderDetail(data: any) {
  return mockRequest({
    url: `/api/CustomerReturnOrder/QueryReturnOrderDetails?id=${data.id}`,
    method: "get"
  });
}

//退货订单路由轨迹
export function QueryReturnOrderRoute(data: any) {
  return mockRequest({
    url: "/api/CustomerReturnOrder/QueryCustomerRetrunOrderRoute",
    method: "post",
    data
  });
}
//退货订单操作日志
export function QueryCustomerRetrunOrderLog(data: any) {
  return mockRequest({
    url: `/api/CustomerReturnOrder/QueryCustomerRetrunOrderLog?returnOrderId=${data.id}`,
    method: "get"
  });
}