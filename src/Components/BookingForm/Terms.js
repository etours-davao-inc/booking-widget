import React, { useContext } from "react";
import { BookingContext } from "./Context";

export default () => {
  const { data } = useContext(BookingContext);
  return (
    <div style={{fontSize: '.9em'}}>
      <h3 style={styles.h3}>Terms and conditions</h3>
      <div dangerouslySetInnerHTML={{ __html: data.terms }} />
      <h3 style={styles.h3}>Etours responsibilites</h3>
      <div dangerouslySetInnerHTML={{ __html: data.responsibilites }} />
    </div>
  )
}

const styles = {
  h3: {
    color: '#d35400',
    fontSize: '17px'
  }
}