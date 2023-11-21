import React from 'react';
import { useState } from 'react';
import 'suneditor/dist/css/suneditor.min.css';
import './style.css';
import { useEffect } from 'react';
import postsApi from '../../../api/postsApi';
import PostList from './PostList';
import CreatePost from './CreatePost';
import { useDispatch } from 'react-redux';
import { clearCurrentPost, getPostById } from '../../../redux/postsSlice';

function Posts({ organizationId }) {
  const dispatch = useDispatch();
  //category
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    postsApi
      .getCategories()
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [postStep, setPostStep] = useState(0);
  const [currentPostId, setCurrentPostId] = useState(null);

  const dispatchEdit = (id) => {
    dispatch(getPostById({ id: id, organizationId: organizationId })).then(() => {
      setCurrentPostId(id);
      setPostStep(1);
    });
  };
  const dispatchCreate = () => {
    setCurrentPostId(null);
    setPostStep(1);
  };
  const backTolist = () => {
    setPostStep(0);
    setCurrentPostId(null);
    dispatch(clearCurrentPost());
  };

  if (postStep === 0)
    return (
      <PostList
        dispatchCreate={dispatchCreate}
        dispatchEdit={dispatchEdit}
        organizationId={organizationId}
        setStep={setPostStep}
      />
    );
  if (postStep === 1)
    return (
      <CreatePost
        backTolist={backTolist}
        currentPostId={currentPostId}
        organizationId={organizationId}
        setStep={setPostStep}
      />
    );
}

export default Posts;
