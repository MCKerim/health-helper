import type { Meta, StoryObj } from "@storybook/react";
import Account from "./Account";

const meta = {
  title: "Pages/Account",
  component: Account,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  }
} satisfies Meta<typeof Account>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
