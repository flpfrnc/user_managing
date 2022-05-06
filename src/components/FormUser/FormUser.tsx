import { Button, Icon, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaUserEdit } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { User } from "../../interfaces/user.interface";
import { api } from '../../services/api';

export default function FormUser({ user, buttonTitle }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [show, setShow] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  
  const { fetchUsers } = useContext(UserContext)
  
  const handleClick = () => setShow(!show)

  useEffect(() => {
    defineInstance(user)
  }, [])

  const defineInstance = (user: User) => {
    if (user) {
      setUsername(user.username);
      setPassword(user.password);
      setEmail(user.email);
    } else {
      setUsername("")
      setPassword("")
      setEmail("")
    }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    api.post("users/", {
      username: username,
      password: password,
      email: email
    })
      .then((response) => {
        defineInstance(user)
        fetchUsers()
        onClose()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleUserUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    api.put(`users/${user.id}`, {
      username: username,
      password: password,
      email: email
    })
      .then((response) => {
        fetchUsers()
        onClose()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      {buttonTitle.includes("Editar")
        ?
        <Button onClick={onOpen}><Icon as={FaUserEdit} /></Button>
        :
        <Button onClick={onOpen}>{buttonTitle}</Button>
      }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{buttonTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              {user
                ?
                <Stack spacing={3}>
                  <Input variant='outline' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                  <InputGroup>
                    <Input type={show ? 'text' : 'password'} variant='outline' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width='4rem'>
                      <Button h='1.75rem' size='md' onClick={handleClick}>
                        {show ? <Icon as={FaEyeSlash} /> : <Icon as={FaEye} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Input variant='outline' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Button colorScheme='blue' variant='outline' onClick={handleUserUpdate}>Editar</Button>
                </Stack>
                :
                <Stack spacing={3}>
                  <Input variant='outline' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                  <InputGroup>
                    <Input type={show ? 'text' : 'password'} variant='outline' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width='4rem'>
                      <Button h='1.75rem' size='md' onClick={handleClick}>
                        {show ? <Icon as={FaEyeSlash} /> : <Icon as={FaEye} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Input variant='outline' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Button colorScheme='blue' variant='outline' onClick={handleUserSubmit}>Adicionar</Button>
                </Stack>
              }
            </form >
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}