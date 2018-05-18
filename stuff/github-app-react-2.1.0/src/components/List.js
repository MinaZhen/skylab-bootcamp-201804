import React from 'react'

function UsersList({ users, onItemClick, className }) {
    return users.length ? <section className={className}>
        <h2>list</h2>
        <ul>
            {users.map(({ id, login, avatar_url }) =>
                <li key={id}>
                    <h3>{login}</h3>
                    <img src={avatar_url} onClick={() => onItemClick(login)} alt={login} title={login} />
                </li>)}
        </ul>
    </section> : null
}

export default UsersList