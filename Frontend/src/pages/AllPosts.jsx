import React, { useEffect, useState } from 'react'
import { PostCard, Container } from "../components/index.js"
import { useSelector } from 'react-redux';
import axios from 'axios';
import conf from '../conf/conf.js';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = useSelector(state => state.auth.userData);

    // appwriteService
	// 	.getPosts([
	// 		Query.equal("status", "active"),
	// 		Query.equal("userId", userId.$id),
	// 	])
	// 	.then((res) => {
	// 		setPosts(res.documents);
	// 		setLoading(false);
	// 	});
    useEffect(() => {
        axios
            .get(`${conf.backendUrl}/articles/get-articles/${userId._id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setPosts(res.data.data);
                setLoading(false);
            });
    }, [])

    return !loading ? (
        <div className='py-8'>
            <Container>
                {posts.map((post) => (
                    <div key={post._id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </Container>
        </div>
    ) : (
        <div className='py-8'>
            Loading.....
        </div>
    )
}

export default AllPosts