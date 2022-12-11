import React, { useEffect } from 'react'
import { Formik } from 'formik'
import { Container, Heading, Stack, FormControl, FormLabel, Input, Button, HStack, Select, Textarea } from '@chakra-ui/react'
import quoteValidation from '../utils/quoteValidation'
import ReactSelect from './ReactSelect'
import FormInput from './FormInput'
import FormikError from './FormikError'

const QuoteForm = ({ setStep, quote, setQuote }) => {

    const options = [
        { value: '1', label: 'Cliente 1', name: "company" },
        { value: '2', label: 'Cliente 2', name: "company" },
    ]

    const formalizationOptions = [
        { value: 'Firmar', label: 'Firma del presente contrato', name: "formalization" },
        { value: 'Contrato', label: 'Firma de contrato de servicio', name: "formalization" },
        { value: 'Confidencialidad', label: 'Firma de contrato de servicio y confidencialidad', name: "formalization" },
    ]

    const paymentOptions = [
        { value: 'Efectivo', label: 'Efectivo', name: "payment" },
        { value: 'Transferencia', label: 'Transferencia', name: "payment" },
        { value: 'Credito', label: 'Credito', name: "payment" },
        { value: 'Debito', label: 'Debito', name: "payment" },
        { value: 'Otros', label: 'Otros', name: "payment" },
    ]

    const documentOptions = [
        { value: "Afecta", label: "Afecta", name: "documents" },
        { value: "Exenta", label: "Exenta", name: "documents" },
    ]

    const handleChangeSelects = (choise) => {
        setQuote({ ...quote, [choise.name]: choise.value })
    }

    useEffect(() => {
        console.log(quote)
    }, [quote])


    return (
        <Container maxW={"container.md"}>
            <Formik
                initialValues={quote}
                // validationSchema={quoteValidation}
                onSubmit={(values) => {
                    setQuote(...quote, values)
                    console.log(quote)
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
                        <ReactSelect label="Cliente" name="company" type="text" value={values.company} onChange={handleChangeSelects} onBlur={handleBlur} options={options} placeholder="Seleccione una empresa" />
                        <ReactSelect label="Formalización" name="formalization" type="text" value={values.formalization} onChange={handleChangeSelects} onBlur={handleBlur} options={formalizationOptions} placeholder="Seleccione una opción" />
                        <HStack my={5} w="full">
                            <ReactSelect label="Pago" name="payment" type="text" value={values.payment} onChange={handleChangeSelects} onBlur={handleBlur} options={paymentOptions} placeholder="Seleccione una opción" />
                            <ReactSelect label="Documento" name="documents" type="text" value={values.documents} onChange={handleChangeSelects} onBlur={handleBlur} options={documentOptions} placeholder="Seleccione una opción" />
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