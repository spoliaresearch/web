import styles from "./Table.module.css";
import { Grid, GridItem } from "../Grid";

export default function Table({ header, title, description, rightContent }) {
  return (
    <div className={styles.tableBox}>
      <div className={styles.tableHeader}>{header}</div>
      <div className={styles.tableContent}>
        <Grid>
          <GridItem span={5}>
            <div className={styles.tableLeft}>
              <h3 className={styles.tableTitle}>{title}</h3>
              <div className={styles.tableDivider}></div>
              <p className={styles.tableBody}>{description}</p>
            </div>
          </GridItem>
          <GridItem span={7}>
            <div className={styles.tableRight}>{rightContent}</div>
          </GridItem>
        </Grid>
      </div>
    </div>
  );
}
