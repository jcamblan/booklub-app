import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { theme } from 'ui';
import SafeAreaView from 'react-native-safe-area-view';

const RefreshingScrollView = ({ children, onRefresh, ...props }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleOnRefresh = async () => {
    if (!Boolean(onRefresh)) {
      return;
    }

    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: theme.spacing() }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        }
        {...props}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RefreshingScrollView;
