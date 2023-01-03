import { Select } from 'chakra-react-select'
import { FormControl, FormLabel } from '@chakra-ui/react'

const ReactSelect = ({ options, name, onChange, label, index }) => {
  return (
    <FormControl id={name} >
      <FormLabel>{label}</FormLabel>
      <Select options={options} onChange={onChange} defaultValue={options[index]} />
    </FormControl>
  )
}

export default ReactSelect