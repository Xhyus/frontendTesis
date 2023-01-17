import { Heading, HStack, Button, FormLabel, Input, FormControl, Tooltip } from '@chakra-ui/react';
import { Formik } from 'formik';
import FormInput from './FormInput';
import constitutedValidation from '../utils/constitutedValidation';
import { formatRut, validateRut } from 'rutlib'
import FormikError from './FormikError';
import Swal from 'sweetalert2';

const Constituted = ({ setStep, company, setCompany, companyRUT, setCompanyRUT }) => {

    const handleChangeRUT = (e) => {
        if (e.target.value === '-') {
            setCompanyRUT('')
        }
        if (e.target.value.length > 0 && e.target.value !== '-') {
            setCompanyRUT(formatRut(e.target.value))
        }
    }
    return (
        <Formik
            initialValues={company}
            validationSchema={constitutedValidation}
            onSubmit={(values) => {
                if (!validateRut(companyRUT) || companyRUT.length < 11) {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'RUT de empresa inválido',
                    })
                }
                setCompany(values)
                setStep(2)
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
                    <Heading as={"h2"} fontSize={"3xl"} my={5}>Datos de la empresa</Heading>
                    <FormInput label="Nombre de la empresa" onChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Estudio Fragua" touched={touched.name} errors={errors.name} />
                    <FormInput label="Razón social" onChange={handleChange} values={values.socialReason} handleBlur={handleBlur} name="socialReason" type="text" placeHolder="Ej: Restaurantes McDonald's S.A." touched={touched.socialReason} errors={errors.socialReason} />
                    <FormInput label="Email" onChange={handleChange} values={values.email} handleBlur={handleBlur} name="email" type="email" placeHolder="Ej: Correo@gmail.cl" touched={touched.email} errors={errors.email} />
                    <HStack>
                        <FormControl isRequired py={3}>
                            <FormLabel>RUT de Empresa</FormLabel>
                            <Tooltip label={"Ingrese RUT"} aria-label={"Ingrese RUT"}>
                                <Input type={"text"} name={companyRUT} maxLength={12} onChange={handleChangeRUT} value={companyRUT} placeholder={"11.111.111-1"} />
                            </Tooltip>
                        </FormControl>
                        <FormInput label="Teléfono" onChange={handleChange} values={values.phone} handleBlur={handleBlur} name="phone" type="text" placeHolder="Ej: 12345678" touched={touched.phone} errors={errors.phone} />
                    </HStack>
                    {touched.phone && errors.phone && (
                        <FormikError error={errors.phone} />
                    )}
                    <FormInput label="Dirección" onChange={handleChange} values={values.address} handleBlur={handleBlur} name="address" type="text" placeHolder="Ej: Av. Siempre Viva 123" touched={touched.address} errors={errors.address} />
                    <Button bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} type="submit" w="full"> Siguiente paso</Button>
                </form>
            )}
        </Formik>
    )
}

export default Constituted