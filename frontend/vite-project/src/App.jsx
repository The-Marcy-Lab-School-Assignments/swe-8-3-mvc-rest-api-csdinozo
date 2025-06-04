import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/posts/:id" element={<PostDetails />}></Route>
        </Routes>
    )
}

export default App;