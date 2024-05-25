import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";
import { fn } from "@storybook/test";

const meta = {
  title: "Atoms/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    onClose: fn(),
  }
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Content Children",
    isOpen: true,
    error: "Errortext",
  }
};
