import type { Meta, StoryObj } from "@storybook/react";
import Landingpage from "./Landingpage";

const meta = {
  title: "Pages/Landingpage",
  component: Landingpage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Landingpage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
