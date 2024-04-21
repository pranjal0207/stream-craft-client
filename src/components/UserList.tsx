import UserItem from "./UserItem";


type UserListProps = {
    users: string[];
};


const UserList: React.FC<UserListProps> = ({ users }) => {    
    return (
        <>
            {users.map((user, index) => <h1>{<UserItem user_id={user} />}</h1>)}
        </>
    )
}

export default UserList;