import { Button, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { ProfileContext } from "../../context/ProfileContext";
import { UserContext } from "../../context/UserContext";
import { Profile } from "../../interfaces/profile.interface";
import { User } from "../../interfaces/user.interface";
import { api } from "../../services/api";


export default function FormProfile({ profile, buttonTitle }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setbirthDate] = useState('')
  const [relatedUser, setRelatedUser] = useState('')

  const { users } = useContext(UserContext)
  const { fetchProfiles } = useContext(ProfileContext)

  useEffect(() => {
    defineInstance(profile)
  }, [])

  const defineInstance = (profile: Profile) => {
    if (profile) {
      setName(profile.name);
      setLastName(profile.last_name);
      setbirthDate(profile.birth_date);
      setRelatedUser(String(profile.related_user.id))
    } else {
      setName("");
      setLastName("");
      setbirthDate("");
      setRelatedUser("")
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    api.post("profiles/", {
      name: name,
      last_name: lastName,
      birth_date: birthDate,
      related_user: relatedUser
    })
      .then((response) => {
        defineInstance(profile)
        fetchProfiles()
        onClose()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleProfileEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    api.put(`profiles/${profile.id}`, {
      name: name,
      last_name: lastName,
      birth_date: birthDate,
      related_user: relatedUser
    })
      .then((response) => {
        fetchProfiles()
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
            {profile
              ?
              <Stack spacing={3}>
                <Input variant='outline' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                <Input variant='outline' placeholder='last_name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <Input type={'date'} variant='outline' placeholder='birth_date' value={birthDate} onChange={(e) => setbirthDate(e.target.value)} />
                <Select placeholder='Select user' value={relatedUser} onChange={(e) => setRelatedUser(e.target.value)}>
                  {users.map((user: User, index: number) => {
                    return (
                      <option key={index} value={user.id}>{user.username}</option>
                    )
                  })}
                </Select>
                <Button colorScheme='blue' variant='outline' onClick={handleProfileEdit}>Editar</Button>
              </Stack>
              :
              <Stack spacing={3}>
                <Input variant='outline' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                <Input variant='outline' placeholder='last_name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <Input type={'date'} variant='outline' placeholder='birth_date' value={birthDate} onChange={(e) => setbirthDate(e.target.value)} />
                <Select placeholder='Select user' value={relatedUser} onChange={(e) => setRelatedUser(e.target.value)}>
                  {users.map((user: User, index: number) => {
                    return (
                      <option key={index} value={user.id}>{user.username}</option>
                    )
                  })}
                </Select>
                <Button colorScheme='blue' variant='outline' onClick={handleProfileSubmit}>Adicionar</Button>
              </Stack>

            }
          </form>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
          )
}