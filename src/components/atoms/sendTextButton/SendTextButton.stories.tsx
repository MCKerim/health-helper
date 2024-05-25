import type { Meta, StoryObj } from "@storybook/react";
import SendTextButton from "./SendTextButton";
import { fn } from "@storybook/test";

const meta = {
  title: "Atoms/SendTextButton",
  component: SendTextButton,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  }
} satisfies Meta<typeof SendTextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};
