import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FormLayout } from '@/components/layout'
import { useCategory, useUser, useUserCategory, useUserMark } from '@/lib/hooks'
import { createMark } from 'services/api'
import { useRouter } from 'next/router'

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
  const { mark, isLoading } = useUserMark(router.query.id)
  const { category } = useCategory()
  console.log(mark)
  const [formData, setFormData] = useState<FormValues>({
    title: '',
    description: '',
    url: '',
  })
  const [selected, setSelected] = useState([])

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
  }, [mark, reset])
  const onSubmit = async (data) => {
    await createMark({
      category: selected,
      description: data.description,
      title: data.title,
      markLink: data.url,
    })
  }

  if (isLoading) return <div>loading</div>
  return (
    <FormLayout title="Edit Mark">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <MultiSelect
          isCreatable={true}
          hasSelectAll={false}
          options={category}
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
