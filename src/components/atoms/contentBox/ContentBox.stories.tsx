import type { Meta, StoryObj } from "@storybook/react";
import ContentBox from "./ContentBox";

const meta = {
  title: "Atoms/ContentBox",
  component: ContentBox,
  tags: ["autodocs"],
} satisfies Meta<typeof ContentBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Content",
  },
};
