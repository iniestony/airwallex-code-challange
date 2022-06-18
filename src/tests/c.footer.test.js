import { render, screen } from '@testing-library/react';
import InvitationFooter from '../components/invitationFooter';

describe('Test UI display for component footer', () => {
  test('renders texts', () => {
    render(<InvitationFooter />);

    const textA = screen.getByText(/broccoli\s+&\s+co\./i);
    const textB = screen.getByText(/in\s+melbourne/i);
    const textC = screen.getByText(/all\s+rights\s+reserved/i);

    expect(textA).toBeInTheDocument();
    expect(textB).toBeInTheDocument();
    expect(textC).toBeInTheDocument();
  })
});  