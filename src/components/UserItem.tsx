import { useEffect, useState } from "react";
import * as client from "../pages/Subscribers/client"
import { ConsumerUser } from "../Interface/ConsumerUserInterface";
import styled from "styled-components";
import { Link } from "react-router-dom";

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

type UserItemProps = {
    user_id: string;
};

const UserItem: React.FC<UserItemProps> = ({ user_id }) => {
    const [user, setUser] = useState<ConsumerUser>({
        user_id : "",
        email: "",
        firstName: "",
        lastName: "",
        subscriptions: [],
        likedVideos : [],
        dislikedVideos :[],
        viewHistory : [],
        type:""
    });
    
    useEffect(() => {
        const fetchUser = async () => {
            console.log({user_id});
            const user = await client.getUserData(user_id);
            console.log(user);
            setUser(user);
        }
            
        fetchUser();
    }, [user_id]); 

    return (
        <>
            <div className="userCard">
                <Link to={""} style={{ textDecoration: "none" }}>
                    <User>
                        <Avatar src="user.png" />
                        {user.firstName} {user.lastName}
                    </User>
                </Link>
                
            </div>
        </>
    )
}

export default UserItem;