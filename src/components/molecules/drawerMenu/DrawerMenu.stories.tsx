import type { Meta, StoryObj } from "@storybook/react";
import DrawerMenu from "./DrawerMenu";
import { fn } from "@storybook/test";

const meta = {
  title: "Molecules/DrawerMenu",
  component: DrawerMenu,
  tags: ["autodocs"],
  args: {
    toggleDrawer: fn(),
  }
} satisfies Meta<typeof DrawerMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
  }
};
