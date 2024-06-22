import autoAnimate from '@formkit/auto-animate'
import { useEffect, useRef, useState } from 'react'

export default function Table() {
  const [isActive, setIsActive] = useState<string>('uni')
  const parent = useRef(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  return (
    <section>
      <div className="hero mx-auto container my-20">
        <div className="w-full flex flex-col">
          <div ref={parent} className="mb-1">
            {isActive != 'partTime' ? (
              <div className="border bg-[#AEFF9A] py-4 font-bold text-[20px] text-center">
                Количество обучающихся в разрезе вузов по состоянию на
                01.10.2024г.
              </div>
            ) : (
              <></>
            )}

            <table className="table table-auto text-[20px] text-center ">
              <thead className="h-[142px] text-xl table-header-group border text-[#000]">
                <tr>
                  <th
                    className={`border ${isActive != 'partTime' ? 'bg-[#EBECFF]' : ''}`}
                    rowSpan={2}
                  >
                    №
                  </th>
                  <th
                    className={`border w-[23%] ${isActive != 'partTime' ? 'bg-[#EBECFF]' : ''}`}
                    rowSpan={2}
                  >
                    {isActive != 'uni' ? 'Страна' : 'Вуз'}
                  </th>
                  <th
                    className={`border ${isActive != 'partTime' ? 'bg-[#EBECFF]' : ''}`}
                    colSpan={isActive != 'partTime' ? 4 : 5}
                  >
                    {isActive != 'partTime'
                      ? 'Количество обучающихся по состоянию на 01.10.2024г.'
                      : 'Всего обучается на 01.10.2021г.,чел.'}
                  </th>
                  {isActive != 'partTime' ? (
                    <th rowSpan={2} className="border bg-[#EBECFF]">
                      Всего
                    </th>
                  ) : (
                    ''
                  )}
                </tr>
                <tr>
                  {isActive == 'partTime' ? (
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
                <tr className="text-center py-2">
                  <td className="border py-2">0000</td>
                  <td
                    className={`border px-4 ${isActive != 'uni' ? 'text-center' : 'text-left'}`}
                  >
                    1111
                  </td>
                  <td
                    className={`border ${isActive === 'partTime' ? 'bg-[#EBECFF]' : ''}`}
                  >
                    2222
                  </td>
                  <td className="border">33333</td>
                  <td className="border">4444</td>
                  <td className="border">55555</td>
                  <td
                    className={`border border-[#000] font-bold ${isActive != 'partTime' ? 'text-[#FF3A3A]' : ''}`}
                  >
                    66666
                  </td>
                </tr>
                <tr className="text-center font-bold">
                  <td className="border"></td>
                  <td className="border">ИТОГО</td>
                  <td
                    className={`border ${isActive === 'partTime' ? 'bg-[#EBECFF] text-[#FF3A3A] border-[#000]' : ''}`}
                  >
                    14
                  </td>
                  <td className="border">14</td>
                  <td className="border">14</td>
                  <td className="border">14</td>
                  <td className="border">1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex join rounded-none">
            <button
              onClick={() => setIsActive('uni')}
              className={`join-item btn btn-outline px-4 py-2 font-semibold text-[20px] text-[#999] duration-200 ${
                isActive === 'uni' ? 'btn-active btn-primary' : ''
              }`}
            >
              Количество студентов в вузах
            </button>
            <button
              onClick={() => setIsActive('countries')}
              className={`join-item btn btn-outline px-4 py-2 font-semibold text-[20px] text-[#999] duration-200 ${
                isActive === 'countries' ? 'btn-active btn-primary' : ''
              }`}
            >
              Количество студентов по странам
            </button>
            <button
              onClick={() => setIsActive('partTime')}
              className={`join-item btn btn-outline px-4 py-2 font-semibold text-[20px] text-[#999] duration-200 ${
                isActive === 'partTime' ? 'btn-active btn-primary' : ''
              }`}
            >
              Очное обучение в разрезе стран
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
