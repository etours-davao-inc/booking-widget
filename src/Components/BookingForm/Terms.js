import React, { useContext } from "react";
import { BookingContext } from "./Context";

export default () => {
  const { data } = useContext(BookingContext);
  return (
    <div>
      <h3>Terms and conditions</h3>
      <div dangerouslySetInnerHTML={{ __html: data.terms }} />
      <h3>Etours responsibilites</h3>
      <div dangerouslySetInnerHTML={{ __html: data.responsibilites }} />
    </div>
  )
}