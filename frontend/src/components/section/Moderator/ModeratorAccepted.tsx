import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { CalendarIcon } from '@heroicons/react/20/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { useQuery } from '@tanstack/react-query'
import { TablesService } from '../../../services/tables/tables.service'
import UserDocCard from '../../ui/User/UserDocCard/UserDocCard'

const ModeratorAccepted = () => {
  const settings: string[] = ['Более новые', 'Более старые', 'От А до Я']
  const [selectedApproved, setSelectedApproved] = useState<string>(settings[0])
  const query = useQuery({
    queryKey: ['myNotesApproved', selectedApproved],
    queryFn: () => TablesService.getTablesWithFilter('approved')
  })
  return (
    <section className="my-20">
      <div className="hero mx-auto container">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">История утвержденных файлов</h2>
          <div className="flex flex-col gap-6 bg-success rounded-[15px] p-4 pb-8">
            <div className="flex justify-between items-center">
              <h3 className=" text-2xl font-medium">Принятые Файлы</h3>
              <Listbox value={selectedApproved} onChange={setSelectedApproved}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-base-100 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-base-100/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="flex gap-2 items-center truncate pr-8">
                      <CalendarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {selectedApproved}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {settings.map((setting, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-amber-100 text-amber-900'
                                : 'text-gray-900'
                            }`
                          }
                          value={setting}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {setting}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            {query.data?.data.length === 0 && <>Нет результата</>}
            {query.isSuccess &&
              query.data?.data.map((doc) => (
                <UserDocCard key={doc.id} props={doc} />
              ))}
            {query.isPending && (
              <div role="status">
                <span className="loading loading-spinner text-base-100"></span>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModeratorAccepted
