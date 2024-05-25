import type { Meta, StoryObj } from "@storybook/react";
import MessageBox from "./MessageBox";

const meta = {
  title: "Atoms/MessageBox",
  component: MessageBox,
  tags: ["autodocs"],
} satisfies Meta<typeof MessageBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageFromChatbotShort: Story = {
  args: {
    sender: "assistant",
    message: "Hello",
    isLiked: false,
    isDisliked: false,
  },
};

export const MessageFromChatbotLong: Story = {
  args: {
    sender: "assistant",
    message:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
    isLiked: false,
    isDisliked: false,
  },
};

export const MessageFromChatbotLiked: Story = {
  args: {
    sender: "assistant",
    message: "Hello",
    isLiked: true,
    isDisliked: false,
  },
};

export const MessageFromChatbotDisliked: Story = {
  args: {
    sender: "assistant",
    message: "Hello",
    isLiked: false,
    isDisliked: true,
  },
};

export const MessageFromUserShort: Story = {
  args: {
    sender: "user",
    message: "Hello",
  },
};

export const MessageFromUserLong: Story = {
  args: {
    sender: "user",
    message:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
  },
};
