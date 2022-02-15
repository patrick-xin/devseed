import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FormLayout } from '@/components/layout'
import { useTags, useUserMark } from '@/lib/hooks'
import { createMark } from 'services/api'
import { useRouter } from 'next/router'
import { markTypes } from '@/lib/constants'
import { Listbox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@/components/icons'

const schema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title should be at least 5 characters long.' }),
  url: z.string().url({ message: 'Not a valid URL' }),
  description: z
    .string()
    .min(50, { message: 'Description must be at least 50 characters' })
    .max(300, { message: 'Description must be less than 300 characters' }),
})

type FormValues = {
  title: string
  description: string
  url: string
}

const EditPage = () => {
  const router = useRouter()
  const { mark, isLoadingMark } = useUserMark(router.query.id as string)
  const { tags } = useTags()

  const [selected, setSelected] = useState([])
  const [selectedType, setSelecedType] = useState(markTypes[0])
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })
  const description = watch('description')
  useEffect(() => {
    if (mark) {
      setSelected(mark?.category)
      reset({
        title: mark?.title,
        description: mark?.description,
        url: mark?.url,
      })
    }
  }, [mark, reset, tags])
  const onSubmit = async (data: FormValues) => {
    await createMark({
      tags: selected,
      description: data.description,
      title: data.title,
      markLink: data.url,
      type: selectedType,
    })
  }

  if (isLoadingMark) return <div>loading</div>
  return (
    <FormLayout title="Edit Mark">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Listbox value={selectedType} onChange={setSelecedType}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg border border-white/10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none">
              <span className="block truncate">{selectedType}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon />
              </span>
            </Listbox.Button>
            <div>
              <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {markTypes.map((type) => (
                  <Listbox.Option
                    key={type}
                    className={({ active }) =>
                      `${active ? 'bg-white/10' : ''}
                          relative cursor-default select-none py-2 pl-10 pr-4`
                    }
                    value={type}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                        >
                          {type}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? 'text-amber-600' : 'text-amber-600'
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </div>
        </Listbox>
        <MultiSelect
          isCreatable={true}
          hasSelectAll={false}
          options={tags}
          value={selected}
          onChange={setSelected}
          labelledBy={'Select'}
        />
        <div>
          <FormLabel label="title" />
          <input
            //defaultValue={mark?.title}
            type="text"
            className="form-input"
            {...register('title')}
          />
          <FormErrorMessage message={errors.title?.message} />
        </div>
        <div>
          <FormLabel label="URL" />
          <input type="text" className="form-input" {...register('url')} />
          <FormErrorMessage message={errors.url?.message} />
        </div>
        <div className="relative">
          <FormLabel label="description" />
          <textarea
            className="form-input min-h-[10rem]"
            {...register('description')}
          />
          <div className="absolute right-2 bottom-0 px-2 text-white/30">
            {description?.length === 0 ? '' : description?.length}
          </div>
          <FormErrorMessage message={errors.description?.message} />
        </div>
        <div className="flex justify-end">
          <button className="rounded-md bg-purple-600 px-1.5 py-2.5 hover:bg-purple-700">
            Submit
          </button>
        </div>
      </form>
    </FormLayout>
  )
}

export default EditPage

const FormErrorMessage = ({ message }: { message: string | undefined }) => {
  if (!message) return null
  return <p className="p-2 text-xs text-red-400">{message}</p>
}

const FormLabel = ({ label }: { label: string }) => {
  return (
    <label
      htmlFor={label}
      className="inline-block pb-1 text-sm capitalize dark:text-[#808080]"
    >
      {label}
    </label>
  )
}
