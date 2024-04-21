import "./index.css"

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StreamCraftState } from '../../store';
import UserList from '../../components/UserList';

import * as client from "./client";
import styled from "styled-components";


const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const SubscribersPage = () => {
    let { user_id } = useParams()
    
    
    const subscribersList = useSelector((state:StreamCraftState) => state.authReducer.user.subscribers);    
    const firstName = useSelector((state:StreamCraftState) => state.authReducer.user.firstName); 
    
    const [userList, setUserList] = useState<string[]>([]);
    const [userName, setUserName] = useState("")

    useEffect(() => {
        const fetchSubscribers = async () => {
            if (!user_id) {
                setUserList(subscribersList || []);

                setUserName(firstName || "");
            } else {
                const userSubscribers = await client.getUploaderSubscribers(user_id);
                setUserList(userSubscribers.subscribers);
                setUserName(userSubscribers.name)
            }
        };

        fetchSubscribers();
    }, [user_id]); 

    console.log(user_id);

    return(
        <>
            

            {(!user_id && firstName === "") ? (
                <h1>not allowed</h1>
            ) : (
                <>
                    <h1 className="heading"> {userName}'s Subscribers</h1>
                    <Hr />
                    <UserList users = {userList}></UserList> 
                </>
            )}
        </>
    );
}

export default SubscribersPage;