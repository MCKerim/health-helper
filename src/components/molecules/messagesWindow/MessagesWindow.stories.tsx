import type { Meta, StoryObj } from "@storybook/react";
import MessagesWindow from "./MessagesWindow";

const meta = {
  title: "Molecules/MessagesWindow",
  component: MessagesWindow,
  tags: ["autodocs"],
} satisfies Meta<typeof MessagesWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
    messages: [
      {
        sender: "user",
        message: "Hello",
      },
      {
        sender: "assistant",
        message: "Hi",
        isLiked: false,
        isDisliked: false,
      },
    ],
  },
};

export const LoadingAnswear: Story = {
  args: {
    isLoading: true,
    messages: [
      {
        sender: "user",
        message: "Hello",
      },
    ],
  },
};

export const NoMessages: Story = {
  args: {
    isLoading: false,
    messages: [],
  },
};

export const ManyMessages: Story = {
  args: {
    isLoading: false,
    messages: [
      {
        sender: "user",
        message: "Hello",
      },
      {
        sender: "assistant",
        message: "Hi",
        isLiked: false,
        isDisliked: false,
      },
      {
        sender: "user",
        message: "Hello",
      },
      {
        sender: "assistant",
        message: "Hi",
        isLiked: false,
        isDisliked: false,
      },
      {
        sender: "user",
        message: "Hello",
      },
      {
        sender: "assistant",
        message: "Hi",
        isLiked: false,
        isDisliked: false,
      },
      {
        sender: "user",
        message: "Hello",
      },
      {
        sender: "assistant",
        message: "Hi",
        isLiked: false,
        isDisliked: false,
      },
    ],
  },
};