const FormErrorMessage = ({ message }: { message: string | undefined }) => {
  if (!message) return null
  return <p className="p-2 text-xs text-red-400">{message}</p>
}

export default FormErrorMessage
