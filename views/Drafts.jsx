import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Draft from '../components/Draft';
import { getDrafts, removeDraft } from '../utils/localStore';

export default function Drafts({ navigation }) {
  const [drafts, setDrafts] = useState(null);

  const fetchDraft = () => {
    getDrafts().then(setDrafts);
  };
  useEffect(() => {
    fetchDraft();
  }, []);
  const onDeleteClicked = async (i) => {
    await removeDraft(i);
    fetchDraft();
  };
  return (
    <View>
      {drafts?.map((draft, i) => (
        <Draft
          key={draft.userId + draft.text}
          onEditPressed={() => navigation.navigate('Profile', { userId: draft.userId, text: draft.text, draftIndex: i })}
          onDeleteClicked={() => onDeleteClicked(i)}
          draft={draft}
        />
      ))}
    </View>
  );
}
Drafts.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
