const selectors = {
  positiveClassName: "tm-votes-meter__value_positive",
  negativeClassName: "tm-votes-meter__value_negative",

  articleRatingSelector:
    "tm-votes-lever.tm-votes-lever.tm-votes-lever_appearance-article.tm-article-rating__votes-switcher",
  injectArticleRatingSelectorTo:
    "tm-votes-lever__score.tm-votes-lever__score_appearance-article.tm-votes-lever__score",

  commentRaitingSelector:
    "tm-votes-lever.tm-votes-lever.tm-votes-lever_appearance-comment.tm-comment-footer__votes-switcher",
  injectCommentRaitingSelectorTo:
    "tm-votes-lever__score.tm-votes-lever__score.tm-votes-lever__score_appearance-comment",

  additionalArticlesRaitingsSelectors:
    "tm-votes-meter__value.tm-votes-meter__value.tm-votes-meter__value_positive.tm-votes-meter__value_appearance-article.tm-votes-meter__value_rating",
  injectAdditionalArticlesRaitingsSelectorsTo:
    "similar-and-daily__tab-view tm-votes-meter.tm-data-icons__item",

  articlasOnMainPageRatingSelector:
    "tm-votes-meter__value.tm-votes-meter__value_positive.tm-votes-meter__value_appearance-article.tm-votes-meter__value_rating.tm-votes-meter__value",
  injectarticlasOnMainPageRatingSelectorTo: "PARENT_NODE",
};

const classNameRating =
  " tm-votes-meter__value tm-votes-meter__value_appearance-comment tm-votes-meter__value_rating";

const getParams = (isPositive) => {
  if (isPositive) {
    return {
      className: selectors.positiveClassName,
      icon: "+",
    };
  } else {
    return {
      className: selectors.negativeClassName,
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

const createFragmentWithExpandedRaiting = (elementWithRaiting) => {
  if (
    elementWithRaiting.getElementsByClassName(selectors.negativeClassName)[0] &&
    elementWithRaiting.getElementsByClassName(selectors.positiveClassName)[0]
  )
    return;

  const ratings = elementWithRaiting.getAttribute("title")?.match(/\d*\.?\d/g);

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
  return fragment;
};

const injectRating = (ratingFragment, injectTo) => {
  if (!ratingFragment || !injectTo) {
    console.log(ratingFragment, injectTo);
    return;
  }

  injectTo.appendChild(ratingFragment);
};

const addArticleRaiting = () => {
  const article = document.querySelector("." + selectors.articleRatingSelector);
  if (!article) return;

  const fragment = createFragmentWithExpandedRaiting(article);

  const injectTo = article.querySelector(
    "." + selectors.injectArticleRatingSelectorTo
  );
  injectRating(fragment, injectTo);
};

const addCommentsRatings = () => {
  const comments = document.querySelectorAll(
    "." + selectors.commentRaitingSelector
  );

  comments.forEach((comment) => {
    const fragment = createFragmentWithExpandedRaiting(comment);

    const injectTo = comment.querySelector(
      "." + selectors.injectCommentRaitingSelectorTo
    );
    injectRating(fragment, injectTo);
  });
};

const addAdditionalArticlesRatings = () => {
  const additionalArticles = document.querySelectorAll(
    "." + selectors.additionalArticlesRaitingsSelectors
  );
  additionalArticles.forEach((article) => {
    const fragment = createFragmentWithExpandedRaiting(article);

    injectRating(
      fragment,
      article.querySelector(
        "." + selectors.injectAdditionalArticlesRaitingsSelectorsTo
      )
    );
  });
};

const addArticlesOnMainPageRatings = () => {
  const articles = document.querySelectorAll(
    "." + selectors.articlasOnMainPageRatingSelector
  );
  articles.forEach((article) => {
    const fragment = createFragmentWithExpandedRaiting(article);

    const injectTo = article.parentElement;

    injectRating(fragment, injectTo);
  });
};

const exposeRatings = () => {
  // addArticleRaiting();
  // addCommentsRatings();
  // addAdditionalArticlesRatings();

  addArticlesOnMainPageRatings();
};

exposeRatings();

window.addEventListener("scroll", exposeRatings);
