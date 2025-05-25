import { IoMdStar, IoMdStarOutline, IoMdStarHalf } from "react-icons/io";

const renderStars = (rating: number) => {
  const maxStars = 5;
  const filledStars = Math.floor(rating); 
  const hasHalfStar = rating % 1 >= 0.5; 
  const stars = [];

  for (let i = 0; i < filledStars; i++) {
    stars.push(<IoMdStar key={`filled-${i}`} className="text-yellow-500 text-2xl" />);
  }
  if (hasHalfStar && filledStars < maxStars) {
    stars.push(<IoMdStarHalf key="half" className="text-yellow-500 text-2xl" />);
  }
  for (let i = stars.length; i < maxStars; i++) {
    stars.push(<IoMdStarOutline key={`unfilled-${i}`} className="text-gray-300 text-2xl" />);
  }

  return stars;
};

export default renderStars
