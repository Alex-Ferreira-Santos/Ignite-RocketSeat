import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps{
    showProfileData: boolean;
}

export function Profile({showProfileData = true}:ProfileProps){
    return(
        <Flex align='center'>
            { showProfileData && (<Box mr='4' textAlign='right'>
                <Text>Alex Ferreira</Text>
                <Text color='gray.300' fontSize='small'>
                    alexfstos@gmail.com
                </Text>
            </Box>)}

            <Avatar size='md' name='Alex Ferreira' src='https://github.com/Alex-Ferreira-Santos.png'/>
        </Flex>
    )
}