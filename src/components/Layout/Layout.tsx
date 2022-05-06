import './Layout.css'
import Card from '../Card/Card';
import { FaPlus, FaUserPlus } from 'react-icons/fa';
import FormUser from '../FormUser/FormUser';
import FormProfile from '../FormProfile/FormProfile';
import { ListRegisters } from '../ListRegisters/ListRegisters';
import { Heading, Icon } from '@chakra-ui/react';
import { ListUsers } from '../ListUsers/ListUsers';
import { ListProfiles } from '../ListProfiles/ListProfiles';

const cardsData = [
    {
        "icon": FaUserPlus,
        "button": "Adicionar Usuario",
        "role": "user"
    },
    {
        "icon": FaPlus,
        "button": "Adicionar Perfil",
        "role": "profile"
    },
]

export default function Layout() {

    return (
        <div className="Layout">
            <Heading as='h1' size='lg' m={5} style={{ display: 'flex', justifyContent: 'center' }}>
                CRUD Usuários
            </Heading>
            <div className='RegisterCard__Wrapper'>
                {cardsData &&
                    cardsData.map((card, index) => {
                        return (
                            <Card key={index}>
                                <Icon as={card.icon} w={6} h={6} mb={5} />
                                {card.role === "user"
                                    ?
                                    <FormUser buttonTitle={card.button} />
                                    :
                                    <FormProfile buttonTitle={card.button} />
                                }
                            </Card>
                        )
                    })}
            </div>
            <div className="EditableTable__Wrapper">
                <ListUsers />
                <ListProfiles />
            </div>
            <div className="ReadableTable__Wrapper">
                <ListRegisters />
            </div>
        </div>
    )
}