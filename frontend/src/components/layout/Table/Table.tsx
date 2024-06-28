import autoAnimate from '@formkit/auto-animate'
import { useEffect, useRef, useState } from 'react'
import getDate from '../../../utils/getDate'
import { TablesService } from '../../../services/tables/tables.service'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export default function Table() {
  const [isActive, setIsActive] = useState<'sheet_1' | 'sheet_2' | 'sheet_3'>(
    'sheet_1'
  )
  const [currentDate] = useState<string>(getDate())
  const query = useQuery({
    queryKey: ['genTable'],
    queryFn: TablesService.getGenTable
  })
  const parent = useRef(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  return (
    <section>
      <div className="hero mx-auto container my-20">
        <div className="w-full flex flex-col">
          <div ref={parent} className="mb-1">
            {isActive != 'sheet_3' ? (
              <div className="border bg-[#AEFF9A] py-4 font-bold text-[20px] text-center">
                Количество обучающихся в разрезе вузов по состоянию на
                {' ' + currentDate}
              </div>
            ) : (
              <></>
            )}

            <table className="table table-auto text-[20px] text-center ">
              <thead className="h-[142px] text-xl table-header-group border text-[#000]">
                <tr>
                  <th
                    className={`border ${isActive != 'sheet_3' ? 'bg-[#EBECFF]' : ''}`}
                    rowSpan={2}
                  >
                    №
                  </th>
                  <th
                    className={`border w-[23%] ${isActive != 'sheet_3' ? 'bg-[#EBECFF]' : ''}`}
                    rowSpan={2}
                  >
                    {isActive != 'sheet_1' ? 'Страна' : 'Вуз'}
                  </th>
                  <th
                    className={`border ${isActive != 'sheet_3' ? 'bg-[#EBECFF]' : ''}`}
                    colSpan={isActive != 'sheet_3' ? 4 : 5}
                  >
                    {isActive != 'sheet_3'
                      ? `Количество обучающихся по состоянию на ${currentDate}`
                      : `Всего обучается на ${currentDate},чел.`}
                  </th>
                  {isActive != 'sheet_3' ? (
                    <th rowSpan={2} className="border bg-[#EBECFF]">
                      Всего
                    </th>
                  ) : (
                    ''
                  )}
                </tr>
                <tr>
                  {isActive == 'sheet_3' ? (
                    <th rowSpan={2} className="border bg-[#EBECFF]">
                      Всего
                    </th>
                  ) : (
                    ''
                  )}
                  <th className="border bg-[#AEFF9A]">очно</th>
                  <th className="border bg-[#AEFF9A]">заочно</th>
                  <th className="border bg-[#AEFF9A]">очно-заочно</th>
                  <th className="border bg-[#AEFF9A] w-[183px] px-8">
                    Программы ДПО
                  </th>
                </tr>
              </thead>
              <tbody>
                {isActive &&
                  query.data?.data[isActive].map((row, index) => (
                    <tr key={index} className="text-center py-2">
                      <td className="border py-2">{row[0]}</td>
                      <td
                        className={`border px-4 ${isActive != 'sheet_1' ? 'text-center' : 'text-left'}`}
                      >
                        {row[1]}
                      </td>
                      <td className={`border`}>{row[2]}</td>
                      <td className="border">{row[3]}</td>
                      <td className="border">{row[4]}</td>
                      <td className="border">{row[5]}</td>
                      <td className={`border border-[#000] font-bold`}>
                        {row[6]}
                      </td>
                    </tr>
                  ))}
                {/* <tr className="text-center font-bold">
                  <td className="border"></td>
                  <td className="border">ИТОГО</td>
                  <td
                    className={`border ${isActive === 'sheet_3' ? 'bg-[#EBECFF] text-[#FF3A3A] border-[#000]' : ''}`}
                  >
                    14
                  </td>
                  <td className="border">14</td>
                  <td className="border">14</td>
                  <td className="border">14</td>
                  <td className="border">1</td>
                </tr> */}
              </tbody>
            </table>
          </div>
          {query.isSuccess && (
            <div className="flex justify-between">
              <div className="flex join rounded-none">
                <button
                  onClick={() => setIsActive('sheet_1')}
                  className={`join-item btn btn-outline px-4 py-2 font-semibold text-[20px] text-[#999] duration-200 ${
                    isActive === 'sheet_1' ? 'btn-active btn-primary' : ''
                  }`}
                >
                  Количество студентов в вузах
                </button>
                <button
                  onClick={() => setIsActive('sheet_2')}
                  className={`join-item btn btn-outline px-4 py-2 font-semibold text-[20px] text-[#999] duration-200 ${
                    isActive === 'sheet_2' ? 'btn-active btn-primary' : ''
                  }`}
                >
                  Количество студентов по странам
                </button>
                <button
                  onClick={() => setIsActive('sheet_3')}
                  className={`join-item btn btn-outline px-4 py-2 font-semibold text-[20px] text-[#999] duration-200 ${
                    isActive === 'sheet_3' ? 'btn-active btn-primary' : ''
                  }`}
                >
                  Очное обучение в разрезе стран
                </button>
              </div>
              <Link
                className="flex gap-2 items-center bg-primary text-base-100 font-medium rounded-md px-2 py-1"
                to={`https://novis.ddns.net${query.data.data.file}`}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Скачать
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16.6666L7 11.4583L8.4 9.94788L11 12.6562V4.16663H13V12.6562L15.6 9.94788L17 11.4583L12 16.6666ZM6 20.8333C5.45 20.8333 4.97933 20.6295 4.588 20.2218C4.19667 19.8142 4.00067 19.3236 4 18.75V15.625H6V18.75H18V15.625H20V18.75C20 19.3229 19.8043 19.8135 19.413 20.2218C19.0217 20.6302 18.5507 20.834 18 20.8333H6Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
