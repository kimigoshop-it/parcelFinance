import { defineStore } from 'pinia';
import { queryPartitionListByCustomerId } from '@/service/api';
import { localStg } from '~/src/utils';

export const PartitionStore = defineStore('partition', {
  state: (): { customerPartitions: Map<number, IPartition> } => ({
    customerPartitions: new Map<number, IPartition>()
  }),
  getters: {
    getPartitions: (state) => () => {
      return state.customerPartitions;
    }
  },
  actions: {
    async init() {
      if(this.customerPartitions)
      this.customerPartitions = new Map<number, IPartition>();
      const userInfo: Auth.UserInfo = localStg.get('userInfo')!;
      const partitions = await queryPartitionListByCustomerId(userInfo.userId).then((res) => {
        console.log(res);
      });
    },
    setPartitions(partitions: IPartition[]) {
      partitions.forEach((partition) => {
        this.partitions.set(partition.id, partition);
      });
    }
  }
});
