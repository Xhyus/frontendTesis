import { useState } from 'react'
import { Heading, Container } from '@chakra-ui/react';
import { getCompany } from '../../../data/company'
import CompanyFormEdit from '../../../components/CompanyFormEdit';
import ContactFormEdit from '../../../components/ContactFormEdit';

export async function getServerSideProps(context) {
    try {
        const res = await getCompany(context.query.empresa, context.req.headers.cookie)
        return {
            props: {
                data: res.data
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}

const Empresa = ({ data }) => {
    const [step, setStep] = useState(1)
    const [company, setCompany] = useState()
    const [constituted, setConstituted] = useState(data.socialReason !== null ? true : false)
    const [companyRUT, setCompanyRUT] = useState(data.rut)
    const [contactRUT, setContactRUT] = useState(data.contact.rut)

    return (
        <Container maxW={"container.md"}>
            <Heading as={"h1"} fontSize="6xl" my={10}>Editar Empresa</Heading>
            {step === 1 ?
                <CompanyFormEdit company={data} setCompany={setCompany} setStep={setStep} companyRUT={companyRUT} setCompanyRUT={setCompanyRUT} constituted={constituted} setConstituted={setConstituted} />
                :
                <ContactFormEdit company={company} setStep={setStep} contact={data.contact} setContact={setCompany} contactRUT={contactRUT} setContactRUT={setContactRUT} state={constituted} companyRUT={companyRUT} id={data._id} />
            }
        </Container >
    )

}

export default Empresa