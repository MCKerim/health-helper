import type { Meta, StoryObj } from "@storybook/react";
import DrawerHamburgerIcon from "./DrawerHamburgerIcon";
import { fn } from "@storybook/test";

const meta = {
  title: "Atoms/DrawerHamburgerIcon",
  component: DrawerHamburgerIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    toggleDrawer: fn(),
  },
} satisfies Meta<typeof DrawerHamburgerIcon>;

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
