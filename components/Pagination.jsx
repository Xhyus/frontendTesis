import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { MdArrowBackIos, MdArrowForwardIos, MdDoubleArrow } from 'react-icons/md'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    return (
        <HStack my={10}>
            <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                <MdDoubleArrow style={{ transform: 'rotate(180deg)' }} />
            </Button>
            <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                <MdArrowBackIos />
            </Button>
            {pageNumbers.map(number => {
                return (
                    <Button key={number} onClick={() => setCurrentPage(number)} disabled={currentPage === number}>
                        {number}
                    </Button>
                )
            })}
            <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === nPages}>
                <MdArrowForwardIos />
            </Button>
            <Button onClick={() => setCurrentPage(nPages)} disabled={currentPage === nPages}>
                <MdDoubleArrow />
            </Button>
        </HStack>
    )
}

export default Pagination