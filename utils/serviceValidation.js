import * as yup from "yup"

const serviceValidation = yup.object({
    name: yup.string()
        .min(2, "El nombre debe contener al menos 2 caracteres")
        .max(50, "El nombre debe contener como maximo 50 caracteres")
        .matches(/^[a-zA-Z0-9\s\.\,\#\(\)\[\]\{\}]{3,}$/, "El nombre solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("El nombre es obligatorio"),
    description: yup.string()
        .min(10, "La descripción debe contener al menos 10 caracteres")
        .max(100, "La descripción debe contener como maximo 100 caracteres")
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-]+$/, "La descripción solo debe contener letras, espacios, numeros y algunos caracteres")
        .required("La descripción es obligatoria"),
    price: yup.number()
        .min(1000, "El precio debe ser mayor o igual a $1.000 pesos")
        .required("El precio es obligatorio"),
    itemList: yup.array()
        .min(1, "La lista de items debe contener al menos 1 item")
        .required("La lista de items es obligatoria"),
})

export default serviceValidation