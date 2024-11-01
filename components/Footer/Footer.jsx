import React from "react";
import classes from "./footer.module.css";

export default function Footer() {
  return (
    <div className={classes.footerMainSection}>
      <div className={classes.copyright}>
        <h5>© 2024 Copyright, All Rights Reserved.</h5>
      </div>
    </div>
  );
}
