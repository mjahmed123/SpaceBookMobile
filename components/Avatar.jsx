import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import React, {
  View, Image, StyleSheet,
} from 'react-native';
import { getUserPhotoById } from '../services/User';

export default function Avatar({ style, userId, size }) {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (userId) {
      getUserPhotoById(userId).then((fetchedPhoto) => {
        if (isMounted) setPhoto(fetchedPhoto);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return (
    <View style={[styles.container, { height: size, width: size }, style]}>
      <Image style={styles.image} source={{ uri: `data:image/png;base64,${photo}` }} />
    </View>
  );
}
Avatar.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
  userId: PropTypes.number,
  size: PropTypes.number,
};
const styles = StyleSheet.create({
  container: {},
  image: {
    borderRadius: '50%',
    height: '100%',
    width: '100%',
  },
});
