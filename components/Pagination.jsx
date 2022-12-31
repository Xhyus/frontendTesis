import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { MdArrowBackIos, MdArrowForwardIos, MdDoubleArrow } from 'react-icons/md'

const Pagination = ({ page, handleChange, count }) => {
    console.log(count)
    console.log(page)

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
            {/* use page to list the center page, the previus one and the next one, the other pages must be three dots and use a button to go page 1 and one button to the last page, if the page is equal to some of the buttons it must be disabled */}
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
