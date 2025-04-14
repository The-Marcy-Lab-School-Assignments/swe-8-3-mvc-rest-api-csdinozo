import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, createPost } from '../adapters/postAdapters';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [newPostName, setNewPostName] = useState('');

    useEffect(() => {
        const doFetch = async () => {
            const [allPosts, error] = await getAllPosts();
            if (error) {
                console.log('Error fetching posts:', error);
                return;
            }
            setPosts(allPosts);
        };
        doFetch();
    }, []);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const [newPost, error] = await createPost(newPostName);
        if (error) {
            console.log('Error creating post:', error);
            return;
        }
        setPosts((prevPosts) => [...prevPosts, newPost]);
        setNewPostName('');
    };

    return (
        <>
            <h1>Home</h1>
            <form onSubmit={handleCreatePost}>
                <label htmlFor="name">Add A New Post</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={ newPostName }
                    onChange={ (e) => setNewPostName(e.target.value) }
                />
                <button type="submit">Submit</button>
           </form>
           <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            { post.title } (Post { post.id })
                        </Link>
                    </li>
                ))}
           </ul>
        </>
    );
};

export default Home;
