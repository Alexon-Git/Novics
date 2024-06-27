import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, SyntheticEvent, useEffect, useRef, useState } from 'react'
import autoAnimate from '@formkit/auto-animate'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CountryService } from '../../../services/country/country.service'
import { ICountry } from '../../../services/country/country.interface'
import { IUniversity } from '../../../services/university/university.interface'
import { UniversityService } from '../../../services/university/university.service'
import { TablesService } from '../../../services/tables/tables.service'
import { Bounce, toast } from 'react-toastify'
import { ITableResponse } from '../../../services/tables/tables.inteface'
import NoteForm from './NoteForm'

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
      queryClient.invalidateQueries({ queryKey: ['genTable'] })
      queryClient.invalidateQueries({ queryKey: ['myNotesApproved'] })
      queryClient.invalidateQueries({ queryKey: ['myNotesUnapproved'] })
    }
  })
  const mutationNote = useMutation({
    mutationFn: TablesService.addNoteToTable,
    onError: () => {
      toast.error('Ошибка загрузки записи!', {
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
      toast.success('Запись успешно добавлена!', {
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
      queryClient.invalidateQueries({ queryKey: ['genTable'] })
      queryClient.invalidateQueries({ queryKey: ['myNotesApproved'] })
      queryClient.invalidateQueries({ queryKey: ['myNotesUnapproved'] })
    }
  })
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
  }, [table])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const handleNotePost = (event: SyntheticEvent) => {
    event.preventDefault()
    mutationNote.mutate({
      id: table?.id,
      university: university?.abbreviation,
      country: country?.name,
      education_type: education,
      education_level: level,
      education_form: form,
      students_amount: count
    })
    setUniversity(undefined)
    setCountry(undefined)
    setEducation('')
    setLevel('')
    setForm('')
    setCount(0)
  }
  return (
    <div className="flex flex-col gap-12">
      <form onSubmit={(e) => e.preventDefault()}>
        <label
          className="w-full min-h-[189px] relative flex px-4 py-2 border-[1px] border-[#DEDEDE] rounded-[10px] cursor-pointer"
          htmlFor="fileUpload"
        >
          <p className="text-[#A9A9A9] font-medium p-4">
            {table?.title || 'Выберите файл'}
          </p>
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
      </form>
      <form
        onSubmit={handleNotePost}
        className="relative w-full min-h-[319px] bg-[#EBECFF] border-[1px] border-[#C1C1C1] rounded-[13px]"
      >
        <input
          type="text"
          value={table?.title || 'Выберите файл'}
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
                    checked={education === 'ВО'}
                    onChange={() => setEducation('ВО')}
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
                    checked={education === 'ДПО'}
                    onChange={() => setEducation('ДПО')}
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
                onChange={(event) => setCount(event.target.value.replace(/^0+/, ""))}
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
                  checked={form === 'Очная'}
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
                  checked={form === 'Заочная'}
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
                  checked={form === 'Очно-заочная'}
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
                  checked={level === 'Специалитет'}
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
                  checked={level === 'Магистратура'}
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
                  checked={level === 'Аспирантура'}
                  onChange={() => setLevel('Аспирантура')}
                />
                Аспирантура
              </label>
            </div>
          </div>
        </div>
        <button className="absolute bottom-0 right-0 btn btn-primary text-xl text-base-100 rounded-lg">
          Добавить запись
        </button>
      </form>
      <div
        ref={parent}
        className={`relative flex flex-col gap-4 bg-[#F8F8F8] border-[1px] border-[black] rounded-[13px] p-10 ${table && table.notes.length > 0 && 'pb-16'}`}
      >
        <div className="grid grid-cols-7 pl-4 pr-4">
          <h3>Страна</h3>
          <h3>ВУЗ</h3>
          <h3>Уровень подготовки</h3>
          <h3>Форма обучения</h3>
          <h3>Уровень обучения</h3>
          <h3>Количество</h3>
        </div>
        {table &&
          table.notes?.map((note) => (
            <NoteForm
              note={note}
              table={table}
              setTable={setTable}
              universities={universities}
              countries={countries}
            />
          ))}
        {table && table.notes.length > 0 && (
          <button
            onClick={() => {
              setTable(undefined)
              localStorage.removeItem('currentTable')
              toast.success('Документ успешно выгружен на проверку!', {
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
            }}
            className="absolute bottom-0 right-0 btn btn-primary text-xl text-base-100 rounded-lg text-nowrap"
          >
            Выгрузить документ
          </button>
        )}
      </div>
    </div>
  )
}

export default UploadFileForm
