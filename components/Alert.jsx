import Swal from 'sweetalert2'

const Alert = async ({ title, message, status }) => {
    return await Swal.fire({
        title: title,
        text: message,
        icon: status,
        confirmButtonText: 'Aceptar'
    })
}

export default Alert