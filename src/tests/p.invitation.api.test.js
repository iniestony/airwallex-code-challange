import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Invitation from '../pages/invitation';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('Test UI behavior different server responses', () => {
  test('response with 500', async () => {
    render(<Invitation />);

    server.use(
      rest.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', async (_, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            errorMessage: 'Internal Server Error'
          })
        );
      }),
    );

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

    // expect waiting for a [Internal Server Error] error message
    await waitFor(() => screen.getByText(/internal\s+server\s+error/i));

    const errorMsg = document.querySelector('.errorMsg');
    expect(errorMsg).toBeInTheDocument();

    // not forwarding to next modal
    expect(inputFullName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputConfirmEmail).toBeInTheDocument();
  });

  test('response with 400', async () => {
    render(<Invitation />);

    server.use(
      rest.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', async (_, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            errorMessage: 'My Bad Request: Email is already used'
          })
        );
      }),
    );

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

    // expect waiting for a [Internal Server Error] error message
    await waitFor(() => screen.getByText(/my\s+bad\s+request/i));

    const errorMsg = document.querySelector('.errorMsg');
    expect(errorMsg).toBeInTheDocument();

    // not forwarding to next modal
    expect(inputFullName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputConfirmEmail).toBeInTheDocument();
  });

  test('response with 200', async () => {
    render(<Invitation />);

    server.use(
      rest.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', async (_, res, ctx) => {
        return res(
          ctx.status(200)
        );
      }),
    );

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

    // already forwarding to next modal
    await waitFor(() => screen.getByText(/all\s+done/i));

    const errorMsg = document.querySelector('.errorMsg');
    expect(errorMsg).not.toBeInTheDocument();

    expect(inputFullName).not.toBeInTheDocument();
    expect(inputEmail).not.toBeInTheDocument();
    expect(inputConfirmEmail).not.toBeInTheDocument();

    const confirmModal = document.querySelector('.confirmModal');
    expect(confirmModal).toBeInTheDocument();
  });
});
