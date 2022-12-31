import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { MdArrowBackIos, MdArrowForwardIos, MdDoubleArrow } from 'react-icons/md'

const Pagination = ({ page, handleChange, count }) => {
    console.log(page, handleChange, count)

    return (
        <HStack>

        </HStack>
    )
}

export default Pagination


{/* {page > 1 && (
                <Button onClick={() => handleChange(1)}> <MdDoubleArrow /> </Button>
            )}
            {page > 1 && (
                <Button onClick={() => handleChange(page - 1)}> <MdArrowBackIos /> </Button>
            )}
            <Button>{page}</Button>
            {page < count && (
                <Button onClick={() => handleChange(page + 1)}> <MdArrowForwardIos /> </Button>
            )}
            {page < count && (
                <Button onClick={() => handleChange(count)}> <MdDoubleArrow /> </Button>
            )} */}
