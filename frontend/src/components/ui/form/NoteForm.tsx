import { Fragment, useEffect, useRef, useState } from 'react'
import {
  ITable,
  ITableResponse
} from '../../../services/tables/tables.inteface'
import { Combobox, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckCircleIcon, CheckIcon } from '@heroicons/react/20/solid'
import { IUniversity } from '../../../services/university/university.interface'
import { ICountry } from '../../../services/country/country.interface'
import {
  UseQueryResult,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import autoAnimate from '@formkit/auto-animate'
import { TablesService } from '../../../services/tables/tables.service'
import { Bounce, toast } from 'react-toastify'

const NoteForm = ({
  note,
  table,
  setTable,
  universities,
  countries
}: {
  note: ITable
  table: ITableResponse
  setTable: React.Dispatch<React.SetStateAction<ITableResponse | undefined>>
  universities: UseQueryResult<AxiosResponse<IUniversity[], unknown>, Error>
  countries: UseQueryResult<AxiosResponse<ICountry[], unknown>, Error>
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [country, setCountry] = useState<ICountry | string>(note.country)
  const [university, setUniversity] = useState<IUniversity | string>(
    note.university
  )
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
  const [education, setEducation] = useState<string>(note.education_type)
  const [count, setCount] = useState<number | string>(note.students_amount)
  const [form, setForm] = useState<string>(note.education_form)
  const [level, setLevel] = useState<string>(note.education_level)
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: TablesService.patchNoteById,
    onError: () => {
      toast.error('Ошибка изменения записи!', {
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
      toast.success('Запись успешно изменена!', {
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
      setIsEdit(!isEdit)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['myNotesApproved'] })
      queryClient.invalidateQueries({ queryKey: ['myNotesUnapproved'] })
    }
  })
  const deleteNote = useMutation({
    mutationFn: TablesService.delNote,
    onError: () => {
      toast.error('Ошибка удаления записи!', {
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
      toast.success('Запись успешно удалена!', {
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
      setIsEdit(!isEdit)
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['myNotesApproved'] })
      queryClient.invalidateQueries({ queryKey: ['myNotesUnapproved'] })
    }
  })
  return (
    <div
      ref={parent}
      key={note.id}
      className="grid grid-cols-7 items-center bg-[#EAEAEA] p-4 rounded-md"
    >
      {!isEdit && (
        <>
          <p>{note.country && note.country}</p>
          <p>{note.university}</p>
          <p>{note.education_type}</p>
          <p>{note.education_form}</p>
          <p>{note.education_level}</p>
          <p>{note.students_amount}</p>
        </>
      )}
      {isEdit && (
        <>
          <Combobox value={country} onChange={setCountry}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
                  onChange={(event) => {
                    setQueryCountry(event.target.value)
                    setCountry('')
                  }}
                  value={
                    typeof country === 'object' &&
                    country !== null &&
                    'name' in country
                      ? country.name
                      : country
                  }
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
                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
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
          <Combobox value={university} onChange={setUniversity}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
                  onChange={(event) => {
                    setQueryUniversity(event.target.value)
                    setUniversity('')
                  }}
                  value={
                    typeof university === 'object' &&
                    university !== null &&
                    'abbreviation' in university
                      ? university?.abbreviation
                      : university
                  }
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
                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
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
          <Combobox value={education} onChange={setEducation}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
                  value={education}
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
              >
                <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <Combobox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={'ВО'}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {'ВО'}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                  <Combobox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={'ДПО'}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {'ДПО'}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          <Combobox value={form} onChange={setForm}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
                  value={form}
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
              >
                <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <Combobox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={'Очная'}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {'Очная'}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                  <Combobox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={'Заочная'}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {'Заочная'}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                  <Combobox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={'Очно-заочная'}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {'Очно-заочная'}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          <Combobox value={level} onChange={setLevel}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0"
                  value={level}
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
              >
                <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <Combobox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={'Бакалавриат'}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {'Бакалавриат'}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                  <Combobox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={'Специалитет'}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {'Специалитет'}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                  <Combobox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={'Магистратура'}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {'Магистратура'}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                  <Combobox.Option
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={'Аспирантура'}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {'Аспирантура'}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          <div className="relative mt-1">
            <input
              value={count}
              onChange={(event) => setCount(event.target.value)}
              type="text"
              className="h-9 w-full cursor-default overflow-hidden bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border-none pl-3 leading-5 text-gray-900 focus:ring-0"
            />
          </div>
        </>
      )}
      <div className="flex justify-end items-center gap-12">
        {isEdit && (
          <>
            <button
              onClick={() =>
                mutation.mutate({
                  tableId: table.id,
                  noteId: note.id,
                  country:
                    typeof country === 'object' &&
                    country !== null &&
                    'name' in country
                      ? country.name
                      : country,
                  university:
                    typeof university === 'object' &&
                    university !== null &&
                    'abbreviation' in university
                      ? university?.abbreviation
                      : university,
                  education_form: form,
                  education_level: level,
                  education_type: education,
                  students_amount: count
                })
              }
            >
              <CheckCircleIcon className="h-8 w-8" />
            </button>
          </>
        )}
        <button onClick={() => setIsEdit(!isEdit)}>
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
        </button>
        <button onClick={() => deleteNote.mutate({tableId: table.id, noteId: note.id})}>
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
    </div>
  )
}

export default NoteForm
