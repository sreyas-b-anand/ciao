import { Container, Text } from "@chakra-ui/react"


const Welcome = () => {
  return (
   <>
    <Container display={'flex'} textAlign={'center'} flexDirection={'column'} gap={3} p={5} m={2} >
    <Text color={'brand.textPrimary'} fontFamily={'Montserrat'} fontSize={'40px'} fontWeight={600}>Welcome to CIAO</Text>
    <Text color={'brand.textSecondary'} fontFamily={'Montserrat'} fontSize={'17px'}>Your Personel AI Assistant</Text>
    </Container>
   </>
  )
}

export default Welcome
