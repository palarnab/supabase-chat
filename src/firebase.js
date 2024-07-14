// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  where,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCwsSOuPJ_LH72IvLvhEuYboGrwrbzDWPg',
  authDomain: 'intelli-chat-24.firebaseapp.com',
  projectId: 'intelli-chat-24',
  storageBucket: 'intelli-chat-24.appspot.com',
  messagingSenderId: '203845582858',
  appId: '1:203845582858:web:c86e63be58dcd6c1621ff3',
};

const appId = 'app1';

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

const subscribe = (setMessages, conversation_id) => {
  const q = query(
    collection(db, 'messages'),
    where('conversation_id', '==', conversation_id),
    // orderBy("created_at", "desc"),
    limit(50),
  );

  onSnapshot(q, (QuerySnapshot) => {
    const fetchedMessages = [];
    QuerySnapshot.forEach((doc) => {
      fetchedMessages.push({ ...doc.data(), id: doc.id });
    });
    const sortedMessages = fetchedMessages.sort(
      (a, b) => a.created_at - b.created_at,
    );
    setMessages(sortedMessages);
  });
};

const unsubscribe = () => {};

const send = async (content) => {
  await addDoc(collection(db, 'messages'), {
    ...content,
    created_at: serverTimestamp(),
    app_id: appId,
  });
};

export { subscribe, unsubscribe, send };
