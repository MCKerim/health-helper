import type { Meta, StoryObj } from "@storybook/react";
import Textfield from "./Textfield";
import { fn } from "@storybook/test";

const meta = {
  title: "Atoms/Textfield",
  component: Textfield,
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    onKeyDown: fn(),
  }
} satisfies Meta<typeof Textfield>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
    value: "",
    className: "textfield",
    type: "text",
  },
};
