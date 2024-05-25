import type { Meta, StoryObj } from "@storybook/react";
import SignIn from "./SignIn";

const meta = {
  title: "Pages/SignIn",
  component: SignIn,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SignIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
