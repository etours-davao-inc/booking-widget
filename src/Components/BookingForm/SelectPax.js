import React from 'react';
import PaxSection from './PaxSection';

export default () => {
  return (
    <section>
      <h4 style={styles.customh4}>Select number of persons</h4>
      <div style={styles.pax}>
        <PaxSection title="Adult" type="adults" label="number of adults 12 years above"/>
        <PaxSection title="Child (0-2 yrs)" type="kid02" label="number of child 0 to 2 years old" />
        <PaxSection title="Child (3-5 yrs)" type="kid35" label="number of child 3 to 5 years old" />
        <PaxSection title="Child (6-11 yrs)" type="kid611" label="number of child 6 to 11 years old" />
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