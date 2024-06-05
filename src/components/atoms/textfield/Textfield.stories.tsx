import type { Meta, StoryObj } from "@storybook/react";
import Textfield from "./Textfield";
import { fn } from "@storybook/test";

const meta = {
  title: "Atoms/Textfield",
  component: Textfield,
  tags: ["autodocs"],
  args: {
    onChange: fn(),
  }
} satisfies Meta<typeof Textfield>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    label: "Email",
    placeholder: "example@gmail.com",
    value: "",
    type: "email",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    placeholder: "********",
    value: "",
    type: "password",
  },
};

export const Contained: Story = {
  args: {
    placeholder: "Enter Text...",
    value: "",
    type: "text",
    contained: true,
  },
};

export const ContainedPassword: Story = {
  args: {
    placeholder: "Password",
    value: "",
    type: "password",
    contained: true,
  },
};