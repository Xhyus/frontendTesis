import * as yup from 'yup';

const unconstitutedValidation = yup.object({
    name: yup.string()
        .min(2, "El nombre debe contener al menos 2 caracteres")
        .max(50, "El nombre debe contener como maximo 50 caracteres")
        .matches(/^[a-zA-Z0-9\s\.\,\#\(\)\[\]\{\}]{3,}$/, "El nombre solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("El nombre es obligatorio"),
    phone: yup.string()
        .min(12, "El telefono debe contener 12 caracteres")
        .max(12, "El telefono debe contener 12 caracteres")
        .matches(/^[+]{1}[0-9]{2}\s[0-9]{4}\s[0-9]{4}$/, "El telefono debe tener el formato +56 9 1111 1111")
        .required("El telefono es obligatorio"),
    email: yup.string()
        .email("El email debe tener un formato valido")
        .required("El email es obligatorio")
})

export default unconstitutedValidation;