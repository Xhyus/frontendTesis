import { Heading, HStack, Button, FormControl, Input, FormLabel, Tooltip } from '@chakra-ui/react'
import { Formik } from 'formik'
import FormikError from './FormikError'
import FormInput from './FormInput'
import { editCompany } from '../data/company'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { formatRut, validateRut } from 'rutlib'
import contactValidation from '../utils/contactValidation'

const ContactFormEdit = ({ company, setStep, setContact, contact, state, contactRUT, setContactRUT, companyRUT, id }) => {
    const router = useRouter()
    const handleChangeRUT = (e) => {
        if (e.target.value === '-') {
            setContactRUT('')
        }
        if (e.target.value.length > 0 && e.target.value !== '-') {
            setContactRUT(formatRut(e.target.value))
        }
    }

    return (
        <Formik
            initialValues={{ name: contact.name, email: contact.email, position: contact.role, phone: contact.phone }}
            validationSchema={contactValidation}
            onSubmit={async (values) => {
                try {
                    if (!validateRut(contactRUT) || contactRUT.length < 11) {
                        return Swal.fire({
                            title: 'Error',
                            text: 'RUT inválido',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        })
                    }
                    await editCompany(company, values, companyRUT, contactRUT, state, id)
                    await Swal.fire({
                        title: '¡Excelente!',
                        text: 'Tu empresa ha sido editada con éxito',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    router.push(`/empresa/ver/${id}`)
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ha ocurrido un error al editar su empresa',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                }
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit} >
                    <Heading as="h2" size="lg" my={5} color="white">Datos del contacto</Heading>
                    <FormInput label="Nombre" onChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Juan Pérez" touched={touched.name} errors={errors.name} />
                    <FormInput label="Email" onChange={handleChange} values={values.email} handleBlur={handleBlur} name="email" type="email" placeHolder="Ej: Correo@gmail.cl" touched={touched.email} errors={errors.email} />
                    <HStack>
                        <FormControl isRequired py={3}>
                            <FormLabel>RUT de Contacto</FormLabel>
                            <Tooltip label={"Ingrese RUT"} aria-label={"Ingrese RUT"}>
                                <Input type={"text"} name={contactRUT} maxLength={12} onChange={handleChangeRUT} value={contactRUT} placeholder={"11.111.111-1"} />
                            </Tooltip>
                        </FormControl>
                        <FormInput label="Teléfono" onChange={handleChange} values={values.phone} handleBlur={handleBlur} name="phone" type="text" placeHolder="Ej: 12345678" touched={touched.phone} errors={errors.phone} />
                    </HStack>
                    {touched.phone && errors.phone && (
                        <FormikError error={errors.phone} />
                    )}
                    <FormInput label={state === true ? "Cargo" : "Rol"} onChange={handleChange} values={values.position} handleBlur={handleBlur} name="position" type="text" placeHolder={state === true ? "Ej: Gerente, Encargado RRHH, etc." : "Ej: Socio, amigo, etc."} touched={touched.position} errors={errors.position} />
                    <HStack align={"center"} justify={"center"} mt={5} pb={"10%"}>
                        <Button bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} type="submit" w="full"> Editar Empresa </Button>
                        <Button bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} w="full" onClick={() => { setContact(values), setStep(1) }}> Volver </Button>
                    </HStack>
                </form>
            )
            }
        </Formik >
    )
}

export default ContactFormEdit