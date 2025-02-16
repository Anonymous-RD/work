import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route ,Navigate } from 'react-router-dom';
import './App.css'
import Layout from "./components/layout/Layout";
import Main from "./Pages/Main";
import Blogs from './Pages/Blogs/Blogs';
import EditBlogs from './Pages/Blogs/EditBlogs';
import AddBlogs from './Pages/Blogs/AddBlogs';
import Stories from './Pages/Stories/Stories';
import AddStories from './Pages/Stories/AddStories';
import EditStories from './Pages/Stories/EditStories';
import BestPractices from './Pages/Best Practices/BestPractices';
import EditBestPractices from './Pages/Best Practices/EditBestPractices';
import AddBestPractices from './Pages/Best Practices/AddBestPractices';
import KeyEventsAndCampaigns from './Pages/Key Events and Campaigns/KeyEventsAndCampaigns';
import AddKeyEventsAndCampaigns from './Pages/Key Events and Campaigns/AddKeyEventsAndCampaigns';
import EditKeyEventsAndCampaigns from './Pages/Key Events and Campaigns/EditKeyEventsAndCampaigns';
import NewsLetters from './Pages/NewsLetters/NewLetters';
import AddNewsLetters from './Pages/NewsLetters/AddNewsLetters';
import EditNewsLetters from './Pages/NewsLetters/EditNewsLetters';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from './redux/slices/fetchUserDetailsSlice';
import { HeaderProvider } from './components/context/HeaderContext';
import ProtectedRoute from './Pages/Routes/ProtectedRoute';

function App() {
  const token = Cookies.get("token"); // Retrieve token from cookies
  console.log(token);
  const { loading } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetails(token));
  }, [token, dispatch]);

  if (loading) {
    return <div class="loader"></div>;
  }
  return (
    <HeaderProvider>
  
        <Layout>
        <Routes>
          
      <Route path="/" element={<Navigate to="/blogs" replace />} />

        <Route element={<ProtectedRoute allowedRoles={["admin", "user", "soumya"]}/>}>
            

          <Route path="/tracker" element={<Main />} />
          <Route path="/blogs" element={<Blogs />} />
          
          <Route path="/editblogs" element={<EditBlogs />} />
          <Route path="/addblogs" element={<AddBlogs />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/addstories" element={<AddStories />} />
          <Route path="/editstories" element={<EditStories />} />
          <Route path="/bestpractices" element={<BestPractices />} />
          <Route path="/addbestpractices" element={<AddBestPractices />} />
          <Route path="/editbestpractices" element={<EditBestPractices />} />
          <Route path="/keyevents" element={<KeyEventsAndCampaigns />} />
          <Route path="/addkeyevents" element={<AddKeyEventsAndCampaigns />} />
          <Route path="/editkeyevents" element={<EditKeyEventsAndCampaigns />} />
          <Route path="/newsletters" element={<NewsLetters />} />
          <Route path="/addnewsletters" element={<AddNewsLetters />} />
          <Route path="/editnewsletters" element={<EditNewsLetters />} />
          </Route>
        </Routes>
        </Layout>
     
    </HeaderProvider>
  )
}

export default App
