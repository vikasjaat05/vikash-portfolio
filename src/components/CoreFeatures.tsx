import Image from "next/image";
import styles from "./CoreFeatures.module.css";

export default function CoreFeatures() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.badge}>Core Features</div>
        <h2 className={styles.title}>Built for Speed &amp; Quality</h2>
        <p className={styles.subtitle}>
          Everything you need to go
          <br />
          from idea to image
        </p>

        <div className={styles.grid}>
          {/* Card 1 */}
          <div className={`${styles.card} ${styles.card1}`}>
            <div className={styles.promptBox}>
              A bright, high-resolution 3D illustration of a{" "}
              <span className={styles.blurText}>cheerful cartoon</span> of a{" "}
              <span className={styles.blurText}>girl character</span>{" "}
              <span className={styles.blurText}>centred against a</span> smooth blue
              background
            </div>
            <div className={styles.addDetailsPill}>
              <span className={styles.sparkle}>✦</span>
              Add more details
            </div>
            <svg
              className={styles.cursorIcon}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 2L20 11L11 13L9 22L4 2Z" />
            </svg>
            <h3>Smart Prompt Suggestions</h3>
          </div>

          {/* Card 2 */}
          <div className={`${styles.card} ${styles.card2}`}>
            <div className={styles.apiVisual}>
              <Image
                src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/network.svg"
                alt="API network diagram"
                width={400}
                height={180}
                className={styles.networkImg}
              />
            </div>
            <h3>API Access</h3>
          </div>

          {/* Card 3 */}
          <div className={`${styles.card} ${styles.card3}`}>
            <div className={styles.mesh} />
            <Image
              src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/library%20icon.svg"
              alt="Project library folder icon"
              width={170}
              height={170}
              className={styles.folder}
            />
            <div className={styles.search}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8" stroke="#64748b" strokeWidth="2" />
                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Search in library
            </div>
            <h3>Project Library</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
