import { instance } from '../../api/api.interceptor'
import { IUniversity } from './university.interface'


const PATH = 'university'

export const UniversityService = {
  async getUniversities() {
    return await instance.get<IUniversity[]>(`/${PATH}/list`)
  },
  async getUniversityById(id: string | number) {
    return await instance.get<IUniversity>(`/${PATH}/${id}`)
  },
  async getUniversityByName(name: string) {
    return await instance.get<IUniversity>(`/${PATH}?name=${name}`)
  }
}