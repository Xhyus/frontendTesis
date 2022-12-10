import React from 'react'
import { Formik } from 'formik'
import { Container, Heading, Stack, FormControl, FormLabel, Input, Button, HStack, Select, Textarea } from '@chakra-ui/react'
import quoteValidation from '../utils/quoteValidation'

const QuoteForm = ({ setStep, quote, setQuote }) => {
    return (
        <Container maxW={"container.md"}>
            <Formik
                initialValues={quote}
                validationSchema={quoteValidation}
                onSubmit={(values) => {
                    setQuote(...quote, values)
                    setStep(2)
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit} id="form">
                        <Heading mt={10} mb={5} fontSize={'6xl'} textAlign="center">Crear Cotización</Heading>
                        <FormControl id="name" >
                            <FormLabel>Nombre</FormLabel>
                            <Input w={"full"} type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                        </FormControl>
                        <FormControl id="description" >
                            <FormLabel>Descripción</FormLabel>
                            <Input w={"full"} type="text" name="description" onChange={handleChange} onBlur={handleBlur} value={values.description} />
                        </FormControl>
                        <FormControl id="client" >
                            <FormLabel>Cliente</FormLabel>
                            <Input w={"full"} type="text" name="client" onChange={handleChange} onBlur={handleBlur} value={values.client} />
                        </FormControl>
                        <FormControl id="formalization">
                            <FormLabel>Formalización</FormLabel>
                            <Select w={"full"} name="formalization" onChange={handleChange} onBlur={handleBlur} value={values.formalization}>
                                <option value="">Seleccione una opción</option>
                                <option value="Firmar">Firmado</option>
                                <option value="Contrato">Contrato</option>
                                <option value="Confidencialidad">Confidencialidad</option>
                            </Select>
                        </FormControl>
                        <HStack my={5} w="full">
                            <FormControl id="payment">
                                <FormLabel>Forma de pago</FormLabel>
                                <Select w={"full"} name="payment" onChange={handleChange} onBlur={handleBlur} value={values.payment}>
                                    <option value="">Seleccione una opción</option>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia">Transferencia</option>
                                    <option value="Credito">Credito</option>
                                    <option value="Debito">Debito</option>
                                    <option value="Otros">Otros</option>
                                </Select>
                            </FormControl>
                            <FormControl id="document">
                                <FormLabel>Documento</FormLabel>
                                <Select w={"full"} name="document" onChange={handleChange} onBlur={handleBlur} value={values.document}>
                                    <option value="">Seleccione una opción</option>
                                    <option value="Exenta">Exenta</option>
                                    <option value="Afecta">Afecta</option>
                                </Select>
                            </FormControl>
                        </HStack>
                        <FormControl id="paymentMethod">
                            <FormLabel>Metodo de pago</FormLabel>
                            <Textarea type="text" name="paymentMethod" onChange={handleChange} onBlur={handleBlur} value={values.paymentMethod} />
                        </FormControl>
                        <HStack my={5} w="full">
                            <Button w="full" color={"white"} bgColor={"#7ABC63"}>Ir al siguiente paso</Button>
                            <Button w="full" color={"white"} bgColor={"#DE1A1A"} onClick={() => setStep(1)}>Atras</Button>
                        </HStack>
                    </form>
                )}
            </Formik>
        </Container >
    )
}

export default QuoteForm