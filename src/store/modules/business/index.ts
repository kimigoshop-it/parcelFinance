import { CountryStore } from './country';
import { PartitionStore } from './partition';

export const businessStore = {
  country: CountryStore(),
  partition: PartitionStore()
};

export default businessStore;
