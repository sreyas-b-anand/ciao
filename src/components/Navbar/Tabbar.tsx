type FlexProps = {
  flexProp : number
}

import { Flex } from '@chakra-ui/react'

import { CgProfile } from 'react-icons/cg'

const Tabbar = ({flexProp} : FlexProps) => {

  return (
    <Flex  maxH={'50px'} flex={flexProp} p={3} px={7} borderRadius={'20px'} bg={'brand.primary'} alignItems={'center'} justifyContent={'end'}>
      <CgProfile size={'30px'} color='white' />
    </Flex>
  )
}

export default Tabbar
