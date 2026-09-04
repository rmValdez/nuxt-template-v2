import type { Meta, StoryObj } from '@storybook/vue3';
import ThemeToggle from './ThemeToggle.vue';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  render: () => ({
    components: { ThemeToggle },
    template: '<div class="p-4 bg-background text-foreground"><ThemeToggle /></div>',
  }),
};
