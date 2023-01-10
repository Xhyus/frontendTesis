const formatTitle = (title) => {
    return title.length > 15 ? title.charAt(0).toUpperCase() + title.slice(1, 15) + '...' : title.charAt(0).toUpperCase() + title.slice(1);
}

const formatTitleDetail = (title) => {
    return title.length > 45 ? title.charAt(0).toUpperCase() + title.slice(1, 45) + '...' : title.charAt(0).toUpperCase() + title.slice(1);
}

const formatDescription = (description) => {
    return description.charAt(0).toUpperCase() + description.slice(1) + (description.length > 200 ? '...' : '');
}

const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const formatType = (type) => {
    if (type === undefined) {
        return 'No Definido'
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
}

const formatDate = (date) => {
    let newDate = new Date(date);
    return newDate.toLocaleString();
}

const formatText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const formatFormalization = (formalization) => {
    if (formalization === 'Firma') {
        return 'Firma del presente contrato'
    }
    if (formalization === 'Contrato') {
        return 'Firma de contrato de servicio'
    }
    if (formalization === 'Confidencialidad') {
        return 'Firma de contrato de servicio y confidencialidad'
    }
}

module.exports = {
    formatTitle,
    formatDescription,
    formatPrice,
    formatType,
    formatDate,
    formatTitleDetail,
    formatText,
    formatFormalization
}