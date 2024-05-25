import type { Meta, StoryObj } from "@storybook/react";
import LoadingContainer from "./LoadingContainer";

const meta = {
  title: "Molecules/LoadingContainer",
  component: LoadingContainer,
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
