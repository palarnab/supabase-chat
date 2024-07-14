import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://hrcnrbctpyfjrwceiczn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyY25yYmN0cHlmanJ3Y2VpY3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2ODc2MzcsImV4cCI6MjAzMTI2MzYzN30.SGcQgZCgud131vxhb21IgG5vrG8dkB3ZMwzj9wGDrlc',
);

const collection = 'akadmy_f564cd44-580b-48cc-ae8c-d3e1cd6f6bfa';

// const supabase = createClient(
//   'https://cxuisrdpbmdklehplxgh.supabase.co',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4dWlzcmRwYm1ka2xlaHBseGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5MzIxNzQsImV4cCI6MjAzNjUwODE3NH0.bJto4-XVgipqy349b-YQ8JW8H02tcl6hrQQdyDIPYNA',
// );

//const collection = 'akadmydev_525af3fa-68f4-4f1e-a75d-f91338b1b6c1';
// const collection = 'akadmystg_df2983fa-27e7-4917-87d7-72cd81101c04';
// const collection = 'akadmypro_fd20cd9f-110a-4092-b544-f27e2058ab62';

let channel = undefined;

const fetch = async (setMessages, conversation_id, page = 0, perpage = 10) => {
  console.log(`GET - ${page}`);
  const start = page * perpage;
  const end = start + 10;
  const { data, error } = await supabase
    .from(collection)
    .select('id, message, metadata, receiver_id, sender_id, created_at')
    .eq('conversation_id', conversation_id)
    .order('created_at', { ascending: false })
    .range(start, end);
  if (error) {
    console.error(error);
  } else {
    setMessages(data);
  }
};

const subscribe = (setMessages, conversation_id) => {
  if (channel) {
    supabase.removeChannel(channel);
  }
  channel = supabase
    .channel('table_db_changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: collection },
      () => fetch(setMessages, conversation_id),
    )
    .subscribe((payload) => {
      if (payload === 'SUBSCRIBED') {
        fetch(setMessages, conversation_id);
      } else {
        console.log(payload);
      }
    });
};

const unsubscribe = () => {
  supabase.removeAllChannels();
};

const send = async (content) => {
  await supabase.from(collection).insert({ ...content });
};

export { subscribe, unsubscribe, send, fetch };
