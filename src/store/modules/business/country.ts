import { defineStore } from 'pinia';
import { CountryConfig } from '@/views/settlement/settlement_area/model';

export const CountryStore = defineStore('country', {
  state: (): { countries: Map<number, CountryConfig> } => ({
    countries: new Map<number, CountryConfig>()
  }),
  getters: {
    getCountry: (state) => (countryId: number) => {
      return state.countries.get(countryId);
    }
  },
  actions: {
    setCountry(country: CountryConfig) {
      this.countries.set(country.id, country);
    }
  }
});
