import React, { memo } from 'react';
import InputBox from '../../components/input-box';

export const MainLayout = memo(() => (
  <div id="main-container">
    <InputBox onSendMessage={() => {}} />
  </div>
));

export default MainLayout;
