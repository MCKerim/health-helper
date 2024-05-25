import type { Meta, StoryObj } from "@storybook/react";
import ShowPasswordIcon from "./ShowPasswordIcon";

const meta = {
  title: "Atoms/ShowPasswordIcon",
  component: ShowPasswordIcon,
  tags: ["autodocs"],
} satisfies Meta<typeof ShowPasswordIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ShowPassword: Story = {
  args: {
    showPassword: true,
  },
};

export const HidePassword: Story = {
  args: {
    showPassword: false,
  },
};
