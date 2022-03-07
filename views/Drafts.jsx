import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
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
    <ScrollView>
      {!drafts?.length && <Text style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)', marginTop: 30 }}>Looks like you dont have any drafts!</Text>}
      {drafts?.map((draft, i) => (
        <Draft
          key={draft.userId + draft.text}
          onEditPressed={() => navigation.navigate('Profile', { userId: draft.userId, text: draft.text, draftIndex: i })}
          onDeleteClicked={() => onDeleteClicked(i)}
          draft={draft}
        />
      ))}
    </ScrollView>
  );
}
Drafts.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
