import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useRef, useState } from 'react'
import autoAnimate from '@formkit/auto-animate'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CountryService } from '../../../services/country/country.service'
import { ICountry } from '../../../services/country/country.interface'
import { IUniversity } from '../../../services/university/university.interface'
import { UniversityService } from '../../../services/university/university.service'
import { TablesService } from '../../../services/tables/tables.service'
import { Bounce, toast } from 'react-toastify'
import { ITable, ITableResponse } from '../../../services/tables/tables.inteface'

const UploadFileForm = () => {
  const queryClient = useQueryClient()
  const countries = useQuery({
    queryKey: ['countries'],
    queryFn: CountryService.getCountries
  })
  const universities = useQuery({
    queryKey: ['universities'],
    queryFn: UniversityService.getUniversities
  })
  const mutationFile = useMutation({
    mutationFn: TablesService.createTable,
    onError: () => {
      toast.error('Ошибка загрузки документа!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      })
    },
    onSuccess: (data) => {
      toast.success('Документ успешно загружена!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      })
      localStorage.setItem('currentTable', JSON.stringify(data.data))
      setTable(data.data)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })
  // const mutationNote = useMutation({
  //   mutationFn: TablesService.addNoteToTable,
  //   onError: () => {
  //     toast.error('Ошибка загрузки документа!', {
  //       position: 'bottom-right',
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: 'light',
  //       transition: Bounce
  //     })
  //   },
  //   onSuccess: (data) => {
  //     toast.success('Документ успешно загружена!', {
  //       position: 'bottom-right',
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: 'light',
  //       transition: Bounce
  //     })
  //     localStorage.setItem('currentTable', JSON.stringify(data.data))
  //     setTable(data.data)
  //     queryClient.invalidateQueries({ queryKey: ['notes'] })
  //   }
  // })
  const [country, setCountry] = useState<ICountry>()
  const [university, setUniversity] = useState<IUniversity>()
  const [queryUniversity, setQueryUniversity] = useState<string>('')
  const filteredUniversity: IUniversity[] | undefined =
    queryUniversity === '' && universities.isSuccess
      ? universities.data?.data
      : universities.data?.data.filter((item) => {
          return (
            item.abbreviation
              .toLowerCase()
              .includes(queryUniversity.toLowerCase()) ||
            item.name.toLowerCase().includes(queryUniversity.toLowerCase())
          )
        })
  const [queryCountry, setQueryCountry] = useState<string>('')
  const filteredCountry: ICountry[] | undefined =
    queryCountry === '' && countries.isSuccess
      ? countries.data?.data
      : countries.data?.data.filter((item) => {
          return item.name.toLowerCase().includes(queryCountry.toLowerCase())
        })
  const [table, setTable] = useState<ITableResponse>()
  const [education, setEducation] = useState<string>('')
  const [count, setCount] = useState<number | string>('')
  const [form, setForm] = useState<string>('')
  const [level, setLevel] = useState<string>('')
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const formData = new FormData()
      formData.append('file', event.target.files[0])
      mutationFile.mutate(formData)
    }
  }
  const parent = useRef(null)

  useEffect(() => {
    const currentTable = localStorage.getItem('currentTable')
    if (currentTable) setTable(JSON.parse(currentTable))
  }, [])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-12">
      <label
        className="w-full min-h-[189px] relative flex px-4 py-2 border-[1px] border-[#DEDEDE] rounded-[10px] cursor-pointer"
        htmlFor="fileUpload"
      >
        <p className="text-[#A9A9A9] font-medium p-4">'Выберите файл'</p>
        <label
          htmlFor="fileUpload"
          className="absolute right-0 bottom-0 text-base-100 bg-primary text-xl font-semibold rounded-lg px-4 py-2 cursor-pointer"
        >
          Загрузить
        </label>
      </label>
      <input
        id="fileUpload"
        onChange={handleFileChange}
        type="file"
        className="hidden"
      />
      <div className="relative w-full min-h-[319px] bg-[#EBECFF] border-[1px] border-[#C1C1C1] rounded-[13px]">
        <input
          type="text"
          value={'Выберите файл'}
          className="absolute -top-6 left-0 input input-bordered rounded-[7px]"
        />
        <div className="flex justify-between px-6 py-10">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl">Страна</h3>
              <Combobox value={country} onChange={setCountry}>
                <div className="relative mt-1">
                  <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                      className="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
                      onChange={(event) => {
                        setQueryCountry(event.target.value)
                        setCountry(undefined)
                      }}
                      value={country?.name}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQueryCountry('')}
                  >
                    <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                      {countries.isSuccess &&
                        filteredCountry &&
                        filteredCountry.map((item) => (
                          <Combobox.Option
                            key={item.name}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? 'bg-teal-600 text-white'
                                  : 'text-gray-900'
                              }`
                            }
                            value={item}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {item.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? 'text-white' : 'text-teal-600'
                                    }`}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div>
            <div>
              <h3 className="text-xl">ВУЗ</h3>
              <Combobox value={university} onChange={setUniversity}>
                <div className="relative mt-1">
                  <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                      className="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
                      onChange={(event) => {
                        setQueryUniversity(event.target.value)
                        setUniversity(undefined)
                      }}
                      value={university?.abbreviation}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQueryUniversity('')}
                  >
                    <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                      {universities.isSuccess &&
                        filteredUniversity &&
                        filteredUniversity.map((item) => (
                          <Combobox.Option
                            key={item.abbreviation}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? 'bg-teal-600 text-white'
                                  : 'text-gray-900'
                              }`
                            }
                            value={item}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {item.abbreviation}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? 'text-white' : 'text-teal-600'
                                    }`}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl">Уровень подготовки</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2" htmlFor="hight">
                  <input
                    id="hight"
                    type="radio"
                    name="educ"
                    required
                    className="radio radio-primary"
                    onChange={() => setEducation('Высшее образование')}
                  />
                  Высшее образование
                </label>
                <label className="flex items-center gap-2" htmlFor="optional">
                  <input
                    id="optional"
                    type="radio"
                    name="educ"
                    required
                    className="radio radio-primary"
                    onChange={() =>
                      setEducation(
                        'Дополнительное профессиональное образование'
                      )
                    }
                  />
                  Дополнительное профессиональное образование
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl">Количество студентов</h3>
              <input
                type="text"
                value={count}
                required
                onChange={(event) => setCount(event.target.value)}
                className="input input-bordered rounded-[7px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl">Форма обучения</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2" htmlFor="full">
                <input
                  id="full"
                  type="radio"
                  name="form"
                  required
                  className="radio radio-primary"
                  onChange={() => setForm('Очная')}
                />
                Очная
              </label>
              <label className="flex items-center gap-2" htmlFor="nonFull">
                <input
                  id="nonFull"
                  type="radio"
                  name="form"
                  required
                  className="radio radio-primary"
                  onChange={() => setForm('Заочная')}
                />
                Заочная
              </label>
              <label className="flex items-center gap-2" htmlFor="full-nonFull">
                <input
                  id="full-nonFull"
                  type="radio"
                  name="form"
                  required
                  className="radio radio-primary"
                  onChange={() => setForm('Очно-заочная')}
                />
                Очно-заочная
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl">Уровень обучения</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2" htmlFor="bacalavr">
                <input
                  id="bacalavr"
                  type="radio"
                  name="level"
                  required
                  className="radio radio-primary"
                  onChange={() => setLevel('Бакалавриат')}
                />
                Бакалавриат
              </label>
              <label className="flex items-center gap-2" htmlFor="spec">
                <input
                  id="spec"
                  type="radio"
                  name="level"
                  required
                  className="radio radio-primary"
                  onChange={() => setLevel('Специалитет')}
                />
                Специалитет
              </label>
              <label className="flex items-center gap-2" htmlFor="mag">
                <input
                  id="mag"
                  type="radio"
                  name="level"
                  required
                  className="radio radio-primary"
                  onChange={() => setLevel('Магистратура')}
                />
                Магистратура
              </label>
              <label className="flex items-center gap-2" htmlFor="asp">
                <input
                  id="asp"
                  type="radio"
                  name="level"
                  required
                  className="radio radio-primary"
                  onChange={() => setLevel('Аспирантура')}
                />
                Аспирантура
              </label>
            </div>
          </div>
        </div>
        <button
          className="absolute bottom-0 right-0 btn btn-primary text-xl text-base-100 rounded-lg"
        >
          Добавить запись
        </button>
      </div>
      <div
        ref={parent}
        className="relative flex flex-col gap-4 bg-[#F8F8F8] border-[1px] border-[black] rounded-[13px] p-10 pb-24"
      >
        <div className="flex justify-between pl-4 pr-64">
          <h3>Страна</h3>
          <h3>Уровень подготовки</h3>
          <h3>Форма обучения</h3>
          <h3>Уровень обучения</h3>
          <h3>Количество</h3>
        </div>
        {table && table.table?.map((el, index) => (
          <div
            key={index}
            className="flex justify-between bg-[#EAEAEA] p-4 rounded-md"
          >
            <p>{el.country && el.country}</p>
            <p>{el.education_type}</p>
            <p>{el.education_form}</p>
            <p>{el.education_level}</p>
            <p>{el.students_amount}</p>
            <svg
              width="22"
              height="21"
              viewBox="0 0 22 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 10.4999C1 14.9782 1 17.2174 2.39079 18.6081C3.78348 19.9999 6.02167 19.9999 10.4999 19.9999C14.9782 19.9999 17.2174 19.9999 18.6081 18.6081C19.9999 17.2183 19.9999 14.9782 19.9999 10.4999V9.07495M11.9249 1H10.4999C6.02167 1 3.78253 1 2.39079 2.39079C1.46645 3.31609 1.1558 4.61663 1.05225 6.69997"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M15.22 2.38236L15.8365 1.76581C16.3271 1.27538 16.9924 0.999911 17.686 1C18.3797 1.00009 19.0449 1.27573 19.5353 1.76628C20.0258 2.25684 20.3012 2.92212 20.3011 3.61578C20.3011 4.30944 20.0254 4.97466 19.5349 5.46509L18.9174 6.08163C18.9174 6.08163 17.6083 6.00468 16.4531 4.84854C15.2969 3.69335 15.22 2.38331 15.22 2.38331L9.55327 8.04907C9.16948 8.43287 8.97758 8.62477 8.81228 8.83662C8.61753 9.08552 8.45128 9.35626 8.31448 9.64221C8.19953 9.88446 8.11403 10.1419 7.94208 10.6568L7.39204 12.305M7.39204 12.305L7.03674 13.3709C6.99495 13.4953 6.98867 13.6288 7.01861 13.7564C7.04855 13.8841 7.11351 14.0009 7.20619 14.0937C7.29888 14.1865 7.41561 14.2516 7.54326 14.2817C7.67092 14.3117 7.80443 14.3056 7.92878 14.2639L8.99563 13.9086M7.39204 12.305L8.99563 13.9086M18.9183 6.08068L16.0845 8.91357M13.2516 11.7474C12.8678 12.1312 12.6759 12.3231 12.4641 12.4884C12.2144 12.6831 11.9443 12.85 11.6585 12.9862C11.4162 13.1011 11.1588 13.1866 10.6439 13.3586L8.99563 13.9086"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <button >
              <svg
                width="24"
                height="26"
                viewBox="0 0 24 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 0V1.44444H0V4.33333H1.5V23.1111C1.5 23.8773 1.81607 24.6121 2.37868 25.1539C2.94129 25.6956 3.70435 26 4.5 26H19.5C20.2956 26 21.0587 25.6956 21.6213 25.1539C22.1839 24.6121 22.5 23.8773 22.5 23.1111V4.33333H24V1.44444H16.5V0H7.5ZM4.5 4.33333H19.5V23.1111H4.5V4.33333ZM7.5 7.22222V20.2222H10.5V7.22222H7.5ZM13.5 7.22222V20.2222H16.5V7.22222H13.5Z"
                  fill="#FF4343"
                />
              </svg>
            </button>
          </div>
        ))}
        {table && table.table.length > 0 && (
          <button className="absolute bottom-0 right-0 btn btn-primary text-xl text-base-100 rounded-lg text-nowrap">
            Выгрузить документ
          </button>
        )}
      </div>
    </form>
  )
}

export default UploadFileForm
