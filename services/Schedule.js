import axios from 'axios';
import { rootStore } from '../stores/RootStore';
import config from '../config';

const { SCHEDULE_API_URL } = config;

export default function schedulePost({
  text, timestamp, postToUserId,
}) {
  return axios.post(`${SCHEDULE_API_URL}/schedule`, {
    token: rootStore.account.token,
    text,
    timestamp,
    postToUserId,
  })
    .then((result) => result.data);
}
