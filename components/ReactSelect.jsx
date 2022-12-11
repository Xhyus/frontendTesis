import { Select } from 'chakra-react-select'
import { FormControl, FormLabel } from '@chakra-ui/react'

const ReactSelect = ({ options, name, onChange, onBlur, value, label, placeholder }) => {

  return (
    <FormControl id={name} >
      <FormLabel>{label}</FormLabel>
      <Select onChange={(choise) => onChange(choise)} w={"full"} placeholder={placeholder} onBlur={onBlur} inputValue={value} options={options} />
    </FormControl>
  )
}

export default ReactSelect