export default function AccountDetails({ account }) {
  return (
    <div>
      <div>
        <p>
          <strong>AccountType:</strong> {account.accountType}
        </p>
        <p>
          <strong>CurrentBalance:</strong> {account.currentBalance}
        </p>

        <p>
          <strong> AvailableBalance:</strong> {account.availableBalance}
        </p>
      </div>
    </div>
  );
}
