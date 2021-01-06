import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OpeningHours = ({ restaurant }) => {
  let status;
  // DEAL WITH HOURS
  if (restaurant.description) {
    let Open, Closed, Hours, DayOpen;
    let HourOpen = [];
    if (restaurant.description.slice(" ").indexOf("Open") !== -1) {
      Hours = restaurant.description.slice(
        restaurant.description.slice(" ").indexOf("Open")
      );
      Open = Hours.split(" ");
      if (Open.indexOf("Closed") !== -1) {
        Closed = Open.splice(Open.indexOf("Closed"));
      }
      // GET ACTUAL DAY
      const date = new Date().toLocaleString("en-us", { weekday: "short" });
      if (Closed && Closed.length !== 0) {
        if (Closed.indexOf(date) !== -1) {
          status = "Closed Today";
        }
      }
      // ARRAY WITH OPENED DAYS
      for (let i = 0; i < Open.length; i++) {
        if (Open[i].indexOf("-") !== -1 && Open[i].indexOf(":") === -1) {
          DayOpen = Open[i].split("-");
          if (DayOpen.indexOf("Mon") !== -1) {
            DayOpen.splice(DayOpen.indexOf("Mon"), 1, "1");
          }
          if (DayOpen.indexOf("Tue") !== -1) {
            DayOpen.splice(DayOpen.indexOf("Tue"), 1, "2");
          }
          if (DayOpen.indexOf("Wed") !== -1) {
            DayOpen.splice(DayOpen.indexOf("Wed"), 1, "3");
          }
          if (DayOpen.indexOf("Thu") !== -1) {
            DayOpen.splice(DayOpen.indexOf("Thu"), 1, "4");
          }
          if (DayOpen.indexOf("Fri") !== -1) {
            DayOpen.splice(DayOpen.indexOf("Fri"), 1, "5");
          }
          if (DayOpen.indexOf("Sat") !== -1) {
            DayOpen.splice(DayOpen.indexOf("Sat"), 1, "6");
          }
          if (DayOpen.indexOf("Sun") !== -1) {
            DayOpen.splice(DayOpen.indexOf("Sun"), 1, "7");
          }
        }
      }
      // CONDITION FOR SUNDAY = 0/7
      if (
        (new Date().getDay() >= DayOpen[0] &&
          new Date().getDay() <= DayOpen[1]) ||
        Open.indexOf(new Date().getDay()) !== 1
      ) {
        // WE ARE AN OPEN DAY AND NEED TO CHECK HOURS
        const hour = new Date().getHours();
        const min = new Date().getMinutes();
        const time = hour + ":" + min;
        for (let i = 0; i < Open.length; i++) {
          if (Open[i].indexOf(":") !== -1) {
            HourOpen.push(Open[i]);
          }
        }
        // console.log(HourOpen);
        for (let j = 0; j < HourOpen.length; j++) {
          // PARTICULAR IF OPEN AFTER MIDNIGHT
          if (HourOpen[j].split("-")[0] < HourOpen[j].split("-")[1]) {
            if (
              time >= HourOpen[j].split("-")[0] &&
              time <= HourOpen[j].split("-")[1]
            ) {
              status = "Open";
              break;
            } else {
              status = "Closed temporarily";
            }
          } else {
            if (time >= HourOpen[j].split("-")[0]) {
              status = "Open";
              break;
            } else {
              status = "Closed temporarily";
            }
          }
        }
      } else {
        status = "Closed temporarily";
      }
    } else {
      status = "Missing informations";
    }
  } else {
    status = "Missing informations";
  }

  return status === "Open" ? (
    <div style={{ color: "green" }}>
      <FontAwesomeIcon
        icon="clock"
        className="icon"
        style={{ color: "green" }}
      />
      <div>
        <span style={{ fontFamily: "NunitoBold" }}>HOURS</span> <br />
        <div>{status}</div>
      </div>
    </div>
  ) : status && status[0] === "C" ? (
    <div style={{ color: "red" }}>
      <FontAwesomeIcon icon="clock" className="icon" style={{ color: "red" }} />
      <div>
        <span style={{ fontFamily: "NunitoBold" }}>HOURS</span> <br />
        <div>{status}</div>
      </div>
    </div>
  ) : (
    <div>
      <FontAwesomeIcon icon="clock" className="icon" />
      <div>
        <span style={{ fontFamily: "NunitoBold" }}>HOURS</span> <br />
        <div>{status}</div>
      </div>
    </div>
  );
};

export default OpeningHours;
