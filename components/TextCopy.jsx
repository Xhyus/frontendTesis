import { Text, HStack, IconButton } from "@chakra-ui/react";
import { IoCopy } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Swal from "sweetalert2";

const TextCopy = ({ prefix, data }) => {
    return (
        <HStack >
            <HStack>
                <Text mr={2} fontWeight={"bold"}>{prefix}:</Text>
                <Text>{data}</Text>
            </HStack>
            <CopyToClipboard
                text={data}
                onCopy={() => Swal.fire({
                    icon: 'success',
                    title: 'Copiado al portapapeles',
                    showConfirmButton: false,
                    timer: 1000
                })}
            >
                <IconButton
                    aria-label="Copiar al portapapeles"
                    icon={<IoCopy />}
                    size="sm"
                />
            </CopyToClipboard>
        </HStack>
    )
}

export default TextCopy