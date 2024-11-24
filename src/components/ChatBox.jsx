import React, { useEffect, useRef, useState, useCallback } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import Error from './Error';
import useGetMessages from './useGetMessages';
import useGetActivity from './useGetActivity';
import { Box } from '@mui/material';

const ChatBox = ({
  sender,
  receiver,
  observeUserIds,
  containerHeight,
  showUserAvatar,
  bgSender,
  bgReceiver,
}) => {
  const [page, setPage] = useState(0);
  const scroll = useRef();
  const { messages, hasMore, initialized } = useGetMessages(
    page,
    sender.id,
    receiver.id,
  );

  const { activity } = useGetActivity(sender.id, observeUserIds);

  const observer = useRef();
  const lastChatElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore],
  );

  useEffect(() => {
    console.log(activity);
  }, [activity]);

  useEffect(() => {
    setTimeout(() => {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  }, [initialized]);

  useEffect(() => {
    if (sender && receiver) {
      sender.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      receiver.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
  }, []);

  if (
    !(
      sender &&
      sender.id &&
      sender.name &&
      receiver &&
      receiver.id &&
      receiver.name
    )
  ) {
    return (
      <Error
        error={`Sender: ${JSON.stringify(
          sender || {},
        )} OR Receiver: ${JSON.stringify(receiver || {})} is not complete`}
      />
    );
  }

  const scrollIntoView = () => {
    setTimeout(() => {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  };

  const getUser = (id) => {
    if (id === sender.id) {
      return sender;
    } else if (id === receiver.id) {
      return receiver;
    }
  };

  return (
    <>
      <Box
        mt="0.5em"
        style={{
          height: containerHeight || '72vh',
          overflow: 'auto',
          scrollbarWidth: 'thin',
        }}>
        <div
          style={{ opacity: 0.3 }}
          ref={lastChatElementRef}
          title={messages.length}>
          .
        </div>
        {messages.map((message) => (
          <Message
            userAvatar={showUserAvatar}
            bgSender={bgSender}
            bgReceiver={bgReceiver}
            key={message.id}
            message={message}
            messageUser={getUser(message.sender_id)}
            user={sender}
          />
        ))}
        <span ref={scroll}></span>
      </Box>
      <SendMessage
        sender={sender}
        receiver={receiver}
        scrollIntoView={scrollIntoView}
      />
    </>
  );
};

export default ChatBox;
