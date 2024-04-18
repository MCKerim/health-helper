
type Props = {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Textfield({ placeholder, value, onChange }: Props) {
  return (
    <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
  );
}