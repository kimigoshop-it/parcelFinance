import { ElLoading } from "element-plus";
// import download from 'downloadjs';
import { mockRequest } from "@/service/request";

export default class Utils {

	//无下载动作
	static exportsWithoutDownload = (url, params = {}) => {
		const pageloading = ElLoading.service({
			lock: true,
			text: "导出中。。。",
			spinner: "el-icon-loading",
			background: "rgba(0, 0, 0, 0.7)"
		});
		console.log(params);
		mockRequest({
			url,
			method: "post",
			data: params,
			responseType: "blob"
		})
			.then((res) => {
				const blob = new Blob([res.data], { type: res.data.type });
				const reader = new FileReader();

				// 读取 Blob 数据为文本
				reader.onload = () => {
					try {
						const result = JSON.parse(reader.result as string);
						if (result.code === 200) {
							window.$notification?.success({
								title: "导出成功",
								content: "请前往导出记录看板中查看",
								duration: 3000
							});
						} else {
							window.$notification?.error({
								title: "导出失败",
								content: result.message || "未知错误",
								duration: 3000
							});
						}
					} catch (error) {
						console.error("解析导出结果失败", error);
						window.$notification?.error({
							title: "导出失败",
							content: "解析导出结果失败",
							duration: 3000
						});
					}
				};

				reader.readAsText(blob); // 将 Blob 数据读取为文本
				pageloading.close();
			})
			.catch((err) => {
				console.error("导出请求失败", err);
				window.$notification?.error({
					title: "导出失败",
					content: "导出请求失败，请稍后重试",
					duration: 3000
				});
				pageloading.close();
			});
	};


	// 导出
	static exports = (url, params = {}, name) => {
		const pageloading = ElLoading.service({
			lock: true,
			text: "导出中。。。",
			spinner: "el-icon-loading",
			background: "rgba(0, 0, 0, 0.7)",
		});
		console.log(params);
		mockRequest({
			url,
			method: "get",
			params,
			responseType: "blob",
		})
			.then((res) => {
				console.log(res);

				const blob = new Blob([res.data], { type: res.data.type });
				if (window.navigator && window.navigator.msSaveOrOpenBlob) {
					window.navigator.msSaveOrOpenBlob(res, `${name}.pdf`);
				} else {
					const downloadElement = document.createElement("a");
					const href = window.URL.createObjectURL(blob);
					downloadElement.href = href;
					downloadElement.download = `${name}.pdf`;
					document.body.appendChild(downloadElement);
					downloadElement.click();
					document.body.removeChild(downloadElement);
					window.URL.revokeObjectURL(href);
				}
				pageloading.close();
			})
			.catch(function (err) {
				pageloading.close();
			});
	};

	// post请求导出
	static exportsPost = (url, params = {}, name, type = "xls") => {
		const pageloading = ElLoading.service({
			lock: true,
			text: "导出中。。。",
			spinner: "el-icon-loading",
			background: "rgba(0, 0, 0, 0.7)",
		});
		console.log(params);
		mockRequest({
			url,
			method: "post",
			data: params,
			responseType: "blob",
		})
			.then((res) => {
				// const currTime = moment().format("YYYYMMDDHHmmss");
				const blob = new Blob([res.data], { type: res.data.type });
				if (window.navigator && window.navigator.msSaveOrOpenBlob) {
					window.navigator.msSaveOrOpenBlob(res, `${name}.${type}`);
				} else {
					const downloadElement = document.createElement("a");
					const href = window.URL.createObjectURL(blob);
					downloadElement.href = href;
					downloadElement.download = `${name}.${type}`;
					document.body.appendChild(downloadElement);
					downloadElement.click();
					document.body.removeChild(downloadElement);
					window.URL.revokeObjectURL(href);
				}
				pageloading.close();
			})
			.catch(function (err) {
				// this.exportLoading = false;
				pageloading.close();
				console.log(err);
			});
	};
	// post请求导入
	static uplodPost = (url: string, file: any) => {
		return new Promise((res) => {
			const loading = ElLoading.service({
				lock: true,
				text: "正在导入...",
				background: "rgba(0, 0, 0, 0.7)",
			});
			try {
				const formdata = new FormData();
				formdata.append("file", file);
				mockRequest({
					url,
					method: "post",
					data: formdata,
				})
					.then(({ data }) => {
						// console.log("data", data);
						if (data.code === 200) {
							window.$notification?.success({
								title: "成功",
								content: "获取导入数据成功",
								duration: 3000,
							});
						} else {
							window.$notification?.error({
								title: "失败",
								content: `${data.message}`,
								duration: 3000,
							});
						}
						loading.close();
						res(data);
					})
					.catch(() => {
						loading.close();
					});
			} catch (error) {
				loading.close();
				console.log(error);
			}
		});
	};
	// 列表为空则修改为--
	static placeholder = (data) => {
		if (data) {
			data.forEach((item) => {
				const arr = [null, "", "1900-0-01", -1, undefined];
				const reg = /^[1900]*-[01]*-[01]+.*$/;
				for (const key in item) {
					if (arr.includes(item[key]) || reg.test(item[key])) {
						item[key] = "--";
					}
				}
			});
			return data;
		}
		return [];
	};
}
