import { CountryStore } from './country';

export const useBusinessStore = () => {
  return {
    country: CountryStore(),
  };
};

export default useBusinessStore;
