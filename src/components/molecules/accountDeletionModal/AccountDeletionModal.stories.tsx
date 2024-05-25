import type { Meta, StoryObj } from "@storybook/react";
import AccountDeletionModal from "./AccountDeletionModal";
import { fn } from "@storybook/test";

const meta = {
  title: "Molecules/AccountDeletionModal",
  component: AccountDeletionModal,
  tags: ["autodocs"],
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof AccountDeletionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
