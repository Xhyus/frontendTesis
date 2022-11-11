import React from 'react'
import { Heading, HStack, Stack, Button } from '@chakra-ui/react'
import { Formik } from 'formik'
import FormikError from './FormikError'
import FormInput from './FormInput'
import { createCompany } from '../data/company'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const ContactForm = ({ company, setStep, setContact, contact, state }) => {
	const router = useRouter()

	return (
		<Formik
			initialValues={contact}
			onSubmit={async (values) => {
				try {
					const response = await createCompany(company, values, state)
					if (response.status === 200) {
						Swal.fire({
							title: '¡Excelente!',
							text: 'Tu empresa ha sido registrada con éxito',
							icon: 'success',
							confirmButtonText: 'Ok'
						})
						router.push('/')
					}
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
					<Heading as="h2" size="lg" my={5} color="white">Datos del contacto</Heading>
					<FormInput label="Nombre" handleChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Juan Pérez" />
					{touched.name && errors.name && (
						<FormikError error={errors.name} />
					)}
					<FormInput label="Email" handleChange={handleChange} values={values.email} handleBlur={handleBlur} name="email" type="email" placeHolder="Ej: Correo@gmail.cl" />
					{touched.email && errors.email && (
						<FormikError error={errors.email} />
					)}
					<HStack>
						<Stack w={'full'}>
							<FormInput label="RUT" handleChange={handleChange} values={values.rut} handleBlur={handleBlur} name="rut" type="text" placeHolder="Ej: 11.111.111-1" />
						</Stack>
						<Stack w={'full'}>
							<FormInput label="Teléfono" handleChange={handleChange} values={values.phone} handleBlur={handleBlur} name="phone" type="text" placeHolder="Ej: +569 1234 5678" />
						</Stack>
					</HStack>
					<HStack>
						{touched.rut && errors.rut && (
							<FormikError error={errors.rut} />
						)}
						{touched.phone && errors.phone && (
							<FormikError error={errors.phone} />
						)}
					</HStack>
					<FormInput label="Rol" handleChange={handleChange} values={values.position} handleBlur={handleBlur} name="position" type="text" placeHolder="Ej: Socio, asesor, etc." />
					{touched.position && errors.position && (
						<FormikError error={errors.position} />
					)}
					<HStack align={"center"} justify={"center"} mt={5} pb={"10%"}>
						<Button colorScheme={"green"} type="submit" w="full"> Crear Empresa </Button>
						<Button colorScheme={"red"} w="full" onClick={() => { setContact(values), setStep(1) }}> Volver </Button>
					</HStack>
				</form>
			)}
		</Formik>
	)
}

export default ContactForm