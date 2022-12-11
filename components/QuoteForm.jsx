import React from 'react'
import { Formik } from 'formik'
import { Container, Heading, Stack, FormControl, FormLabel, Input, Button, HStack, Select, Textarea } from '@chakra-ui/react'
import quoteValidation from '../utils/quoteValidation'
import ReactSelect from './ReactSelect'
import FormInput from './FormInput'
import FormikError from './FormikError'

const QuoteForm = ({ setStep, quote, setQuote }) => {

    const options = [
        { value: '1', label: 'Cliente 1' },
        { value: '2', label: 'Cliente 2' },
    ]

    const formalizationOptions = [
        { value: 'Firmar', label: 'Firma del presente contrato' },
        { value: 'Contrato', label: 'Firma de contrato de servicio' },
        { value: 'Confidencialidad', label: 'Firma de contrato de servicio y confidencialidad' },
    ]

    const paymentOptions = [
        { value: 'Efectivo', label: 'Efectivo' },
        { value: 'Transferencia', label: 'Transferencia' },
        { value: 'Credito', label: 'Credito' },
        { value: 'Debito', label: 'Debito' },
        { value: 'Otros', label: 'Otros' },
    ]

    const documentOptions = [
        { value: "Afecta", label: "Afecta" },
        { value: "Exenta", label: "Exenta" },
    ]

    return (
        <Container maxW={"container.md"}>
            <Formik
                initialValues={quote}
                // validationSchema={quoteValidation}
                onSubmit={(values) => {
                    console.log(values)
                    // setQuote(...quote, values)
                    // setStep(2)
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit} id="form">
                        <Heading mt={10} mb={5} fontSize={'6xl'} textAlign="center">Crear Cotización</Heading>
                        <FormInput placeHolder={"Ingrese el nombre con el que se identifica la cotización"} label="Nombre" name="name" type="text" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                        <FormikError touched={touched.name} message={errors.name} />
                        <FormControl id="description" isRequired>
                            <FormLabel>Descripción</FormLabel>
                            <Textarea w={"full"} type="text" placeholder="Ingrese una descripción de la cotización" name="description" onChange={handleChange} onBlur={handleBlur} value={values.description} />
                        </FormControl>
                        <FormikError touched={touched.description} message={errors.description} />
                        <ReactSelect label="Cliente" name="company" type="text" value={values.company} onChange={handleChange} onBlur={handleBlur} options={options} placeholder="Seleccione una empresa" />
                        <ReactSelect label="Formalización" name="formalization" type="text" value={values.formalization} onChange={handleChange} onBlur={handleBlur} options={formalizationOptions} placeholder="Seleccione una opción" />
                        <HStack my={5} w="full">
                            <ReactSelect label="Pago" name="payment" type="text" value={values.payment} onChange={handleChange} onBlur={handleBlur} options={paymentOptions} placeholder="Seleccione una opción" />
                            <ReactSelect label="Documento" name="documents" type="text" value={values.documents} onChange={handleChange} onBlur={handleBlur} options={documentOptions} placeholder="Seleccione una opción" />
                        </HStack>
                        <FormControl id="paymentMethod" isRequired>
                            <FormLabel>Metodo de pago</FormLabel>
                            <Textarea placeholder='Ingrese la forma de pago' type="text" name="paymentMethod" onChange={handleChange} onBlur={handleBlur} value={values.paymentMethod} />
                        </FormControl>
                        <HStack my={5} w="full">
                            <Button w="full" color={"white"} bgColor={"#7ABC63"} type="submit" >Ir al siguiente paso</Button>
                            <Button w="full" color={"white"} bgColor={"#DE1A1A"} onClick={() => { setStep(1), setQuote(...quote, values) }}>Atras</Button>
                        </HStack>
                    </form>
                )}
            </Formik>
        </Container >
    )
}

export default QuoteForm