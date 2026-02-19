import type { Preview } from "@storybook/react-vite";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <Theme accentColor="blue" grayColor="slate" panelBackground="solid">
        <Story />
      </Theme>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
  },
};

export default preview;
