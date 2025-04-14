import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, updatePost, deletePost } from '../adapters/fellowAdapters';

const PostDetails = () => {
  const [post, setPost] = useState({});
  const [updates, setUpdates] = useState({ title: '', content: '' });
  const { id } = useParams();
  const navigate = useNavigate();

    useEffect(() => {
        const doFetch = async () => {
            const [foundPost, error] = await getPostById(id);
            if (error) {
                console.error('Error fetching posts: ', error);
                return;
            }
            setPost(foundPost);
        };
        doFetch();
    }, [id]);

    const handleDeletePost = async () => {
        const [success, error] = await deletePost(id);
        if (error) {
            console.error('Error deleting post: ', error);
            return;
        }
        navigate('/');
    };

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        const [updatedPost, error] = await updatePost(id, updates);
        if (error) {
            console.error('Error updating posts: ', error);
            return;
        }
        setPost(updatedPost);
        setUpdates({ title: '', content: '' });
    };

    return (
        <>
            <Link to="/">Go Home</Link>
            <h1>Post Details</h1>
            <p>Title: {post.title}</p>
            <p>Id: {post.id}</p>
            <p>Content: {post.content}</p>
            <form onSubmit={handleUpdatePost}>
                <label htmlFor="title">Update Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={ updates.title }
                    onChange={(e) => setUpdates((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Update Title"
                />
                <label htmlFor="content">Update Content</label>
                    <textarea
                        name="content"
                        id="content"
                        value={ updates.content }
                        onChange={(e) => setUpdates((prev) => ({ ...prev, content: e.target.value }))}
                        placeholder="Update Content"
                    />
                <button type="submit">Submit</button>
            </form>
            <button onClick={handleDeletePost} className="danger">Delete Post</button>
        </>
    );
};

export default PostDetails;