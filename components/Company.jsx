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
        rut: '',
        email: '',
        phone: '',
        address: ''
    })
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        position: '',
        rut: ''
    })
    if (step === 1) {
        if (state === true) {
            return <Constituted company={company} setCompany={setCompany} setStep={setStep} />
        }
        if (state === false) {
            return <UnConstituted company={company} setCompany={setCompany} setStep={setStep} />
        }
    }
    if (step === 2) {
        return (
            <ContactForm company={company} setStep={setStep} setContact={setContact} contact={contact} state={state} />
        )
    }
}

export default Company