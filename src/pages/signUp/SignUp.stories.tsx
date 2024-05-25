import type { Meta, StoryObj } from "@storybook/react";
import SignUp from "./SignUp";

const meta = {
  title: "Pages/SignUp",
  component: SignUp,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SignUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
