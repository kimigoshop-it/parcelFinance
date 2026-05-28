export enum BillingMethod {
	/** 一口价 */
	FIXED_PRICE = 0,
	/** 重量区间固定价 */
	WEIGHT_INTERVAL_FIXED_PRICE = 1,
	/** 重量区间单价*重量 */
	WEIGHT_INTERVAL_PRICE_WEIGHT = 2,
	/** 区域区间固定价 */
	AREA_INTERVAL_FIXED_PRICE = 3,
	/** 区域区间单价*重量 */
	AREA_INTERVAL_PRICE_WEIGHT = 4,
	/** 区域重量区间固定价 */
	AREA_WEIGHT_INTERVAL_FIXED_PRICE = 5,
	/** 区域重量区间单价*重量 */
	AREA_WEIGHT_INTERVAL_PRICE_WEIGHT = 6,
	/**区域重量区间首续重模式*/
	AREA_WEIGHT_INTERVAL_FIRST_AND_FOREMOST = 7
}

export class PartitionWeightPrice {
	partitionId: number;
	fixed: boolean;
	price?: number;
	weightPrice: PriceRelatePartition[];

	constructor(partition: PriceRelatePartition[], fixed: boolean) {
		// 判断partition的所有元素id是否一致
		const partitionIds = partition.map((p) => p.partitionId);
		if (new Set(partitionIds).size !== 1) {
			throw new Error('分区id必须一致');
		}

		this.partitionId = partitionIds[0];
		this.fixed = fixed;
		this.weightPrice = partition;
	}

	public static mappedInstance(partition: PriceRelatePartition[], fixed: boolean): PartitionWeightPrice[] {
		const map = new Map<number, PartitionWeightPrice>();

		partition.forEach((p) => {
			let pwp = map.get(p.partitionId);
			if (pwp) {
				pwp.addWeightPrice(p);
			} else {
				pwp = new PartitionWeightPrice([p], fixed);
				map.set(p.partitionId, pwp);
			}
		});

		return Array.from(map.values());
	}

	addWeightPrice(weightPrice: PriceRelatePartition) {
		if (weightPrice.partitionId !== this.partitionId) {
			throw new Error('分区id必须一致');
		}
		this.weightPrice.push(weightPrice);
		this.weightPrice.sort((a, b) => a.beginWeight - b.beginWeight);
	}

	removeWeightPrice(idx: number) {
		this.weightPrice.splice(idx, 1);
	}

	public transferToPriceRelatePartition(): PriceRelatePartition[] {
		return this.weightPrice.map((wp) => ({
			partitionId: this.partitionId,
			beginWeight: wp.beginWeight,
			endWeight: wp.endWeight,
			firstWeightPrice: wp.firstWeightPrice,
			secondWeightPrice: wp.secondWeightPrice,
			weightType: wp.weightType,
			billingType: wp.billingType
		}));
	}
}

const priceEnumLabelMap = {
	billingMethod: {
		[BillingMethod.FIXED_PRICE]: '一口价',
		[BillingMethod.WEIGHT_INTERVAL_FIXED_PRICE]: '重量区间固定价',
		[BillingMethod.WEIGHT_INTERVAL_PRICE_WEIGHT]: '重量区间单价*重量',
		[BillingMethod.AREA_INTERVAL_FIXED_PRICE]: '区域区间固定价',
		[BillingMethod.AREA_INTERVAL_PRICE_WEIGHT]: '区域区间单价*重量',
		[BillingMethod.AREA_WEIGHT_INTERVAL_FIXED_PRICE]: '区域重量区间固定价',
		[BillingMethod.AREA_WEIGHT_INTERVAL_PRICE_WEIGHT]: '区域重量区间单价*重量',
		[BillingMethod.AREA_WEIGHT_INTERVAL_FIRST_AND_FOREMOST]: '区域重量区间首续重模式'
	}
};

export const getPriceEnumLabel = (enumName: keyof typeof priceEnumLabelMap, value: number) => {
	return priceEnumLabelMap[enumName][value];
};
