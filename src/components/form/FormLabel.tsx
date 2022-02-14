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

export default FormLabel
