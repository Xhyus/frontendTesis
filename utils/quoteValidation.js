import * as yup from 'yup';

const quoteValidation = yup.object({
    name: yup.string()
        .required('El nombre es obligatorio')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(50, 'El nombre debe tener máximo 50 caracteres')
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s\-\_\.\,\;\:\(\)\[\]\{\}\¿\?\¡\!\@\#\$\%\^\&\*\+\|\?\/\\]+$/, 'El nombre no puede contener caracteres especiales'),
    description: yup.string()
        .required('La descripción es obligatoria')
        .min(3, 'La descripción debe tener al menos 3 caracteres')
        .max(100, 'La descripción debe tener máximo 100 caracteres')
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s\-\_\.\,\;\:\(\)\[\]\{\}\¿\?\¡\!\@\#\$\%\^\&\*\+\|\?\/\\]+$/, 'La descripción no puede contener caracteres especiales'),
    paymentMethod: yup.string()
        .required('El método de pago es obligatorio')
        .min(3, 'El método de pago debe tener al menos 3 caracteres')
        .max(150, 'El método de pago debe tener máximo 150 caracteres')
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚ\s\-\_\.\,\;\:\(\)\[\]\{\}\¿\?\¡\!\@\#\$\%\^\&\*\+\|\?\/\\]+$/, 'El método de pago no puede contener caracteres especiales')
})

export default quoteValidation;