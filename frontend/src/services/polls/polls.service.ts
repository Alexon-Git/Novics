import { instance } from '../../api/api.interceptor'
import { IPollsCard } from '../../types/section.interface'

const PATH = 'polls'

export const PollsService = {
  async getPolls() {
    return await instance.get<IPollsCard[]>(`/${PATH}`)
  },
  async getPollsWithLimit(limit: string | number) {
    return await instance.get<IPollsCard[]>(`/${PATH}?_limit=${limit}`)
  },
  async createPoll(PollData: IPollsCard) {
    return await instance.post<IPollsCard>(`/${PATH}`, PollData)
  },
  async updatePollById(PollData: IPollsCard) {
    return await instance.put<IPollsCard>(
      `/${PATH}/${PollData.id}`,
      PollData
    )
  },
  async patchPollById(PollData: Partial<IPollsCard>) {
    return await instance.patch<IPollsCard>(
      `/${PATH}/${PollData.id}`,
      PollData
    )
  },
  async delPollById(PollData: IPollsCard) {
    return await instance.delete<void>(
      `/${PATH}/${PollData.id}`,
    )
  },
}
