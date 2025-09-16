import { CountryStore } from './country';
import { PartitionStore } from './partition';

export const useBusinessStore = () => {
  return {
    country: CountryStore(),
    partition: PartitionStore()
  };
};

export default useBusinessStore;
