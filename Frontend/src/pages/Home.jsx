import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components/index.js';
import axios from 'axios';
import conf from '../conf/conf.js';

function Home() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        axios.get(`${conf.backendUrl}/articles/get-articles/`, { withCredentials: true })
            .then((res) => {
                if (res.data.status === 200) {
                    setPost(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, []);

    if (post.length > 0) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className="flex flex-wrap">
                        {post.map((item) => {
                            return (
                                <div key={item._id} className="p-2 w-1/4">
                                    <PostCard {...item} />
                                </div>
                            )
                        })}
                    </div>
                </Container>
            </div>
        )
    } 

    return (
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No post found
                            </h1>
                        </div>
                    </div>
            </Container>
        </div>
    )
}

export default Home