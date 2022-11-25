const formatTitle = (title) => {
    return title.length > 15 ? title.charAt(0).toUpperCase() + title.slice(1, 15) + '...' : title.charAt(0).toUpperCase() + title.slice(1);
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

module.exports = {
    formatTitle,
    formatDescription,
    formatPrice,
    formatType
}