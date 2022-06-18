import { render, screen, fireEvent } from '@testing-library/react';
import Invitation from '../pages/invitation';

describe('Test UI display for page invitation', () => {
  test('renders texts before click', () => {
    render(<Invitation />);
  
    const textA = screen.getByText(/a\s+better\s+way/i);
    const textB = screen.getByText(/to\s+enjoy\s+every\s+day\./i);
    const sub = screen.getByText(/when\s+we\s+launch\./i);
    const btn = screen.getByText(/request\s+an\s+invite/i);

    expect(textA).toBeInTheDocument();
    expect(textB).toBeInTheDocument();
    expect(sub).toBeInTheDocument();
    expect(btn).toBeInTheDocument();

    const header = document.querySelector('.header');
    expect(header).toBeInTheDocument();
    
    const footer = document.querySelector('.footer');
    expect(footer).toBeInTheDocument();

    const modalEl = document.querySelector('.modalEl');
    expect(modalEl).not.toBeInTheDocument();

    const container = document.querySelector('#invitation-modal-root');
    expect(container).toBeInTheDocument();
  });

  test('renders texts after click', () => {
    render(<Invitation />);

    const outerBtn = screen.getByText(/request\s+an\s+invite/i);
    fireEvent.click(outerBtn);

    const modalEl = document.querySelector('.modalEl');
    expect(modalEl).toBeInTheDocument();

    const sendBtn = screen.getByText(/send/i);
    expect(sendBtn).toBeInTheDocument();

    const inputFullName = document.querySelector('input[placeholder="Full name"]');
    expect(inputFullName).toBeInTheDocument();

    const inputEmail = document.querySelector('input[placeholder="Email"]');
    expect(inputEmail).toBeInTheDocument();

    const inputConfirmEmail = document.querySelector('input[placeholder="Confirm email"]');
    expect(inputConfirmEmail).toBeInTheDocument();
  });

  test('highlight error style for invalid fullname values', () => {
    render(<Invitation />);

    const outerBtn = screen.getByText(/request\s+an\s+invite/i);
    fireEvent.click(outerBtn);

    const sendBtn = screen.getByText(/send/i);

    const inputFullName = document.querySelector('input[placeholder="Full name"]');

    // invalid fullname
    fireEvent.change(inputFullName, {target: {value: 'ab'}});
    fireEvent.click(sendBtn);
    expect(inputFullName).toHaveClass('error');
    expect(sendBtn).toBeInTheDocument();
    expect(sendBtn).not.toHaveClass('disabled');
    
    // valid fullname
    fireEvent.change(inputFullName, {target: {value: 'Tony'}});
    fireEvent.click(sendBtn);
    expect(inputFullName).not.toHaveClass('error');
    // inputEmail and inputConfirmEmail is still invalid
    expect(sendBtn).toBeInTheDocument();
    expect(sendBtn).not.toHaveClass('disabled');
  });

  test('highlight error style for invalid email/confirm email values', () => {
    render(<Invitation />);

    const outerBtn = screen.getByText(/request\s+an\s+invite/i);
    fireEvent.click(outerBtn);

    const sendBtn = screen.getByText(/send/i);

    const inputFullName = document.querySelector('input[placeholder="Full name"]');
    const inputEmail = document.querySelector('input[placeholder="Email"]');
    const inputConfirmEmail = document.querySelector('input[placeholder="Confirm email"]');

    fireEvent.change(inputFullName, {target: {value: 'Tony'}});

    // invalid email + invalid confirm email
    fireEvent.change(inputEmail, {target: {value: '@qq.com'}});
    fireEvent.change(inputConfirmEmail, {target: {value: '@qq.com'}});
    fireEvent.click(sendBtn);
    expect(inputFullName).not.toHaveClass('error');
    expect(inputEmail).toHaveClass('error');
    expect(inputConfirmEmail).toHaveClass('error');
    expect(sendBtn).toBeInTheDocument();
    expect(sendBtn).not.toHaveClass('disabled');

    // invalid email + valid confirm email
    fireEvent.change(inputEmail, {target: {value: '@qq.com'}});
    fireEvent.change(inputConfirmEmail, {target: {value: 'test@qq.com'}});
    fireEvent.click(sendBtn);
    expect(inputFullName).not.toHaveClass('error');
    expect(inputEmail).toHaveClass('error');
    expect(inputConfirmEmail).toHaveClass('error');
    expect(sendBtn).toBeInTheDocument();
    expect(sendBtn).not.toHaveClass('disabled');

    // valid email + invalid confirm email
    fireEvent.change(inputEmail, {target: {value: 'test@qq.com'}});
    fireEvent.change(inputConfirmEmail, {target: {value: '@qq.com'}});
    fireEvent.click(sendBtn);
    expect(inputFullName).not.toHaveClass('error');
    expect(inputEmail).not.toHaveClass('error');
    expect(inputConfirmEmail).toHaveClass('error');
    expect(sendBtn).toBeInTheDocument();
    expect(sendBtn).not.toHaveClass('disabled');

    // valid email + valid but different confirm email
    fireEvent.change(inputEmail, {target: {value: 'test@qq.com'}});
    fireEvent.change(inputConfirmEmail, {target: {value: 'test2@qq.com'}});
    fireEvent.click(sendBtn);
    expect(inputFullName).not.toHaveClass('error');
    expect(inputEmail).not.toHaveClass('error');
    expect(inputConfirmEmail).toHaveClass('error');
    expect(sendBtn).toBeInTheDocument();
    expect(sendBtn).not.toHaveClass('disabled');
  });

  test('sending committed for all valid input values', async () => {
    render(<Invitation />);

    const outerBtn = screen.getByText(/request\s+an\s+invite/i);
    fireEvent.click(outerBtn);

    const sendBtn = screen.getByText(/send/i);

    const inputFullName = document.querySelector('input[placeholder="Full name"]');
    const inputEmail = document.querySelector('input[placeholder="Email"]');
    const inputConfirmEmail = document.querySelector('input[placeholder="Confirm email"]');

    fireEvent.change(inputFullName, {target: {value: 'Tony'}});
    fireEvent.change(inputEmail, {target: {value: 'test@qq.com'}});
    fireEvent.change(inputConfirmEmail, {target: {value: 'test@qq.com'}});
    fireEvent.click(sendBtn);
    expect(inputFullName).not.toHaveClass('error');
    expect(inputEmail).not.toHaveClass('error');
    expect(inputConfirmEmail).not.toHaveClass('error');

    // all valid, start sending
    const sendingBtn = screen.getByText(/sending/i);
    expect(sendingBtn).toBeInTheDocument();
    expect(sendingBtn).toHaveClass('disabled');
  });
});
