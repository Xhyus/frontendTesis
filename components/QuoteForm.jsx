import { Formik } from 'formik'
import { Container, Heading, Button, HStack } from '@chakra-ui/react'
import quoteValidation from '../utils/quoteValidation'
import ReactSelect from './ReactSelect'
import FormInput from './FormInput'
import { documentOptions, formalizationOptions, paymentOptions } from '../data/staticInfo'
import TextareaForm from './TextareaForm'
import Swal from 'sweetalert2'

const QuoteForm = ({ setStep, quote, setQuote, companies, setSelectedInfo, selectedInfo }) => {
    let companyOptions = companies.map(company => {
        return {
            value: company._id,
            label: company.name,
            name: "company"
        }
    })

    const handleChangeSelect = (value) => {
        let options = value.name === "company" ? companyOptions : value.name === "formalization" ? formalizationOptions : value.name === "payment" ? paymentOptions : documentOptions
        setSelectedInfo({
            ...selectedInfo,
            [value.name]: options.findIndex(option => option === value)
        })
    }
    return (
        <Container maxW={"container.md"} pb={10}>
            <Formik
                initialValues={{ name: quote.name, description: quote.description, projectDelivery: quote.projectDelivery, paymentMethod: quote.paymentMethod }}
                validationSchema={quoteValidation}
                onSubmit={(values) => {
                    if (selectedInfo.company === null || selectedInfo.formalization === null || selectedInfo.payment === null || selectedInfo.document === null) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Debe seleccionar todos los campos',
                        })
                        return
                    }
                    setQuote({
                        ...values,
                        company: {
                            id: companyOptions[selectedInfo.company].value,
                            name: companyOptions[selectedInfo.company].label
                        },
                        payment: {
                            value: paymentOptions[selectedInfo.payment].value,
                            name: paymentOptions[selectedInfo.payment].label
                        },
                        formalization: {
                            value: formalizationOptions[selectedInfo.formalization].value,
                            name: formalizationOptions[selectedInfo.formalization].label
                        },
                        document: {
                            value: documentOptions[selectedInfo.document].value,
                            name: documentOptions[selectedInfo.document].label
                        }
                    })
                    setStep(3)
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit} id="form">
                        <Heading mt={10} mb={5} fontSize={'6xl'} textAlign="center">Crear Cotización</Heading>
                        <FormInput placeHolder={"Ingrese el nombre con el que se identifica la cotización"} label="Nombre" name="name" type="text" values={values.name} onChange={handleChange} handleBlur={handleBlur} errors={errors.name} touched={touched.name} />
                        <TextareaForm label="Descripción" name="description" placeholder="Ingrese una descripción de la cotización" value={values.description} onChange={handleChange} onBlur={handleBlur} errors={errors.description} touched={touched.description} />
                        <HStack w="full" mt={5} >
                            <ReactSelect label="Empresa" name="company" index={selectedInfo.company} value={selectedInfo.company} onChange={handleChangeSelect} options={companyOptions} />
                            <ReactSelect label="Formalización" name="formalization" index={selectedInfo.formalization} value={selectedInfo.formalization} onChange={handleChangeSelect} options={formalizationOptions} />
                        </HStack>
                        <HStack w="full" my={5} >
                            <ReactSelect label="Pago" name="payment" index={selectedInfo.payment} value={selectedInfo.payment} onChange={handleChangeSelect} options={paymentOptions} />
                            <ReactSelect label="Documento" name="document" index={selectedInfo.document} value={selectedInfo.document} onChange={handleChangeSelect} options={documentOptions} />
                        </HStack>
                        <TextareaForm label="Método de pago" placeholder='Ingrese el método de pago' type="text" name="paymentMethod" onChange={handleChange} onBlur={handleBlur} value={values.paymentMethod} errors={errors.paymentMethod} touched={touched.paymentMethod} />
                        <TextareaForm label="Plazo de entrega" placeholder='Ingrese el plazo de entrega' type="text" name="projectDelivery" onChange={handleChange} onBlur={handleBlur} value={values.projectDelivery} errors={errors.projectDelivery} touched={touched.projectDelivery} />
                        <HStack my={5} w="full">
                            <Button w="full" bgColor={"#7ABC63"} color="white" _hover={{ bgColor: "#64AB49" }} type="submit" >Ir al siguiente paso</Button>
                            <Button w="full" bgColor={"#C1292E"} color="white" _hover={{ bgColor: "#A82428" }} onClick={() => { setStep(1), setQuote({ ...quote, values }) }}>Atras</Button>
                        </HStack>
                    </form>
                )}
            </Formik>
        </Container >
    )
}

export default QuoteForm