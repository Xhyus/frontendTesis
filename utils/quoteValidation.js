import * as yup from 'yup';

const quoteValidation = yup.object({
    name: yup.string()
        .required('El nombre es obligatorio')
        .trim()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre debe tener máximo 100 caracteres')
        .matches(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s\-\_\.\,\;\:\(\)\[\]\{\}\¿\?\¡\!\@\#\$\%\^\&\*\+\|\?\/\\]+$/, 'El nombre no puede contener caracteres especiales'),
    description: yup.string()
        .required('La descripción es obligatoria')
        .trim()
        .min(3, 'La descripción debe tener al menos 3 caracteres')
        .max(350, 'La descripción debe tener máximo 350 caracteres')
        .matches(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s\-\_\.\,\;\:\(\)\[\]\{\}\¿\?\¡\!\@\#\$\%\^\&\*\+\|\?\/\\]+$/, 'La descripción no puede contener caracteres especiales'),
    paymentMethod: yup.string()
        .required('El método de pago es obligatorio')
        .min(3, 'El método de pago debe tener al menos 3 caracteres')
        .trim()
        .max(350, 'El método de pago debe tener máximo 350 caracteres')
        .matches(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s\-\_\.\,\;\:\(\)\[\]\{\}\¿\?\¡\!\@\#\$\%\^\&\*\+\|\?\/\\]+$/, 'El método de pago no puede contener caracteres especiales'),
    projectDelivery: yup.string()
        .trim()
        .required('La fecha de entrega es obligatoria')
        .min(3, 'La fecha de entrega debe tener al menos 3 caracteres')
        .max(350, 'La fecha de entrega debe tener máximo 350 caracteres')
        .matches(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s\-\_\.\,\;\:\(\)\[\]\{\}\¿\?\¡\!\@\#\$\%\^\&\*\+\|\?\/\\]+$/, 'La fecha de entrega no puede contener caracteres especiales'),
})

export default quoteValidation;