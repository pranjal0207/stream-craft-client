import "./index.css"

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StreamCraftState } from '../../store';
import UserList from '../../components/UserList';

import * as client from "./client"
import styled from "styled-components";


const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const SubscriptionsPage = () => {
    let { user_id } = useParams()
    
    const subscriptionsList = useSelector((state:StreamCraftState) => state.authReducer.user.subscriptions);  
    const firstName = useSelector((state:StreamCraftState) => state.authReducer.user.firstName); 

    const [userName, setUserName] = useState("")
    const [userList, setUserList] = useState<string[]>([]);

    useEffect(() => {
        const fetchSubscribers = async () => {
            if (!user_id) {
                setUserList(subscriptionsList || []);
                setUserName(firstName || "");
            } else {
                const userSubscribers = await client.getUploaderSubscribers(user_id);
                setUserList(userSubscribers.subscriptions);
                setUserName(userSubscribers.name)
            }
        };

        fetchSubscribers();
    }, [user_id]); 

    console.log(user_id);

    return(
        <>
            <h1 className="heading"> {userName}'s Subscriptions</h1>
            <Hr />
            <UserList users = {userList}></UserList>
        </>
    );
}

export default SubscriptionsPage;