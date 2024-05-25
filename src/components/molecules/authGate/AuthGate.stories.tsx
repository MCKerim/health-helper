import type { Meta, StoryObj } from "@storybook/react";
import AuthGate from "./AuthGate";

const meta = {
  title: "Molecules/AuthGate",
  component: AuthGate,
  tags: ["autodocs"],
} satisfies Meta<typeof AuthGate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
