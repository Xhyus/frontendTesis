import * as yup from "yup"

const serviceValidation = yup.object({
    name: yup.string()
        .min(2, "El nombre debe contener al menos 2 caracteres")
        .max(50, "El nombre debe contener como maximo 50 caracteres")
        .matches(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/, "El nombre solo puede contener letras, numeros y espacios")
        .required("El nombre es obligatorio"),
    description: yup.string()
        .min(10, "La descripción debe contener al menos 10 caracteres")
        .max(100, "La descripción debe contener como maximo 100 caracteres")
        .matches(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s\-\_\.\,\;\:\(\)\[\]\{\}\!\¡\¿\?\@\#\$\%\&\*\+\/]+$/, "El nombre solo puede contener letras, numeros, espacios y los siguientes caracteres: -_.,;:()[]{}!¡¿?@#$%&*+/ñÑáéíóúÁÉÍÓÚ")
        .required("La descripción es obligatoria"),
    price: yup.number()
        .min(0, "El precio debe ser mayor o igual a 0 UFs ")
        .max(99999, "El precio debe ser menor o igual a 99.999 UFs")
        .required("El precio es obligatorio"),
    type: yup.string()
        .required("El tipo de servicio es obligatorio"),
})

export default serviceValidation