import type { Meta, StoryObj } from "@storybook/react";
import DatenschutzWindow from "./DatenschutzWindow";

const meta = {
  title: "Molecules/DatenschutzWindow",
  component: DatenschutzWindow,
  tags: ["autodocs"],
} satisfies Meta<typeof DatenschutzWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
