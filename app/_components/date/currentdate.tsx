'use client';
import React from "react";

const CurrentDate = () => {
    const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate: string = new Date().toLocaleDateString();
    const day: number = new Date().getDay();
    return (
    <span>{currentDate} {dayArray[day]}</span>
  )
}

export default CurrentDate