import * as yup from "yup"

const contactValidation = yup.object({
    name: yup.string()
        .min(2, "El nombre debe contener al menos 2 caracteres")
        .max(50, "El nombre debe contener como maximo 50 caracteres")
        .matches(/^[a-zA-Z0-9\s\.\,\#\(\)\[\]\{\}]{3,}$/, "El nombre solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("El nombre es obligatorio"),
    email: yup.string()
        .email("El email debe ser valido")
        .required("El email es obligatorio"),
    phone: yup.string()
        .matches(/^(\+56|56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/, "El telefono debe ser valido")
        .required("El telefono es obligatorio"),
    position: yup.string()
        .min(2, "El cargo debe contener al menos 2 caracteres")
        .max(50, "El cargo debe contener como maximo 50 caracteres")
        .matches(/^[a-zA-Z0-9\s\.\,\#\(\)\[\]\{\}]{3,}$/, "El cargo solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("El cargo es obligatorio")
})

export default contactValidation