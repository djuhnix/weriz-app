import React from 'react';
import Post from "../../components/card/Post";
import {Container} from "@mui/material";

const FeedPage = () => {
    return (
        <Container component="article" sx={{ padding: 0 }}>
            <Post></Post>
        </Container>
    );
};

export default FeedPage;