import { Text, HStack, Button, Td, Tr } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { deleteCompany } from '../data/company'
import { useRouter } from 'next/router'

const CompanyTable = ({ companies }) => {
    const router = useRouter()

    const delete_Company = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCompany(id)
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
                    <Text fontSize="xl" textAlign="center">No se ha encontrado ningúna empresa</Text>
                </Td>
            </Tr>
        )
    }

    return (
        companies.map(company => {
            return (
                <Tr key={company._id}>
                    <Td>{company.name}</Td>
                    <Td>{company.rut}</Td>
                    <Td>{company.contact.phone}</Td>
                    <Td>{company.contact.email}</Td>
                    <Td>
                        <HStack>
                            <Button colorScheme="blue" onClick={() => console.log("VER MAS")}>Detalles</Button>
                            <Button colorScheme="red" onClick={() => delete_Company(company._id)}>Eliminar</Button>
                        </HStack>
                    </Td>
                </Tr>
            )
        })
    )
}

export default CompanyTable