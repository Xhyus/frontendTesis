import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { MdArrowBackIos, MdArrowForwardIos, MdDoubleArrow } from 'react-icons/md'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

    // make an array from 1 to nPages
    const pageNumbers = Array.from(Array(nPages), (_, i) => i + 1)

    const handleNext = () => {
        if (currentPage < nPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleFirst = () => {
        if (currentPage > 1) {
            setCurrentPage(1)
        }
    }

    const handleLast = () => {
        if (currentPage < nPages) {
            setCurrentPage(nPages)
        }
    }

    return (
        <HStack spacing={2}>
            <Button onClick={handleFirst} leftIcon={<MdDoubleArrow />}>First</Button>
            <Button onClick={handlePrev} leftIcon={<MdArrowBackIos />}>Prev</Button>
            {pageNumbers.map(number => {
                return (
                    <Button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        colorScheme={currentPage === number ? 'green' : 'gray'}
                    >
                        {number}
                    </Button>
                )
            })}
            <Button onClick={handleNext} rightIcon={<MdArrowForwardIos />}>Next</Button>
            <Button onClick={handleLast} rightIcon={<MdDoubleArrow />}>Last</Button>
        </HStack>
    )
}

// const nextPage = () => {
//     if (currentPage !== nPages)
//         setCurrentPage(currentPage + 1)
// }
// const prevPage = () => {
//     if (currentPage !== 1)
//         setCurrentPage(currentPage - 1)
// }

// return (
//     <HStack my={10}>
//         <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
//             <MdDoubleArrow style={{ transform: 'rotate(180deg)' }} />
//         </Button>
//         <Button onClick={() => prevPage} disabled={currentPage === 1}>
//             <MdArrowBackIos />
//         </Button>
//         {pageNumbers.map(number => {
//             return (
//                 <Button key={number} onClick={() => setCurrentPage(number)} disabled={currentPage === number}>
//                     {number}
//                 </Button>
//             )
//         })}
//         <Button onClick={() => nextPage} disabled={currentPage === nPages}>
//             <MdArrowForwardIos />
//         </Button>
//         <Button onClick={() => setCurrentPage(nPages)} disabled={currentPage === nPages}>
//             <MdDoubleArrow />
//         </Button>
//     </HStack>
// )
// }

export default Pagination