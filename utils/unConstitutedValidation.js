import * as yup from 'yup';

const unconstitutedValidation = yup.object({
    name: yup.string()
        .min(2, "El nombre debe contener al menos 2 caracteres")
        .max(50, "El nombre debe contener como maximo 50 caracteres")
        .matches(/^[a-zA-Z0-9\s\.\,\#\(\)\[\]\{\}]{3,}$/, "El nombre solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("El nombre es obligatorio"),
    rut: yup.string()
        .min(12, "El rut debe contener 12 caracteres")
        .max(12, "El rut debe contener 12 caracteres")
        .matches(/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}\-[0-9kK]{1}$/, "El rut debe tener el formato 11.111.111-1")
        .required("El rut es obligatorio"),
    phone: yup.string()
        .min(12, "El telefono debe contener 12 caracteres")
        .max(12, "El telefono debe contener 12 caracteres")
        .matches(/^[+]{1}[0-9]{2}\s[0-9]{4}\s[0-9]{4}$/, "El telefono debe tener el formato +56 9 1111 1111")
        .required("El telefono es obligatorio"),
    email: yup.string()
        .email("El email debe tener un formato valido")
        .required("El email es obligatorio"),
    contactName: yup.string()
        .min(2, "El nombre del contacto debe contener al menos 2 caracteres")
        .max(50, "El nombre del contacto debe contener como maximo 50 caracteres")
        .matches(/^[a-zA-Z0-9\s\.\,\#\(\)\[\]\{\}]{3,}$/, "El nombre del contacto solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("El nombre del contacto es obligatorio"),
    contactEmail: yup.string()
        .email("El email del contacto debe tener un formato valido")
        .required("El email del contacto es obligatorio"),
    contactPhone: yup.string()
        .min(12, "El telefono del contacto debe contener 12 caracteres")
        .max(12, "El telefono del contacto debe contener 12 caracteres")
        .matches(/^[+]{1}[0-9]{2}\s[0-9]{4}\s[0-9]{4}$/, "El telefono del contacto debe tener el formato +56 9 1111 1111")
        .required("El telefono del contacto es obligatorio"),
    contactPosition: yup.string()
        .min(2, "El cargo del contacto debe contener al menos 2 caracteres")
        .max(50, "El cargo del contacto debe contener como maximo 50 caracteres")
        .matches(/^[a-zA-Z0-9\s\.\,\#\(\)\[\]\{\}]{3,}$/, "El cargo del contacto solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("El cargo del contacto es obligatorio"),
    contactRut: yup.string()
        .min(12, "El rut del contacto debe contener 12 caracteres")
        .max(12, "El rut del contacto debe contener 12 caracteres")
        .matches(/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}\-[0-9kK]{1}$/, "El rut del contacto debe tener el formato 11.111.111-1")
        .required("El rut del contacto es obligatorio"),
})

export default unconstitutedValidation;