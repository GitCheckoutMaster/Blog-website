import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, PostForm } from '../components/index.js';
import axios from 'axios';
import conf from '../conf/conf.js';

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            axios.get(`${conf.backendUrl}/articles/${slug}`, { withCredentials: true })
                .then((res) => {
                    setPost(res.data.data);
                });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost