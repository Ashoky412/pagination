import React ,{ useState , useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Posts from './containers/Posts'
import Pagination from './containers/Pagination'


function App() {
  const [posts, getPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      getPosts(res.data);
      setLoading(false);
    }
    fetchPosts();
  }, [])

  //set current posts

  const indexLastPost = currentPage * postsPerPage;
  const indexFirstPost = indexLastPost - postsPerPage ;
  
  const currentPosts = posts.slice(indexFirstPost , indexLastPost); 

  //set current page

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container mt-5">
      <h2 className =" text-primary mb-3"> My Blog</h2>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerpage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );
}

export default App;
