import * as yup from 'yup';

const unconstitutedValidation = yup.object({
    name: yup.string()
        .min(2, "El nombre debe contener al menos 2 caracteres")
        .max(50, "El nombre debe contener como maximo 50 caracteres")
        .matches(/^[a-zA-Z0-9\s\.\,\#\(\)\[\]\{\}]{3,}$/, "El nombre solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("El nombre es obligatorio"),
    phone: yup.string()
        .matches(/^[0-9]{8}$/, "El telefono debe contener 8 numeros")
        .required("El telefono es obligatorio"),
    email: yup.string()
        .email("El email debe tener un formato valido")
        .required("El email es obligatorio")
})

export default unconstitutedValidation;