import type { Meta, StoryObj } from "@storybook/react";
import SignUpWindow from "./SignUpWindow";

const meta = {
  title: "Molecules/SignUpWindow",
  component: SignUpWindow,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  }
} satisfies Meta<typeof SignUpWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
