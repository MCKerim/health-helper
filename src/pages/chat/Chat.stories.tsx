import type { Meta, StoryObj } from "@storybook/react";
import Chat from "./Chat";

const meta = {
  title: "Pages/Chat",
  component: Chat,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  }
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
