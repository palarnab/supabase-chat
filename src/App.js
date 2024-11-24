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
  const otherUser = { id: '6670ce00916f6f81cd61f75e', name: 'John' };

  const [sender, setSender] = useState(
    JSON.parse(
      localStorage.getItem('from') ||
        '{"id": "7gAIPVYwZAQcoLUz8d2VS07QT1s2", "name": "Alice"}',
    ),
  );
  const [receiver, setReceiver] = useState(
    JSON.parse(
      localStorage.getItem('to') ||
        '{"id": "BdNRsn6WU6XM3kMTEdbrT43QpWh1", "name": "Bob"}',
    ),
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
          observeUserIds={[receiver.id, otherUser.id]}
        />
      )}
    </div>
  );
};
export default App;
