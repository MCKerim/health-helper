import type { Meta, StoryObj } from '@storybook/react';
import UploadImage from '../../atoms/uploadImage/UploadImage';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';

// Define metadata for the story
const meta = {
    title: 'Atoms/UploadImage',
    component: UploadImage,
    tags: ['autodocs'],
    args: {
        onImageSelect: action('image-selected'),
        preview: '',
    },
} satisfies Meta<typeof UploadImage>;

export default meta;

type Story = StoryObj<typeof meta>;

// Define a template for the UploadImage component
const Template: Story = {
    args: {
        preview: '',
    },
    render: (args) => {
        const [preview, setPreview] = useState<string>(args.preview);

        const handleImageSelect = (file: File) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
            args.onImageSelect(file);
        };

        return <UploadImage {...args} onImageSelect={handleImageSelect} preview={preview} />;
    },
};

// Define default story for the UploadImage component
export const Default: Story = Template;
