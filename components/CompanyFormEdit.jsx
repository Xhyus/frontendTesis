import { Heading, HStack, Button, FormLabel, Input, FormControl, Tooltip } from '@chakra-ui/react';
import { Formik } from 'formik';
import FormInput from './FormInput';
import constitutedValidation from '../utils/constitutedValidation';
import unConstitutedValidation from '../utils/unConstitutedValidation';
import { useRouter } from 'next/router';
import { formatRut, validateRut } from 'rutlib'

const CompanyFormEdit = ({ setStep, company, setCompany, companyRUT, setCompanyRUT, constituted, setConstituted }) => {
    const router = useRouter()
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
            initialValues={{ name: company.name, socialReason: company.socialReason === null ? '' : company.socialReason, email: company.email, phone: company.phone, address: company.address, rut: company.rut, constituted: company.constituted }}
            validationSchema={constituted ? constitutedValidation : unConstitutedValidation}
            onSubmit={(values) => {
                if (!validateRut(companyRUT) || companyRUT.length < 11) {
                    return Swal.fire({
                        title: 'Error',
                        text: 'RUT inválido',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
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
                    <Heading as="h2" size="lg" mb={4} color="white">Datos de la empresa</Heading>
                    <Button my={3} color="white" bgColor={constituted === true ? '#53B6EE' : '#FF9F0F'} _hover={{ bgColor: constituted === true ? '#33A7EB' : '#F59300' }} onClick={() => setConstituted(!constituted)}>
                        {constituted === true ? "La empresa ya no está constituida" : "¿Ha constituido su empresa?"}
                    </Button>
                    <FormInput label="Nombre de la empresa" onChange={handleChange} values={values.name} handleBlur={handleBlur} name="name" type="text" placeHolder="Ej: Estudio Fragua" touched={touched.name} errors={errors.name} />
                    {constituted && (
                        <FormInput label="Razón social" onChange={handleChange} values={values.socialReason} handleBlur={handleBlur} name="socialReason" type="text" placeHolder="Ej: Restaurantes McDonald's S.A." touched={touched.socialReason} errors={errors.socialReason} />
                    )}
                    <FormInput label="Email" onChange={handleChange} values={values.email} handleBlur={handleBlur} name="email" type="email" placeHolder="Ej: Correo@gmail.cl" touched={touched.email} errors={errors.email} />
                    <HStack>
                        <FormControl isRequired py={3}>
                            <FormLabel>RUT de Empresa</FormLabel>
                            <Tooltip label={"Ingrese RUT"} aria-label={"Ingrese RUT"}>
                                <Input type={"text"} name={companyRUT} maxLength={12} onChange={handleChangeRUT} value={companyRUT} placeholder={"11.111.111-1"} />
                            </Tooltip>
                        </FormControl>
                        <FormInput label="Teléfono" onChange={handleChange} values={values.phone} handleBlur={handleBlur} name="phone" type="text" placeHolder="Ej: 12345678" />
                    </HStack>
                    <FormInput label="Dirección" onChange={handleChange} values={values.address} handleBlur={handleBlur} name="address" type="text" placeHolder="Ej: Av. Siempre Viva 123" touched={touched.address} errors={errors.address} />
                    <HStack>
                        <Button my={10} bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} type="submit" w="full"> Siguiente paso </Button>
                        <Button my={10} bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} onClick={() => router.push(`/empresa/ver/${company._id}`)} w="full"> Cancelar </Button>
                    </HStack>
                </form>
            )}
        </Formik >
    )
}

export default CompanyFormEdit