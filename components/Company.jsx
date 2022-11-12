import { useState } from 'react'
import { useRouter } from 'next/router'
import ContactForm from './ContactForm';
import Constituted from './Constituted';
import UnConstituted from './UnConstituted';

const Company = ({ state, step, setStep }) => {
    const router = useRouter()
    const { empresa } = router.query
    const [company, setCompany] = useState({
        name: '',
        socialReason: '',
        email: '',
        phone: '',
        address: ''
    })
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        position: ''
    })
    const [companyRUT, setCompanyRUT] = useState('')
    const [contactRUT, setContactRUT] = useState('')
    if (step === 1) {
        if (state === true) {
            return <Constituted company={company} setCompany={setCompany} setStep={setStep} companyRUT={companyRUT} setCompanyRUT={setCompanyRUT} />
        }
        if (state === false) {
            return <UnConstituted company={company} setCompany={setCompany} setStep={setStep} companyRUT={companyRUT} setCompanyRUT={setCompanyRUT} />
        }
    }
    if (step === 2) {
        return (
            <ContactForm company={company} setStep={setStep} setContact={setContact} contact={contact} state={state} companyRUT={companyRUT} contactRUT={contactRUT} setContactRUT={setContactRUT} />
        )
    }
}

export default Company