import React from 'react';
import PaxSection from './PaxSection';

export default () => {
  return (
    <section>
      <h4 style={styles.customh4}>Select number of persons</h4>
      <div style={styles.pax}>
        <PaxSection title="Adult" type="adults"></PaxSection>
        <PaxSection title="Child (0-2 yrs)" type="kid02"></PaxSection>
        <PaxSection title="Child (3-5 yrs)" type="kid35"></PaxSection>
        <PaxSection title="Child (6-11 yrs)" type="kid611"></PaxSection>
      </div>
    </section>
  )
}

const styles = {
  pax: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '15px'
  },
  customh4: {
    fontSize: '17px',
    padding: '8px 0',
    margin: '15px 0',
    color: 'black'
  },
}