import React from 'react';
import { ScreenTitle } from 'ui';
import { SESSIONS } from 'api/queries';
import FeedItem from 'components/Club/FeedItem';
import RefreshingScrollView from 'components/RefreshingScrollView';
import { useQuery } from '@apollo/client';

const Feed = () => {
  const { data, loading, refetch } = useQuery(SESSIONS);
  const sessions = (data?.mySessions?.edges ?? []).map(({ node }) => ({
    ...node,
  }));

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <RefreshingScrollView onRefresh={onRefresh}>
      <ScreenTitle>Feed</ScreenTitle>

      {sessions.map(session => (
        <FeedItem key={session.id} session={session} />
      ))}
    </RefreshingScrollView>
  );
};

export default Feed;
