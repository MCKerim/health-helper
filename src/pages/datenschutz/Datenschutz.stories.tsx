import type { Meta, StoryObj } from "@storybook/react";
import Datenschutz from "./Datenschutz";

const meta = {
  title: "Pages/Datenschutz",
  component: Datenschutz,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  }
} satisfies Meta<typeof Datenschutz>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
