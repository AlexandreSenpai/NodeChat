import React, { useEffect, useState } from 'react';
// import api from '../../api';

import { Container, Lista, Users } from './styles';

function UsersList() {

    const [ users, setUsers ] = useState(['alexandre ramos', 'guilherme simonato', 'luis mioki']);

    useEffect(() => {
        // api.get('/users').then(users_list => {
        //     setUsers(last_users => {
        //         return [...users_list, ...last_users]
        //     });
        // })
    }, [])

    return(
        <Container>
            <Lista>
                {
                    users.length > 0
                    ? users.map(user => {return <Users>{user}</Users>})
                    : null
                }
            </Lista>
        </Container>
    );
}

export default UsersList;