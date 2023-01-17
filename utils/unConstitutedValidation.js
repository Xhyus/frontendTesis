import * as yup from 'yup';

const unconstitutedValidation = yup.object({
    name: yup.string()
        .min(2, "El nombre debe contener al menos 2 caracteres")
        .max(100, "El nombre debe contener como maximo 100 caracteres")
        .matches(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s\-\_\.\,\;\:\(\)\[\]\{\}\¿\?\¡\!\@\#\$\%\^\&\*\+\|\?\/\\]+$/, "El nombre solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("El nombre es obligatorio"),
    phone: yup.string()
        .matches(/^[0-9]{8}$/, "El telefono debe contener 8 numeros")
        .required("El telefono es obligatorio"),
    email: yup.string()
        .email("El email debe tener un formato valido")
        .required("El email es obligatorio"),
    address: yup.string()
        .min(2, "La direccion debe contener al menos 2 caracteres")
        .max(250, "La direccion debe contener como maximo 250 caracteres")
        .matches(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s\-\_\.\,\;\:\(\)\[\]\{\}\¿\?\¡\!\@\#\$\%\^\&\*\+\|\?\/\\]+$/, 'La direccion solo debe contener letras, espacios, numeros y algunos caracteres')
        .required("La direccion es obligatoria")
})

export default unconstitutedValidation;