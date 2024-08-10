import type { Meta, StoryObj } from "@storybook/react";
import SendTextFooter from "./SendTextFooter";
import {string} from "prop-types";

const meta = {
  title: "Molecules/SendTextFooter",
  component: SendTextFooter,
  tags: ["autodocs"],
} satisfies Meta<typeof SendTextFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    onChange: () => {},
    onClick: () => {},
    handleSend: () => {},
    handleImageSelect: (file: File) => {},
    preview: "",
  },
};
