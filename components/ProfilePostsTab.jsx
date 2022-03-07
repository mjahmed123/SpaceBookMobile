import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { getPosts } from '../services/Post';
import NewPostArea from './NewPostArea';
import ProfilePost from './ProfilePost';

export default function ProfilePostsTab({ userId, navigation, route }) {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  async function fetchPosts() {
    const fetchedPosts = await getPosts(userId).catch(() => {
      setError('You cannot view this users posts as you are not friends with them!');
    });
    setPosts(fetchedPosts);
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  const onDeleted = (i) => {
    setPosts(posts.filter((post, index) => index !== i));
  };

  return (
    <View>
      {!error && (
        <NewPostArea
          navigation={navigation}
          route={route}
          onPosted={() => fetchPosts()}
          userId={userId}
        />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      {(posts && !posts.length) && <Text style={styles.error}>This user has no posts.</Text>}
      {posts?.map((post, i) => (
        <ProfilePost
          key={post.post_id}
          navigation={navigation}
          profileUserId={userId}
          post={post}
          onDeleted={() => onDeleted(i)}
        />
      ))}
    </View>
  );
}

ProfilePostsTab.propTypes = {
  userId: PropTypes.number,
  route: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.number,
    }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  error: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 5,
    borderRadius: 8,
    margin: 10,
    marginTop: 10,
    marginBottom: 5,
  },
});
