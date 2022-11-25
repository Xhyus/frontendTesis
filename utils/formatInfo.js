const formatTitle = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1) + (title.length > 10 ? '...' : '');
}

const formatDescription = (description) => {
    return description.charAt(0).toUpperCase() + description.slice(1) + (description.length > 200 ? '...' : '');
}

const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const formatType = (type) => {
    console.log(type)
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