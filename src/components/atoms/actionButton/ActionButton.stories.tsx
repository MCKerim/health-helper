import type { Meta, StoryObj } from "@storybook/react";
import ActionButton from "./ActionButton";
import { fn } from "@storybook/test";

const meta = {
  title: "Atoms/ActionButton",
  component: ActionButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: { onClick: fn() },
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Sign Out",
  },
};
