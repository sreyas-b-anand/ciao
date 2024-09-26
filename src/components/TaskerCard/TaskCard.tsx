import { Flex, Text , Button } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md"



const TaskCard = ({el}:{
    el:number
}) => {
  return (
    <>
    <Flex borderRadius={4} p={5} rowGap={4} alignItems={'center'} direction={'column'} minW={'280px'}  maxH={'400px'} bg={"brand.secondary"}>
        
        <Flex width={'100%'} fontSize={'large'} color={'brand.textPrimary'} alignItems={'baseline'} justifyContent={'space-between'} >
            hello
            {el}
            <MdDelete/>
        </Flex>
        
        
        <Flex width={'100%'} alignItems={"baseline"}  justifyContent={'flex-start'} gap={4}>
          <Text color={'brand.textSecondary'}>
            Status : 
          </Text>
          <Button color={'white'} bg={"red.400"} p={1} _hover={{bg:'brand.error'}}>Pending</Button>
         
        </Flex>
    </Flex>
    </>
  )   
}

export default TaskCard
