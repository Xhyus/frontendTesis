import { useState } from 'react'
import { useRouter } from 'next/router'
import ContactFormEdit from './ContactFormEdit';
import CompanyFormEdit from './CompanyFormEdit';

const EditCompany = ({ step, setStep, company, setCompany }) => {
    const router = useRouter()
    const { empresa } = router.query
    const [companyRUT, setCompanyRUT] = useState(company.rut)
    const [contactRUT, setContactRUT] = useState(company.contact.rut)

    if (step === 1) {
        return <CompanyFormEdit company={company} setCompany={setCompany} setStep={setStep} companyRUT={companyRUT} setCompanyRUT={setCompanyRUT} />
    }
    if (step === 2) {
        return (
            <ContactFormEdit company={company} setStep={setStep} contact={company.contact} setContact={setCompany} contactRUT={contactRUT} setContactRUT={setContactRUT} />
        )
    }
}

export default EditCompany