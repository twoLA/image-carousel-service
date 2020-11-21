/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import styles from './Slider.scss';
import Description from './Description.jsx';
import HeartButton from './HeartButton.jsx';
import HeartButtonFilled from './HeartButtonFilled.jsx';

function Slider({ listings }) {
  // declare state variables using array destructuring
  const [x, setX] = useState(0);
  const [noLeftButton, setNoLeftButton] = useState(true);
  const [noRightButton, setNoRightButton] = useState(false);
  const [savedListing, setSavedListing] = useState(false);
  const goLeft = () => {
    // if left button is ever clicked, show right button
    setNoRightButton(false);
    // prevent scrolling past first flexbox item and hide left button if in beginning of slider
    (x === 0) ? null : setX(x + 400);
    (x === -400) ? setNoLeftButton(true) : null;
  };
  const goRight = () => {
    // if right button is ever clicked, show left button
    setNoLeftButton(false);
    setX(x - 400);
    // prevent scrolling past last flexbox item and hide right button if at the end of slider
    (x === -100 * ((listings.length - 1) / 2)) ? setNoRightButton(true) : null;
  };
  // let count = 0;
  // let hearted = {};
  const saveListing = () => {
    setSavedListing(!savedListing);
    // console.log(index);
    // setSavedListing([...savedListing, index.id]);

    // event.target.style.background = 'url(https://s3-us-west-1.amazonaws.com/fec.similarhomes/FEC+avatars/heartclicked.svg)';
  };
  // const findListing = (listings) => {
  //   // map and match savedListing
  //   listings.map((listing) => {
  //     if (savedListing.includes(listing.id)) {
  //       return true;
  //     }
  //   });
  //   return false;
  // }

  const heartToRender = savedListing ? <HeartButtonFilled saveListing={saveListing} savedListing={savedListing} /> : <HeartButton saveListing={saveListing} savedListing={savedListing} />;
  return (
    <>
      <div className={styles.slider}>
        {listings.map((listing, index) => (
          <>
          <div key={index} className={styles.slide} style={{ transform: `translateX(${x}%)` }}>
            <div className={styles.image}>
              <img src={listing.image} />
              {heartToRender}
              {/* <HeartButton listing={listing} heartId={listing.id} saveListing={saveListing} savedListing={savedListing} /> */}
            </div>
            <Description id={listing.id} listing={listing} />
          </div>
          </>
        ))}
        {noLeftButton ? null : <button className={styles.goLeft} onClick={goLeft}><img src="https://s3-us-west-1.amazonaws.com/fec.similarhomes/FEC+avatars/larrow.svg" /></button>}
        {noRightButton ? null : <button className={styles.goRight} onClick={goRight}><img src="https://s3-us-west-1.amazonaws.com/fec.similarhomes/FEC+avatars/rarrow.svg" /></button>}
      </div>
    </>
  );
}

export default Slider;

  // function changeImage(id) {
  //   if (document.getElementById(`imgClickAndChange${id}`).src === "https://s3-us-west-1.amazonaws.com/fec.similarhomes/FEC+avatars/heartunclicked.svg") {
  //     document.getElementById(`imgClickAndChange${id}`).src = "https://s3-us-west-1.amazonaws.com/fec.similarhomes/FEC+avatars/heartclicked.svg";
  //   } else {
  //     document.getElementById(`imgClickAndChange${id}`).src = "https://s3-us-west-1.amazonaws.com/fec.similarhomes/FEC+avatars/heartunclicked.svg";
  //   }
  // }

      // setSavedListing(!savedListing);

    // if (hearted[count]) {
    //   delete hearted[count];
    // } else {
    //   hearted[count] = count;
    // }

    // if (savedListing.includes(heartId)) {
    //   var array = [...savedListing];
    //   array.splice(heartId, 1);
    //   setSavedListing(array);
    // } else {
    //   setSavedListing([...savedListing, heartId]);
    // }