import React, { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import Draft from '../components/Draft';
import { getDrafts, removeDraft } from '../utils/localStore';
import NoticeModal from '../components/NoticeModal';

export default function Drafts({ navigation }) {
  const [drafts, setDrafts] = useState(null);
  const [showScheduleNotice, setShowScheduleNotice] = useState(false);

  const fetchDraft = () => {
    getDrafts().then(setDrafts);
  };
  useEffect(() => {
    let isMounted = true;
    getDrafts().then((fetchedDrafts) => {
      if (isMounted) setDrafts(fetchedDrafts);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  const onDeleteClicked = async (i, scheduled) => {
    if (scheduled) {
      setShowScheduleNotice(true);
    }
    await removeDraft(i);
    fetchDraft();
  };
  return (
    <ScrollView>
      {showScheduleNotice && (
      <NoticeModal
        message="Draft has been scheduled!"
        onOkayClicked={() => setShowScheduleNotice(false)}
      />
      )}
      {!drafts?.length && <Text style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)', marginTop: 30 }}>Looks like you dont have any drafts!</Text>}
      {drafts?.map((draft, i) => (
        <Draft
          key={draft.userId + draft.text}
          onEditPressed={() => navigation.navigate('Profile', { userId: draft.userId, text: draft.text, draftIndex: i })}
          onDeleteClicked={(scheduled) => onDeleteClicked(i, scheduled)}
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
