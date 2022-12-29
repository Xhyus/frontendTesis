import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Container, Heading, Stack, FormControl, FormLabel, Input, Button, HStack, Select, Textarea } from '@chakra-ui/react'
import quoteValidation from '../utils/quoteValidation'
import ReactSelect from './ReactSelect'
import FormInput from './FormInput'
import FormikError from './FormikError'
import { documentOptions, formalizationOptions, paymentOptions } from '../data/staticInfo'

const QuoteForm = ({ setStep, quote, setQuote, companies, setSelectedInfo, selectedInfo }) => {
    let options = companies.map(company => {
        return {
            value: company._id,
            label: company.name,
            name: "company"
        }
    })

    const handleChangeSelects = (choise) => {
        setSelectedInfo({ ...selectedInfo, [choise.name]: choise.value })
    }

    useEffect(() => {
        console.log(selectedInfo)
    }, [selectedInfo])


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
                        <ReactSelect label="Cliente" name="company" type="text" value={selectedInfo.company} onChange={handleChangeSelects} onBlur={handleBlur} options={options} placeholder="Seleccione una empresa" />
                        <ReactSelect label="Formalización" name="formalization" type="text" value={selectedInfo.formalization} onChange={handleChangeSelects} onBlur={handleBlur} options={formalizationOptions} placeholder="Seleccione una opción" />
                        <HStack my={5} w="full">
                            <ReactSelect label="Pago" name="payment" type="text" value={selectedInfo.payment} onChange={handleChangeSelects} onBlur={handleBlur} options={paymentOptions} placeholder="Seleccione una opción" />
                            <ReactSelect label="Documento" name="documents" type="text" value={selectedInfo.documents} onChange={handleChangeSelects} onBlur={handleBlur} options={documentOptions} placeholder="Seleccione una opción" />
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