import { Heading, HStack, Button, FormControl, Input, FormLabel, Tooltip } from '@chakra-ui/react'
import { Formik } from 'formik'
import FormikError from './FormikError'
import FormInput from './FormInput'
import contactValidation from '../utils/contactValidation'
import { createCompany } from '../data/company'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { formatRut, validateRut } from 'rutlib'

const ContactForm = ({ company, setStep, setContact, contact, state, contactRUT, setContactRUT, companyRUT }) => {
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
			initialValues={contact}
			validationSchema={contactValidation}
			onSubmit={async (values) => {
				if (!validateRut(contactRUT) || contactRUT.length < 11) {
					return Swal.fire({
						title: 'Error',
						text: 'El rut ingresado no es válido',
						icon: 'error',
						confirmButtonText: 'Aceptar'
					})
				}
				try {
					await createCompany(company, values, companyRUT, contactRUT, state)
					await Swal.fire({
						title: '¡Excelente!',
						text: 'Tu empresa ha sido registrada con éxito',
						icon: 'success',
						confirmButtonText: 'Ok'
					})
					router.push('/')
				} catch (error) {
					if (error.response.status === 400) {
						Swal.fire({
							title: 'Error',
							text: 'Ha ocurrido un error al registrar su empresa',
							icon: 'error',
							confirmButtonText: 'Aceptar'
						})
					}
					if (error.response.status) {
						Swal.fire({
							title: 'Error',
							text: 'Ese rut ya se encuentra registrado, favor contactese con Estudio Fragua',
							icon: 'error',
							confirmButtonText: 'Aceptar'
						})
					}
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
				<form onSubmit={handleSubmit} id="form" >
					<Heading as={"h2"} fontSize={"3xl"} my={5}>Datos del contacto</Heading>
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
					<HStack>
						{touched.rut && errors.rut && (
							<FormikError error={errors.rut} />
						)}
						{touched.phone && errors.phone && (
							<FormikError error={errors.phone} />
						)}
					</HStack>
					<FormInput label={state === true ? "Cargo" : "Rol"} onChange={handleChange} values={values.position} handleBlur={handleBlur} name="position" type="text" placeHolder={state === true ? "Ej: Gerente, Encargado RRHH, etc." : "Ej: Socio, amigo, etc."} touched={touched.position} errors={errors.position} />
					<HStack align={"center"} justify={"center"} mt={5} pb={"10%"}>
						<Button bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} type="submit" w="full"> Crear Empresa </Button>
						<Button bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} w="full" onClick={() => { setContact(values), setStep(1) }}> Volver </Button>
					</HStack>
				</form>
			)}
		</Formik>
	)
}

export default ContactForm