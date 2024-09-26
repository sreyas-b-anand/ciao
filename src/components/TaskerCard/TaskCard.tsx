import { Flex } from "@chakra-ui/react"


const TaskCard = ({el}:{
    el:number
}) => {
  return (
    <>
    <Flex maxW={'300px'} minH={'300px'} bg={"brand.secondary"}>
        <Flex p={4} flex={1}>
        <Flex width={'100%'}>
            {/*Heading*/}
            {el}
        </Flex>
        <Flex width={'100%'}>
            {/*Status*/ }
        </Flex>
        <Flex width={'100%'}>
            {/*Delete , edit */}
        </Flex>
        </Flex>
    </Flex>
    </>
  )
}

export default TaskCard
