import { useRef, useState } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import ActionSwap from './ActionSwap';
import ConfirmDialog from './ConfirmDialog';
import StatusBadge from './StatusBadge';
import Tooltip from './Tooltip';
import { ToastProvider, useToast } from './ToastProvider';

function ToastHarness() {
  const { showToast } = useToast();
  return (
    <button
      type="button"
      onClick={() => showToast({
        status: 'success',
        title: 'Wallet removed',
        duration: 8000,
        action: { label: 'Undo', onClick: () => {} },
      })}
    >
      Show toast
    </button>
  );
}

function ToastLimitHarness() {
  const { showToast } = useToast();
  const countRef = useRef(0);
  return (
    <button
      type="button"
      onClick={() => {
        countRef.current += 1;
        showToast({ title: `Notice ${countRef.current}`, duration: 0 });
      }}
    >
      Add notice
    </button>
  );
}

function ConfirmHarness({ onConfirm }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  return (
    <>
      <div className="app-shell">
        <button ref={triggerRef} type="button" onClick={() => setOpen(true)}>Remove</button>
      </div>
      <ConfirmDialog
        open={open}
        eyebrow="Saved wallet"
        title="Remove this wallet?"
        description={<p>Removal description</p>}
        onCancel={() => setOpen(false)}
        onConfirm={onConfirm}
        returnFocus={triggerRef.current}
        confirmLabel="Remove wallet"
      />
    </>
  );
}

test('ActionSwap announces its current value and StatusBadge exposes its state', () => {
  const { rerender } = render(
    <><ActionSwap value="Copy" /><StatusBadge status="loading">Pending</StatusBadge></>,
  );
  expect(screen.getAllByText('Copy')).toHaveLength(2);
  expect(screen.getByText('Pending')).toBeInTheDocument();

  rerender(<><ActionSwap value="Copied" /><StatusBadge status="success">Mined successfully</StatusBadge></>);
  expect(screen.getAllByText('Copied')).toHaveLength(2);
  expect(screen.getByText('Mined successfully')).toBeInTheDocument();
});

test.each(['neutral', 'info', 'loading', 'success', 'warning', 'danger'])(
  'StatusBadge renders the %s state',
  (status) => {
    render(<StatusBadge status={status}>{status}</StatusBadge>);
    expect(screen.getByText(status).closest('.status-badge')).toHaveClass(`status-badge--${status}`);
  },
);

test('toast actions and dismissal are accessible', () => {
  render(<ToastProvider><ToastHarness /></ToastProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'Show toast' }));
  expect(screen.getByText('Wallet removed')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
});

test('toast stack keeps only the three newest notices', async () => {
  render(<ToastProvider><ToastLimitHarness /></ToastProvider>);
  const trigger = screen.getByRole('button', { name: 'Add notice' });
  fireEvent.click(trigger);
  fireEvent.click(trigger);
  fireEvent.click(trigger);
  fireEvent.click(trigger);

  await waitFor(() => expect(screen.queryByText('Notice 1')).not.toBeInTheDocument());
  expect(screen.getByText('Notice 2')).toBeInTheDocument();
  expect(screen.getByText('Notice 3')).toBeInTheDocument();
  expect(screen.getByText('Notice 4')).toBeInTheDocument();
});

test('tooltip is exposed from keyboard focus and removed on blur', async () => {
  render(
    <Tooltip content="Search">
      <button type="button" aria-label="Search">Icon</button>
    </Tooltip>,
  );

  const button = screen.getByRole('button', { name: 'Search' });
  fireEvent.focus(button);
  expect(await screen.findByRole('tooltip')).toHaveTextContent('Search');
  expect(button).toHaveAttribute('aria-describedby', screen.getByRole('tooltip').id);

  fireEvent.blur(button, { relatedTarget: document.body });
  await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
});

test('confirmation dialog contains focus, cancels safely, and restores focus', async () => {
  const onConfirm = jest.fn();
  render(<ConfirmHarness onConfirm={onConfirm} />);

  const trigger = screen.getByRole('button', { name: 'Remove' });
  fireEvent.click(trigger);

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  await screen.findByRole('button', { name: 'Cancel' });
  await act(async () => new Promise((resolve) => window.setTimeout(resolve, 30)));
  expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
  fireEvent.keyDown(document, { key: 'Escape' });
  await waitFor(() => expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();

  fireEvent.click(trigger);
  await act(async () => new Promise((resolve) => window.setTimeout(resolve, 30)));
  fireEvent.click(screen.getByRole('button', { name: 'Remove wallet' }));
  expect(onConfirm).toHaveBeenCalledTimes(1);
});
