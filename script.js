const classNames = {
  positiveClassName: "tm-votes-meter__value_positive",
  negativeClassName: "tm-votes-meter__value_negative",
  valueClassName: "tm-votes-meter__value",
  valueBlockClassName: "tm-votes-meter",
};

const classNameRating =
  " tm-votes-meter__value tm-votes-meter__value_appearance-comment tm-votes-meter__value_rating";

const getParams = (isPositive) => {
  if (isPositive) {
    return {
      className: classNames.positiveClassName,
      icon: "+",
    };
  } else {
    return {
      className: classNames.negativeClassName,
      icon: "-",
    };
  }
};
const createRatingElement = ({ value, isPositive }) => {
  const { className, icon } = getParams(isPositive);
  const element = document.createElement("span");
  element.className = className + classNameRating;
  element.style.marginLeft = "0px";
  element.innerText = `${icon}${value}`;
  return element;
};

/**
 *
 * @param {HTMLDivElement} element
 */

const addPositiveNegativeRatings = (element) => {
  if (
    element.getElementsByClassName(classNames.negativeClassName)[0] &&
    element.getElementsByClassName(classNames.positiveClassName)[0]
  )
    return;

  const ratings = element
    .getElementsByClassName(classNames.valueClassName)[0]
    .getAttribute("title")
    .match(/\d+/g);

  if (!ratings) return;

  const [_computed, positive, negative] = ratings;

  const fragment = document.createElement("div");
  fragment.style.marginLeft = "15px";
  fragment.append(
    "(",
    createRatingElement({ value: positive, isPositive: true }),
    " | ",
    createRatingElement({ value: negative, isPositive: false }),
    ")"
  );
  element.append(fragment);
};

const exposeRatings = () => {
  const allRatingElements = [
    ...document.getElementsByClassName(classNames.valueBlockClassName),
  ];
  allRatingElements.forEach(addPositiveNegativeRatings);
};
exposeRatings();

window.addEventListener("scroll", exposeRatings);
