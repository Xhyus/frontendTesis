
const formalizationOptions = [
    { value: 'Firma', label: 'Firma del presente contrato', name: "formalization" },
    { value: 'Contrato', label: 'Firma de contrato de servicio', name: "formalization" },
    { value: 'Confidencialidad', label: 'Firma de contrato de servicio y confidencialidad', name: "formalization" },
]

const paymentOptions = [
    { value: 'Efectivo', label: 'Efectivo', name: "payment" },
    { value: 'Transferencia', label: 'Transferencia', name: "payment" },
    { value: 'Credito', label: 'Crédito', name: "payment" },
    { value: 'Debito', label: 'Débito', name: "payment" },
    { value: 'Otros', label: 'Otros', name: "payment" },
]

const documentOptions = [
    { value: "Afecta", label: "Afecta", name: "document" },
    { value: "Exenta", label: "Exenta", name: "document" },
]

export { formalizationOptions, paymentOptions, documentOptions }