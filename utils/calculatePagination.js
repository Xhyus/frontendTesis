const calculatePagination = (services, currentPage, servicesPerPage) => {
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);
    const totalPages = Math.ceil(services.length / servicesPerPage);
    return { currentServices, totalPages };
}

export default calculatePagination