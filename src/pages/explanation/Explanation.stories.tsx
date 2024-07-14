import type { Meta, StoryObj } from "@storybook/react";
import Explanation from "./Explanation";

const meta = {
  title: "Pages/Explanation",
  component: Explanation,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Explanation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
