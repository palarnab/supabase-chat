import * as React from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { Box } from '@mui/material';

const ContentRenderer = ({ content }) => {
  const URL_REGEX =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  return (
    <Box flex={1}>
      {content.split('\n').map((paragraph, index) => (
        <Box
          component="p"
          fontFamily="sans-serif"
          fontSize="0.8rem"
          lineHeight={1.1}
          style={{ paddingBottom: '0.5rem' }}
          key={index}>
          {paragraph.split(' ').map((part) =>
            URL_REGEX.test(part) ? (
              <>
                <LinkPreview url={part} width="400px" />;
              </>
            ) : (
              part + ' '
            ),
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ContentRenderer;
