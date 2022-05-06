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
import './ListUsers.css'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import FormUser from '../FormUser/FormUser';
import { FaTrash } from 'react-icons/fa';
import { api } from '../../services/api';

export function ListUsers() {
    const { users, fetchUsers } = useContext(UserContext)

    const handleUserDelete = async (id: number) => {
        api.delete(`users/${id}`)
            .then((response) => {
                fetchUsers()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="User__TableWrapper">
            <TableContainer>
                <Heading as='h6' size='md' mb={5} style={{ display: 'flex', justifyContent: 'center' }}>
                    Usuários
                </Heading>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Email</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users &&
                            users.map((user: any, index: any) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{user.username}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>
                                            <FormUser user={user} buttonTitle="Editar Usuario" />
                                            <Button ml={2} onClick={() => handleUserDelete(user.id)}><Icon as={FaTrash} /></Button>
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
