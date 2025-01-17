import './App.css';
import NavBar from './components/NavBar';
import ChatBox from './components/ChatBox';
import Welcome from './components/Welcome';

// import useGetMessages from './components/useGetMessages';
// import useGetActivity from './components/useGetActivity';

import { useState, useEffect } from 'react';

const App = () => {
  // {"id": "7gAIPVYwZAQcoLUz8d2VS07QT1s2", "name": "Alice"}
  // {"id": "BdNRsn6WU6XM3kMTEdbrT43QpWh1", "name": "Bob"}
  const otherUser = { id: '65d448204071c3bdb0a59067', name: 'John' };

  const [sender, setSender] = useState(
    JSON.parse('{"id": "663c4c360b9f2d990d25f0b3", "name": "Alice"}'),
  );
  const [receiver, setReceiver] = useState(
    JSON.parse('{"id": "6628d60fb14b2974d9e4881b", "name": "Bob"}'),
  );

  const changeUser = () => {
    setReceiver(otherUser);
  };

  // const { messages, hasMore, initialized } = useGetMessages(
  //   0,
  //   sender.id,
  //   receiver.id,
  // );

  // const { activity } = useGetActivity(sender.id, [receiver.id, otherUser.id]);

  // useEffect(() => {
  //   console.log(activity);
  // }, [activity]);

  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);

  return (
    <div className="App">
      <button onClick={changeUser}>Change User</button>
      <NavBar user={sender} />
      {!sender.id || !receiver.id ? (
        <Welcome />
      ) : (
        <ChatBox
          sender={sender}
          receiver={receiver}
          observeUserIds={[
            '663d92684d56443aefe0bd34',
            '65d448204071c3bdb0a59065',
            '65f7e6a57feb8a25d6f846ea',
            '65d448204071c3bdb0a59067',
            '65d448204071c3bdb0a5906b',
            '65d448204071c3bdb0a5906d',
            '6628e2577d0a28084ff96ab6',
            '663b61a9a4b04ade5bce7f53',
            '663c7c84e7c5b1cc036fcf46',
            '663d929a4d56443aefe0bd4b',
            '667284fdfc0a12509de40eb7',
            '667510b20abe9af246e52319',
            '6683d80e73fff726d395db48',
            '668fbaeb97e75d07086e0d3b',
            '66b5ff831356d681e7d9a7eb',
            '66b5ff881356d681e7d9a805',
            '66c82bca0f8591636bbf90a7',
            '66ccd1476f9a7a176e80812b',
            '66ccd1dce431e92b3b070bc1',
            '6720d1df9199515a6f1d018c',
            '6720d9d45d749a74ff216de9',
            '6720dab25d749a74ff216e08',
          ]}
        />
      )}
    </div>
  );
};
export default App;
