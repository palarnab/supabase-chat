import './App.css';
import NavBar from './components/NavBar';
import ChatBox from './components/ChatBox';
import Welcome from './components/Welcome';

import { useEffect, useState } from 'react';

const App = () => {
  // {"id": "7gAIPVYwZAQcoLUz8d2VS07QT1s2", "name": "Alice"}
  // {"id": "BdNRsn6WU6XM3kMTEdbrT43QpWh1", "name": "Bob"}

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
    setReceiver({ id: '6670ce00916f6f81cd61f75e', name: 'John' });
  };

  return (
    <div className="App">
      <button onClick={changeUser}>Change User</button>
      <NavBar user={sender} />
      {!sender.id || !receiver.id ? (
        <Welcome />
      ) : (
        <ChatBox sender={sender} receiver={receiver} />
      )}
    </div>
  );
};
export default App;
