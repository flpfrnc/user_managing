import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Icon,
  Heading,
} from '@chakra-ui/react';
import './ListProfiles.css'
import { useContext } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import { FaTrash } from 'react-icons/fa';
import FormProfile from '../FormProfile/FormProfile';
import { api } from '../../services/api';



export function ListProfiles() {
  const { profiles, fetchProfiles } = useContext(ProfileContext)

  const handleUserDelete = async (id: number) => {
    api.delete(`profiles/${id}`)
      .then((response) => {
        fetchProfiles()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="Profile__TableWrapper">
      <TableContainer>
        <Heading as='h6' size='md' mb={5} style={{ display: 'flex', justifyContent: 'center' }}>
          Perfis
        </Heading>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Last Name</Th>
              <Th>Birth Date</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {profiles &&
              profiles.map((profile: any, index: any) => {
                return (
                  <Tr key={index}>
                    <Td>{profile.name}</Td>
                    <Td>{profile.last_name}</Td>
                    <Td>{profile.birth_date}</Td>
                    <Td>
                      <FormProfile profile={profile} buttonTitle="Editar Perfil" />
                      <Button ml={2} onClick={() => handleUserDelete(profile.id)}><Icon as={FaTrash} /></Button>
                    </Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
