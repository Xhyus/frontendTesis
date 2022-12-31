import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { MdArrowBackIos, MdArrowForwardIos, MdDoubleArrow } from 'react-icons/md'

const Pagination = ({ page, handleChange, count }) => {
    const pageNumbers = () => {
        let pages = []
        for (let i = 1; i <= count; i++) {
            if (i === page) {
                pages.push(<Button key={i} onClick={() => handleChange(i)} colorScheme="cyan" >{i}</Button>)
            }
            if (i === page - 1 || i === page + 1) {
                pages.push(<Button key={i} onClick={() => handleChange(i)} >{i}</Button>)
            }
        }
        return pages
    }

    return (
        <HStack my={5}>
            {page > 1 && (
                <Button onClick={() => handleChange(1)}  >
                    <MdDoubleArrow style={{ transform: 'rotate(180deg)' }} />
                </Button>
            )}
            {page > 1 && (
                <Button onClick={() => handleChange(page - 1)}> <MdArrowBackIos /> </Button>
            )}
            {pageNumbers()}
            {page < count && (
                <Button onClick={() => handleChange(page + 1)}> <MdArrowForwardIos /> </Button>
            )}
            {page < count && (
                <Button onClick={() => handleChange(count)}> <MdDoubleArrow /> </Button>
            )}
        </HStack>
    )
}

export default Pagination