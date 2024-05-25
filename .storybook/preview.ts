import type { Preview } from "@storybook/react";
import '../src/index.css';
import { withRouter } from 'storybook-addon-remix-react-router';

const preview: Preview = {
  decorators: [withRouter],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
