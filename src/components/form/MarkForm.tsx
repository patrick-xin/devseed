import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Listbox } from '@headlessui/react'
import { MultiSelect } from 'react-multi-select-component'
import * as z from 'zod'

import { Button } from '@/components/buttons'
import { CheckIcon, SelectorIcon } from '../icons'
import FormErrorMessage from './FormErrorMessage'
import FormLabel from './FormLabel'

import { markTypes } from '@/lib/constants'

import { useMarkFormModalStore } from '@/lib/store/modal'
import { useCreateMark, useEditMark, useTags, useUserMark } from '@/lib/hooks'

const schema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title should be at least 5 characters long.' }),
  url: z.string().url({ message: 'Not a valid URL' }),
  description: z
    .string()
    .min(50, { message: 'Description must be at least 50 characters' })
    .max(200, { message: 'Description must be less than 200 characters' }),
})

type FormValues = {
  title: string
  description: string
  url: string
}

const MarkForm = () => {
  const {
    closeModal,
    markId,
    modalType,
    selectedTags,
    setMarkType,
    markType,
    setSelecedTags,
  } = useMarkFormModalStore()
  const { mark } = useUserMark(markId!)
  const { tags } = useTags()
  const { createMark } = useCreateMark()
  const { editMark } = useEditMark()

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })
  const description = watch('description')
  const onSubmit = async (data: FormValues) => {
    if (modalType === 'create') {
      createMark({
        tags: selectedTags,
        description: data.description,
        title: data.title,
        markLink: data.url,
        type: markType.toUpperCase(),
      })
    }
    if (modalType === 'edit') {
      editMark({
        tags: selectedTags,
        description: data.description,
        title: data.title,
        markLink: data.url,
        type: markType.toUpperCase(),
        id: markId!,
      })
    }
  }
  useEffect(() => {
    if (modalType === 'edit' && mark && tags) {
      setMarkType(mark.type)
      setSelecedTags(mark.category)
      reset({
        title: mark.title,
        description: mark.description,
        url: mark.url,
      })
    }
  }, [mark, reset, modalType, setMarkType, tags, setSelecedTags])

  return (
    <form className="h-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Listbox value={markType} onChange={setMarkType}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border border-white/10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none">
            <span className="block truncate">{markType}</span>
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
      {tags && (
        <MultiSelect
          isCreatable={true}
          options={tags}
          value={selectedTags}
          onChange={setSelecedTags}
          labelledBy={'Select'}
        />
      )}

      <div>
        <FormLabel label="title" />
        <input type="text" className="form-input" {...register('title')} />
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
      <div className="mt-8 flex w-full justify-end gap-4">
        <Button
          variant="red"
          onClick={() => {
            closeModal()
            setSelecedTags([])
            setMarkType(markTypes[0])
          }}
        >
          Cancle
        </Button>
        <Button variant="green" type="submit">
          {modalType === 'edit' ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
}

export default MarkForm
