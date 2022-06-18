import { render, screen } from '@testing-library/react';
import InvitationHeader from '../components/invitationHeader';

describe('Test UI display for component header', () => {
  test('renders texts', () => {
    render(<InvitationHeader />);

    const textA = screen.getByText(/broccoli\s+&\s+co\./i);

    expect(textA).toBeInTheDocument();
  })
});  