type UserProps = {
    user:string,
    handleClick :()=> void
}
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const UserProfileAccordion = ({ user, handleClick } : UserProps) => {
  return (
    <Box 
       maxWidth={'200px'}
       zIndex={50}
      borderRadius="md" 
      border="1px solid" 
      borderColor="gray.500" 
      p={2} 
      px={8} 
      transition="all 2s ease-in-out" 
      display="inline-block"
    >
      <Flex direction="column" align="center" justify="center" gap={4} p={2}>
        <Text borderBottom="1px solid" borderColor="gray.500" py={2}>{user}</Text>
        <Button 
          size="sm" 
          variant="outline" 
          colorScheme="red" 
          onClick={handleClick}
          opacity={0.7}
          _hover={{ opacity: 1 }}
        >
          LOG OUT
        </Button>
      </Flex>
    </Box>
  );
};

export default UserProfileAccordion;
