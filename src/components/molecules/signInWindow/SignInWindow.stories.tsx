import type { Meta, StoryObj } from "@storybook/react";
import SignInWindow from "./SignInWindow";

const meta = {
  title: "Molecules/SignInWindow",
  component: SignInWindow,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  }
} satisfies Meta<typeof SignInWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
