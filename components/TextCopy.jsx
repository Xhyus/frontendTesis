import { Text, HStack, IconButton } from "@chakra-ui/react";
// import IoCopy
import { IoCopy } from "react-icons/io5";

const TextCopy = ({ prefix, data }) => {

    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(data)
    }

    return (
        <HStack >
            <Text>{prefix}: {data}</Text>
            <IconButton
                aria-label="Copy to clipboard"
                icon={<IoCopy />}
                onClick={copyToClipboard}
                size="sm"
            />
        </HStack>
    )
}

export default TextCopy