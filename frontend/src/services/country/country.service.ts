import { instance } from '../../api/api.interceptor'
import { ICountry } from './country.interface'

const PATH = 'country'

export const CountryService = {
  async getCountries() {
    return await instance.get<ICountry[]>(`/${PATH}/list`)
  },
  async getCountryById(id: string | number) {
    return await instance.get<ICountry>(`/${PATH}/${id}`)
  },
  async getCountryByName(name: string) {
    return await instance.get<ICountry>(`/${PATH}?name=${name}`)
  }
}
