import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
} from '@chakra-ui/react';
import './ListRegisters.css'
import { useContext, useEffect, } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import { UserContext } from '../../context/UserContext';



export function ListRegisters() {
  const { users } = useContext(UserContext)
  const { profiles, fetchProfiles } = useContext(ProfileContext)

  useEffect(() => {
    fetchProfiles()
  }, [users])

  return (
    <div className="Table__Wrapper">
      <TableContainer>
        <Heading as='h6' size='md' mb={5} style={{ display: 'flex', justifyContent: 'center' }}>
          Registros
        </Heading>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Name</Th>
              <Th>Last Name</Th>
              <Th>DOB</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              profiles.map((profile: any, index: any) => {
                return (
                  <Tr key={index}>
                    <Td>{profile.related_user.username}</Td>
                    <Td>{profile.related_user.email}</Td>
                    <Td>{profile.name}</Td>
                    <Td>{profile.last_name}</Td>
                    <Td>{profile.birth_date}</Td>
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
