import {Box, Button, Text, useToast} from '@chakra-ui/react'
import { executeCode } from '../api';
import { useState } from 'react';

const Output = ({editorRef, language}) => {
    const [output, setOutput] = useState({ output: null, error: null });
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const runCode = async() => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) {
            return;
        }
        try{
            setLoading(true);
            const {output, error} = await executeCode(sourceCode);
            console.log(output, error);
            setOutput({output, error})
        }catch(err){
            console.error(err);
            toast({
                title: "Error",
                description: err.message || "Unable to run code",
                status: "error",
                duration: 1000,
            });
        }finally{
            setLoading(false);
        }
    }

    return (
        <Box w='50%'>
            <Text mb={2} fontSize="lg">
                Output:
            </Text>
                <Button
                    variant='outline'
                    colorScheme='green'
                    mb={4}
                    isLoading={loading}
                    onClick={runCode}
                >
                    Run Code
                </Button>
            <Box
                height='75vh'
                p={2}
                border='1px solid'
                borderRadius={4}
                borderColor='#333'
                >
                {
                    output.error ? (
                        <Text color="red.500">{output.error}</Text>  // If there's an error, display it
                    ) : output.output ? (
                        <Text>{output.output}</Text>  // If there's no error, display output
                    ) : (
                        <Text>Click 'Run Code' to see the output.</Text>  // Default message if neither error nor output exists
                    )
                }
            </Box>
        </Box>
    );
}
export default Output;