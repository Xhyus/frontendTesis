import { Select } from 'chakra-react-select'
import { FormControl, FormLabel } from '@chakra-ui/react'

const ReactSelect = ({ options, name, handleChange, onBlur, value, label, placeholder }) => {
  return (
    <FormControl id={name} isRequired>
      <FormLabel>{label}</FormLabel>
      <Select w={"full"} name={name} placeholder={placeholder} onChange={handleChange} onBlur={onBlur} value={value} options={options} />
    </FormControl>
  )
}
{/* <Select options={options} name={name} placeholder="Seleccione una empresa" onChange={handleChange} onBlur={onBlur} value={value} /> */ }

export default ReactSelect