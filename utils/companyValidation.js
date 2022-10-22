import * as yup from "yup"

const companyValidation = yup.object({
    name: yup.string()
        .min(2, "El nombre debe contener al menos 2 caracteres")
        .max(50, "El nombre debe contener como maximo 50 caracteres")
        .matches(/^[a-zA-Z0-9\s\.\,\#\(\)\[\]\{\}]{3,}$/, "El nombre solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("El nombre es obligatorio")
})

export default companyValidation