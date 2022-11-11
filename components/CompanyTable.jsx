import { Text, HStack, Button, Td, Tr, ListItem, List } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { deleteServices } from '../data/services'
import { useRouter } from 'next/router'

const ServicesTable = ({ companies }) => {
    const router = useRouter()

    const deleteService = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteServices(id)
                    .then(() => {
                        Swal.fire(
                            '¡Borrado!',
                            'El servicio ha sido borrado.',
                            'success'
                        ).then(() => {
                            window.location.reload()
                        })
                    })
            }
        })
    }

    if (companies.length === 0) {
        return (
            <Tr>
                <Td colSpan="5">
                    <Text fontSize="xl" textAlign="center">No se ha encontrado ningún servicio con los datos ingresados</Text>
                </Td>
            </Tr>
        )
    }

    return (
        companies.map(company => {
            return (
                console.log(company),
                <Tr key={company._id}>
                    <Td>{company.name}</Td>
                    <Td>{company.rut}</Td>
                    <Td>{company.contact.phone}</Td>
                    <Td>{company.contact.email}</Td>
                    <Td>
                        <HStack>
                            {/* <Button colorScheme="yellow" onClick={() => deleteService(service._id)}>Ver más</Button> */}
                            <Button colorScheme="blue" onClick={() => console.log("VER MAS")}>Ver detalles</Button>
                            <Button colorScheme="red" onClick={() => deleteService(service._id)}>Eliminar</Button>
                        </HStack>
                    </Td>
                </Tr>
            )
        })
    )
}

export default ServicesTable