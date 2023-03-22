import styled from "styled-components";

export const HomeTitle = styled.h1`
  @keyframes slideInLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
  animation: 1s ease-out 0s 1 slideInLeft;
`;

export const Search = styled.div`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: 1s ease-in 0s 1 fadeIn;
`;

export const PopularPost = styled.div`
  //box-sizing: border-box;
  margin: auto;
`;

export const PopularPostTitle = styled.h5`
  margin-left: 22%;
  margin-bottom: 10px;
`;

export const StyleGrid = styled.div`
  overflow: hidden;
  max-height: 850px;
  .transition-appear {
    opacity: 0;
  }

  .transition-appear.transition-appear-active {
    opacity: 1;
    transition: opacity 800ms linear;
  }

  .transition-enter {
    transform: translateY(200%);
  }

  .transition-enter.transition-enter-active {
    transform: translateY(0%);
    transition: transform 1000ms linear;
  }

  .transition-exit {
    transform: translateY(-100%);
  }
  .transition-exit.transition-exit-active {
    transform: translateY(-200%);
    transition: transform 1000ms linear;
  }
  .transition-exit-done {
    transform: translateY(-200%);
  }
`;

export const CategoriesScroll = styled.div``;

export const TrendingCategory = styled.div``;
