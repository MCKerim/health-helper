import type { Meta, StoryObj } from "@storybook/react";
import DrawerMenuContent from "./DrawerMenuContent";
import { fn } from "@storybook/test";

const meta = {
  title: "Atoms/DrawerMenuContent",
  component: DrawerMenuContent,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    toggleDrawer: fn(),
  },
} satisfies Meta<typeof DrawerMenuContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
  },
};
