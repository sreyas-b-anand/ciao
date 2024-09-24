import { Flex } from '@chakra-ui/react'

import { CgProfile } from 'react-icons/cg'

const Tabbar = () => {

  return (
    <Flex  maxH={'90px'} p={3} px={7} borderRadius={'20px'} bg={'brand.primary'} alignItems={'center'} justifyContent={'end'}>
      <CgProfile size={'30px'} color='white' />
    </Flex>
  )
}

export default Tabbar
