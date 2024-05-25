import type { Meta, StoryObj } from "@storybook/react";
import LoadingSpinner from "./LoadingSpinner";

const meta = {
  title: "Atoms/LoadingSpinner",
  component: LoadingSpinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  }
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
