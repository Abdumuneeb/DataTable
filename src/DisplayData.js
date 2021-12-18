import React ,{useState,useEffect} from 'react';
import Pagination from './components/Pagination';
import axios from 'axios';
import { Posts } from './components/Posts';

const DisplayData = () => {
    const [posts,setPosts] = useState([])
    const [loading ,setLoading] =useState(false);
    const [currentPage,setCurrentPage] =useState(1);
    const [postPerPage] =useState(20);

    useEffect(()=>{
        const fetchPosts =async ()=>{
            setLoading(true);
            const res =await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false);
        }
        fetchPosts();
    },[]);
  console.log(posts);
    //Get current posts
    const indexOfLastPost =currentPage*postPerPage;
    const indexOfFirstPost =indexOfLastPost-postPerPage;
const currentPosts= posts.slice(indexOfFirstPost,indexOfLastPost);

//change page
const paginate =(pageNumber)=> setCurrentPage(pageNumber) ;
    return (
        <div className='container mt-5'>
            <h1 className='text-primary mb-3'> My Blogs</h1>
            <input placeholder='total post per page'/>
            <Posts  posts={currentPosts} loading={loading}/>
            <Pagination postPerPage={postPerPage} totalPosts={posts.length} paginate={paginate}/>
        </div>
    );
};

export default DisplayData;