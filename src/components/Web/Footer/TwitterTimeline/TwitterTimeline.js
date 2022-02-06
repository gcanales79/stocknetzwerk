import React from 'react';
import { Timeline } from 'react-twitter-widgets';

export default function TwitterTimeline() {
  return <div>
      <Timeline
  dataSource={{
    sourceType: 'profile',
    screenName: 'netzwerk13'
  }}
  options={{
    height: '400',
    lang:"es",
  }}
/>
  </div>;
}
