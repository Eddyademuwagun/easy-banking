export default function AccountsDetails({ accounts }) {
  return (
    <div>
      <div>
        <p>
          <strong>AccountType:</strong> {accounts.accountType}
        </p>
        <p>
          <strong>CurrentBalance:</strong> {accounts.currentBalance}
        </p>

        <p>
          <strong> AvailableBalance:</strong> {accounts.availableBalance}
        </p>
      </div>
    </div>
  );
}
