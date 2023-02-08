interface IInputProps<T> {
    value: T
    onChange: (value: T) => void
    defaultValue?: T
    type?: string
    autoFocus: boolean
    onBlur: () => void
    placeholder: string
}

const Input = <T extends string | number | readonly string[]>({
    value,
    onChange,
    type = 'text',
    defaultValue,
    autoFocus,
    onBlur,
    placeholder,
}: IInputProps<T>) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        onChange(value as T)
    }
    return <input
        type={type} value={value} onChange={handleChange}
        defaultValue={defaultValue} autoFocus={autoFocus}
        onBlur={onBlur} placeholder={placeholder} />
}

export default Input