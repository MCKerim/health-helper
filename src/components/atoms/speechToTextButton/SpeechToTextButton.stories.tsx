import type { Meta, StoryObj } from "@storybook/react";
import SpeechToTextButton from "./SpeechToTextButton";

const meta = {
  title: "Atoms/SpeechToTextButton",
  component: SpeechToTextButton,
  tags: ["autodocs"],
} satisfies Meta<typeof SpeechToTextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
