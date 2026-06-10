import styles from './AccountDetails.module.scss';

interface AccountDetailsProps {
  account: {
    accountType: string;
    currentBalance: number;
    availableBalance: number;
  };
}

export default function AccountDetails({ account }: AccountDetailsProps) {
  return (
    <section className={styles.container}>
      <div className={styles.accountCard}>
        <p className={styles.accountType}>{account.accountType}</p>

        <div className={styles.balanceSection}>
          <p className={styles.balanceLabel}>Current Balance</p>

          <h1 className={styles.balance}>
            €{Number(account.currentBalance).toLocaleString()}
          </h1>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Available Balance</span>
            <span className={styles.value}>
              €{Number(account.availableBalance).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
